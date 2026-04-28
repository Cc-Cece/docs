---
sidebar_position: 9
---

# Database Schema

[Back to Home](./Home)

> Engine: InnoDB, charset: `utf8mb4`.

## 1. Schema Overview

On startup, WebShopX auto-creates and migrates tables through `SchemaManager`. Core domains:

- Accounts and authentication
- Wallets and ledger
- Products and orders
- Market and auctions
- Admin management and audit
- System metadata

## 2. Table List (By Domain)

### 2.1 Accounts and Authentication

- `web_users`
  - Main web account table
  - Key fields: `username`, `password_hash`, `auth_state`, `bound_uuid`
- `web_sessions`
  - Session table
  - Key fields: `token`, `user_id`, `expires_at`
- `bind_requests`
  - Bind requests and bind-code records

### 2.2 Admin and Audit

- `web_admins`
  - Admin permission table
  - Key fields: `is_super_admin`, `permissions_json`, `template_key`
- `admin_audit_logs`
  - Admin action audit logs

### 2.3 Wallet and Exchange

- `wallets`
  - Wallet balances (`shop_coin`, `game_coin`)
- `wallet_ledger`
  - Wallet ledger records
  - Unique key: `(wallet_id, biz_type, biz_id)` for idempotency
- `redeem_codes`
  - Redeem code definitions
- `redeem_usage`
  - Per-user redeem usage counters

### 2.4 Products and Official Orders

- `products`
  - Official products
  - Includes dynamic pricing fields, schedule windows, stock, purchase limits, etc.
- `product_user_usage`
  - Per-user purchase-limit counters
- `orders`
  - Official order table
  - Key fields: `order_no`, `status`, `claim_token`, `refund_deadline`
- `order_items`
  - Product snapshots within an order
- `delivery_queue`
  - Official order delivery queue

### 2.5 Player Market

- `market_listings`
  - Market listings
  - Includes source mode, trade mode, dynamic pricing, auction params, supply params
- `market_bids`
  - Bid records (including freeze/refund states)
- `market_trades`
  - Market trade records (including fee, tax, refund fields)
- `market_item_deliveries`
  - Market item delivery queue

### 2.6 Group-Buy Voucher and Metadata

- `group_buy_vouchers`
  - Group-buy voucher status and redemption records
- `webshop_meta`
  - Metadata such as migration flags (for example timezone migration flags)

## 3. Key Relationships

- `web_users` 1:n `web_sessions`
- `web_users` 1:1 `wallets`
- `orders` 1:n `delivery_queue`
- `orders` 1:n `order_items`
- `market_listings` 1:n `market_bids`
- `market_listings` 1:n `market_trades`
- `market_trades` 1:n `market_item_deliveries` (delivery per trade)

## 4. Idempotency and Unique Key Design

- `orders`: `UNIQUE (user_id, idempotency_key)`
- `market_trades`: `UNIQUE (buyer_user_id, idempotency_key)`
- `market_bids`: `UNIQUE (bidder_user_id, idempotency_key)`
- `wallet_ledger`: `UNIQUE (wallet_id, biz_type, biz_id)`

These constraints ensure retried client requests do not duplicate deduction or credit.

## 5. Token-Related Fields

- `orders.claim_token`
  - Official order manual claim code (`CLM-...`)
- `market_trades.claim_token`
  - Market trade manual claim code (`MCL-...`)

## 6. Common Status Fields

### 6.1 Orders

- `PENDING`
- `WAIT_CLAIM`
- `DELIVERED`
- `REFUNDED`
- `RECYCLED`

### 6.2 Market Listings

- `ACTIVE`
- `PAUSED`
- `SOLD`
- `UNLISTED`

### 6.3 Market Trades

- `PENDING`
- `WAIT_CLAIM`
- `DELIVERED`
- `REFUNDED`

### 6.4 Delivery Queues

- `PENDING`
- `WAIT_CLAIM`
- `DELIVERED`
- `CANCELLED`

## 7. Migration Strategy

- Automatically runs `CREATE TABLE IF NOT EXISTS` on startup.
- Automatically fills new columns and indexes for legacy instances.
- Includes data-fix logic (for example status correction and default backfill).
- Product schedule timezone migration is tracked by `webshop_meta`.

## 8. Operations Suggestions

- Use regular backups: full backup + binlog strategy is recommended.
- On large servers, monitor growth of:
  - `wallet_ledger`
  - `admin_audit_logs`
  - `market_bids`
  - `market_trades`
- Archive historical data as needed to avoid long-term growth.

## 9. Related Docs

- [API Reference](./API-Reference)
- [Admin Guide](./Admin-Guide)
- [Troubleshooting](./Troubleshooting)

