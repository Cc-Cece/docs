---
id: commands-permissions
title: 命令与权限体系
sidebar_label: 命令与权限体系
sidebar_position: 4
---

# 命令与权限体系

## 1. 游戏内主命令

主命令：`/webshopx`，别名：`/ws`

### 1.1 玩家常用

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

### 1.2 管理常用

```text
/ws reload
/ws redeem create <shopCoin> <gameCoin> [maxUses] [perUserMaxUses] [minutes] [code]
/ws market recalc-tags [active|all]
```

## 2. Bukkit 权限节点

- `webshop.use`（默认 `true`）
- `webshop.admin`（默认 `op`）
- `webshop.market.auction`（默认 `op`）
- `webshop.market.limitation.bypass`（默认 `op`）

## 3. 后台细粒度权限（AdminPermission）

- `REDEEM_MANAGE`
- `PRODUCT_MANAGE`
- `PRODUCT_ZERO_PRICE`
- `ORDER_VIEW`
- `ECONOMY_MANAGE`
- `MARKET_MANAGE`
- `USER_SUPPORT`
- `AUDIT_VIEW`

## 4. 内置角色模板（AdminRole）

- `SUPER_ADMIN`：全部权限
- `SHOP_ADMIN`：商品/兑换码/订单/经济设置
- `MARKET_MODERATOR`：市场监管
- `SUPPORT_ADMIN`：用户支持 + 订单查看
- `AUDITOR`：审计只读

## 5. Super Admin 专属能力

只有 super admin 可访问：

- 管理员权限组元信息
- 管理员列表
- 新增/更新管理员权限
- 启用/禁用管理员账号

## 6. 权限分配建议

1. 将 `PRODUCT_ZERO_PRICE` 单独控制，只授予少数运营。
2. `USER_SUPPORT` 与 `ECONOMY_MANAGE` 尽量分离。
3. `AUDIT_VIEW` 建议给审计角色，不给写权限。
4. 保持至少 1 个激活的 super admin，避免锁死后台。
