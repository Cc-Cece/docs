---
sidebar_position: 8
---
# API 参考

[返回首页](./Home)

> 基于 `EmbeddedWebServer` 路由整理。

## 1. 基础约定

- 协议：HTTP（建议通过反向代理提供 HTTPS）
- 内容类型：`application/json; charset=utf-8`
- 鉴权头：`Authorization: Bearer <sessionToken>`
- CORS：`Access-Control-Allow-Origin: *`
- 允许方法：`GET, POST, OPTIONS`

## 2. 统一响应格式

### 成功

- 各接口返回对象结构由业务字段决定。

### 失败

```json
{
  "error": "error_code",
  "message": "human readable message"
}
```

常见状态码：

- `200`：成功
- `400`：业务/参数错误
- `404`：静态资源或路由不存在
- `405`：方法不允许
- `500`：服务端异常

## 3. 鉴权说明

- 普通登录：`/api/auth/login`
- 后台登录：`/api/admin/auth/login`
- 绝大多数受保护接口要求 Bearer token。
- 少数接口允许将 `sessionToken` 放在 JSON body（不推荐）。

## 4. 公共与玩家 API

## 4.1 健康检查

- `GET /health`

## 4.2 认证

- `POST /api/auth/login`
  - body: `identifier`, `password`
- `GET /api/auth/me`
- `POST /api/auth/logout`

## 4.3 钱包

- `GET /api/wallet`
- `GET /api/wallet/ledger?limit=20`
- `POST /api/wallet/exchange`
  - body: `fromCurrency`, `toCurrency`, `amount`, `idempotencyKey?`

## 4.4 兑换码

- `POST /api/redeem/use`
  - body: `code`

## 4.5 商品与订单

- `GET /api/products`
  - 可匿名；登录后会附带个人限购信息
- `POST /api/orders`
  - body: `productId`, `quantity`, `deliveryMode?`, `idempotencyKey?`
- `GET /api/orders/list?limit=30&cursor=<id>`
- `POST /api/orders/refund`
  - body: `orderNo`
- `GET /api/orders/policy`

## 4.6 元信息

- `GET /api/meta/currency`
- `GET /api/meta/materials`

## 4.7 市场

- `GET /api/market/listings`
  - query 常用：
    - `mine=true`
    - `limit`
    - `sort`, `order`
    - `currency`
    - `minPrice`, `maxPrice`
    - `material`, `keyword`
- `POST /api/market/buy`
  - body: `listingId`, `buyQuantity`, `deliveryMode?`, `idempotencyKey?`
- `POST /api/market/bid`
  - body: `listingId`, `bidAmount`, `idempotencyKey?`
- `POST /api/market/unlist`
  - body: `listingId`
- `POST /api/market/pause`
  - body: `listingId`
- `POST /api/market/resume`
  - body: `listingId`
- `POST /api/market/price`
  - body: `listingId`, `price`
- `POST /api/market/remark`
  - body: `listingId`, `remark?`
- `POST /api/market/settings`
  - 核心 body 字段：
    - `listingId`, `price`, `currency`, `remark?`
    - `supplyBatchSize?`, `supplyMaxStock?`
    - `tradeMode?`
    - 动态定价字段：`dynamicPricingEnabled?`, `dynamicAlgorithm?`, `dynamicParamsJson?`, `dynamicBasePrice?`, `dynamicFloorPrice?`, `dynamicCapPrice?`, `dynamicPriceStep?`
    - 拍卖字段：`auctionAlgorithm?`, `auctionParamsJson?`, `auctionStartPrice?`, `auctionMinIncrement?`, `auctionEndAt?`
- `POST /api/market/supply/refresh`
  - body: `listingId`

## 5. 后台 API

## 5.1 后台认证

- `POST /api/admin/auth/login`
- `GET /api/admin/auth/me`
- `POST /api/admin/auth/logout`

## 5.2 兑换码管理（`REDEEM_MANAGE`）

- `POST /api/admin/redeem/create`
- `GET /api/admin/redeem/list`

## 5.3 商品管理（`PRODUCT_MANAGE`）

- `GET /api/admin/products/list`
- `POST /api/admin/products/upsert`
  - 设置零价商品需要 `PRODUCT_ZERO_PRICE`
- `POST /api/admin/products/active`
- `POST /api/admin/products/reset-limit`
- `POST /api/admin/group-buy/consume`

## 5.4 订单管理（`ORDER_VIEW`）

- `GET /api/admin/orders/list`

## 5.5 经济管理（`ECONOMY_MANAGE`）

- `GET /api/admin/economy/settings`
- `POST /api/admin/economy/exchange`
- `POST /api/admin/economy/market`

## 5.6 市场管理（`MARKET_MANAGE`）

- `GET /api/admin/market/listings`
- `POST /api/admin/market/unlist`

## 5.7 用户支持（`USER_SUPPORT`）

- `GET /api/admin/users/lookup`
- `GET /api/admin/users/list`
- `POST /api/admin/users/reset-password`
- `POST /api/admin/users/unbind`
- `POST /api/admin/users/logout`
- `POST /api/admin/users/wallet-adjust`

## 5.8 审计（`AUDIT_VIEW`）

- `GET /api/admin/audit/list`

## 5.9 管理员管理（仅超级管理员）

- `GET /api/admin/admin-users/meta`
- `GET /api/admin/admin-users/list`
- `POST /api/admin/admin-users/upsert`
- `POST /api/admin/admin-users/active`

## 6. 请求示例

### 6.1 登录

```http
POST /api/auth/login
Content-Type: application/json

{
  "identifier": "Steve",
  "password": "your-password"
}
```

### 6.2 下单

```http
POST /api/orders
Authorization: Bearer <sessionToken>
Content-Type: application/json

{
  "productId": 12,
  "quantity": 1,
  "idempotencyKey": "web-ord-20260418-001"
}
```

### 6.3 市场竞拍

```http
POST /api/market/bid
Authorization: Bearer <sessionToken>
Content-Type: application/json

{
  "listingId": 56,
  "bidAmount": 2000,
  "idempotencyKey": "web-bid-20260418-001"
}
```

## 7. 相关文档

- [后台管理指南](./Admin-Guide)
- [市场与定价系统](./Market-and-Pricing)
- [数据库结构](./Database-Schema)
