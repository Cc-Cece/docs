---
id: webshopx-dev-admin-api
title: 后台 API
sidebar_label: 后台 API
sidebar_position: 6
---

# 后台 API

## 1. 认证与权限模型

后台接口由两层校验：

1. 必须是有效会话
2. 必须具备对应 `AdminPermission`

Super admin 额外专属：管理员账号管理相关接口。

## 2. 管理认证接口

| Method | Path | Auth | Permission |
| --- | --- | --- | --- |
| POST | `/api/admin/auth/login` | none | - |
| GET | `/api/admin/auth/me` | admin | - |
| POST | `/api/admin/auth/logout` | admin | - |

## 3. 核心业务分组

### 3.1 兑换码

- `POST /api/admin/redeem/create` (`REDEEM_MANAGE`)
- `GET /api/admin/redeem/list` (`REDEEM_MANAGE`)

### 3.2 商品与订单

- `GET /api/admin/products/list` (`PRODUCT_MANAGE`)
- `POST /api/admin/products/upsert` (`PRODUCT_MANAGE`)
- `POST /api/admin/products/icon` (`PRODUCT_MANAGE`)
- `POST /api/admin/products/active` (`PRODUCT_MANAGE`)
- `POST /api/admin/products/reset-limit` (`PRODUCT_MANAGE`)
- `POST /api/admin/group-buy/consume` (`PRODUCT_MANAGE`)
- `GET /api/admin/orders/list` (`ORDER_VIEW`)

### 3.3 经济与系统配置

- `GET /api/admin/economy/settings` (`ECONOMY_MANAGE`)
- `POST /api/admin/economy/exchange`
- `POST /api/admin/economy/market`
- `POST /api/admin/economy/leaderboard`
- `POST /api/admin/economy/currency`
- `GET/POST /api/admin/market/tags-config`
- `GET/POST /api/admin/market/limitation-config`
- `POST /api/admin/system/webshop`
- `POST /api/admin/system/market`
- `POST /api/admin/system/maintenance`
- `POST /api/admin/system/logging`
- `POST /api/admin/system/broadcast`
- `POST /api/admin/system/notification`

### 3.4 视觉与材质覆盖

- `GET/POST /api/admin/visual/settings` (`ECONOMY_MANAGE`)
- `GET /api/admin/material-overrides/list`
- `POST /api/admin/material-overrides/upsert`
- `POST /api/admin/material-overrides/delete`
- `POST /api/admin/material-overrides/icon`

### 3.5 市场监管与用户支持

- `GET /api/admin/market/listings` (`MARKET_MANAGE`)
- `POST /api/admin/market/unlist` (`MARKET_MANAGE`)
- `GET /api/admin/users/lookup` (`USER_SUPPORT`)
- `GET /api/admin/users/list` (`USER_SUPPORT`)
- `POST /api/admin/users/reset-password` (`USER_SUPPORT`)
- `POST /api/admin/users/unbind` (`USER_SUPPORT`)
- `POST /api/admin/users/logout` (`USER_SUPPORT`)
- `POST /api/admin/users/wallet-adjust` (`USER_SUPPORT`)
- `GET/POST /api/admin/users/visual-permission` (`USER_SUPPORT`)
- `GET /api/admin/audit/list` (`AUDIT_VIEW`)

### 3.6 系统公告

- `POST /api/admin/notifications/announce` (`ECONOMY_MANAGE`)

## 4. Super Admin 专属接口

- `GET /api/admin/admin-users/meta`
- `GET /api/admin/admin-users/list`
- `POST /api/admin/admin-users/upsert`
- `POST /api/admin/admin-users/active`

## 5. 后台写接口的统一行为

- 输入校验失败返回 `bad_request`
- 权限不满足返回 `forbidden`
- 大部分写操作会写入审计日志
- runtime_config 类更新会触发配置版本升级与集群刷新
