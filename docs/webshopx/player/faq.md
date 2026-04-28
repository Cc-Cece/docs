---
id: webshopx-player-faq
title: 常见问题
sidebar_label: 常见问题
sidebar_position: 13
---

# 常见问题

## 1. 为什么网页能登录，但无法买卖市场？

常见原因：

- 会话过期（`auth_invalid`）
- 挂单规则不允许（`limitation_*`）
- 余额不足（`insufficient_funds`）
- 你在操作 BUY 单但用了错误接口（应使用 `sell-to-buy`）

## 2. 为什么 BUY 单不能像 SELL 单一样直接“购买”？

BUY 单语义是“收购需求单”，必须由卖家履约。普通购买路径会被拒绝，并返回 `buy_order_not_active` 或 `buy_requires_direct_mode` 等错误。

## 3. 为什么拍卖最后几秒总在延长？

英式拍卖有反狙击机制：结束前窗口内出现有效出价，会顺延结束时间。

## 4. 为什么我出价后钱被扣了？

拍卖出价会先冻结资金。若你被超价或流拍，系统会退款；若你中标，会在结算后成交。

## 5. 为什么我设置了动态价格，后来又没了？

常见原因：

- 挂单切到了 `AUCTION`
- 挂单方向是 `BUY`
- 商品类型不支持动态价（仅 `GIVE_ITEM` / `RECYCLE_ITEM`）

## 6. 为什么输入 `/ws claim` 还领不到？

先检查：

- token 是否过期或拼写错误（`claim_token_invalid`）
- 是否在代领他人 token 且未开启共享领取（`claim_forbidden`）
- 该任务是否已经被领取

## 7. 为什么物品没直接进背包？

背包满、离线或自动发货失败时，物品可能进入：

- `WAIT_CLAIM`（用 `/ws claim`）
- 游戏信箱（用 `/ws mailbox claim`）

## 8. 为什么 `GAME_COIN` 兑换报错？

若服务器将 `GAME_COIN` 挂接 Vault，且 Vault/provider 未就绪，可能报 `vault_unavailable` 或 `vault_error`。

## 9. 为什么我的挂单上限和别人不一样？

上限来源可能不同：

- 全局默认 `marketMaxActiveListings`
- 用户专属覆盖
- 在线权限节点 `webshop.market.limit.<n>`（可能取更高值）

## 10. 如何减少重复下单/重复购买风险？

所有写操作尽量带 `idempotencyKey`。超时重试时复用同一 key，通常会返回既有结果而非重复扣款。

<details>
  <summary>仍然无法定位问题时，建议提供给服主的最小信息</summary>

- 操作时间（精确到分钟）
- 你的玩家名
- 错误码（不是只截中文提示）
- 相关编号（`ODR-*` / `MKT-*` / `CLM-*` / `MCL-*`）

</details>
