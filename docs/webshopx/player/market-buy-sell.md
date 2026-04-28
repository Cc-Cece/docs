---
id: webshopx-player-market-buy-sell
title: 市场买卖实战
sidebar_label: 市场买卖实战
sidebar_position: 7
---

# 市场买卖实战

这页按“卖家视角 + 买家视角 + BUY 履约视角”来讲一遍完整实操。

:::tip[先决条件]
你至少需要先读完 [市场基础概念](./webshopx-player-market-basics)。
:::

## 1. 快速上架（命令方式）

```text
/ws market sell <price> [amount] [currency]
```

示例：

```text
/ws market sell 500 16 GAME_COIN
```

## 2. 卖家常用动作

- `/ws market` 打开 GUI 管理挂单
- `/ws market logs [count]` 查看近期成交
- 在详情里调整价格、备注、标签、展示信息等

## 3. 买家购买 SELL 单

核心行为：

1. 校验挂单状态与库存
2. 计算交易金额（含税费）
3. 扣买家余额
4. 生成交易记录与通知
5. 发货成功后给卖家结算

建议写操作都携带 `idempotencyKey`，降低重复扣款风险。

## 4. 卖家履约 BUY 单（sell-to-buy）

BUY 单流程不是“买家主动买货”，而是“买家挂需求，卖家来履约”。

常见失败原因：

- `buy_order_not_active`
- `cannot_fulfill_own_buy_order`
- `fulfill_item_not_match`
- `buy_escrow_insufficient`

## 5. BUY 单冻结与退款

- BUY 创建时会冻结对应资金（escrow）。
- 未成交、取消或关闭时会走退款/解冻流程。
- 成交后才会形成最终结算结果。

## 6. 关键接口与字段

| 场景 | 接口 | 关键字段 |
| --- | --- | --- |
| 买 SELL 单 | `POST /api/market/buy` | `listingId`, `buyQuantity`, `deliveryMode`, `idempotencyKey` |
| 履约 BUY 单 | `POST /api/market/sell-to-buy` | `listingId`, `sellQuantity`, `deliveryMode`, `idempotencyKey` |

## 7. 常见错误速查

| 错误码 | 常见原因 |
| --- | --- |
| `listing_missing` / `listing_unavailable` | 挂单不存在、下架、暂停或不可交易 |
| `invalid_price` / `invalid_amount` / `invalid_quantity` | 输入值非法 |
| `insufficient_funds` | 余额不足 |
| `forbidden` | 权限或规则拒绝 |
| `sync_timeout` / `sync_interrupted` | 主线程同步动作超时/中断 |

## 8. 实战建议

1. 大额交易请分批，避免一次失败影响太大。
2. 任何写操作都带 `idempotencyKey`。
3. 如果多次报 `listing_unavailable`，优先检查挂单状态而不是反复点击。
