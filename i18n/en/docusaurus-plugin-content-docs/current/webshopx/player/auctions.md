---
id: auctions
title: Auctions
sidebar_label: Auctions
sidebar_position: 7
---

# Auctions

This page explains WebShopX auction behavior from source-level logic: bidding rules, fund freezing, and settlement flow.

:::info[In This Page]
- Comparison of four auction modes
- Key parameters per mode
- Freeze/refund timing
- Expiry settlement logic
:::

## 1. Three Things to Know Before Auctioning

1. Auctions use `tradeMode=AUCTION` and only allow `SELL` listings.
2. Minimum auction duration is `>= 30 seconds`.
3. Settlement is handled by periodic server tasks and does not depend on whether the page is open.

## 2. Auction Modes at a Glance

| Mode | Interaction | Price Mechanism | Typical Use |
| --- | --- | --- | --- |
| `ENGLISH_AUCTION_V1` | Manual bidding | Ascending bids | Regular hot-item bidding |
| `DUTCH_AUCTION_V1` | Direct buy | Price drops over time | Fast inventory clearing |
| `VICKREY_AUCTION_V1` | Sealed bid | Settled with second-price idea | Avoid public price-pushing |
| `CANDLE_AUCTION_V1` | Manual bidding | Public duration + random extension | Anti-last-second sniping |

### 2.1 English Auction

- Public bidding; highest bid leads temporarily.
- At countdown end, highest bidder wins.
- If outbid, your previously frozen funds are refunded automatically.

### 2.2 Dutch Auction

- Starts from high price and drops over time.
- First buyer accepting current price wins immediately.
- Waiting longer can be cheaper but increases chance someone buys first.

### 2.3 Vickrey Auction

- Sealed bidding: submit your max willingness; others cannot see it.
- Highest bidder wins after closing.
- Settlement usually follows second-price logic, with reserve constraints if configured.

### 2.4 Candle Auction

- Public bidding with uncertain real ending time.
- Do not rely on last-second bids; you may miss the close entirely.

## 3. Key Parameters by Mode

### 3.1 English

- `auctionStartPrice`
- `auctionMinIncrement` (must be > 0)
- `auctionEndAt`
- `auctionParams.reservePrice` (optional)
- `auctionParams.antiSnipingWindowSeconds` (default 30)
- `auctionParams.antiSnipingExtendSeconds` (default 30)

### 3.2 Dutch

- `auctionStartPrice`
- `auctionParams.floorPrice` (>0 and not higher than start price)
- `auctionParams.durationSeconds` (>=30)

### 3.3 Vickrey

- `sealedBid=true`
- `auctionStartPrice`
- `auctionEndAt`
- `auctionParams.reservePrice` (optional)

### 3.4 Candle

- `auctionStartPrice`
- `auctionMinIncrement`
- `auctionParams.baseDurationSeconds` (>=30)
- `auctionParams.maxExtensionSeconds` (>=0)

## 4. Bidding and Fund Freezing

When you place a bid:

- System freezes corresponding amount first.
- If outbid or auction fails, funds are refunded by rules.
- In non-sealed auctions, previous leader is refunded immediately when outbid.

## 5. Unified Settlement Flow (At Expiry)

Each batch settlement cycle handles up to 20 listings:

- Dutch: if no direct buy, it ends unsold and goods are returned.
- English/Candle: no bids or reserve not met => unsold; otherwise highest bid wins.
- Vickrey: settled with Vickrey clearing price; non-winners refunded.

## 6. Common Error Codes

- `auction_only_bid`
- `auction_only_buy`
- `auction_closed`
- `bid_too_low`
- `invalid_auction_start`
- `invalid_auction_increment`
- `invalid_auction_floor`
- `invalid_auction_end`

## 7. Player Suggestions

1. English auctions may extend repeatedly near end; do not focus only on nominal deadline.
2. In Dutch auctions, key is target price timing, not bid wars.
3. In Vickrey auctions, submit your true willingness-to-pay instead of incremental bidding habits.
4. Candle auction endings are random near the end, avoid gambling on final-second timing.

