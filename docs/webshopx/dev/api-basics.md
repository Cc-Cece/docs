---
id: webshopx-dev-api-basics
title: API 基础协议
sidebar_label: API 基础协议
sidebar_position: 2
---

# API 基础协议

这页定义 WebShopX API 的传输、鉴权和响应约定。

:::info[本页导读]
- 监听模式与可用性
- CORS/预检行为
- 状态码与错误结构
- 时间字段注意事项
:::

## 1. 服务监听与模式

- 内置监听：`webshop.embedded-http.host:port`（默认 `0.0.0.0:8819`）
- `server-mode=internal`：插件托管 API + 静态资源
- `server-mode=external`：插件只提供 API，静态由外部托管
- `cluster.role=node`：不启动内置 Web/API

## 2. CORS 与预检

固定返回头：

- `Access-Control-Allow-Origin: *`
- `Access-Control-Allow-Headers: Content-Type, Authorization`
- `Access-Control-Allow-Methods: GET, POST, OPTIONS`

`OPTIONS` 预检返回 `204`。

## 3. 请求与响应格式

- 请求体：UTF-8 JSON 对象
- 返回体：UTF-8 JSON

统一错误结构：

```json
{
  "error": "error_code",
  "message": "error message"
}
```

## 4. HTTP 状态码约定

| 状态码 | 含义 |
| --- | --- |
| `200` | 成功 |
| `204` | 预检成功 |
| `400` | 业务异常（`ServiceException`） |
| `404` | API 或静态资源不存在 |
| `405` | 方法不允许 |
| `500` | 服务端内部错误 |

## 5. 时间字段与时区

当前实现中存在两类时间输出：

- `LocalDateTime#toString()`（无偏移）
- 业务时区格式（如拍卖时间，受 `webshop.time-zone` 影响）

建议前端做统一解析容错。

## 6. 健康检查

- `GET /health`

返回示例：

```json
{
  "status": "ok",
  "time": "2026-04-29T10:00:00"
}
```
