import fs from 'node:fs';
import path from 'node:path';

const DOCS_DIR = path.resolve('docs');
const DOC_EXT = new Set(['.md', '.mdx']);
const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walk(full));
      continue;
    }
    if (DOC_EXT.has(path.extname(entry.name))) out.push(full);
  }
  return out;
}

function parseFrontmatter(text) {
  const m = text.match(/^\uFEFF?---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  return m ? m[1] : null;
}

function getField(frontmatter, key) {
  const match = frontmatter.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
  return match ? match[1].trim() : null;
}

const files = walk(DOCS_DIR);
const idByScope = new Map();
const errors = [];

for (const file of files) {
  const raw = fs.readFileSync(file, 'utf8');
  const fm = parseFrontmatter(raw);
  const rel = path.relative(process.cwd(), file).replace(/\\/g, '/');
  if (!fm) {
    errors.push(`${rel}: missing frontmatter block`);
    continue;
  }

  const id = getField(fm, 'id');
  const title = getField(fm, 'title');
  const sidebarPosition = getField(fm, 'sidebar_position');
  const relFromDocs = path.relative(DOCS_DIR, file).replace(/\\/g, '/');
  const shouldEnforceFullFields = relFromDocs.startsWith('webshopx/');

  if (shouldEnforceFullFields) {
    if (!id) errors.push(`${rel}: missing id`);
    if (!title) errors.push(`${rel}: missing title`);
    if (!sidebarPosition) errors.push(`${rel}: missing sidebar_position`);
  }

  if (id && !ID_PATTERN.test(id)) {
    errors.push(`${rel}: id "${id}" must be kebab-case (lowercase letters/numbers/hyphen)`);
  }

  if (id) {
    // Allow same id under different second-level scopes (e.g. webshopx/admin/faq vs webshopx/player/faq).
    const parts = relFromDocs.split('/');
    const scope = parts.length >= 2 ? `${parts[0]}/${parts[1]}` : (parts[0] || 'root');
    const scopedId = `${scope}:${id}`;
    if (idByScope.has(scopedId)) {
      errors.push(`${rel}: duplicate scoped id "${scopedId}" (already used by ${idByScope.get(scopedId)})`);
    } else {
      idByScope.set(scopedId, rel);
    }
  }
}

if (errors.length > 0) {
  console.error('Frontmatter validation failed:\n');
  for (const e of errors) console.error(`- ${e}`);
  process.exit(1);
}

console.log(`Frontmatter validation passed (${files.length} files checked).`);
