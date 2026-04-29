---
id: glossary
title: 名词解释
sidebar_label: 名词解释
sidebar_position: 12
---

# 名词解释

这页按“概念域”整理高频术语，比纯字母表更适合排障时快速查找。

## 1. 交易与挂单

| 术语 | 解释 |
| --- | --- |
| `listing` | 市场挂单 |
| `SELL` | 出售方向挂单，买家直接购买 |
| `BUY` | 收购方向挂单，卖家履约 |
| `DIRECT` | 一口价交易模式 |
| `AUCTION` | 拍卖交易模式 |
| `MANUAL` | 手动库存来源 |
| `SUPPLY` | 供货箱自动补货来源 |
| `ACTIVE` / `PAUSED` / `SOLD` / `UNLISTED` | 挂单状态 |
| `listing_limit` | 超过活跃挂单上限 |

## 2. 钱包与经济

| 术语 | 解释 |
| --- | --- |
| `SHOP_COIN` | 商城币 |
| `GAME_COIN` | 游戏币（可接 Vault） |
| `wallet_ledger` | 钱包流水 |
| `insufficient_funds` | 余额不足 |
| `feeAmount` | 手续费金额 |
| `taxAmount` | 税额 |
| `buyerTotal` | 买家总支付 |
| `sellerReceive` | 卖家实收 |

## 3. 订单、发货与领取

| 术语 | 解释 |
| --- | --- |
| `PENDING` | 待处理 |
| `WAIT_CLAIM` | 待手动领取 |
| `DELIVERED` | 已发货 |
| `REFUNDED` | 已退款 |
| `CLAIM` | 手动领取发货模式 |
| `ODR-` | 官方订单号前缀 |
| `MKT-` | 市场交易号前缀 |
| `CLM-` | 官方订单领取 token 前缀 |
| `MCL-` | 市场成交领取 token 前缀 |
| `claim_token_invalid` | 领取 token 无效/失效 |
| `claim_forbidden` | 当前无权限代领 |

## 4. 动态价与拍卖

| 术语 | 解释 |
| --- | --- |
| `dynamicBasePrice` | 动态价格基础价 |
| `dynamicDemandScore` | 动态需求热度 |
| `LINEAR_DEMAND_V1` 等 | 动态价格算法枚举 |
| `ENGLISH_AUCTION_V1` 等 | 拍卖算法枚举 |
| `auction_only_bid` | 当前拍卖只允许出价 |
| `auction_only_buy` | 当前拍卖只允许直购 |
| `auction_closed` | 拍卖已结束 |
| `bid_too_low` | 出价低于最低要求 |

## 5. 鉴权与幂等

| 术语 | 解释 |
| --- | --- |
| `auth_required` | 缺少会话 token |
| `auth_invalid` | token 无效或过期 |
| `invalid_credentials` | 登录凭证错误 |
| `idempotencyKey` | 幂等键，防重复扣款/重复成交 |
| `EXISTING` | 命中历史幂等记录，返回既有结果 |

## 6. 规则与限制

| 术语 | 解释 |
| --- | --- |
| `tag` | 市场标签，用于分类与规则匹配 |
| `invalid_tag` | 标签不存在或不合法 |
| `tag_disabled` | 标签已禁用 |
| `limitation_item_forbidden` | 物品命中禁止规则 |
| `limitation_trade_mode_not_allowed` | 交易模式不允许 |
| `webshop.market.limitation.bypass` | 限制旁路权限（强权限） |

## 7. Vault 相关

| 术语 | 解释 |
| --- | --- |
| `vault_unavailable` | Vault 或经济提供器不可用 |
| `vault_error` | Vault 读写调用失败 |
