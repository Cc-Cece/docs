---
sidebar_position: 4
---
# 命令与权限

[返回首页](./Home)

## 根命令

- 主命令：`/webshopx`
- 别名：`/ws`

## 玩家命令

### 帮助

```text
/ws help
```

显示基础命令帮助。

### 设置网页登录密码（绑定账号）

```text
/ws password <新密码>
```

- 仅可在游戏内执行。
- 密码长度要求：8-64。
- 用户名采用玩家当前 Minecraft 名称。

### 市场 GUI 与上架

```text
/ws market #打开 GUI
/ws market gui #打开 GUI
/ws market sell <price> [amount] [currency] #通过命令上架
/ws market logs [count] #查看卖家最近成交记录
```

### 领取待发货

```text
/ws claim
/ws claim all #一键领取所有待领项
/ws claim ODR-...
/ws claim MKT-...
/ws claim CLM-...
/ws claim MCL-...
```

- `ODR-...`：官方订单号过滤领取。
- `MKT-...`：市场成交号过滤领取。
- `CLM-...`：官方订单领取码。
- `MCL-...`：市场成交领取码。

是否允许他人代领由配置 `webshop.allow-shared-claim-command` 控制。

## 管理命令

### 重载配置与网页资源

```text
/ws reload
```

需要 `webshop.admin` 权限。

### 创建兑换码

```text
/ws redeem create <shopCoin> <gameCoin> [maxUses] [perUserMaxUses] [minutes] [code]
```

需要 `webshop.admin` 权限。

## 权限节点

### Bukkit 权限

- `webshop.use`
  - 默认 `true`
  - 普通玩家使用权限
- `webshop.admin`
  - 默认 `op`
  - 管理命令与后台能力入口

### 后台细粒度权限（AdminPermission）

后台登录后，还会进行二次权限校验：

- `REDEEM_MANAGE`：兑换码管理
- `PRODUCT_MANAGE`：商品管理
- `PRODUCT_ZERO_PRICE`：允许零价商品
- `ORDER_VIEW`：订单查看
- `ECONOMY_MANAGE`：经济设置
- `MARKET_MANAGE`：市场管理
- `USER_SUPPORT`：用户支持（重置密码/解绑/强制下线/调账）
- `AUDIT_VIEW`：审计日志查看

## 角色模板（内置）

- `SUPER_ADMIN`
- `SHOP_ADMIN`
- `MARKET_MODERATOR`
- `SUPPORT_ADMIN`
- `AUDITOR`

超级管理员可在后台编辑管理员账号、权限与模板。

## 常见错误提示

- 无权限：检查 `webshop.admin` 与后台细粒度权限。
- 命令仅玩家可执行：请在游戏内执行（如 `password` / `market` / `claim`）。

## 相关文档

- [玩家使用指南](./Player-Guide)
- [后台管理指南](./Admin-Guide)
- [API 参考](./API-Reference)
