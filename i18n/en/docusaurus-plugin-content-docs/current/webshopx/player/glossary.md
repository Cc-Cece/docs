---
id: glossary
title: Glossary
sidebar_label: Glossary
sidebar_position: 12
---

# Glossary

This page organizes high-frequency terms by concept domain, which is usually faster than pure alphabetical lookup during troubleshooting.

## 1. Trading and Listings

| Term | Explanation |
| --- | --- |
| `listing` | Market listing |
| `SELL` | Sell-side listing, buyers purchase directly |
| `BUY` | Buy-side listing, sellers fulfill |
| `DIRECT` | Fixed-price direct trade mode |
| `AUCTION` | Auction trade mode |
| `MANUAL` | Manual stock source |
| `SUPPLY` | Auto-restock source from supply chest |
| `ACTIVE` / `PAUSED` / `SOLD` / `UNLISTED` | Listing states |
| `listing_limit` | Exceeded active listing capacity |

## 2. Wallet and Economy

| Term | Explanation |
| --- | --- |
| `SHOP_COIN` | Shop currency |
| `GAME_COIN` | Game currency (Vault-integrable) |
| `wallet_ledger` | Wallet transaction ledger |
| `insufficient_funds` | Insufficient funds |
| `feeAmount` | Handling fee amount |
| `taxAmount` | Tax amount |
| `buyerTotal` | Total paid by buyer |
| `sellerReceive` | Net received by seller |

## 3. Orders, Delivery, and Claim

| Term | Explanation |
| --- | --- |
| `PENDING` | Pending processing |
| `WAIT_CLAIM` | Waiting for manual claim |
| `DELIVERED` | Delivered |
| `REFUNDED` | Refunded |
| `CLAIM` | Manual claim delivery mode |
| `ODR-` | Official order ID prefix |
| `MKT-` | Market trade ID prefix |
| `CLM-` | Official order claim token prefix |
| `MCL-` | Market-trade claim token prefix |
| `claim_token_invalid` | Claim token invalid/expired |
| `claim_forbidden` | No permission for delegated claim |

## 4. Dynamic Pricing and Auctions

| Term | Explanation |
| --- | --- |
| `dynamicBasePrice` | Dynamic pricing base price |
| `dynamicDemandScore` | Dynamic demand heat |
| `LINEAR_DEMAND_V1` etc. | Dynamic pricing algorithm enums |
| `ENGLISH_AUCTION_V1` etc. | Auction algorithm enums |
| `auction_only_bid` | Current auction allows bidding only |
| `auction_only_buy` | Current auction allows direct buy only |
| `auction_closed` | Auction closed |
| `bid_too_low` | Bid below minimum requirement |

## 5. Authentication and Idempotency

| Term | Explanation |
| --- | --- |
| `auth_required` | Missing session token |
| `auth_invalid` | Token invalid or expired |
| `invalid_credentials` | Wrong login credentials |
| `idempotencyKey` | Idempotency key to prevent duplicate charge/trade |
| `EXISTING` | Matched historical idempotent record, returns existing result |

## 6. Rules and Restrictions

| Term | Explanation |
| --- | --- |
| `tag` | Market tag for classification and rule matching |
| `invalid_tag` | Tag missing or invalid |
| `tag_disabled` | Tag disabled |
| `limitation_item_forbidden` | Item hit forbidden rule |
| `limitation_trade_mode_not_allowed` | Trade mode not allowed |
| `webshop.market.limitation.bypass` | Restriction bypass permission (high privilege) |

## 7. Vault Related

| Term | Explanation |
| --- | --- |
| `vault_unavailable` | Vault or economy provider unavailable |
| `vault_error` | Vault read/write call failed |

