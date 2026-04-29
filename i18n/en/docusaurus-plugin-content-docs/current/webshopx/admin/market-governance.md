---
id: governance
title: Market Governance and Risk Control
sidebar_label: Market Governance and Risk Control
sidebar_position: 5
---

# Market Governance and Risk Control

## 1. Market Structure Essentials

- `side`: `SELL` / `BUY`
- `tradeMode`: `DIRECT` / `AUCTION`
- `sourceMode`: `MANUAL` / `SUPPLY`

Hard constraints:

- `BUY` allows only `DIRECT`
- `BUY` must be `MANUAL`
- `BUY` price is fixed after creation (not dynamic)

## 2. Tag Governance (`Market Tags`)

### 2.1 Automatic Tag Matching

- Evaluated in ascending `priority`
- Can match by material and NBT keywords
- If not matched, fallback to `defaultTag`, then final fallback `default`

### 2.2 Recalculate Tags

`/ws market recalc-tags [active|all]`

- `active`: active/paused listings only
- `all`: full historical listings

## 3. Limitation Rule Governance (`Market Limitation`)

Rules can restrict create/edit from these dimensions:

- `side`
- `tradeMode`
- `currency`
- `tag`
- `item material`
- `item nbt` keywords
- `player lacksPermission`

Supported controls:

- deny fast-reject
- whitelist intersection narrowing
- `forcedTag`
- `createCost` (listing cost)

## 4. Dynamic Pricing and Auction Governance

### 4.1 Dynamic Pricing

- Recommended only for liquid `DIRECT` goods
- `dynamicDemandScore` decays each market cycle
- Configure floor/cap properly to avoid extreme prices

### 4.2 Auctions

- Minimum duration: 30 seconds
- English auction supports anti-sniping (default window/extend are both 30s)
- Dutch supports buyout only; Vickrey is sealed bidding; Candle has random extension

## 5. SUPPLY Mode Governance

- Auto-restock is constrained by `batch`, `maxStock`, and chest availability
- If the chest is unavailable, listing is paused and seller is notified
- Can trigger manual refresh via `/api/market/supply/refresh`

## 6. Bypass Permission

Online players with `webshop.market.limitation.bypass` can bypass limitation rules.

Recommend granting this only to a very small set of operator/admin accounts.

## 7. Regulatory Interfaces

Available in admin backend:

- `GET /api/admin/market/listings`
- `POST /api/admin/market/unlist`

Used for inspections and force-unlisting.

