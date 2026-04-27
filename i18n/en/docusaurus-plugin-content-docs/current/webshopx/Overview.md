# WebShopX Overview

[Back to Home](./Home)

## Project Positioning

WebShopX is a web shop plugin for Paper / Spigot servers. Its goal is to unify the following capabilities in one system:

- Official shop (B2C)
- Player market (C2C)
- Auction house (AUCTION)
- Admin console

You do not need to maintain a separate frontend project. The plugin ships with built-in player and admin web pages.

## Core Capabilities

### Official Shop

- Supported product types:
  - `COMMAND`
  - `GIVE_ITEM`
  - `POTION_EFFECT`
  - `RECYCLE_ITEM`
  - `GROUP_BUY_VOUCHER`
- Supports listing windows, stock limits, and per-user purchase limits.
- Supports dynamic pricing algorithms (for `GIVE_ITEM` / `RECYCLE_ITEM`).

### Player Market

- Players can create standard listings and supply-chest listings.
- Supports direct trades (`DIRECT`) and auction trades (`AUCTION`).
- Supports dynamic pricing, bidding, auto restock, and auto settlement.
- Supports configurable market fees and taxes.

### Wallet and Economy

- Dual-currency model: `SHOP_COIN` and `GAME_COIN`.
- Supports two-way exchange with configurable rates.
- Optional Vault integration to map `GAME_COIN` to an existing economy plugin.

### Delivery and Claim

- Supports command delivery, item delivery, and potion-effect delivery.
- If auto delivery fails, the order enters `WAIT_CLAIM`; players can claim manually with `/ws claim`.
- Shareable claim codes are supported (whether others can claim is configurable).

### Admin Console

- Admin login and permission groups.
- Product, order, redeem-code, market, and user management.
- Admin action audit logs.
- Super admins can manage permissions/templates for other admins.

## Runtime Modes

`webshop.server-mode` provides two modes:

- `internal`
  - The plugin serves both API and static pages.
  - Suitable for quick deployment and testing.
- `external`
  - The plugin serves API only; static pages are exported and hosted by Nginx/CDN.
  - Suitable for production.

## State Model (High-Frequency Concepts)

### Official Order States

- `PENDING`
- `WAIT_CLAIM`
- `DELIVERED`
- `REFUNDED`
- `RECYCLED`

### Market Trade States

- `PENDING`
- `WAIT_CLAIM`
- `DELIVERED`
- `REFUNDED`

### Market Listing States

- `ACTIVE`
- `PAUSED`
- `SOLD`
- `UNLISTED`

## Continue Reading

- [Installation and Deployment](./Installation-and-Deployment)
- [Configuration Reference](./Configuration-Reference)
- [Commands and Permissions](./Commands-and-Permissions)
- [Player Guide](./Player-Guide)
- [Market and Pricing](./Market-and-Pricing)
- [Admin Guide](./Admin-Guide)
- [API Reference](./API-Reference)
- [Database Schema](./Database-Schema)
- [Troubleshooting](./Troubleshooting)
