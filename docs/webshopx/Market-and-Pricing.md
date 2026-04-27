---
sidebar_position: 6
---
# 市场与定价系统

[返回首页](./Home)

## 1. 玩家市场模型概览

WebShopX 玩家市场由两个维度组成：

- 来源模式（`source_mode`）
  - `MANUAL`：普通上架
  - `SUPPLY`：供货箱上架
- 交易模式（`trade_mode`）
  - `DIRECT`：一口价（包括动态价格模型）
  - `AUCTION`：拍卖

> 约束：`SUPPLY（供货箱上架）` 上架不支持 `AUCTION`。

## 2. 一口价（DIRECT）

### 2.1 购买流程

1. 锁定上架记录
2. 计算总价与费用
3. 扣除买家余额
4. 创建 `market_trades`
5. 减库存并写入发货队列
6. 发货成功后给卖家结算

### 2.2 费用模型

设：

- 小计：`subtotal = unit_price * quantity`
- 买家税：`tax = subtotal * trade-tax-percent`
- 卖家手续费：`fee = subtotal * trade-fee-percent`

结算值：

- `buyer_total = subtotal + tax`
- `seller_receive = subtotal - fee`

### 2.3 退款逻辑

当市场订单状态为 `PENDING` / `WAIT_CLAIM` 且满足退款策略时可退款。
退款会：

- 返还买家支付金额
- 取消未发放的市场发货任务
- 尝试回补上架库存（若上架未被彻底下架）

## 3. 供货箱模式（SUPPLY）

### 3.1 工作方式

- 卖家绑定容器并放入模板物品。
- 上架记录维护“中转库存”。
- 当库存低于阈值或手动刷新时，从容器补货。

### 3.2 核心参数

- `supply_batch_size`：单次提取量
- `supply_max_stock`：中转库存上限
- `auto-refresh-threshold`：自动触发补货阈值

### 3.3 保护机制

- 供货容器失效时，上架会自动暂停。
- 已绑定供货容器会被市场保护，防止误操作破坏库存流。

## 4. 动态价格系统

### 4.1 动态算法（[查看全文]()）

`DynamicAlgorithmType`：

- `LINEAR_DEMAND_V1`
- `DIMINISHING_RETURN_V1`
- `LOG_SMOOTH_V1`
- `EXPONENTIAL_DEFENSE_V1`
- `THRESHOLD_STEP_V1`
- `ELASTICITY_V1`
- `PANIC_BUYING_V1`

## 5. 拍卖系统（AUCTION）

### 5.1 拍卖算法枚举（[查看全文]()）

`AuctionAlgorithmType`：

- `ENGLISH_AUCTION_V1`
- `DUTCH_AUCTION_V1`
- `VICKREY_AUCTION_V1`
- `CANDLE_AUCTION_V1`

### 5.2 各算法特性

- English：公开加价，支持防狙击延时。
- Dutch：价格随时间下降，支持直接买断。
- Vickrey：密封竞价，结算按次高价规则。
- Candle：公开竞价 + 随机结束窗口。

### 5.3 出价与冻结

- 出价会冻结竞拍者余额。
- 被超价后自动退回。
- 拍卖结算时生成市场成交记录并发货。

## 6. 发货与成交结算

### 6.1 成交发货

市场成交使用 `market_item_deliveries` 队列。

- 自动发货成功：成交记为 `DELIVERED`。
- 失败重试达到阈值：转 `WAIT_CLAIM`。

### 6.2 卖家入账时机

卖家收益在成交发货成功后入账（而非下单瞬间）。

## 7. 设计建议

- 新服先用 `DIRECT + 固定价`，稳定后再逐步开启动态价与拍卖。
- 对高价值物品配置 `cap`、`reservePrice`，防止极端波动。
- 供货箱模式建议设置合理的批量和中转上限，避免瞬时抽空。
- 定期审查市场费率，保持经济系统可持续。

## 8. 相关文档

- [玩家使用指南](./Player-Guide)
- [后台管理指南](./Admin-Guide)
- [API 参考](./API-Reference)
