---
id: webshopx-player-official-shop-and-orders
title: 官方商店与订单
sidebar_label: 官方商店与订单
sidebar_position: 4
---

# 官方商店与订单

这页讲清楚官方商品怎么下单、怎么发货、怎么退款，以及团购券的特殊规则。

:::info[本页导读]
- 商品类型与默认发货模式
- 订单状态流转
- 退款条件与策略接口
- 团购券状态字段
:::

## 1. 官方商品类型

当前实现支持：

- `COMMAND`
- `GIVE_ITEM`
- `POTION_EFFECT`
- `RECYCLE_ITEM`
- `GROUP_BUY_VOUCHER`

## 2. 下单关键字段

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `productId` | 是 | 商品 ID |
| `quantity` | 是 | 数量 |
| `deliveryMode` | 否 | `IMMEDIATE` / `CLAIM` |
| `idempotencyKey` | 强烈建议 | 防重复下单 |

## 3. 默认发货模式（源码）

| 商品类型 | 默认模式 |
| --- | --- |
| `COMMAND` | `CLAIM` |
| `POTION_EFFECT` | `CLAIM` |
| `GIVE_ITEM` | `IMMEDIATE` |
| `RECYCLE_ITEM` | `IMMEDIATE` |
| `GROUP_BUY_VOUCHER` | `IMMEDIATE` |

兼容映射：`MANUAL` / `MANUAL_CLAIM` 会归一化为 `CLAIM`。

## 4. 订单状态你会看到什么

| 状态 | 含义 |
| --- | --- |
| `PENDING` | 待处理 |
| `WAIT_CLAIM` | 待手动领取 |
| `DELIVERED` | 已发货完成 |
| `REFUNDED` | 已退款 |
| `RECYCLED` | 已回收完成（回收型商品） |

## 5. 退款策略核心点

- 策略受 `refundUndeliveredEnabled`、`orderCooldownSeconds`、`refundDeadline` 共同影响。
- `GET /api/orders/policy` 可查看当前策略，例如：
  - `cooldownSeconds`
  - `refundEnabled`
  - `refundUndeliveredEnabled`

:::warning[退款不是无条件]
到 `DELIVERED` 后通常不能退；超出 `refundDeadline` 也会失败（`refund_expired`）。
:::

## 6. 团购券（GROUP_BUY_VOUCHER）

团购券有独立状态流。你可能在订单详情看到：

- `groupBuyVoucherCode`
- `groupBuyVoucherStatus`
- `groupBuyVoucherConsumedAt`

常见约束：

- `CONSUMED` 不可退
- `ISSUED` 在“未交付可退”策略下可退

## 7. 动态价格与官方商品

官方商品的动态定价只对以下类型有效：

- `GIVE_ITEM`
- `RECYCLE_ITEM`

其他类型若启用动态价会被拒绝（`invalid_dynamic_config`）。
