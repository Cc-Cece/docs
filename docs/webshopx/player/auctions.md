---
id: auctions
title: 拍卖
sidebar_label: 拍卖
sidebar_position: 7
---

# 拍卖

本页按源码行为解释 WebShopX 的拍卖机制、出价规则、资金冻结与结算流程。

:::info[本页导读]
- 四种拍卖模式对照
- 各模式关键参数
- 冻结与退款时机
- 到期结算逻辑
:::

## 1. 拍卖前先知道三件事

1. 拍卖是 `tradeMode=AUCTION`，只允许 `SELL` 挂单。
2. 拍卖最短时长要求 `>= 30 秒`。
3. 结算由服务端周期任务处理，不依赖页面是否打开。

## 2. 拍卖模式速览

| 模式 | 交互方式 | 价格机制 | 适用场景 |
| --- | --- | --- | --- |
| `ENGLISH_AUCTION_V1` | 手动出价 | 递增竞拍 | 常规热门物品竞价 |
| `DUTCH_AUCTION_V1` | 直接购买 | 随时间降价 | 快速清库存 |
| `VICKREY_AUCTION_V1` | 密封出价 | 次高价思想结算 | 防公开抬价博弈 |
| `CANDLE_AUCTION_V1` | 手动出价 | 公布时长 + 随机延长 | 防卡秒狙击 |

### 2.1 英式拍卖（English）

- 大家公开竞价，谁出价更高谁暂时领先。
- 倒计时结束时，最高出价者成交。
- 如果你被超价，之前冻结的资金会自动退回。

### 2.2 荷兰拍卖（Dutch）

- 商品从较高起始价开始，随时间逐步下降。
- 第一个接受当前价格并买断的人直接成交。
- 等得越久越便宜，但也越容易被别人先抢。

### 2.3 密封拍卖（Vickrey）

- 盲拍：你提交心理上限，其他人看不到。
- 截止后最高出价者获胜。
- 结算通常按第二高出价思路执行，并受保留价等约束。

### 2.4 蜡烛拍卖（Candle）

- 公开加价，但真实结束时间存在随机性。
- 不建议卡最后一秒出价，容易直接错过。

## 3. 各模式关键参数

### 3.1 English

- `auctionStartPrice`
- `auctionMinIncrement`（必须 > 0）
- `auctionEndAt`
- `auctionParams.reservePrice`（可选）
- `auctionParams.antiSnipingWindowSeconds`（默认 30）
- `auctionParams.antiSnipingExtendSeconds`（默认 30）

### 3.2 Dutch

- `auctionStartPrice`
- `auctionParams.floorPrice`（>0 且不高于起拍价）
- `auctionParams.durationSeconds`（>=30）

### 3.3 Vickrey

- `sealedBid=true`
- `auctionStartPrice`
- `auctionEndAt`
- `auctionParams.reservePrice`（可选）

### 3.4 Candle

- `auctionStartPrice`
- `auctionMinIncrement`
- `auctionParams.baseDurationSeconds`（>=30）
- `auctionParams.maxExtensionSeconds`（>=0）

## 4. 出价与资金冻结

当你出价时：

- 系统会先冻结对应金额。
- 被超价或流拍后按规则自动退款。
- 非密封拍卖中，前任领先者被超价时会即时退款。

## 5. 统一结算流程（到期）

每轮批量结算（最多 20 条）：

- Dutch：无人直购则流拍退货。
- English/Candle：无出价或未达保留价则流拍；否则按最高价成交。
- Vickrey：按维克里清算价成交；非胜者退款。

## 6. 常见错误码

- `auction_only_bid`
- `auction_only_buy`
- `auction_closed`
- `bid_too_low`
- `invalid_auction_start`
- `invalid_auction_increment`
- `invalid_auction_floor`
- `invalid_auction_end`

## 7. 玩家建议

1. English 末段可能反复延时，不要只盯名义截止秒。
2. Dutch 的核心是等目标价，不是跟人抬价。
3. Vickrey 建议报真实愿付价，不要按英式习惯一点点加。
4. Candle 末段有随机性，避免卡秒赌博式操作。
