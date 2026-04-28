---
id: webshopx-player-market-basics
title: 市场基础概念
sidebar_label: 市场基础概念
sidebar_position: 6
---

# 市场基础概念

在做任何买卖之前，先把市场模型看清楚。很多“不能操作”的报错，本质都是模型约束触发。

:::info[本页导读]
- 三个核心维度：方向、交易模式、货源模式
- BUY 单硬约束
- 挂单状态与费用字段
- 个人上架上限从哪里来
:::

## 1. 三个核心维度

| 维度 | 枚举 | 含义 |
| --- | --- | --- |
| `side` | `SELL` / `BUY` | `SELL` 是卖家出货，`BUY` 是买家挂需求 |
| `tradeMode` | `DIRECT` / `AUCTION` | 一口价交易或拍卖交易 |
| `sourceMode` | `MANUAL` / `SUPPLY` | 手动库存或供货箱自动补货 |

## 2. BUY 单硬约束（源码）

:::warning[BUY 单不是“反向 SELL”]
`BUY` 的语义是“收购需求 + 冻结资金”，因此行为规则更严格。
:::

- `BUY` 只允许 `DIRECT`。
- `BUY` 必须是 `MANUAL` 来源。
- `BUY` 创建后不能改成动态定价模式。

常见相关错误：

- `buy_requires_direct_mode`
- `buy_requires_manual_source`
- `buy_requires_fixed_price`

## 3. 挂单状态（Listing Status）

| 状态 | 含义 |
| --- | --- |
| `ACTIVE` | 可交易 |
| `PAUSED` | 暂停交易 |
| `SOLD` | 已售完 |
| `UNLISTED` | 已下架 |
| `SUPPLY_EMPTY` | 供货库存不足（展示层可见） |

## 4. 交易费用字段（成交后）

| 字段 | 含义 |
| --- | --- |
| `buyerTotal` | 买家总支付 |
| `sellerReceive` | 卖家实收 |
| `feeAmount` | 手续费 |
| `taxAmount` | 税额 |

这些值受服主的 `market_economy`（费率/税率）配置影响。

## 5. 上架上限如何计算

系统会综合三层来源：

1. 全局默认：`marketMaxActiveListings`
2. 用户专属覆盖：后台用户市场设置
3. 在线权限节点：`webshop.market.limit.<n>`

当存在用户覆盖时优先用覆盖值；否则若权限节点比全局更高，会采用更高值。

## 6. 你需要记住的判断顺序

1. 先看自己做的是 `SELL` 还是 `BUY`。
2. 再看 `tradeMode` 是否和该方向兼容。
3. 再看货源模式是否允许。
4. 最后再看标签/限制规则是否放行。
