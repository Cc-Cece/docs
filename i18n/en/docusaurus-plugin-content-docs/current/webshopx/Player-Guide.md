---
sidebar_position: 5
---

# Player Guide

[Back to Home](./Home)

## 1. First-Time Setup

### 1.1 Bind and Set Password

Run in game:

```text
/ws password <new-password>
```

After success, you can sign in on web using your Minecraft username and this password.

### 1.2 Sign In on Web

- Player page: `/` (for example `http://host:8819/`)
- Enter username and password.

## 2. Wallet and Exchange

### 2.1 Currency Types

- `SHOP_COIN` (display name may vary)
- `GAME_COIN` (display name may vary)

`GAME_COIN` may be powered by a Vault economy plugin, depending on server configuration.

### 2.2 Wallet Features

- View balances
- View recent ledger records
- Exchange between two currencies (if that direction is enabled)
- Redeem by code

## 3. Buy/Recycle Official Products

## 4. Player Market

### 4.1 Buyer Side

- Filter by currency, price range, material, and keyword.
- In direct mode, you can buy instantly.
- In auction mode, you place bids; funds are frozen and auto-refunded if you do not win.

### 4.2 Seller Side

- Manage listings via GUI: list, pause, resume, unlist.
- View recent store trade records:

```text
/ws market logs [count]
```

- Supply-chest listings support auto restock and manual refresh (controlled by market settings).

## 5. Refund Rules

In general, refunds are available if any of the following is true:

- `refund-undelivered-enabled` is enabled, and the order has not been delivered, claimed, or redeemed
- The order is still in cooldown (products are not delivered during cooldown)

If refund is allowed, the balance is returned to the original payment currency wallet.

## 6. FAQ

### 6.1 I Bought Something but Did Not Receive It

Check order status.

Run:

```text
/ws claim all
```

If it still fails, check:

- Inventory is full or not
- Temporary server lag

### 6.2 My Balance Decreased After Bidding

Bidding freezes funds. If you are outbid or auction is canceled, funds are auto-returned.

### 6.3 Exchange Failed

Common reasons:

- Exchange direction is disabled
- Invalid amount input
- Insufficient wallet balance

## 7. Related Docs

- [Commands and Permissions](./Commands-and-Permissions)
- [Market and Pricing](./Market-and-Pricing)
- [Troubleshooting](./Troubleshooting)

