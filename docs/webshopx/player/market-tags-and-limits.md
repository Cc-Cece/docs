---
id: webshopx-player-market-tags-and-limits
title: 标签与限制规则
sidebar_label: 标签与限制规则
sidebar_position: 10
---

# 标签与限制规则

这页回答一个高频问题：为什么我能上架，而别人不能上架。

:::info[本页导读]
- 标签是怎么判定的
- 限制规则怎样决策
- createCost、forcedTag、bypass 怎么生效
- 常见报错如何定位
:::

## 1. 标签系统（Tag）

标签用于：筛选、规则匹配、运营分流。

### 1.1 标签来源

- 手动传入 `tag`
- 未传时系统自动匹配

### 1.2 自动匹配规则

系统按 `priority` 从小到大依次检查：

- `match.materialIn`（材质命中）
- `match.nbtHasAny`（NBT 关键字命中）

匹配文本来源包括：

- `itemMetaJson`
- 材质名
- 物品 PDC key（`namespace`、`key`）

### 1.3 回退逻辑

1. 命中某标签则使用该标签
2. 否则回退 `defaultTag`
3. 若 `defaultTag` 不可用，兜底 `default`

### 1.4 手动指定失败

- `invalid_tag`：标签不存在
- `tag_disabled`：标签已禁用

## 2. 限制系统（Market Limitation）

限制在“创建/编辑挂单”阶段评估。

### 2.1 评估维度

- `side`
- `tradeMode`
- `currency`
- `tag`
- `itemMaterial`
- 物品 NBT 关键字
- 玩家权限（是否缺少某权限）

### 2.2 规则结构（简化）

- `defaults.deny`
- `defaults.allow`
- `rules[]`（按 `priority` 升序）

常见动作字段：

- `action.deny` / `action.denyCode`
- `action.sideWhitelist`
- `action.tradeModeWhitelist`
- `action.currencyWhitelist`
- `action.tagWhitelist`
- `action.forcedTag`

### 2.3 决策顺序

1. 命中 `deny=true` 立即拒绝
2. 否则对白名单做交集收缩
3. 最终做 side/tradeMode/currency/tag 一致性校验

## 3. createCost（上架成本）

规则可附带创建成本：

- `createCost.enabled`
- `createCost.currency`（可为 `INHERIT`）
- `createCost.amount`

命中后会在上架成功时扣减钱包。

## 4. 旁路权限（Bypass）

在线玩家拥有 `webshop.market.limitation.bypass` 时，会走限制旁路分支。

:::warning[强权限提醒]
该权限等同“跳过市场风控”，只应授予服主管理账号。
:::

## 5. 常见错误码映射

| 错误码 | 含义 |
| --- | --- |
| `limitation_item_forbidden` | 物品命中禁止规则 |
| `limitation_side_not_allowed` | 挂单方向被拒绝 |
| `limitation_trade_mode_not_allowed` | 交易模式被拒绝 |
| `limitation_currency_not_allowed` | 币种被拒绝 |
| `invalid_tag` | 标签不存在或被最终校验否决 |

## 6. 玩家排障顺序

1. 先确认 `tag` 是否存在且启用。
2. 检查 side 和 tradeMode 组合是否合法。
3. 检查 currency 是否在允许集合内。
4. 检查材质/NBT 是否触发 deny。
5. 找服主核对是否有“缺权限即拒绝”规则。
