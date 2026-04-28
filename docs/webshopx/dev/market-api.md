---
id: webshopx-dev-market-api
title: 市场 API
sidebar_label: 市场 API
sidebar_position: 5
---

# 市场 API

## 1. 接口总表

| Method | Path | Auth | 说明 |
| --- | --- | --- | --- |
| GET | `/api/market/listings` | none/user | 查询挂单列表 |
| POST | `/api/market/listings/create` | user | 创建挂单 |
| POST | `/api/market/buy` | user | 购买 SELL 挂单 |
| POST | `/api/market/sell-to-buy` | user | 向 BUY 挂单履约 |
| POST | `/api/market/bid` | user | 拍卖出价 |
| POST | `/api/market/unlist` | user | 下架 |
| POST | `/api/market/pause` | user | 暂停 |
| POST | `/api/market/resume` | user | 恢复 |
| POST | `/api/market/price` | user | 改价 |
| POST | `/api/market/remark` | user | 改备注 |
| POST | `/api/market/settings` | user | 综合更新（交易模式/动态/拍卖等） |
| POST | `/api/market/icon/upload` | user | 上传挂单图标 |
| POST | `/api/market/supply/refresh` | user | 补货刷新 |

## 2. 列表查询 `GET /api/market/listings`

关键查询参数：

- `mine`（`true` 时必须登录）
- `limit`
- `sort` / `order`
- `currency`
- `minPrice` / `maxPrice`
- `material`
- `keyword`
- `side`
- `tag`
- `tags` 或 `tags[]`（逗号分隔）

## 3. 创建挂单 `POST /api/market/listings/create`

请求字段：

- `side`（默认 `SELL`）
- `currency`（默认 `GAME_COIN`）
- `price`
- `quantity`（兼容 `amount`）
- `tag`
- `tradeMode`

当前源码限制：

- `BUY` 仅支持 `DIRECT`
- `SELL` 创建接口当前也仅支持 `DIRECT`
- 需要拍卖时，先创建再通过 `POST /api/market/settings` 切换

## 4. 交易接口

### 4.1 `POST /api/market/buy`

请求字段：

- `listingId`
- `buyQuantity`
- `deliveryMode`
- `idempotencyKey`

### 4.2 `POST /api/market/sell-to-buy`

请求字段：

- `listingId`
- `sellQuantity`（兼容 `fulfillQuantity` / `quantity`）
- `deliveryMode`
- `idempotencyKey`

## 5. 出价接口 `POST /api/market/bid`

请求字段：

- `listingId`
- `bidAmount`
- `idempotencyKey`

返回字段包含：

- `sealedBid`
- `minimumRequiredBid`
- `currentHighestBid`
- `auctionEndAt`

## 6. 综合设置 `POST /api/market/settings`

可更新：

- 基础：`price`、`currency`、`tag`、`remark`
- 展示：`displayNameOverride`、`displayMaterial`、`displayIconPath`
- 补货：`supplyBatchSize`、`supplyMaxStock`
- 交易模式：`tradeMode`
- 动态价：`dynamic*`
- 拍卖：`auction*`

注意事项：

- 自定义名称/图标受 `visualPermission` 约束
- BUY 挂单禁止改固定价格约束
- 切换拍卖参数时如存在挂起 bids，可能触发退款重置

## 7. 常见错误

- `invalid_listing`
- `listing_unavailable`
- `invalid_quantity`
- `insufficient_quantity`
- `invalid_trade_mode`
- `buy_order_not_active`
- `buy_requires_direct_mode`
- `buy_requires_manual_source`
- `buy_requires_fixed_price`
- `buy_escrow_insufficient`
- `auction_only_bid` / `auction_only_buy`
- `auction_closed`
- `bid_too_low`
- `limitation_*`
