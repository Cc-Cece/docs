---
id: webshopx-dev-uploads-static
title: 上传与静态资源
sidebar_label: 上传与静态资源
sidebar_position: 8
---

# 上传与静态资源

## 1. 上传接口清单

- 玩家挂单图标：`POST /api/market/icon/upload?listingId=...`
- 后台商品图标：`POST /api/admin/products/icon?productId=...`
- 后台材质图标：`POST /api/admin/material-overrides/icon?material=...`

## 2. 上传限制

统一限制：

- 最大体积：`2MB`
- 允许格式：`png`、`webp`、`jpg`、`jpeg`、`gif`

扩展名判定优先级：

1. query `filename`
2. header `X-File-Name`
3. header `Content-Type`

## 3. 请求方式

- 请求体直接发送文件字节流
- 非 multipart 上传
- 文件为空会返回 `bad_request`

## 4. 返回路径规则

上传后通常返回可直接访问的 `iconPath`，例如：

- `/uploads/listing-icons/...`
- `/uploads/product-icons/...`
- `/uploads/material-icons/...`

## 5. 旧图清理

当同一对象替换图标时，源码会尝试清理旧的“受管路径”文件，防止资源泄漏。

## 6. 静态资源与路由

- `server-mode=internal`：插件托管 `/` 静态页面
- `server-mode=external`：只提供 API；静态资源需外部托管

静态路由有目录穿越防护：包含 `..` 的路径会被拒绝。
