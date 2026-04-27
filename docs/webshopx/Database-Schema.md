---
sidebar_position: 9
---
# 数据库结构

[返回首页](./Home)

> 引擎：InnoDB，字符集：`utf8mb4`。

## 1. 架构总览

WebShopX 启动时由 `SchemaManager` 自动建表和迁移。核心分区：

- 账号与鉴权
- 钱包与流水
- 商品与订单
- 市场与竞拍
- 后台管理与审计
- 系统元信息

## 2. 表清单（按领域）

## 2.1 账号与鉴权

- `web_users`
  - Web 账号主表
  - 关键字段：`username`、`password_hash`、`auth_state`、`bound_uuid`
- `web_sessions`
  - 会话表
  - 关键字段：`token`、`user_id`、`expires_at`
- `bind_requests`
  - 绑定请求与绑定码记录

## 2.2 后台与审计

- `web_admins`
  - 管理员权限表
  - 关键字段：`is_super_admin`、`permissions_json`、`template_key`
- `admin_audit_logs`
  - 后台操作审计日志

## 2.3 钱包与兑换

- `wallets`
  - 钱包余额（`shop_coin`、`game_coin`）
- `wallet_ledger`
  - 钱包流水
  - 唯一键：`(wallet_id, biz_type, biz_id)`，用于幂等
- `redeem_codes`
  - 兑换码定义
- `redeem_usage`
  - 用户兑换码使用计数

## 2.4 商品与官方订单

- `products`
  - 官方商品
  - 含动态定价字段、上下架时间、库存、限购等
- `product_user_usage`
  - 用户维度限购计数
- `orders`
  - 官方订单主表
  - 关键字段：`order_no`、`status`、`claim_token`、`refund_deadline`
- `order_items`
  - 订单商品快照（按商品）
- `delivery_queue`
  - 官方订单发货队列

## 2.5 玩家市场

- `market_listings`
  - 市场上架
  - 含来源模式、交易模式、动态价格、拍卖参数、供货参数
- `market_bids`
  - 竞拍出价记录（含冻结/退回状态）
- `market_trades`
  - 市场成交记录（含手续费、税、退款字段）
- `market_item_deliveries`
  - 市场物品发货队列

## 2.6 团购券与元数据

- `group_buy_vouchers`
  - 团购券状态与核销记录
- `webshop_meta`
  - 迁移标记等元数据（如时区迁移标记）

## 3. 关键关系

- `web_users` 1:n `web_sessions`
- `web_users` 1:1 `wallets`
- `orders` 1:n `delivery_queue`
- `orders` 1:n `order_items`
- `market_listings` 1:n `market_bids`
- `market_listings` 1:n `market_trades`
- `market_trades` 1:n `market_item_deliveries`（按成交发货）

## 4. 幂等与唯一键设计

- `orders`：`UNIQUE (user_id, idempotency_key)`
- `market_trades`：`UNIQUE (buyer_user_id, idempotency_key)`
- `market_bids`：`UNIQUE (bidder_user_id, idempotency_key)`
- `wallet_ledger`：`UNIQUE (wallet_id, biz_type, biz_id)`

这些约束保证客户端重试不会重复扣款或重复入账。

## 5. Token 相关字段

- `orders.claim_token`
  - 官方订单手动领取码（`CLM-...`）
- `market_trades.claim_token`
  - 市场成交手动领取码（`MCL-...`）

## 6. 常见状态字段

### 6.1 订单

- `PENDING`
- `WAIT_CLAIM`
- `DELIVERED`
- `REFUNDED`
- `RECYCLED`

### 6.2 市场上架

- `ACTIVE`
- `PAUSED`
- `SOLD`
- `UNLISTED`

### 6.3 市场成交

- `PENDING`
- `WAIT_CLAIM`
- `DELIVERED`
- `REFUNDED`

### 6.4 发货队列

- `PENDING`
- `WAIT_CLAIM`
- `DELIVERED`
- `CANCELLED`

## 7. 迁移策略说明

- 启动时自动 `CREATE TABLE IF NOT EXISTS`。
- 对历史实例会自动补齐新列与索引。
- 包含数据修正逻辑（例如旧状态修正、默认值回填）。
- 商品上下架时间含时区迁移标记（`webshop_meta`）。

## 8. 运维建议

- 定期备份：建议按“全量 + binlog”策略。
- 对大服建议关注以下表增长：
  - `wallet_ledger`
  - `admin_audit_logs`
  - `market_bids`
  - `market_trades`
- 按需归档历史数据，避免长期膨胀。

## 9. 相关文档

- [API 参考](./API-Reference)
- [后台管理指南](./Admin-Guide)
- [故障排查](./Troubleshooting)
