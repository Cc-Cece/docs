---
id: webshopx-player-quick-start
title: 快速上手
sidebar_label: 快速上手
sidebar_position: 2
---

# 快速上手

这页目标很简单：10 分钟内完成账号准备并成功进入 WebShopX。

:::info[本页导读]
- 第 1 部分：首登前 3 步
- 第 2 部分：账号与密码规则（源码校验）
- 第 3 部分：会话与常见报错
:::

## 1. 首登前 3 步

1. 在游戏内执行：

```text
/ws password <你的新密码>
```

2. 用同一账号和密码登录 Web 页面。
3. 登录后先看钱包余额，再进入商店或市场。

## 2. 账号与密码规则（源码）

| 项目 | 规则 |
| --- | --- |
| 用户名 | `^[A-Za-z0-9_]{3,32}$` |
| 密码长度 | `8..64` |
| 登录标识 | `identifier` 支持“用户名或已绑定 UUID” |
| 兼容字段 | `identifier` 缺失时可用 `username` |

:::tip[为什么我游戏名能用]
`/ws password` 会把你的游戏角色绑定到 Web 账号，因此你可以用玩家名登录。
:::

## 3. 会话机制（session）

登录成功后，服务端会返回：

- `sessionToken`
- `expiresAt`
- `user` / `username` / `boundUuid`

鉴权优先级：

1. `Authorization: Bearer <token>`
2. 请求体 `sessionToken`

## 4. 新手常用命令

```text
/ws market
/ws claim
/ws mailbox claim
```

## 5. 常见错误与处理

| 错误码 | 含义 | 处理建议 |
| --- | --- | --- |
| `invalid_username` | 用户名格式不合法 | 检查长度和字符（字母/数字/下划线） |
| `invalid_password` | 密码长度不合法 | 改为 8 到 64 位 |
| `username_exists` | 用户名冲突 | 更换用户名并重试 |
| `invalid_credentials` | 登录凭证错误 | 核对账号、密码、大小写 |
| `auth_invalid` | 会话失效或过期 | 重新登录获取新 token |

<details>
  <summary>排障顺序（建议）</summary>

1. 先确认你是否在游戏里执行过 `/ws password`。
2. 再确认密码长度是否满足 8 到 64。
3. 若网页提示会话失效，先完整退出再重新登录。

</details>
