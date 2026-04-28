---
id: webshopx-player-market-auctions
title: 拍卖系统详解
sidebar_label: 拍卖系统详解
sidebar_position: 8
---

# 拍卖系统详解

本页按源码解释 WebShopX 拍卖的算法、出价规则、资金冻结与结算。

:::info[本页导读]
- 拍卖 4 算法对照
- 各算法关键参数
- 出价冻结与退款时机
- 到期结算逻辑
:::

## 1. 拍卖前先知道三件事

1. 拍卖是 `tradeMode=AUCTION`，只允许 `SELL` 挂单。
2. 拍卖最短时长要求 `>= 30 秒`。
3. 结算由服务端周期任务处理，不依赖你页面是否打开。

## 2. 四种算法对照表

| 算法 | 交互方式 | 价格机制 | 适用场景 |
| --- | --- | --- | --- |
| `ENGLISH_AUCTION_V1` | 手动出价 | 递增竞拍 | 常规热门物品竞价 |
| `DUTCH_AUCTION_V1` | 直接购买 | 随时间降价 | 快速清库存 |
| `VICKREY_AUCTION_V1` | 密封出价 | 次高价思想结算 | 防公开抬价博弈 |
| `CANDLE_AUCTION_V1` | 手动出价 | 公布时长 + 随机延长 | 防卡秒狙击 |

## 3. 英式拍卖（English）

### 3.1 关键参数

- `auctionStartPrice`
- `auctionMinIncrement`（必须 > 0）
- `auctionEndAt`
- `auctionParams.reservePrice`（可选）
- `auctionParams.antiSnipingWindowSeconds`（默认 30）
- `auctionParams.antiSnipingExtendSeconds`（默认 30）

### 3.2 反狙击机制

若新出价发生在结束前窗口内，结束时间会顺延。

## 4. 荷式拍卖（Dutch）

### 4.1 关键参数

- `auctionStartPrice`
- `auctionParams.floorPrice`（>0 且不高于起拍价）
- `auctionParams.durationSeconds`（>=30）

### 4.2 交易规则

- 不支持手动出价
- 只支持 `POST /api/market/buy`
- 购买数量必须为 `1`

### 4.3 价格轨迹

价格按时间线性下降，最低到 `floorPrice` 后停止。

## 5. 维克里拍卖（Vickrey）

- `sealedBid=true`，出价属于密封竞价。
- 胜者是最高出价者。
- 成交价按“次高价思想 + openingBid/reservePrice 约束”确定。
- 胜者若“出价高于成交价”，差额会自动退回。

## 6. 蜡烛拍卖（Candle）

### 6.1 关键参数

- `auctionStartPrice`
- `auctionMinIncrement`
- `auctionParams.baseDurationSeconds`（>=30）
- `auctionParams.maxExtensionSeconds`（>=0）

### 6.2 时间模型

- 公布结束：`publicEnd = startedAt + baseDuration`
- 实际结束：`actualEnd = publicEnd + random(0..maxExtensionSeconds)`

因此末段结束时间存在不确定性。

## 7. 出价与资金冻结

当你出价时：

- 系统会先冻结出价金额。
- 被超价或流拍时，按规则自动退款。
- 非密封拍卖中，前任领先者在被超价时会被即时退款。

## 8. 统一结算流程（到期）

每轮批量结算（最多 20 条）：

- Dutch：无人直购则流拍退货。
- English/Candle：无出价或未达保留价则流拍；否则按最高价成交。
- Vickrey：按维克里清算价成交；非胜者退款。

## 9. 常见错误码

- `auction_only_bid`
- `auction_only_buy`
- `auction_closed`
- `bid_too_low`
- `invalid_auction_start`
- `invalid_auction_increment`
- `invalid_auction_floor`
- `invalid_auction_end`

## 10. 玩家建议

1. English 末段可能反复延时，别只盯“名义截止秒”。
2. Dutch 的核心是“等目标价”，不是“跟人抬价”。
3. Vickrey 建议报你的真实愿付价，不要按英式习惯一点点加。
4. Candle 末段有随机性，避免卡秒赌博式操作。
