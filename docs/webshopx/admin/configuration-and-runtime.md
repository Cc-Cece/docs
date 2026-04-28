---
id: webshopx-admin-configuration-runtime
title: 配置与运行时参数
sidebar_label: 配置与运行时参数
sidebar_position: 3
---

# 配置与运行时参数

WebShopX 使用“启动层 + 业务层”双层配置模型。

:::info[本页导读]
- 哪些参数必须在 `config.yml`
- 哪些参数迁移到 `runtime_config`
- 热更新与集群同步如何触发
- 关键字段边界值
:::

## 1. 配置分层

| 层级 | 存储位置 | 特点 |
| --- | --- | --- |
| 启动层 | `config.yml` | 启动必需，影响服务初始化 |
| 业务层 | `runtime_config` 表 | 可后台热更新，支持版本化 |

## 2. 常驻 `config.yml` 的启动层参数

- `webshop.server-mode`
- `webshop.embedded-http.*`
- `database.*`
- `cluster.*`
- `redis.*`
- `webshop.admin-bootstrap.*`

## 3. 迁移到数据库的业务层参数

迁移完成后，插件会裁剪 `config.yml` 中对应项，并备份为 `config.legacy.bak.yml`。

典型项：

- `exchange`
- `currency_display`
- `market_economy`
- `leaderboard`
- `webshop_runtime`
- `market_runtime`
- `market_tags`
- `market_limitation`
- `maintenance`
- `logging`
- `broadcast`
- `notification`

## 4. 关键 runtime key

### 4.1 `webshop_runtime`

- `defaultLocale`
- `sessionExpireHours`
- `bindRequestExpireMinutes`
- `accessTokenLength`
- `deliveryBatchSize`
- `deliveryRetrySeconds`
- `orderCooldownSeconds`
- `allowSharedClaimCommand`
- `refundUndeliveredEnabled`
- `timeZone`

### 4.2 `market_runtime`

- `marketMaxActiveListings`
- `supply.autoRefreshThreshold`
- `supply.defaultTransferBatchSize`
- `supply.maxTransferBatchSize`
- `supply.defaultTransitStock`
- `supply.maxTransitStock`

### 4.3 其他高频区块

- `market_economy`：`tradeFeePercent` / `tradeTaxPercent`
- `exchange`：`shopToGame.*` / `gameToShop.*`

## 5. 热更新机制

后台更新 runtime 后会：

1. 递增配置 `version`
2. 当前节点重载配置
3. 若启用 Redis，则广播其他节点同步刷新

## 6. 参数边界（源码校验示例）

| 字段 | 边界 |
| --- | --- |
| `accessTokenLength` | `16..256` |
| `deliveryBatchSize` | `1..1000` |
| `deliveryRetrySeconds` | `5..86400` |
| `orderCooldownSeconds` | `0..86400` |
| `marketMaxActiveListings` | `1..1000` |

## 7. 推荐变更流程

1. 先在后台改业务参数并观察日志。
2. 低峰期再调整费率、限制、重试等高影响项。
3. 汇率改动前同步公告，避免玩家体感突变。
