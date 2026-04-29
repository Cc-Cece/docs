---
id: shop-and-orders
title: Official Shop, Player Market, and Orders
sidebar_label: Official Shop, Player Market, and Orders
sidebar_position: 4
---

# Official Shop, Player Market, and Order System

:::info[In This Page]
- Official Shop
- Player Market
- Order System
- Others
:::

## 1. Official Shop

The official shop is a server-admin-managed **B2C** trading system. Unlike the player market, it is usually used to stabilize server economy, sell core materials, or deliver limited special items. It supports unlimited stock, listing schedules, and products such as commands and potion effects.

### Product Types

| **Type ID** | **Name** | **Description** |
| --- | --- | --- |
| **`COMMAND`** | **Command Execution** | Executes predefined commands via console or player identity after purchase. |
| **`GIVE_ITEM`** | **Item Delivery** | Directly generates physical items and puts them in player inventory. |
| **`POTION_EFFECT`** | **Potion Effect** | Applies specific potion effects after purchase. |
| **`RECYCLE_ITEM`** | **Recycle/Exchange** | Buys back specific player items at configured prices. |
| **`GROUP_BUY_VOUCHER`** | **Group Voucher/Redeem Code** | Delivers serials or vouchers, supports group redemption. |

## 2. Player Market

The player market is a player-driven **C2C** trading system. Players can list items, publish buy orders, and create auction listings to circulate surplus resources. It is a core part of the server's internal circular economy.

### (1) Three Dimensions

Player market supports multiple trade styles as combinations of three dimensions (for example: **seller stock + fixed price + manual stock = regular listing**).

:::warning[Note]
Not every combination is valid. See details below.
:::

| **Dimension** | **Enum Values** | **Description** |
| --- | --- | --- |
| **Trade Side** | `SELL` / `BUY` | **SELL**: seller provides goods; **BUY**: buyer publishes demand. |
| **Trade Mode** | `DIRECT` / `AUCTION` | **DIRECT**: instant fixed-price trade; **AUCTION**: bidding mode. |
| **Stock Source** | `MANUAL` / `SUPPLY` | **MANUAL**: manually listed stock; **SUPPLY**: auto-restock from linked supply chest. |

### (2) Supported Listing Modes

| **Listing Mode** | **Side** | **TradeMode** | **SourceMode** | **Typical Scenario** |
| --- | --- | --- | --- | --- |
| **Regular Listing** | `SELL` | `DIRECT` | `MANUAL` | List specific items from inventory until sold out. |
| **Supply Listing** | `SELL` | `DIRECT` | `SUPPLY` | Automated shop with stock auto-refilled from linked chest. |
| **Auction** | `SELL` | `AUCTION` | `MANUAL` | Rare items with time-limited server-wide bidding. |
| **Buy Order** | `BUY` | `DIRECT` | `MANUAL` | Buyer posts demand; trade completes when sellers provide matching items. |

## 3. Order System

The order system is the logical core of market trading, recording and processing the full flow from "trade initiation" to "item delivery." It supports real-time status tracking and includes refund and cooldown logic to protect both buyer and seller in asynchronous scenarios.

### (1) Order States

| State | Meaning |
| --- | --- |
| `PENDING` | Pending |
| `WAIT_CLAIM` | Waiting for manual claim |
| `DELIVERED` | Delivered |
| `REFUNDED` | Refunded |
| `RECYCLED` | Recycle completed (recycle-type product) |
| `ACTIVE` | Tradable |
| `PAUSED` | Trading paused |
| `SOLD` | Sold out |
| `UNLISTED` | Unlisted |
| `SUPPLY_EMPTY` | Out of stock |

### (2) Trade Fee Fields

| Field | Meaning |
| --- | --- |
| `buyerTotal` | Total paid by buyer |
| `sellerReceive` | Net received by seller |
| `feeAmount` | Handling fee (paid by seller) |
| `taxAmount` | Tax amount (paid by seller) |

These values are affected by server owner's `market_economy` configuration (fee and tax rates).

### (3) Refund Conditions

Policy is affected by three factors: whether undelivered refunds are enabled, order cooldown period, and refund deadline.

:::warning[Refund Is Not Unconditional]
After order status becomes **DELIVERED**, refund is usually unavailable. If refund deadline is exceeded, refund fails with `refund_expired` / "refund expired".
:::

## 4. Others

### (1) Dynamic Pricing

Dynamic pricing is a real-time pricing mechanism based on **supply-demand algorithms**. The system automatically recalculates and updates baseline unit prices from trade frequency, remaining stock, and traded volume within a time window.

> Main entries:

| **Module** | **Type / Mode** | **Supported** | **Driver Logic** |
| --- | --- | --- | --- |
| **Player Market** | Sell items | **Yes** | Dynamic pricing algorithms |
|  | Buy order | Not yet | Fixed price |
|  | Auction | No | Auction algorithms |
| **Official Shop** | Sell items | **Yes** | Dynamic pricing algorithms |
|  | Recycle items | **Yes** | Dynamic pricing algorithms |
|  | Command / Potion / Voucher | No | Fixed price |

### (2) Auctions

> Main entry:

Auction is a special trade form based on **bidding logic**. It fits items with uncertain or extremely scarce value. Seller sets starting price and bid increments, then buyers compete within limited time. The order system locks top bidder funds and transfers ownership automatically at settlement.

### (3) Listing Capacity Limits

The system combines three layers (priority high to low):

1. User-specific override: configured in admin web page
2. Permission node: `webshop.market.limit.<n>` (deprecated soon, use web settings instead)
3. Global default: `marketMaxActiveListings`

