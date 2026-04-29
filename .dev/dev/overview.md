---
id: webshopx-dev
title: WebShopX 开发文档
sidebar_label: 开发文档
sidebar_position: 1
---

# WebShopX 开发文档

本文面向对接 WebShopX API 的开发者，内容按当前源码行为整理。

:::info[推荐阅读顺序]
1. [API 基础协议](./webshopx-dev-api-basics)
2. [认证与会话](./webshopx-dev-auth-session)
3. [玩家侧 API](./webshopx-dev-player-api)
4. [市场 API](./webshopx-dev-market-api)
5. [后台 API](./webshopx-dev-admin-api)
6. [枚举、错误码与幂等](./webshopx-dev-enums-errors-idempotency)
7. [上传与静态资源](./webshopx-dev-uploads-static)
8. [接入实施清单](./webshopx-dev-integration-playbook)
:::

## 快速结论

| 项 | 结论 |
| --- | --- |
| 数据格式 | 全部 UTF-8 JSON |
| 成功状态码 | 常规 `200`，预检 `204` |
| 业务错误 | `400 + { error, message }` |
| 写接口建议 | 全量携带 `idempotencyKey` |

## 典型接入顺序

1. 登录拿 `sessionToken`
2. 拉基础元信息（币种、商品、规则）
3. 接订单与市场写接口（务必幂等）
4. 补通知、排行榜、后台能力

:::tip[实现建议]
把 `error` 作为前端分支主键，不要只靠 `message` 文案匹配。
:::
