---
id: webshopx-dev-player-api
title: 玩家侧 API
sidebar_label: 玩家侧 API
sidebar_position: 4
---

# 玩家侧 API

## 1. 接口总表

| Method | Path | Auth | 说明 |
| --- | --- | --- | --- |
| GET | `/api/wallet` | user | 钱包余额 + 兑换信息 |
| GET | `/api/wallet/ledger` | user | 钱包流水（`limit`） |
| POST | `/api/wallet/exchange` | user | 币种兑换 |
| POST | `/api/redeem/use` | user | 使用兑换码 |
| GET | `/api/products` | optional | 商品列表 |
| POST | `/api/orders` | user | 下单 |
| GET | `/api/orders/list` | user | 订单列表 |
| POST | `/api/orders/refund` | user | 订单退款 |
| GET | `/api/orders/policy` | none | 订单/市场策略 |
| GET | `/api/notifications/list` | user | 通知列表 |
| GET | `/api/notifications/unread-count` | user | 未读数量 |
| POST | `/api/notifications/mark-read` | user | 标记已读 |
| GET | `/api/meta/currency` | none | 币种显示与兑换配置 |
| GET | `/api/meta/materials` | none | 材质枚举 |
| GET | `/api/meta/material-overrides` | none | 材质覆盖与视觉策略 |
| GET | `/api/meta/market-tags` | none | 市场标签元信息 |
| GET | `/api/leaderboard/config` | none | 排行榜配置 |
| GET | `/api/leaderboard/list` | optional | 排行榜数据 |

## 2. 钱包与兑换

### 2.1 `GET /api/wallet`

返回：`shopCoin`、`gameCoin`、`exchange`、`visualPermission` 等。

### 2.2 `POST /api/wallet/exchange`

请求字段：

- `fromCurrency`
- `toCurrency`
- `amount`
- `idempotencyKey`（建议）

常见错误：

- `invalid_exchange`
- `invalid_amount`
- `exchange_disabled`
- `invalid_ratio`
- `insufficient_funds`
- `vault_unavailable`

## 3. 商品与订单

### 3.1 `POST /api/orders`

请求字段：

- `productId`
- `quantity`
- `deliveryMode`（可选，`IMMEDIATE` / `CLAIM`）
- `idempotencyKey`（建议）

默认发货模式：

- `COMMAND`、`POTION_EFFECT` -> `CLAIM`
- `GIVE_ITEM`、`RECYCLE_ITEM`、`GROUP_BUY_VOUCHER` -> `IMMEDIATE`

### 3.2 `POST /api/orders/refund`

请求字段：

- `orderNo`

支持官方订单（`ODR-*`）与市场订单（`MKT-*`）路径。

## 4. 通知

### 4.1 `GET /api/notifications/list`

查询参数：

- `limit`
- `cursor`
- `unreadOnly`

### 4.2 `POST /api/notifications/mark-read`

两种模式：

- `{"all": true}`
- `{"id": <notificationId>}`

## 5. 排行榜

`GET /api/leaderboard/list` 支持参数：

- `metric`
- `order`
- `range`
- `limit`
- `showOnline`

如排行榜被关闭会返回 `feature_disabled`。
