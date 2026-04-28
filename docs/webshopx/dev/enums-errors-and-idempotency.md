---
id: webshopx-dev-enums-errors-idempotency
title: 枚举、错误码与幂等
sidebar_label: 枚举、错误码与幂等
sidebar_position: 7
---

# 枚举、错误码与幂等

## 1. 常用枚举

### 1.1 币种

- `SHOP_COIN`
- `GAME_COIN`

### 1.2 市场侧

- `MarketSide`：`SELL` / `BUY`
- `TradeMode`：`DIRECT` / `AUCTION`
- `SupplyMode`：`MANUAL` / `SUPPLY`
- `AuctionAlgorithm`：
  - `ENGLISH_AUCTION_V1`
  - `DUTCH_AUCTION_V1`
  - `VICKREY_AUCTION_V1`
  - `CANDLE_AUCTION_V1`
- `DynamicAlgorithm`：
  - `LINEAR_DEMAND_V1`
  - `DIMINISHING_RETURN_V1`
  - `LOG_SMOOTH_V1`
  - `EXPONENTIAL_DEFENSE_V1`
  - `THRESHOLD_STEP_V1`
  - `ELASTICITY_V1`
  - `PANIC_BUYING_V1`

### 1.3 商品类型

- `COMMAND`
- `GIVE_ITEM`
- `POTION_EFFECT`
- `RECYCLE_ITEM`
- `GROUP_BUY_VOUCHER`

## 2. 典型错误码分组

### 2.1 认证类

- `auth_required`
- `auth_invalid`
- `invalid_credentials`
- `not_admin`

### 2.2 参数类

- `bad_request`
- `method_not_allowed`
- `invalid_quantity`
- `invalid_delivery_mode`

### 2.3 钱包/兑换类

- `invalid_exchange`
- `exchange_disabled`
- `invalid_ratio`
- `insufficient_funds`
- `vault_unavailable`
- `vault_error`

### 2.4 市场类

- `listing_missing`
- `listing_unavailable`
- `buy_requires_direct_mode`
- `buy_requires_manual_source`
- `buy_requires_fixed_price`
- `buy_order_not_active`
- `auction_only_bid`
- `auction_only_buy`
- `auction_closed`
- `bid_too_low`
- `limitation_item_forbidden`
- `limitation_side_not_allowed`
- `limitation_trade_mode_not_allowed`
- `limitation_currency_not_allowed`

### 2.5 领取/退款类

- `claim_token_invalid`
- `claim_forbidden`
- `refund_not_allowed`
- `refund_disabled`
- `refund_expired`
- `already_refunded`

## 3. 幂等实践

## 3.1 建议带幂等键的接口

- `POST /api/wallet/exchange`
- `POST /api/orders`
- `POST /api/market/buy`
- `POST /api/market/sell-to-buy`
- `POST /api/market/bid`

## 3.2 服务端行为

- 未传 `idempotencyKey`：服务端生成随机值
- 幂等命中：返回既有结果（常见 `state=EXISTING`）
- 键冲突：部分路径会返回 `idempotency_conflict`

## 3.3 客户端建议

1. 用户每次提交生成稳定幂等键。
2. 超时重试时复用同一键。
3. 幂等键长度控制在 96 字符以内。
