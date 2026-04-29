---
id: limits
title: Listing Limits
sidebar_label: Listing Limits
sidebar_position: 10
---

# Listing Limits

> This page answers one question: why you sometimes cannot list normally.

## 1. Understand One Thing First

Every time you create or modify a market listing, system runs a "listing check."
If the check fails, it is rejected directly with an error code.

## 2. Most Common Limit Types

1. Item is forbidden from selling.
2. Trade mode is not allowed (for example, sell orders allowed but buy orders disallowed).
3. Currency is not allowed.
4. Tag is not allowed or invalid.
5. You lack required permission.

## 3. Fast Troubleshooting Order

Follow this order for fastest results:

1. Confirm whether you are creating a buy order or sell order, then check whether that mode is enabled.
2. Try a common currency.
3. Remove custom tags and retry.
4. Test with a common item (for example cobblestone, wood) to rule out item ban.
5. If you have admin permissions, confirm you are not blocked by permission rules.

## 4. Common Error Code Mapping

| Error Code | Meaning |
| --- | --- |
| `limitation_item_forbidden` | This item cannot be listed |
| `limitation_side_not_allowed` | Current listing side is not allowed |
| `limitation_trade_mode_not_allowed` | Current trade mode is not allowed |
| `limitation_currency_not_allowed` | Current currency is not allowed |
| `invalid_tag` | Tag does not exist or is not allowed |

## 5. About the "Bypass Limits" Permission

Permission `webshop.market.limitation.bypass` can skip limitation checks.

:::warning[Warning]
This permission effectively means "bypass market risk control." Recommend only for server owner admin accounts, not regular players.
:::

## 6. Advice for Regular Players

1. When errors happen, send "error code + what you were doing" to admins for fastest help.
2. If listing worked today but not tomorrow, it is usually server-rule updates, not your operation mistake.

