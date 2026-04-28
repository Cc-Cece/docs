---
id: webshopx-admin-ops-troubleshooting
title: 运维排障手册
sidebar_label: 运维排障手册
sidebar_position: 7
---

# 运维排障手册

## 1. 插件无法启动

### 1.1 默认数据库占位未修改

现象：启动即被禁用。

处理：修改 `database.*` 为真实值。

### 1.2 数据库认证报 RSA/GSSAPI 问题

现象：日志提示公钥交换或 GSSAPI/SSPI。

处理方向：

- 启用 TLS
- 开启 `allow-public-key-retrieval`
- 配置 `server-rsa-public-key-file`
- 使用密码型 SQL 账户

## 2. API 正常但页面打不开

先查：

1. `server-mode` 是否为 `external`（该模式不托管页面）
2. `embedded-http.static-root` 导出目录是否被 Web 服务器正确托管
3. 反向代理路径与 MIME 是否正确

## 3. 某节点没有 Web/API

如果 `cluster.role=node`，不启动 Web/API 是正常行为。

## 4. 玩家反馈 GAME_COIN 异常

常见原因：Vault 未挂载或经济提供器不可用。

排查：

1. Vault 插件是否存在且启用
2. 是否能拿到 `Economy` provider
3. 余额读写是否失败并返回 `vault_error`

## 5. 市场经常出现 `listing_unavailable`

常见根因：

- 供货箱不可达（世界/坐标容器失效）
- 挂单被暂停
- 库存为 0 且补货失败

建议：

- 检查 SUPPLY 源容器状态
- 检查 `marketRuntime.supply` 配置
- 用补货刷新接口验证补货链路

## 6. 退款争议处理建议

1. 核对订单状态与 `refund_deadline`。
2. 核对 `refundUndeliveredEnabled` 当前值。
3. 核对是否已进入 `DELIVERED` 或券已 `CONSUMED`。
4. 必要时通过审计日志回放后台操作。

## 7. 后台权限异常

现象：管理员能登录但操作被拒绝 `forbidden`。

处理：

- 核对该管理员的 `permissions`
- 核对是否需要 super-admin 才能调用
- 检查账号是否被停用

## 8. 推荐日常巡检

1. 每日检查后台审计日志异常峰值。
2. 每日检查 `WAIT_CLAIM` 与 `mailbox` 堆积。
3. 每次大促前做一次配置快照与回滚预案。
