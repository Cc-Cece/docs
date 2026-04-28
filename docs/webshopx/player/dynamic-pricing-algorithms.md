---
id: webshopx-player-dynamic-pricing-algorithms
title: 动态价格算法
sidebar_label: 动态价格算法
sidebar_position: 9
---

# 动态价格算法

本页按源码解释动态价格如何计算、何时变化、为什么会变化。

:::info[本页导读]
- 生效范围与不生效范围
- 核心字段与通用计算流程
- 7 种算法公式与参数
- 容错、回退与报错
:::

## 1. 动态价格在哪些场景生效

只在以下场景启用：

- 官方商品：`GIVE_ITEM`、`RECYCLE_ITEM`
- 玩家市场：`tradeMode=DIRECT` 且 `dynamicPricingEnabled=true` 的 `SELL` 挂单

不会生效的常见场景：

- 官方商品类型是 `COMMAND`、`POTION_EFFECT`、`GROUP_BUY_VOUCHER`
- 市场挂单是 `BUY`
- 市场挂单是 `AUCTION`

## 2. 动态价格核心字段

| 字段 | 说明 |
| --- | --- |
| `dynamicBasePrice` | 基础价（为空时回落到当前价） |
| `dynamicDemandScore` | 需求热度 |
| `dynamicPriceStep` | 步进参数（默认斜率） |
| `dynamicFloorPrice` | 地板价（可空） |
| `dynamicCapPrice` | 封顶价（可空） |
| `dynamicAlgorithm` | 算法枚举 |
| `dynamicParamsJson` | 算法参数 JSON |

统一计算流程：

1. 按算法算原始价
2. 向下取整到 `long`
3. 强制 `>= 1`
4. 再应用 floor/cap（若配置）

## 3. 热度变化规则

### 3.1 购买与回收

- 购买后：`demand += delta`
- 回收后：`demand = max(0, demand - delta)`

当前算法 `delta` 默认都按数量递增（最小 1）。

### 3.2 周期衰减

- 官方动态价和市场动态价都会周期衰减。
- 每次衰减步长固定 `1`。
- 调度周期 `6000 ticks`（约 5 分钟，受 TPS 影响）。

## 4. 7 种算法一览

令 `B=basePrice`，`D=demandScore`。

| 算法 | 公式 | 默认参数特点 |
| --- | --- | --- |
| `LINEAR_DEMAND_V1` | `P = B + k * D` | `k=dynamicPriceStep` |
| `DIMINISHING_RETURN_V1` | `P = B + a * (D / (1 + b * D))` | `a=step`, `b=0.1` |
| `LOG_SMOOTH_V1` | `P = B * (1 + alpha * ln(1 + D))` | `alpha=0.05` |
| `EXPONENTIAL_DEFENSE_V1` | `P = B * exp(min(40, beta * D))` | `beta=0.01` |
| `THRESHOLD_STEP_V1` | 分段线性（阈值前后斜率不同） | `threshold=20` |
| `ELASTICITY_V1` | `P = B * ((D + epsilon)/(d0 + epsilon))^eta` | `eta=1`, `epsilon=1`, `d0=1` |
| `PANIC_BUYING_V1` | `P = B + k*D + gamma*max(0,D-threshold)^2` | `threshold=20`, `gamma=1` |

## 5. 参数别名与兼容点

- `THRESHOLD_STEP_V1`
  - `threshold` 兼容 `thresholdK`
  - `k1` 兼容 `k`
- `ELASTICITY_V1`
  - `eta` 兼容 `elasticity`
- `PANIC_BUYING_V1`
  - `threshold` 兼容 `panicThreshold`

## 6. 容错与回退行为

- 算法名无效：回退 `LINEAR_DEMAND_V1`
- `dynamicParamsJson` 非法：按空对象处理
- 数值会做非负/正数保护
- floor > cap：报错（`invalid_dynamic_bounds` 或 `invalid_dynamic_range`）

## 7. 常见报错

- `invalid_dynamic_config`
- `invalid_dynamic_base`
- `invalid_dynamic_floor`
- `invalid_dynamic_cap`
- `invalid_dynamic_step`
- `invalid_dynamic_bounds`
- `invalid_dynamic_range`

## 8. 玩家策略建议

1. 交易决策看当前 `price`，不要只看 `dynamicBasePrice`。
2. 高热度下优先分批买，避免一次把价格推太高。
3. 若服主配置了 cap，冲高后追价风险通常更大。
4. 动态价更适合 `DIRECT` 快速成交，不适合拍卖玩法。
