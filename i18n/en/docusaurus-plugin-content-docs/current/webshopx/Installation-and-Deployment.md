---
sidebar_position: 3
---

# Installation and Deployment

[Back to Home](./Home)

## Environment Requirements

- Java: `21`
- Server: `Paper 1.20.6+` (Spigot compatible)
- Database: MariaDB / MySQL
- Optional dependency: Vault (for `GAME_COIN` integration)

## Get the Plugin

- [modrinth](https://modrinth.com/plugin/webshopx)
- [minebbs](https://www.minebbs.com/resources/webshopx-minecraft.15688/updates)

## Pre-Deployment Checklist

1. Database is installed. Recommended: MariaDB: https://mariadb.org/download/
2. WebShopX plugin is downloaded
3. Database schema, username, and password are prepared (example):

```yaml
schema: db_01
username: user_01
password: admin123
```

## Database Initialization (Before First Deployment)

### 1. Log In to Database

Log in as administrator:

```text
mysql -u root -p
```

### 2. Create Database and User

```sql
-- 1. Create database
CREATE DATABASE db_01 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 2. Create user (local access)
CREATE USER 'user_01'@'localhost' IDENTIFIED BY 'admin123';

-- 3. Grant all privileges on db_01
GRANT ALL PRIVILEGES ON db_01.* TO 'user_01'@'localhost';

-- 4. Reload privilege tables
FLUSH PRIVILEGES;
```

> **Note**: If your plugin runs in Docker or on another server, replace `'localhost'` with `'%'`.

## First-Time Deployment Steps

1. Put the plugin jar into the server `plugins/` directory.
2. Start the server once to generate default config files.
3. Edit `plugins/WebShopX/config.yml`, at minimum update `database.*`.
4. Restart the server.
5. In-game, players run:

```text
/ws password <new-password>
```

6. Open the player page:

```text
http://<host>:8819/
```

7. Open the admin page:

```text
http://<host>:8819/admin.html
```

## Critical First-Start Notes

### Default Database Placeholders Block Startup

Default values are:

- `database.host: 127.0.0.1`
- `database.schema: webshop`
- `database.username: webshop`
- `database.password: change_me`

If these placeholder values are not changed, the plugin refuses to start normally.

---

### Default Admin Bootstrap Account

`webshop.admin-bootstrap` is enabled by default, with initial credentials:

- Username: `admin`
- Password: `admin123456`

In production, change these immediately or disable bootstrap.

## Common Database Connection Issue

### RSA Public Key Is Not Available Client Side

Typical error:

```text
[12:29:17 ERROR]: [WebShopX] WebShopX failed to start
com.zaxxer.hikari.pool.HikariPool$PoolInitializationException: Failed to initialize pool: RSA public key is not available client side (option serverRsaPublicKeyFile not set)
...
```

Problem: RSA public key cannot be retrieved.

Cause: The database account uses `caching_sha2_password`, but the embedded driver cannot fetch the server RSA key during secure authentication.

Solution: switch the target user to `mysql_native_password`.

```sql
mysql -u root -p

-- 1. Ensure user_01 uses legacy auth plugin
ALTER USER 'user_01'@'localhost' IDENTIFIED WITH mysql_native_password BY 'admin123';

-- 2. Reload privilege tables
FLUSH PRIVILEGES;
```

## Runtime Mode Selection

### `internal` (default)

- The plugin serves both API and static pages.
- Suitable for quick launch and testing.

### `external`

- The plugin serves API only.
- Static files are exported to `plugins/WebShopX/web/`.
- Works with Nginx/CDN reverse proxy.

Recommended in `external` mode:

- Set `webshop.api-base-url`
- Use HTTPS via reverse proxy
- Apply reasonable caching and access control

## Production Security Checklist

- Change DB credentials and restrict DB access sources.
- Disable or reset default `admin-bootstrap` account.
- Serve HTTPS via Nginx / CDN.
- Open only required ports (default: 8819).
- Back up database and `plugins/WebShopX` data directory regularly.
- Monitor log directory (`webshop.logging.directory`).

## Reverse Proxy Suggestions (`external` mode)

- Point frontend static root to the exported `web` directory.
- Forward `/api/` to the plugin service address.
- Pass through `X-Forwarded-For` for accurate source IP auditing.

## Upgrade Recommendations

1. Back up the database before upgrading.
2. Stop server and replace the jar.
3. After startup, check `SchemaManager` migration logs.
4. Verify critical paths:
   - Login and session
   - Order and refund
   - Market buy/bid
   - Admin login and permissions

## Related Docs

- [Configuration Reference](./Configuration-Reference)
- [Commands and Permissions](./Commands-and-Permissions)
- [Troubleshooting](./Troubleshooting)

