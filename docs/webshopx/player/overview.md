---
id: webshopx-player
title: WebShopX 玩家文档
sidebar_label: 玩家文档
sidebar_position: 1
---

# WebShopX 玩家文档

你可以把这套文档当作“从入门到进阶”的操作地图。内容全部以当前源码行为为准。

:::tip[建议阅读顺序]
1. [快速上手](./webshopx-player-quick-start)
2. [钱包与兑换](./webshopx-player-wallet-and-exchange)
3. [官方商店与订单](./webshopx-player-official-shop-and-orders)
4. [领取与信箱](./webshopx-player-claim-and-mailbox)
5. [市场基础概念](./webshopx-player-market-basics)
6. [市场买卖实战](./webshopx-player-market-buy-sell)
7. [拍卖系统详解](./webshopx-player-market-auctions)
8. [动态价格算法](./webshopx-player-dynamic-pricing-algorithms)
9. [标签与限制规则](./webshopx-player-market-tags-and-limits)
10. [通知与排行榜](./webshopx-player-notifications-and-leaderboard)
11. [名词解释](./webshopx-player-glossary)
12. [常见问题](./webshopx-player-faq)
:::

## 一页看懂你要做什么

| 你的目标 | 先看哪一页 | 你会拿到什么 |
| --- | --- | --- |
| 第一次使用 | [快速上手](./webshopx-player-quick-start) | 账号、密码、会话基础 |
| 充值/兑换/看余额 | [钱包与兑换](./webshopx-player-wallet-and-exchange) | 双币、汇率、常见报错 |
| 买官方商品 | [官方商店与订单](./webshopx-player-official-shop-and-orders) | 商品类型、发货模式、退款边界 |
| 买卖玩家市场 | [市场基础概念](./webshopx-player-market-basics) + [市场买卖实战](./webshopx-player-market-buy-sell) | SELL/BUY 规则与实战路径 |
| 研究拍卖/动态价 | [拍卖系统详解](./webshopx-player-market-auctions) + [动态价格算法](./webshopx-player-dynamic-pricing-algorithms) | 算法、参数、成交逻辑 |
| 排查“为什么失败” | [标签与限制规则](./webshopx-player-market-tags-and-limits) + [常见问题](./webshopx-player-faq) | 规则命中与错误码定位 |

## 玩家命令速查

```text
/ws help
/ws password <newPassword>
/ws market
/ws market gui
/ws market sell <price> [amount] [currency]
/ws market logs [count]
/ws claim [all|ODR-|MKT-|CLM-|MCL-]
/ws mailbox claim
```

## 新手最容易踩的 4 个点

:::warning[先记住这 4 条]
1. 先在游戏里设置网页密码：`/ws password <新密码>`。
2. 钱包是双币系统：`SHOP_COIN` 和 `GAME_COIN`。
3. 自动发货失败会转为 `WAIT_CLAIM`，要手动 `claim`。
4. 背包放不下会进入游戏信箱，要用 `/ws mailbox claim` 取回。
:::

## 页面导航建议

- 想快速做交易：直接跳到 [市场买卖实战](./webshopx-player-market-buy-sell)。
- 想看策略而不是按钮：先读 [拍卖系统详解](./webshopx-player-market-auctions) 和 [动态价格算法](./webshopx-player-dynamic-pricing-algorithms)。
- 想快速定位术语：打开 [名词解释](./webshopx-player-glossary)。
