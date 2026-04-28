---
id: webshopx-admin-install-deploy
title: 安装与部署
sidebar_label: 安装与部署
sidebar_position: 2
---

# 安装与部署

## 1. 前置条件

- Java：`21`
- 服务端：Paper（源码编译目标 API 为 `1.20.6`）
- 数据库：MySQL/MariaDB
- 可选依赖：
  - Vault（用于 `GAME_COIN`）
  - Redis（集群广播）

## 2. 插件启动流程（源码顺序）

`onEnable()` 主要步骤：

1. 更新并加载 `config.yml`
2. 解析 `PluginSettings`
3. 初始化数据库连接池并校验/升级表结构
4. 执行 runtime_config 迁移与默认值注入
5. 初始化认证、钱包、订单、市场、通知等服务
6. 注入 bootstrap 管理员（如果启用）
7. 注册命令与监听器
8. 启动 delivery/maintenance/market 周期任务
9. 根据 `cluster.role` 与 `server-mode` 启动 Web/API

## 3. 首次部署最小清单

1. 把插件放入 `plugins` 目录并启动一次生成配置。
2. 修改 `database.*` 为真实连接。
3. 配置 `webshop.admin-bootstrap.*`（建议只用于首启）。
4. 重启并检查日志出现 `WebShopX enabled successfully`。

## 4. 默认数据库占位保护

若数据库配置仍是以下全默认占位组合，插件会停止启用：

- `host=127.0.0.1`
- `port=3306`
- `schema=webshop`
- `username=webshop`
- `password=change_me`

## 5. server-mode 与 cluster.role

### 5.1 `webshop.server-mode`

- `internal`：插件提供 API + 静态页面
- `external`：插件仅提供 API，静态页由外部托管

### 5.2 `cluster.role`

- `standalone`：启动 Web/API
- `master`：启动 Web/API
- `node`：不启动 Web/API

## 6. external 模式资源路径

`server-mode=external` 时，插件仍会导出静态资源到 `embedded-http.static-root` 对应目录，便于 Nginx/CDN 托管。

## 7. 数据库连接常见兼容项

- `database.use-ssl`
- `database.allow-public-key-retrieval`
- `database.server-rsa-public-key-file`

源码会在特定 RSA 公钥场景尝试兼容重连，并在日志给出明确修复建议。
