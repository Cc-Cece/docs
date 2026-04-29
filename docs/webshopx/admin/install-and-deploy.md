---
id: install-deploy
title: 安装与部署
sidebar_label: 安装与部署
sidebar_position: 2
---

# 安装与部署

## 1. 环境要求

- Java：`21`
- 服务端：`Paper 1.20.6+`（兼容 Spigot）
- 数据库：MariaDB / MySQL
- 可选依赖：Vault（用于 `GAME_COIN` 对接）

## 2. 获取插件

- [modrinth](https://modrinth.com/plugin/webshopx)
- [minebbs](https://www.minebbs.com/resources/webshopx-minecraft.15688/updates)

## 3. 部署前准备

1. 已安装数据库。推荐MariaDB：https://mariadb.org/download/
2. 已下载 WebShopX 插件
3. 已准备数据库、数据库账户及密码（示例）：

```yaml
schema: db_01
username: user_01
password: admin123
```

## 4. 数据库初始化（首次部署）

### (1) 登录数据库

以管理员身份登录：

```text
mysql -u root -p
```

### (2) 创建数据库与用户

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

## 5. 首次部署流程

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

:::danger[默认数据库占位会阻止启动]

默认值为：

- `database.host: 127.0.0.1`
- `database.schema: webshop`
- `database.username: webshop`
- `database.password: change_me`

如果保持占位值，插件会拒绝正常启动。

:::

---

### (1) 默认管理员引导账号

`webshop.admin-bootstrap` 默认启用，初始账号：

- 用户名：`admin`
- 密码：`admin123456`

:::warning[提示]

生产环境务必立即修改或关闭该配置。

:::

### (2) 运行模式选择

#### `internal`（默认）

- 插件同时提供 API 与静态网页。
- 适合快速上线和测试。

#### `external`

- 插件只提供 API。
- 静态文件导出到 `plugins/WebShopX/web/`。
- 可配合 Nginx/CDN 反代。

建议在 `external` 下设置：

- `webshop.api-base-url`
- 反向代理 HTTPS
- 合理的缓存与访问控制

## 6. 生产环境安全清单

- 修改数据库账号密码，限制数据库访问来源。
- 关闭或重置 `admin-bootstrap` 默认管理员。
- 通过 Nginx / CDN 提供 HTTPS。
- 仅开放必要端口（默认 8819）。
- 定期备份数据库与 `plugins/WebShopX` 数据目录。
- 监控日志目录（`webshop.logging.directory`）。

## 7. 反向代理建议（external 模式）

- 将前端静态资源目录指向导出的 `web` 目录。
- 将 `/api/` 转发到插件服务地址。
- 透传 `X-Forwarded-For`，便于审计记录来源 IP。

## 8.升级建议

1. 升级前备份数据库。
2. 停服。
3. 移除`web`文件夹。(可选，用于强制更新前端页面)
4. 替换 jar。
5. 启动服务器。
6. 验证以下关键功能：
   - 登录与会话
   - 下单与退款
   - 市场购买/竞拍
   - 管理后台登录与权限
