---
id: algorithm
title: Algorithm
sidebar_label: Algorithm
sidebar_position: 8
---

# WebShopX Algorithm Handbook (Detailed)

> **Document Type**: Deep Technical Manual

---

## Chapter 1: Core Architecture and Design Philosophy

Dynamic pricing and auction algorithms move WebShopX from a traditional "static shop" toward an adaptive economy engine driven by a **demand-driven feedback** mechanism. The core goal is to automatically regulate prices and use mathematical models to hedge server inflation.

### 1.1 Core Protection Mechanisms

- **Clamping Function**: After complex calculations, all dynamic prices are finally constrained to an owner-defined safe range:
  $$P_{\text{final}} = \max(P_{\min}, \min(P_{\text{calc}}, P_{\max}))$$
  This means prices never break through $P_{\max}$ (ceiling) or $P_{\min}$ (floor), no matter how aggressive the algorithm behaves.
- **Transaction Traceability**: `MarketService` is deeply bound to persistence. Every order and every price evolution is logged in detail, enabling post-incident economic replay.
- **Optimistic-Lock Concurrency**: Uses DB optimistic locking based on `version` field to prevent overselling and read-write race vulnerabilities under high-frequency trading.

---

## Chapter 2: Full Dynamic Pricing Analysis (7 Foundation Models)

By monitoring **demand heat ($D_t$)**, the system computes prices in real time with these models. Each model serves a different economic control objective.

### 2.1 Linear Demand (`LINEAR_DEMAND_V1`)

Classic and intuitive supply-demand model. More buying produces stable price growth.

- **Formula**: $P_t = P_0 + k \cdot D_t$
- **Parameter**: $k$ is slope. If $k=0.5$, each +1 demand raises price by 0.5.
- **Use case**: Base minerals (iron, coal), stable high-consumption commodities.

### 2.2 Diminishing Return (`DIMINISHING_RETURN_V1`)

Price rises clearly at first, then growth is strongly suppressed and converges to an upper bound.

- **Formula**: $P_t = P_0 + a \cdot \frac{D_t}{1 + bD_t}$
- **Parameter**: Limit premium is $a/b$. If $a=10$, $b=0.1$, max premium is 100.
- **Use case**: Bulk construction materials (dirt, stone brick, concrete).

### 2.3 Log Smooth (`LOG_SMOOTH_V1`)

A very smooth curve with low sensitivity to large numerical changes.

- **Formula**: $P_t = P_0 \cdot (1 + \alpha \ln(1 + D_t))$
- **Parameter**: $\alpha$ controls smoothness.
- **Use case**: High-frequency consumables (torches, bread, arrows).

### 2.4 Exponential Defense (`EXPONENTIAL_DEFENSE_V1`)

A strong anti-monopoly model: small demand increases can cause geometric price growth.

- **Formula**: $P_t = P_0 \cdot e^{\beta D_t}$
- **Parameter**: $\beta$ is exponential rate, usually 0.01-0.05.
- **Use case**: Strategic scarce items (netherite ingots, beacons, high-tier enchanted books).
- **Note**: Strongly recommend strict $P_{\max}$.

### 2.5 Threshold Step (`THRESHOLD_STEP_V1`)

Low impact before threshold, sharp response after crossing threshold.

- **Formula**:
  - If $D_t \le T$: $P_t = P_0 + k_1 D_t$
  - If $D_t > T$: $P_t = P_0 + k_1 T + k_2(D_t - T)$ where $k_2 \gg k_1$
- **Parameter**: $T$ is safety threshold.
- **Use case**: Functional items (shulker shells, XP bottles, spawn eggs).

### 2.6 Elasticity (`ELASTICITY_V1`)

Introduces economic price-elasticity concept.

- **Formula**: $P_t = P_0 \cdot (\frac{D_t + \varepsilon}{D_0 + \varepsilon})^{\eta}$
- **Parameter**: $\eta$ is elasticity exponent. $\eta<1$ smoother market; $\eta>1$ highly sensitive market.
- **Use case**: Special tokens, emeralds.

### 2.7 Panic Buying (`PANIC_BUYING_V1`)

Simulates herd behavior and run-like spikes.

- **Formula**: $P_t = P_0 + kD_t + \gamma \cdot \max(0, D_t - T)^2$
- **Parameter**: quadratic term $\gamma$ accelerates growth after threshold $T$.
- **Use case**: Limited event items, rare collectibles.

---

## Chapter 3: Full Auction Algorithm Analysis (4 Modes)

### 3.1 English Auction

- **Mechanism**: Highest bidder wins; each valid bid updates reference price.
- **Anti-snipe**: If valid bid appears in final $N$ seconds, end time extends by $M$ seconds.
- **Asset freeze**: Bid amount is strongly frozen immediately; if outbid, `AsyncRefundTask` unfreezes and refunds promptly.

### 3.2 Dutch Auction

- **Mechanism**: Starts high and decreases over time (for example, step-down per hour).
- **Game dynamic**: Waiting can lower price but increases chance of being sniped by another buyer.
- **Use cases**: Official clearance sales, high-value liquidation.

### 3.3 Vickrey Auction

- **Mechanism**: Sealed bids. Highest bidder wins, but pays second-highest price.
- **Theory**: Encourages truthful bidding under mechanism design and reduces winner's curse effects.

### 3.4 Candle Auction

- **Mechanism**: Similar to English auction, but real ending point is hidden and random.
- **Result**: Players are encouraged to bid competitively earlier instead of waiting for last-second snipes.

---

## Chapter 4: Advanced Tuning Guide for Server Owners

### 4.1 Two-Track Demand Drivers

Dynamic pricing is affected by both buy events and time:

1. **Positive feedback (event-driven)**: each purchase injects demand based on quantity.
2. **Negative feedback (time-driven decay)**: a periodic job decays demand by configured rate:
   $$D_{\text{new}} = D_{\text{old}} \cdot (1 - \text{DecayRate})$$

### 4.2 Safety Protocols for Tuning

- **Gray rollout**: do not enable dynamic pricing for all core commodities at once. Start with low-risk items and observe for 3-5 days.
- **Hot-update documentation safety**: `.md` docs under `web/docs/` can be modified anytime; plugin protection avoids overwriting your custom docs with defaults on restart after detecting changes.

---

## Chapter 5: Technical Troubleshooting and Support

**Q1: Why does page show one price, but purchase says price changed?**  
A: This is normal in high-frequency dynamic markets. Price can update between view and request due to other purchases. `version` optimistic lock is protecting consistency.

**Q2: Why are frozen funds not refunded after auction failure?**  
A: Most likely temporary TPS collapse or OOM paused async refund tasks (`AsyncRefundTask`).  
**Fix**: Check backend logs, locate errors, then use admin commands or restart plugin to resync state if needed.

---

### Core Support and Bug Tracking

WebShopX is continuously improving. If you encounter bugs during deployment or want to collaborate on code:

Submit issues to the official GitHub repository:  
[WebShopX-Issues](https://github.com/Cc-Cece/WebShopX-Issues)

