---
id: webshopx-dev-auth-session
title: 认证与会话
sidebar_label: 认证与会话
sidebar_position: 3
---

# 认证与会话

## 1. 玩家登录

- `POST /api/auth/login`

请求：

```json
{
  "identifier": "player_name_or_uuid",
  "password": "your_password"
}
```

兼容字段：`identifier` 缺失时可用 `username`。

返回：

- `sessionToken`
- `expiresAt`
- `user`
- `username`
- `boundUuid`

## 2. 玩家会话接口

- `GET /api/auth/me`
- `POST /api/auth/logout`

注意：`/api/auth/logout` 仅读取 `Authorization` 头部 token。

## 3. 管理员登录

- `POST /api/admin/auth/login`

返回为玩家会话字段 + `admin` 资料（角色、权限、是否 super admin）。

## 4. 鉴权提取顺序

源码 `requireAuth(exchange, payload)` 行为：

1. 优先读 `Authorization: Bearer <token>`
2. 其次读 body `sessionToken`

缺失 token：`auth_required`

无效或过期：`auth_invalid`

## 5. token 生命周期

- 登录时按 `sessionExpireHours` 生成到期时间
- 过期后需重新登录
- 重置密码、管理员强制下线会清除该用户全部 session

## 6. 用户名与密码校验

- 用户名正则：`^[A-Za-z0-9_]{3,32}$`
- 密码长度：`8..64`

常见错误：

- `invalid_username`
- `invalid_password`
- `invalid_credentials`
- `username_exists`
