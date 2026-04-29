---
id: claim-and-mailbox
title: Claim and Mailbox
sidebar_label: Claim and Mailbox
sidebar_position: 5
---

# Claim and Mailbox

:::warning[]
This is not your fault. The content on this page is still under evaluation; features may be updated or removed, so this page is for reference only.
:::

When delivery cannot complete immediately, you will interact with two fallback paths: `claim` and `mailbox`.

:::info[In This Page]
- When manual claim is required
- Claim token prefixes and command filters
- Shared-claim switch
- Mailbox fallback and common errors
:::

## 1. When Is Manual Claim Needed?

Common cases:

- Auto-delivery fails
- Delivery status enters `WAIT_CLAIM`
- Market trade requires manual claim

## 2. Claim Commands

```text
/ws claim
/ws claim all
/ws claim ODR-...
/ws claim MKT-...
/ws claim CLM-...
/ws claim MCL-...
```

## 3. Token and ID Prefixes

| Prefix | Meaning |
| --- | --- |
| `ODR-` | Official order ID |
| `MKT-` | Market trade ID |
| `CLM-` | Official order claim token |
| `MCL-` | Market trade claim token |

`CLM-` / `MCL-` tokens are 16-character shareable codes. Character set excludes confusing characters (for example `I`, `O`).

## 4. Shared Claim Switch

Config: `allow-shared-claim-command`

- `true`: delegated claim is allowed
- `false`: only owner can claim; delegated claim returns `claim_forbidden`

## 5. Mailbox Fallback

When inventory cannot receive items, system writes into in-game mailbox instead of dropping items:

```text
/ws mailbox claim
```

## 6. Common Error Codes

| Error Code | Description |
| --- | --- |
| `claim_token_invalid` | Token invalid/expired/incomplete/state changed |
| `claim_forbidden` | Delegated claim attempted while shared claim is disabled |

<details>
  <summary>If you still cannot claim, try these 4 steps first</summary>

1. Check if token is complete (including prefix).
2. Try `/ws claim all` first.
3. Free some inventory slots and claim again.
4. If still failing, ask server owner to verify whether order/trade state has changed.

</details>

