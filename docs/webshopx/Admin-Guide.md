---
sidebar_position: 7
---
# 后台管理指南

[返回首页](./Home)

> 本文有待补充

## 1. 管理后台入口

- 页面：`/admin.html`

管理员登录使用 Web 账号密码，但必须同时拥有后台管理员记录（`web_admins`）。

## 2. 首次管理员引导

`config.yml` 默认启用：

```yaml
webshop:
  admin-bootstrap:
    enabled: true
    username: admin
    password: admin123456
    role: SUPER_ADMIN
```

建议：

1. 首次登录后立即改密。
2. 生产环境关闭或替换默认引导账号。

## 3. 权限体系

## 3.1 后台权限

- `REDEEM_MANAGE`
- `PRODUCT_MANAGE`
- `PRODUCT_ZERO_PRICE`
- `ORDER_VIEW`
- `ECONOMY_MANAGE`
- `MARKET_MANAGE`
- `USER_SUPPORT`
- `AUDIT_VIEW`

## 3.2 角色模板

- `SUPER_ADMIN`
- `SHOP_ADMIN`
- `SUPPORT_ADMIN`
- `MARKET_MODERATOR`
- `AUDITOR`

支持在后台对管理员账号进行“模板 + 自定义权限”组合配置。

## 3.3 超管能力

超级管理员可使用：

- 管理员元数据：`GET /api/admin/admin-users/meta`
- 管理员列表：`GET /api/admin/admin-users/list`
- 管理员变更：`POST /api/admin/admin-users/upsert`
- 启用/禁用管理员：`POST /api/admin/admin-users/active`

## 4. 主要管理模块

### 4.1 兑换码管理

### 4.2 商品管理

### 4.3 订单管理

### 4.4 经济参数管理

### 4.5 市场管理

### 4.6 用户支持

- 重置密码
- 解绑账号
- 强制下线
- 钱包调账

### 4.7 审计日志

- 查询审计

所有关键后台动作都会记录操作人、动作、目标与来源 IP。

## 5. 商品配置建议

### 5.1 商品类型选择

- 指令型
- 发物品
- 发药水效果
- 回收
- 团购券

### 5.2 动态定价建议

- 仅对 `GIVE_ITEM` / `RECYCLE_ITEM` 启用动态定价。
- 设置 `dynamic_floor_price` 与 `dynamic_cap_price` 限制价格波动。
- 关注 `dynamic_demand_score`，判断市场热度变化。

## 6. 用户支持 SOP

1. 先 `lookup` 确认用户与绑定状态。
2. 仅在必要时执行重置密码/解绑/强制下线。
3. 调账时明确 `reason`，避免后续审计不清晰。
4. 对争议订单优先查看订单状态与发货队列状态。

## 7. 安全与审计建议

- 超级管理员账号启用高强度密码并限制人员。
- 定期审查管理员权限，最小权限分配。

## 8. 相关文档

- [命令与权限](./Commands-and-Permissions)
- [API 参考](./API-Reference)
- [故障排查](./Troubleshooting)
