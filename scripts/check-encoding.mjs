import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const TARGET_DIRS = ['docs', 'blog', 'src'];
const TARGET_FILES = ['docusaurus.config.ts', 'sidebars.ts', 'README.md'];
const EXT_ALLOW = new Set(['.md', '.mdx', '.ts', '.tsx', '.js', '.jsx', '.css', '.json', '.yml', '.yaml']);

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'build' || entry.name === '.docusaurus') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

const files = [];
for (const d of TARGET_DIRS) {
  const abs = path.resolve(ROOT, d);
  if (fs.existsSync(abs)) files.push(...walk(abs));
}
for (const f of TARGET_FILES) {
  const abs = path.resolve(ROOT, f);
  if (fs.existsSync(abs)) files.push(abs);
}

const errors = [];
for (const f of files) {
  if (!EXT_ALLOW.has(path.extname(f))) continue;
  const rel = path.relative(ROOT, f).replace(/\\/g, '/');
  const buf = fs.readFileSync(f);
  if (buf.length >= 3 && buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf) {
    errors.push(`${rel}: has UTF-8 BOM`);
  }
  const text = buf.toString('utf8');
  if (text.includes('\r\n')) {
    errors.push(`${rel}: uses CRLF (expected LF)`);
  }
}

if (errors.length > 0) {
  console.error('Encoding/line-ending check failed:\n');
  for (const e of errors) console.error(`- ${e}`);
  process.exit(1);
}

console.log(`Encoding/line-ending check passed (${files.length} files scanned).`);
