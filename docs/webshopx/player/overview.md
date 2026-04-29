---
id: overview
title: 总览
sidebar_label: 总览
sidebar_position: 1
---

# 总览

## 问题反馈

- Issues 仓库：https://github.com/Cc-Cece/WebShopX-Issues

这套玩家文档可以当作从入门到进阶的导航图。内容以当前版本功能为准。

:::tip[导读]
适合普通玩家阅读：功能说明、使用教程、常见问题与术语解释。
:::

## 一页看懂先看哪篇

| 你的目标 | 建议先看 | 你会获得什么 |
| --- | --- | --- |
| 第一次使用 | [快速上手](./quick-start) | 登录、密码、基础操作 |
| 看余额/充值兑换 | [钱包与兑换](./wallet-and-exchange) | 双币体系、兑换与常见报错 |
| 买东西、下单、查订单 | [官方商店、玩家市场与订单](./shop-and-orders) | 购买流程、订单状态、发货与退款 |
| 领取失败订单或补发物品 | [领取与信箱](./claim-and-mailbox) | `claim` 与信箱领取的正确姿势 |
| 理解拍卖机制 | [拍卖](./auctions) | 四种拍卖模式与实战差异 |
| 理解价格变化 | [动态价格](./dynamic-pricing) | 为什么会涨跌、不同算法的体感区别 |
| 上架被拒/交易失败排查 | [上架限制](./limits) + [常见问题](./faq) | 错误码含义与排查顺序 |
| 想看机制原理 | [算法](./algorithm) | 动态定价与拍卖机制的底层思路 |
| 看不懂术语 | [名词解释](./glossary) | 常用词快速对照 |

## 常用命令速查

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
4. 背包放不下会进入信箱，要用 `/ws mailbox claim` 取回。
:::

## 快速导航建议

- 想尽快完成第一次交易：按 `快速上手 -> 钱包与兑换 -> 官方商店、玩家市场与订单` 阅读。
- 想减少交易踩坑：优先看 `上架限制` 和 `常见问题`。
- 想提高交易策略：再看 `拍卖`、`动态价格`、`算法`。

