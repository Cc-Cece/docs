---
id: commands-permissions
title: Commands and Permission System
sidebar_label: Commands and Permission System
sidebar_position: 4
---

# Commands and Permission System

## 1. Main In-Game Commands

Main command: `/webshopx`, alias: `/ws`

### 1.1 Common Player Commands

```text
/ws help
/ws password <newPassword>
/ws market
/ws market gui
/ws market sell <price> [amount] [currency]
/ws market logs [count]
/ws claim [all|ODR-|MKT-|CLM-|MCL-]
/ws mailbox claim
```

### 1.2 Common Admin Commands

```text
/ws reload
/ws redeem create <shopCoin> <gameCoin> [maxUses] [perUserMaxUses] [minutes] [code]
/ws market recalc-tags [active|all]
```

## 2. Bukkit Permission Nodes

- `webshop.use` (default `true`)
- `webshop.admin` (default `op`)
- `webshop.market.auction` (default `op`)
- `webshop.market.limitation.bypass` (default `op`)

## 3. Fine-Grained Admin Permissions (`AdminPermission`)

- `REDEEM_MANAGE`
- `PRODUCT_MANAGE`
- `PRODUCT_ZERO_PRICE`
- `ORDER_VIEW`
- `ECONOMY_MANAGE`
- `MARKET_MANAGE`
- `USER_SUPPORT`
- `AUDIT_VIEW`

## 4. Built-In Role Templates (`AdminRole`)

- `SUPER_ADMIN`: full permissions
- `SHOP_ADMIN`: products/redeem codes/orders/economy settings
- `MARKET_MODERATOR`: market governance
- `SUPPORT_ADMIN`: user support + order view
- `AUDITOR`: read-only auditing

## 5. Super Admin Exclusive Capabilities

Only super admin can access:

- Admin permission-group metadata
- Admin list
- Create/update admin permissions
- Enable/disable admin accounts

## 6. Permission Assignment Recommendations

1. Isolate `PRODUCT_ZERO_PRICE` and grant it to very few operators.
2. Separate `USER_SUPPORT` from `ECONOMY_MANAGE` when possible.
3. Grant `AUDIT_VIEW` to audit roles without write permissions.
4. Keep at least 1 active super admin to avoid locking out the admin panel.

