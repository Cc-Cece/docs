---
id: wallet-and-exchange
title: Wallet and Exchange
sidebar_label: Wallet and Exchange
sidebar_position: 3
---

# Wallet and Exchange

WebShopX uses a dual-currency wallet. After reading this page, you will know how balances increase, how exchange works, and why it can fail.

:::info[In This Page]
- Dual-currency model and balance reading
- Exchange direction and formula
- Vault economy integration behavior
- Typical error-code troubleshooting
:::

## 1. Dual-Currency Model

:::tip[Tip]
The currencies on this page are default currencies. If your server uses different names, follow your server settings; the process still applies.
:::

| Currency | Symbol | Description |
| --- | --- | --- |
| `SHOP_COIN` | SC | Shop currency, commonly used in official store payment |
| `GAME_COIN` | GC | In-game currency, optionally integrated via Vault |

You can view real-time balances in Web: `Account -> Wallet`.

## 2. Exchange Directions and Switches

`SHOP_COIN` and `GAME_COIN` can be exchanged when allowed. Exchange rates are configured by server admins.

## 3. Exchange Formula

Server calculates with:

`converted = floor(amount * ratio)`

If `converted <= 0`, it returns `invalid_ratio`.

:::warning[Practical Tip]
If ratio is small and amount is also small, `converted=0` is common. Increase amount and try again.
:::

## 4. Vault Integration Behavior (Optional)

:::tip[Tip]
Automatically enabled only when Vault is detected successfully. Admins can check integration status in admin panel.
:::

When Vault is enabled and an economy provider is available:

- `GAME_COIN` balance is managed by Vault.

## 5. Common Error Codes Quick Lookup

| Error Code | Common Cause |
| --- | --- |
| `invalid_exchange` | `from` and `to` are same or direction is invalid |
| `invalid_amount` | Amount is `<= 0` |
| `exchange_disabled` | This exchange direction is disabled |
| `invalid_ratio` | Ratio causes result to be 0 |
| `insufficient_funds` | Insufficient wallet balance |
| `vault_unavailable` | Vault or provider is not ready |

## 6. Player Troubleshooting Order

1. Check if exchange direction is enabled (`enabled=true`).
2. Check if input amount is greater than 0.
3. Check if balance is sufficient.
4. If it is a `GAME_COIN` issue, ask server owner to verify Vault provider status.
