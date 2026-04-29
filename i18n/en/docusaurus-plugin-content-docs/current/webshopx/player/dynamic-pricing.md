---
id: dynamic-pricing
title: Dynamic Pricing
sidebar_label: Dynamic Pricing
sidebar_position: 6
---

# Dynamic Pricing

This page explains, based on source behavior, how dynamic pricing is calculated, when it changes, and why it changes.

:::info[In This Page]
- Where it applies and where it does not
- Core fields and common calculation flow
- 7 algorithm formulas and parameters
- Fault tolerance, fallback, and errors
:::

## 1. Where Dynamic Pricing Applies

Enabled only in:

- Official products: `GIVE_ITEM`, `RECYCLE_ITEM`
- Player market: `SELL` listings with `tradeMode=DIRECT` and `dynamicPricingEnabled=true`

Common cases where it does not apply:

- Official product type is `COMMAND`, `POTION_EFFECT`, or `GROUP_BUY_VOUCHER`
- Market listing is `BUY`
- Market listing is `AUCTION`

## 2. Core Fields

| Field | Description |
| --- | --- |
| `dynamicBasePrice` | Base price (falls back to current price if empty) |
| `dynamicDemandScore` | Demand heat score |
| `dynamicPriceStep` | Step parameter (default slope) |
| `dynamicFloorPrice` | Floor price (nullable) |
| `dynamicCapPrice` | Cap price (nullable) |
| `dynamicAlgorithm` | Algorithm enum |
| `dynamicParamsJson` | Algorithm parameter JSON |

Unified flow:

1. Calculate raw price by algorithm
2. Floor to `long`
3. Enforce `>= 1`
4. Apply floor/cap if configured

## 3. Demand Score Updates

### 3.1 Buy and Recycle

- After buy: `demand += delta`
- After recycle: `demand = max(0, demand - delta)`

Current default behavior increments `delta` by quantity (minimum 1).

### 3.2 Periodic Decay

- Both official and market dynamic prices decay periodically.
- Each decay step is fixed at `1`.
- Scheduler period is `6000 ticks` (about 5 minutes, affected by TPS).

## 4. How to Read Algorithms on the Page

The page shows the active algorithm name while buying. Knowing the model helps you choose better timing and opportunities:

- **Linear Demand** `LINEAR_DEMAND_V1`
  - **Behavior**: more buying causes steady upward price changes; easiest to understand.
  - **Common items**: basic minerals (iron ingot, coal), common building blocks (oak, cobblestone).
- **Diminishing Return** `DIMINISHING_RETURN_V1`
  - **Behavior**: price rises faster at first, then growth slows gradually.
  - **Common items**: bulk building materials (glass, stone bricks, concrete), dirt, sand.
- **Log Smooth** `LOG_SMOOTH_V1`
  - **Behavior**: gentle change under frequent small purchases, less sudden spikes.
  - **Common items**: daily consumables (bread, cooked meat, torch, arrows).
- **Exponential Defense** `EXPONENTIAL_DEFENSE_V1`
  - **Behavior**: large one-time buyouts cause very fast price spikes; designed to prevent monopolization.
  - **Common items**: strategic scarce resources (diamond, netherite ingot, beacon, top enchanted books).
- **Threshold Step** `THRESHOLD_STEP_V1`
  - **Behavior**: little change for small purchases; clear jump after threshold.
  - **Common items**: functional items (shulker shell, experience bottle, ender pearl, spawn egg).
- **Elasticity Model** `ELASTICITY_V1`
  - **Behavior**: larger elasticity coefficient means smoother prices; smaller means higher sensitivity to buying.
  - **Common items**: special server tokens, emeralds, gold ingots.
- **Panic Buying** `PANIC_BUYING_V1`
  - **Behavior**: once demand crosses critical point, price accelerates upward.
  - **Common items**: holiday-limited items, rare decorative heads, enchanted golden apples.

## 5. Fault Tolerance and Fallback

- Invalid algorithm name: fallback to `LINEAR_DEMAND_V1`
- Invalid `dynamicParamsJson`: treated as empty object
- Numeric values are protected against negative/non-positive issues
- floor > cap: error (`invalid_dynamic_bounds` or `invalid_dynamic_range`)

## 6. Strategy Suggestions for Players

1. Base decisions on current `price`, not only `dynamicBasePrice`.
2. In high-demand conditions, buy in batches to avoid pushing price too high at once.
3. If cap is configured, chasing after a spike is usually riskier.
4. Dynamic pricing fits `DIRECT` quick trades, not auction-style gameplay.

