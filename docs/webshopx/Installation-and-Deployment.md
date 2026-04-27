---
sidebar_position: 3
---
# 安装与部署

[返回首页](./Home)

## 环境要求

- Java：`21`
- 服务端：`Paper 1.20.6+`（兼容 Spigot）
- 数据库：MariaDB / MySQL
- 可选依赖：Vault（用于 `GAME_COIN` 对接）

## 获取插件

- [modrinth](https://modrinth.com/plugin/webshopx)
- [minebbs](https://www.minebbs.com/resources/webshopx-minecraft.15688/updates)

## 部署前准备

1. 已安装数据库。推荐MariaDB：https://mariadb.org/download/
2. 已下载 WebShopX 插件
3. 已准备数据库、数据库账户及密码（示例）：

```yaml
schema: db_01
username: user_01
password: admin123
```

## 数据库初始化（首次部署前）

### 1. 登录数据库

以管理员身份登录：

```text
mysql -u root -p
```

### 2. 创建数据库与用户

```sql
-- 1. 创建数据库
CREATE DATABASE db_01 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 2. 创建用户（允许本地访问）
CREATE USER 'user_01'@'localhost' IDENTIFIED BY 'admin123';

-- 3. 授予该用户对 db_01 的所有权限
GRANT ALL PRIVILEGES ON db_01.* TO 'user_01'@'localhost';

-- 4. 刷新权限使配置生效
FLUSH PRIVILEGES;
```

> **注意**：如果你的插件运行在 Docker 容器或另一台服务器上，请将 `'localhost'` 改为 `'%'`。

## 首次部署流程

1. 将插件 jar 放入服务器 `plugins/` 目录。
2. 启动服务器一次，生成默认配置。
3. 编辑 `plugins/WebShopX/config.yml`，至少修改 `database.*`。
4. 重启服务器。
5. 玩家在游戏内执行：

```text
/ws password <新密码>
```

6. 打开玩家端页面：

```text
http://<host>:8819/
```

7. 打开后台页面：

```text
http://<host>:8819/admin.html
```

## 关键首启注意事项

### 默认数据库占位会阻止启动

默认值为：

- `database.host: 127.0.0.1`
- `database.schema: webshop`
- `database.username: webshop`
- `database.password: change_me`

如果保持占位值，插件会拒绝正常启动。

---

### 默认管理员引导账号

`webshop.admin-bootstrap` 默认启用，初始账号：

- 用户名：`admin`
- 密码：`admin123456`

生产环境务必立即修改或关闭该配置。

## 常见数据库连接问题

### RSA 公钥无法获取

常见报错示例：

```text
[12:29:17 ERROR]: [WebShopX] WebShopX failed to start
com.zaxxer.hikari.pool.HikariPool$PoolInitializationException: Failed to initialize pool: RSA public key is not available client side (option serverRsaPublicKeyFile not set)
...
```

问题描述：RSA 公钥无法获取。

原因：数据库开启了 `caching_sha2_password` 验证，但 WebShopX 内置驱动在建立安全连接时未能获取服务器公钥。

解决方案：将目标账号改为 `mysql_native_password`。

```sql
mysql -u root -p

-- 1. 确保 user_01 使用传统验证方式
ALTER USER 'user_01'@'localhost' IDENTIFIED WITH mysql_native_password BY 'admin123';

-- 2. 刷新权限
FLUSH PRIVILEGES;
```

## 运行模式选择

### `internal`（默认）

- 插件同时提供 API 与静态网页。
- 适合快速上线和测试。

### `external`

- 插件只提供 API。
- 静态文件导出到 `plugins/WebShopX/web/`。
- 可配合 Nginx/CDN 反代。

建议在 `external` 下设置：

- `webshop.api-base-url`
- 反向代理 HTTPS
- 合理的缓存与访问控制

## 生产环境安全清单

- 修改数据库账号密码，限制数据库访问来源。
- 关闭或重置 `admin-bootstrap` 默认管理员。
- 通过 Nginx / CDN 提供 HTTPS。
- 仅开放必要端口（默认 8819）。
- 定期备份数据库与 `plugins/WebShopX` 数据目录。
- 监控日志目录（`webshop.logging.directory`）。

## 反向代理建议（external 模式）

- 将前端静态资源目录指向导出的 `web` 目录。
- 将 `/api/` 转发到插件服务地址。
- 透传 `X-Forwarded-For`，便于审计记录来源 IP。

## 升级建议

1. 升级前备份数据库。
2. 停服替换 jar。
3. 启服后观察 `SchemaManager` 自动迁移日志。
4. 验证以下关键功能：
   - 登录与会话
   - 下单与退款
   - 市场购买/竞拍
   - 管理后台登录与权限

## 相关文档

- [配置参考](./Configuration-Reference)
- [命令与权限](./Commands-and-Permissions)
- [故障排查](./Troubleshooting)
