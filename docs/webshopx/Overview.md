---
sidebar_position: 2
---
# WebShopX 概览

[返回首页](./Home)

## 项目定位

WebShopX 是一个面向 Paper / Spigot 服务器的 Web 商店插件，目标是把以下能力合并到同一套系统中：

- 官方商城（B2C）
- 玩家市场（C2C）
- 拍卖行（AUCTION）
- 管理后台

你不需要额外维护一个独立前端工程。插件自带玩家端与后台页面。

## 核心能力

### 官方商城

- 支持商品类型：
  - `COMMAND`
  - `GIVE_ITEM`
  - `POTION_EFFECT`
  - `RECYCLE_ITEM`
  - `GROUP_BUY_VOUCHER`
- 支持上下架时间、库存、单用户限购。
- 支持动态价格算法（适用于 `GIVE_ITEM` / `RECYCLE_ITEM`）。

### 玩家市场

- 玩家可创建普通上架与供货箱上架。
- 支持普通交易（`DIRECT`）和拍卖交易（`AUCTION`）。
- 支持动态定价、竞拍、自动补货、自动结算。
- 支持市场手续费与税率配置。

### 钱包与经济

- 双币体系：`SHOP_COIN` 与 `GAME_COIN`。
- 支持双向兑换，按配置汇率执行。
- 可选接入 Vault，将 `GAME_COIN` 映射到现有经济插件。

### 发货与领取

- 支持指令发货、物品发货、药水效果发货。
- 自动发货失败时会转入 `WAIT_CLAIM`，玩家可用 `/ws claim` 手动领取。
- 提供可分享领取码（由配置控制是否允许代领）。

### 管理后台

- 管理员登录与权限分组。
- 商品、订单、兑换码、市场、用户管理。
- 管理员操作审计日志。
- 支持超级管理员管理其他管理员权限模板。

## 运行模式

`webshop.server-mode` 提供两种运行方式：

- `internal`
  - 插件同时提供 API 和静态网页。
  - 适合快速部署与测试。
- `external`
  - 插件提供 API，静态网页导出到插件目录后由 Nginx/CDN 托管。
  - 适合生产环境。

## 状态模型（高频概念）

### 官方订单状态

- `PENDING`
- `WAIT_CLAIM`
- `DELIVERED`
- `REFUNDED`
- `RECYCLED`

### 市场成交状态

- `PENDING`
- `WAIT_CLAIM`
- `DELIVERED`
- `REFUNDED`

### 市场上架状态

- `ACTIVE`
- `PAUSED`
- `SOLD`
- `UNLISTED`

## 继续阅读

- [安装与部署](./Installation-and-Deployment)
- [配置参考](./Configuration-Reference)
- [命令与权限](./Commands-and-Permissions)
- [玩家使用指南](./Player-Guide)
- [市场与定价系统](./Market-and-Pricing)
- [后台管理指南](./Admin-Guide)
- [API 参考](./API-Reference)
- [数据库结构](./Database-Schema)
- [故障排查](./Troubleshooting)
