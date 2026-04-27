# Market and Pricing

[Back to Home](./Home)

## 1. Player Market Model Overview

The WebShopX player market is built on two dimensions:

- Source mode (`source_mode`)
  - `MANUAL`: standard listing
  - `SUPPLY`: supply-chest listing
- Trade mode (`trade_mode`)
  - `DIRECT`: buy-now (including dynamic pricing)
  - `AUCTION`: auction

> Constraint: `SUPPLY` listings do not support `AUCTION`.

## 2. Buy-Now (`DIRECT`)

### 2.1 Purchase Flow

1. Lock listing record
2. Calculate total and costs
3. Deduct buyer balance
4. Create `market_trades`
5. Decrease stock and enqueue delivery
6. Settle seller after successful delivery

### 2.2 Cost Model

Given:

- Subtotal: `subtotal = unit_price * quantity`
- Buyer tax: `tax = subtotal * trade-tax-percent`
- Seller fee: `fee = subtotal * trade-fee-percent`

Settlement values:

- `buyer_total = subtotal + tax`
- `seller_receive = subtotal - fee`

### 2.3 Refund Logic

A market trade can be refunded when status is `PENDING` / `WAIT_CLAIM` and refund policy conditions are met.
Refund will:

- Return buyer payment
- Cancel undelivered market delivery tasks
- Attempt to restore listing stock (if the listing was not fully unlisted)

## 3. Supply-Chest Mode (`SUPPLY`)

### 3.1 How It Works

- Seller binds a container and puts template items inside.
- Listing maintains transit stock.
- When stock goes below threshold or manual refresh is triggered, stock is pulled from the container.

### 3.2 Core Parameters

- `supply_batch_size`: pull amount per transfer
- `supply_max_stock`: transit stock cap
- `auto-refresh-threshold`: threshold that triggers auto restock

### 3.3 Protection Mechanisms

- If supply container becomes invalid, listing is auto-paused.
- Bound supply containers are market-protected to prevent accidental stock flow breakage.

## 4. Dynamic Pricing System

### 4.1 Dynamic Algorithms ([Read more]())

`DynamicAlgorithmType`:

- `LINEAR_DEMAND_V1`
- `DIMINISHING_RETURN_V1`
- `LOG_SMOOTH_V1`
- `EXPONENTIAL_DEFENSE_V1`
- `THRESHOLD_STEP_V1`
- `ELASTICITY_V1`
- `PANIC_BUYING_V1`

## 5. Auction System (`AUCTION`)

### 5.1 Auction Algorithm Enum ([Read more]())

`AuctionAlgorithmType`:

- `ENGLISH_AUCTION_V1`
- `DUTCH_AUCTION_V1`
- `VICKREY_AUCTION_V1`
- `CANDLE_AUCTION_V1`

### 5.2 Characteristics

- English: open ascending bids with anti-sniping extension.
- Dutch: price drops over time, supports immediate buyout.
- Vickrey: sealed bids, settles at second-highest price.
- Candle: open bidding with random ending window.

### 5.3 Bid and Freeze

- Placing a bid freezes bidder funds.
- Outbid bids are auto-refunded.
- Auction settlement creates market trade record and triggers delivery.

## 6. Delivery and Settlement

### 6.1 Trade Delivery

Market trades use `market_item_deliveries` queue.

- Auto delivery success: trade becomes `DELIVERED`.
- Retry reaches threshold: trade becomes `WAIT_CLAIM`.

### 6.2 Seller Credit Timing

Seller income is credited after successful trade delivery (not at purchase time).

## 7. Design Suggestions

- Start with `DIRECT + fixed pricing`, then gradually enable dynamic pricing and auctions.
- For high-value items, configure `cap` and `reservePrice` to prevent extreme volatility.
- In supply mode, use sensible batch size and transit caps to avoid sudden depletion.
- Review market rates regularly to keep the economy sustainable.

## 8. Related Docs

- [Player Guide](./Player-Guide)
- [Admin Guide](./Admin-Guide)
- [API Reference](./API-Reference)
