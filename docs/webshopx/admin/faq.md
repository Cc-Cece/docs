---
id: faq
title: 常见问题
sidebar_label: 常见问题
sidebar_position: 7
---

# 常见问题

## 1. 插件无法启动

### 1.1 默认数据库占位未修改

现象：启动即被禁用。

处理：修改 `database.*` 为真实值。

### 1.2 RSA 公钥无法获取

:::tip[提示]

该问题一般已在v1.1.3版本后修复

:::

现象：启动时出现如下报错

```
[12:29:17 ERROR]: [WebShopX] WebShopX failed to start
com.zaxxer.hikari.pool.HikariPool$PoolInitializationException: Failed to initialize pool: RSA public key is not available client side (option serverRsaPublicKeyFile not set)
...
```

原因：数据库开启了 `caching_sha2_password` 验证，但 WebShopX 内置驱动在建立安全连接时未能获取服务器公钥。

解决方案：将目标账号改为 `mysql_native_password`（临时，建议更新插件）

```sql
mysql -u root -p

-- 1. 确保 user_01 使用传统验证方式
ALTER USER 'user_01'@'localhost' IDENTIFIED WITH mysql_native_password BY 'admin123';

-- 2. 刷新权限
FLUSH PRIVILEGES;
```

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
