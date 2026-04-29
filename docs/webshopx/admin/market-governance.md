---
id: governance
title: 市场治理与风控
sidebar_label: 市场治理与风控
sidebar_position: 5
---

# 市场治理与风控

## 1. 市场结构要点

- `side`：`SELL` / `BUY`
- `tradeMode`：`DIRECT` / `AUCTION`
- `sourceMode`：`MANUAL` / `SUPPLY`

关键硬约束：

- `BUY` 只允许 `DIRECT`
- `BUY` 必须 `MANUAL`
- `BUY` 创建后价格固定，不可动态化

## 2. 标签治理（Market Tags）

### 2.1 自动标签匹配

- 按 `priority` 升序评估
- 可按材质与 NBT 关键字匹配
- 未命中回退 `defaultTag`，最终兜底 `default`

### 2.2 重算标签

`/ws market recalc-tags [active|all]`

- `active`：仅激活/暂停挂单
- `all`：全量历史挂单

## 3. 限制规则治理（Market Limitation）

规则可从以下维度限制创建与编辑：

- `side`
- `tradeMode`
- `currency`
- `tag`
- `item material`
- `item nbt` 关键字
- `player lacksPermission`

支持：

- deny 快速拒绝
- 白名单交集收缩
- `forcedTag`
- `createCost`（上架成本）

## 4. 动态价格与拍卖治理

### 4.1 动态价格

- 只建议用于 `DIRECT` 的流动商品
- 市场周期每轮会衰减 `dynamicDemandScore`
- 需合理配置 floor/cap，防极端价格

### 4.2 拍卖

- 最短拍卖时长：30 秒
- 英式支持反狙击（默认窗口/延时均 30 秒）
- Dutch 只能直购；Vickrey 为密封竞价；Candle 存在随机延时

## 5. 供货模式（SUPPLY）治理

- 自动补货会受 `batch`、`maxStock`、箱子可用性约束
- 箱子不可用时挂单会被暂停并提示卖家
- 可通过 `/api/market/supply/refresh` 主动刷新

## 6. 旁路权限

在线玩家若有 `webshop.market.limitation.bypass`，可绕过限制规则。

建议仅授予极少量运营/管理账号。

## 7. 监管接口

后台可用：

- `GET /api/admin/market/listings`
- `POST /api/admin/market/unlist`

用于巡检与强制下架。
