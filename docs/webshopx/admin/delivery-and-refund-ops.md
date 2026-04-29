---
id: delivery-refund-ops
title: 发货、领取与退款运维
sidebar_label: 发货、领取与退款运维
sidebar_position: 6
---

# 发货、领取与退款运维

## 1. 发货状态总览

常见状态：

- `PENDING`：待处理
- `WAIT_CLAIM`：需玩家手动领取
- `DELIVERED`：已完成
- `REFUNDED`：已退款
- `CANCELLED`：因退款等被取消

## 2. 自动发货失败回退

自动发货失败达到阈值后，会回退到 `WAIT_CLAIM`，并向玩家发送领取提示。

实现常量：

- `MAX_AUTO_RETRY_BEFORE_CLAIM = 3`

## 3. 领取命令与 token

- 订单 token 前缀：`CLM-`
- 市场 token 前缀：`MCL-`
- 订单号前缀：`ODR-`
- 市场交易号前缀：`MKT-`

`/ws claim` 支持：

- `all`
- `ODR-*`
- `MKT-*`
- `CLM-*`
- `MCL-*`

## 4. 共享领取开关

`allowSharedClaimCommand=false` 时，只允许本人领取；代领会报 `claim_forbidden`。

## 5. 信箱回退机制

若物品无法直接放入背包（如背包满），会进入 `mailbox_items` 待领取：

- 玩家使用 `/ws mailbox claim` 批量领取
- 后台可通过通知模板提醒玩家

## 6. 退款策略（官方订单 + 市场订单）

### 6.1 `refundUndeliveredEnabled=true`

允许 `PENDING` / `WAIT_CLAIM` 退款。

### 6.2 `refundUndeliveredEnabled=false`

依赖退款截止时间 `refund_deadline`，超时会 `refund_expired`。

### 6.3 团购券

- `CONSUMED` 不可退
- `ISSUED` 在未交付退款策略允许时可退

## 7. 建议的运维监控指标

1. `WAIT_CLAIM` 数量趋势。
2. `mailbox` 待领取堆积量。
3. `refund` 触发量与原因分布。
4. 发货失败错误文本（离线、背包满、权限不足等）。
