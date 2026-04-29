---
id: install-deploy
title: Install and Deploy
sidebar_label: Install and Deploy
sidebar_position: 2
---

# Install and Deploy

## 1. Requirements

- Java: `21`
- Server: `Paper 1.20.6+` (compatible with Spigot)
- Database: MariaDB / MySQL
- Optional dependency: Vault (for `GAME_COIN` integration)

## 2. Get the Plugin

- [modrinth](https://modrinth.com/plugin/webshopx)
- [minebbs](https://www.minebbs.com/resources/webshopx-minecraft.15688/updates)

## 3. Pre-Deployment Checklist

1. Database is installed. MariaDB recommended: https://mariadb.org/download/
2. WebShopX plugin is downloaded.
3. Database name, username, and password are prepared (example):

```yaml
schema: db_01
username: user_01
password: admin123
```

## 4. Database Initialization (First Deployment)

### (1) Log In to the Database

Log in as an administrator:

```text
mysql -u root -p
```

### (2) Create Database and User

```sql
-- 1. Create database
CREATE DATABASE db_01 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 2. Create user (local access)
CREATE USER 'user_01'@'localhost' IDENTIFIED BY 'admin123';

-- 3. Grant all privileges on db_01
GRANT ALL PRIVILEGES ON db_01.* TO 'user_01'@'localhost';

-- 4. Flush privileges
FLUSH PRIVILEGES;
```

> **Note**: If your plugin runs in Docker or on another host, change `'localhost'` to `'%'`.

## 5. First-Time Deployment Flow

1. Put the plugin JAR into the server `plugins/` directory.
2. Start the server once to generate default configs.
3. Edit `plugins/WebShopX/config.yml`, at least `database.*`.
4. Restart the server.
5. In game, run:

```text
/ws password <newPassword>
```

6. Open the player page:

```text
http://<host>:8819/
```

7. Open the admin page:

```text
http://<host>:8819/admin.html
```

:::danger[Default Database Placeholders Block Startup]

Default values:

- `database.host: 127.0.0.1`
- `database.schema: webshop`
- `database.username: webshop`
- `database.password: change_me`

If these placeholders remain unchanged, the plugin will refuse normal startup.

:::

---

### (1) Default Admin Bootstrap Account

`webshop.admin-bootstrap` is enabled by default. Initial account:

- Username: `admin`
- Password: `admin123456`

:::warning[Reminder]
In production, change this immediately or disable this setting.
:::

### (2) Runtime Mode Selection

#### `internal` (default)

- Plugin serves both API and static web pages.
- Best for quick launch and testing.

#### `external`

- Plugin serves API only.
- Static files are exported to `plugins/WebShopX/web/`.
- Can be used with Nginx/CDN reverse proxy.

Recommended settings in `external` mode:

- `webshop.api-base-url`
- HTTPS reverse proxy
- Reasonable caching and access control

## 6. Production Security Checklist

- Change database credentials and restrict DB access sources.
- Disable or reset the default `admin-bootstrap` admin account.
- Provide HTTPS via Nginx / CDN.
- Expose only required ports (default 8819).
- Regularly back up database and `plugins/WebShopX` data directory.
- Monitor the log directory (`webshop.logging.directory`).

## 7. Reverse Proxy Recommendations (`external` mode)

- Point frontend static root to the exported `web` directory.
- Forward `/api/` to the plugin service address.
- Pass through `X-Forwarded-For` for source IP auditing.

## 8. Upgrade Recommendations

1. Back up the database before upgrading.
2. Stop the server.
3. Remove the `web` folder (optional, to force-refresh frontend pages).
4. Replace the JAR.
5. Start the server.
6. Verify these key features:
   - Login and session
   - Order placement and refund
   - Market buy/bid flow
   - Admin panel login and permissions

