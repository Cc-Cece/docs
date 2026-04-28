---
sidebar_position: 8
---

# API Reference

[Back to Home](./Home)

> Organized based on `EmbeddedWebServer` routes.

## 1. Base Conventions

- Protocol: HTTP (HTTPS is recommended through reverse proxy)
- Content type: `application/json; charset=utf-8`
- Auth header: `Authorization: Bearer <sessionToken>`
- CORS: `Access-Control-Allow-Origin: *`
- Allowed methods: `GET, POST, OPTIONS`

## 2. Unified Response Format

### Success

- Response object fields vary by business endpoint.

### Failure

```json
{
  "error": "error_code",
  "message": "human readable message"
}
```

Common status codes:

- `200`: success
- `400`: business/parameter error
- `404`: static asset or route not found
- `405`: method not allowed
- `500`: server-side exception

## 3. Authentication Notes

- Player login: `/api/auth/login`
- Admin login: `/api/admin/auth/login`
- Most protected endpoints require Bearer token.
- A few endpoints allow `sessionToken` in JSON body (not recommended).

## 4. Public and Player APIs

### 4.1 Health Check

- `GET /health`

### 4.2 Authentication

- `POST /api/auth/login`
  - body: `identifier`, `password`
- `GET /api/auth/me`
- `POST /api/auth/logout`

### 4.3 Wallet

- `GET /api/wallet`
- `GET /api/wallet/ledger?limit=20`
- `POST /api/wallet/exchange`
  - body: `fromCurrency`, `toCurrency`, `amount`, `idempotencyKey?`

### 4.4 Redeem Codes

- `POST /api/redeem/use`
  - body: `code`

### 4.5 Products and Orders

- `GET /api/products`
  - Anonymous access allowed; after login it includes personal purchase-limit info.
- `POST /api/orders`
  - body: `productId`, `quantity`, `deliveryMode?`, `idempotencyKey?`
- `GET /api/orders/list?limit=30&cursor=<id>`
- `POST /api/orders/refund`
  - body: `orderNo`
- `GET /api/orders/policy`

### 4.6 Meta Info

- `GET /api/meta/currency`
- `GET /api/meta/materials`

### 4.7 Market

- `GET /api/market/listings`
  - Common query params:
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
  - Core body fields:
    - `listingId`, `price`, `currency`, `remark?`
    - `supplyBatchSize?`, `supplyMaxStock?`
    - `tradeMode?`
    - Dynamic pricing fields: `dynamicPricingEnabled?`, `dynamicAlgorithm?`, `dynamicParamsJson?`, `dynamicBasePrice?`, `dynamicFloorPrice?`, `dynamicCapPrice?`, `dynamicPriceStep?`
    - Auction fields: `auctionAlgorithm?`, `auctionParamsJson?`, `auctionStartPrice?`, `auctionMinIncrement?`, `auctionEndAt?`
- `POST /api/market/supply/refresh`
  - body: `listingId`

## 5. Admin APIs

### 5.1 Admin Authentication

- `POST /api/admin/auth/login`
- `GET /api/admin/auth/me`
- `POST /api/admin/auth/logout`

### 5.2 Redeem Code Management (`REDEEM_MANAGE`)

- `POST /api/admin/redeem/create`
- `GET /api/admin/redeem/list`

### 5.3 Product Management (`PRODUCT_MANAGE`)

- `GET /api/admin/products/list`
- `POST /api/admin/products/upsert`
  - Creating zero-price product requires `PRODUCT_ZERO_PRICE`
- `POST /api/admin/products/active`
- `POST /api/admin/products/reset-limit`
- `POST /api/admin/group-buy/consume`

### 5.4 Order Management (`ORDER_VIEW`)

- `GET /api/admin/orders/list`

### 5.5 Economy Management (`ECONOMY_MANAGE`)

- `GET /api/admin/economy/settings`
- `POST /api/admin/economy/exchange`
- `POST /api/admin/economy/market`

### 5.6 Market Management (`MARKET_MANAGE`)

- `GET /api/admin/market/listings`
- `POST /api/admin/market/unlist`

### 5.7 User Support (`USER_SUPPORT`)

- `GET /api/admin/users/lookup`
- `GET /api/admin/users/list`
- `POST /api/admin/users/reset-password`
- `POST /api/admin/users/unbind`
- `POST /api/admin/users/logout`
- `POST /api/admin/users/wallet-adjust`

### 5.8 Audit (`AUDIT_VIEW`)

- `GET /api/admin/audit/list`

### 5.9 Admin User Management (Super Admin Only)

- `GET /api/admin/admin-users/meta`
- `GET /api/admin/admin-users/list`
- `POST /api/admin/admin-users/upsert`
- `POST /api/admin/admin-users/active`

## 6. Request Examples

### 6.1 Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "identifier": "Steve",
  "password": "your-password"
}
```

### 6.2 Create Order

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

### 6.3 Market Bid

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

## 7. Related Docs

- [Admin Guide](./Admin-Guide)
- [Market and Pricing](./Market-and-Pricing)
- [Database Schema](./Database-Schema)

