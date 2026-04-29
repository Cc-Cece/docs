---
id: faq
title: FAQ
sidebar_label: FAQ
sidebar_position: 13
---

# FAQ

## 1. Why can I log in on web but cannot trade in market?

Common causes:

- Session expired (`auth_invalid`)
- Listing rules disallow your operation (`limitation_*`)
- Insufficient funds (`insufficient_funds`)
- You are operating a BUY order with wrong API path (should use `sell-to-buy`)

## 2. Why can't BUY orders be "purchased" like SELL orders?

BUY order means "demand order" and must be fulfilled by a seller. Normal purchase path is rejected with errors such as `buy_order_not_active` or `buy_requires_direct_mode`.

## 3. Why does auction extend in the final seconds?

English auction has anti-sniping: valid bids in the ending window extend the deadline.

## 4. Why was my money deducted after bidding?

Auction bidding freezes funds first. If you are outbid or auction fails, refund is processed. If you win, settlement completes trade.

## 5. Why did my dynamic pricing disappear later?

Common causes:

- Listing switched to `AUCTION`
- Listing side is `BUY`
- Product type does not support dynamic price (only `GIVE_ITEM` / `RECYCLE_ITEM`)

## 6. Why can I still not claim after `/ws claim`?

Check:

- Token expired or typo (`claim_token_invalid`)
- Delegated claim attempted while shared claim is disabled (`claim_forbidden`)
- This claim task was already claimed

## 7. Why didn't item go directly into inventory?

When inventory is full, player is offline, or auto-delivery fails, item may go to:

- `WAIT_CLAIM` (use `/ws claim`)
- In-game mailbox (use `/ws mailbox claim`)

## 8. Why does `GAME_COIN` exchange fail?

If `GAME_COIN` is integrated via Vault and Vault/provider is not ready, you may get `vault_unavailable` or `vault_error`.

## 9. Why is my listing limit different from others?

Limits may come from different sources:

- Global default `marketMaxActiveListings`
- User-specific override
- Online permission node `webshop.market.limit.<n>`

## 10. How to reduce duplicate order/purchase risks?

For all write operations, include `idempotencyKey` whenever possible. Reuse the same key on timeout retry; typically it returns existing result instead of duplicate deduction.

<details>
  <summary>Minimum info to provide server owner when issue is still unclear</summary>

- Operation time (to the minute)
- Your player name
- Error code (not only localized message screenshot)
- Related IDs (`ODR-*` / `MKT-*` / `CLM-*` / `MCL-*`)

</details>

