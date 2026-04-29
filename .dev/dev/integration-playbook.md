---
id: webshopx-dev-integration-playbook
title: 接入实施清单
sidebar_label: 接入实施清单
sidebar_position: 9
---

# 接入实施清单

## 1. 最小可用接入流程

1. `POST /api/auth/login`
2. `GET /api/meta/currency`
3. `GET /api/products`
4. `POST /api/orders`
5. `GET /api/orders/list`
6. `GET /api/notifications/unread-count`

## 2. 市场接入流程

1. `GET /api/market/listings`
2. `POST /api/market/buy` 或 `POST /api/market/sell-to-buy`
3. 轮询列表与通知
4. 需要拍卖则使用 `POST /api/market/bid`

## 3. 后台接入流程

1. `POST /api/admin/auth/login`
2. `GET /api/admin/economy/settings`
3. 分权限接入各子模块接口
4. 审计日志与公告能力最后接入

## 4. 客户端必做健壮性

- 为写请求生成稳定 `idempotencyKey`
- 全局处理 `auth_invalid` 并引导重登
- 将 `400` 的 `error` 作为业务分支主键
- 统一时间解析（兼容无偏移与带偏移）

## 5. 版本升级建议

1. 每次升级先跑健康检查与关键读接口。
2. 回归：登录、下单、退款、市场买卖、管理员登录。
3. 若启用集群，验证 runtime_config 改动能跨节点生效。
