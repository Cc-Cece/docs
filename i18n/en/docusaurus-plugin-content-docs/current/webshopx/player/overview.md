---
id: overview
title: Overview
sidebar_label: Overview
sidebar_position: 1
---

# Overview

## Issue Tracking

- Issues repository: https://github.com/Cc-Cece/WebShopX-Issues

This player documentation works as a roadmap from beginner to advanced usage. Content is based on current version behavior.

:::tip[Guide]
Great for regular players: feature explanations, usage tutorials, FAQs, and terminology.
:::

## Which Page Should You Read First?

| Your Goal | Start Here | What You Get |
| --- | --- | --- |
| First-time use | [Quick Start](./quick-start) | Login, password, and basic actions |
| Check balance / exchange | [Wallet and Exchange](./wallet-and-exchange) | Dual-currency model, exchange flow, common errors |
| Buy items, place orders, check orders | [Official Shop, Player Market, and Orders](./shop-and-orders) | Purchase flow, order states, delivery, and refunds |
| Claim failed orders or redelivered items | [Claim and Mailbox](./claim-and-mailbox) | Correct usage of `claim` and mailbox claiming |
| Understand auctions | [Auctions](./auctions) | Four auction modes and practical differences |
| Understand price changes | [Dynamic Pricing](./dynamic-pricing) | Why prices rise/fall and how algorithms feel in practice |
| Investigate listing rejection / trade failure | [Listing Limits](./limits) + [FAQ](./faq) | Error code meanings and troubleshooting sequence |
| Learn underlying mechanics | [Algorithm](./algorithm) | Core logic behind dynamic pricing and auction systems |
| Don't understand terms | [Glossary](./glossary) | Quick lookup of common terms |

## Common Commands Quick Reference

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

## 4 Things New Players Most Often Miss

:::warning[Remember These 4 First]
1. Set your web password in game first: `/ws password <newPassword>`.
2. Wallet is dual-currency: `SHOP_COIN` and `GAME_COIN`.
3. Auto-delivery failure becomes `WAIT_CLAIM`, and you must `claim` manually.
4. If inventory is full, items go to mailbox; use `/ws mailbox claim` to retrieve.
:::

## Fast Navigation Recommendations

- To finish your first trade quickly: read `Quick Start -> Wallet and Exchange -> Official Shop, Player Market, and Orders`.
- To reduce trading mistakes: read `Listing Limits` and `FAQ` first.
- To improve trading strategy: then read `Auctions`, `Dynamic Pricing`, and `Algorithm`.
