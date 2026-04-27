---
sidebar_position: 3
---
# 配置参考

[返回首页](./Home)

> 主要配置文件：`plugins/WebShopX/config.yml`
> 该文件已包括完整中文注释，本文仅作部分说明，具体以 `config.yml`为准

## 重载与生效

- 大部分配置可用 `/ws reload` 热重载。

## 顶层结构

- `webshop.*`：Web 运行、会话、发货、市场、日志、管理员引导
- `database.*`：数据库连接池
- `exchange.*`：双币兑换（即将弃用，请到网页修改）
- `currency.*`：货币显示名称
- `economy.*`：市场手续费/税率（即将弃用，请到网页修改）
- `redis.*`：预留配置（当前版本未接入业务）
- `sample-products`：样例商品定义（即将弃用，请到网页添加）

## `webshop` 关键项

### Web 运行

- `webshop.server-mode`
  - `internal`：插件提供 API + 静态页面
  - `external`：仅 API，静态资源导出后外部托管
- `webshop.api-base-url`
  - `external` 模式常用，前端请求 API 的基地址

### 会话与鉴权

- `webshop.session-expire-hours`：会话有效期（小时）
- `webshop.bind-request-expire-minutes`：绑定请求有效期（分钟）
- `webshop.access-token-length`：会话 token 长度（建议 32-64）

### 时间与订单

- `webshop.time-zone`：业务时区（影响商品上下架时间解释）
- `webshop.order-cooldown-seconds`：订单冷静期秒数
- `webshop.refund-undelivered-enabled`：是否允许未发放单退款
- `webshop.allow-shared-claim-command`：是否允许通过领取码代领

### 发货循环

- `webshop.delivery-batch-size`：每轮处理多少条发货任务
- `webshop.delivery-retry-seconds`：失败重试间隔

### 玩家市场

- `webshop.market.max-active-listings`：单玩家默认上架上限
- `webshop.market.supply.*`：供货箱模式参数
  - `auto-refresh-threshold`
  - `default-transfer-batch-size`
  - `max-transfer-batch-size`
  - `default-transit-stock`
  - `max-transit-stock`

### 维护清理

- `webshop.maintenance.cleanup-interval-minutes`
- `webshop.maintenance.pending-bind-retention-hours`
- `webshop.maintenance.pending-password-retention-hours`
- `webshop.maintenance.bind-request-retention-hours`
- `webshop.maintenance.redeem-code-retention-days`

### 日志

- `webshop.logging.enabled`
- `webshop.logging.level`：`ERROR | WARN | INFO | DEBUG | TRACE`
- `webshop.logging.directory`
- `webshop.logging.max-file-size-mb`
- `webshop.logging.max-files`
- `webshop.logging.retention-days`

### 管理员引导

- `webshop.admin-bootstrap.enabled`
- `webshop.admin-bootstrap.username`
- `webshop.admin-bootstrap.password`
- `webshop.admin-bootstrap.role`（如 `SUPER_ADMIN`）

### 内置 HTTP

- `webshop.embedded-http.host`
- `webshop.embedded-http.port`
- `webshop.embedded-http.static-root`

## `database`（必须正确配置）

- `database.host`
- `database.port`
- `database.schema`
- `database.username`
- `database.password`
- `database.use-ssl`
- `database.pool-size`

注意：默认占位值会触发安全保护并阻止插件正常启动。

## `exchange` 双币兑换

- `exchange.shopcoin-to-gamecoin.enabled`
- `exchange.shopcoin-to-gamecoin.ratio`
- `exchange.gamecoin-to-shopcoin.enabled`
- `exchange.gamecoin-to-shopcoin.ratio`

兑换是方向性配置，禁用某方向后对应 API 会返回 `exchange_disabled`。

## `currency` 货币显示

- `currency.shopcoin.name`
- `currency.shopcoin.short`
- `currency.gamecoin.name`
- `currency.gamecoin.short`

仅影响展示，不改变底层枚举值。

## `economy` 市场经济

### 市场费用

- `economy.market.trade-fee-percent`：卖家侧手续费
- `economy.market.trade-tax-percent`：买家侧税率

两者在后台可动态调整，并在市场结算时分别计入。

### 通胀控制

- `economy.inflation-control.mode`
  - `burn`：销毁
  - `treasury`：注入金库账号
- `economy.inflation-control.treasury-user-id`

## `redis`（预留）

- `redis.enabled`
- `redis.host`
- `redis.port`

当前版本未接入实际业务链路，仅保留未来扩展入口。

## Vault 对接说明

- 当 Vault + 经济提供器可用时，`GAME_COIN` 余额会从 Vault 读取，并同步镜像到本地钱包表。
- 当 Vault 不可用时，`GAME_COIN` 使用本地钱包字段。

## 相关文档

- [安装与部署](./Installation-and-Deployment)
- [API 参考](./API-Reference)
- [故障排查](./Troubleshooting)
