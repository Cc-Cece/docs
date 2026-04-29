---
id: delivery-refund-ops
title: Delivery, Claim, and Refund Operations
sidebar_label: Delivery, Claim, and Refund Operations
sidebar_position: 6
---

# Delivery, Claim, and Refund Operations

## 1. Delivery Status Overview

Common statuses:

- `PENDING`: pending processing
- `WAIT_CLAIM`: player must claim manually
- `DELIVERED`: completed
- `REFUNDED`: refunded
- `CANCELLED`: canceled due to refund or other reasons

## 2. Fallback After Auto-Delivery Failure

When auto-delivery fails and reaches threshold, status falls back to `WAIT_CLAIM`, and the player gets a claim prompt.

Implementation constant:

- `MAX_AUTO_RETRY_BEFORE_CLAIM = 3`

## 3. Claim Commands and Tokens

- Official order token prefix: `CLM-`
- Market token prefix: `MCL-`
- Official order ID prefix: `ODR-`
- Market trade ID prefix: `MKT-`

`/ws claim` supports:

- `all`
- `ODR-*`
- `MKT-*`
- `CLM-*`
- `MCL-*`

## 4. Shared Claim Switch

When `allowSharedClaimCommand=false`, only the owner can claim; delegated claim returns `claim_forbidden`.

## 5. Mailbox Fallback Mechanism

If items cannot be put into inventory directly (for example, inventory full), they are put into `mailbox_items` waiting list:

- Players can batch claim via `/ws mailbox claim`
- Backend can remind players through notification templates

## 6. Refund Strategy (Official Orders + Market Orders)

### 6.1 `refundUndeliveredEnabled=true`

Allows refund for `PENDING` / `WAIT_CLAIM`.

### 6.2 `refundUndeliveredEnabled=false`

Depends on refund deadline `refund_deadline`; timeout returns `refund_expired`.

### 6.3 Group-Buy Vouchers

- `CONSUMED` cannot be refunded
- `ISSUED` can be refunded only when undelivered-refund policy allows

## 7. Recommended Monitoring Metrics

1. `WAIT_CLAIM` count trend.
2. `mailbox` backlog size.
3. Refund trigger volume and reason distribution.
4. Delivery failure error text (offline, full inventory, insufficient permissions, etc.).

