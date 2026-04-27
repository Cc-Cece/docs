# Admin Guide

[Back to Home](./Home)

> This page is still being expanded.

## 1. Admin Entry

- Page: `/admin.html`

Admin login uses web account/password, but the account must also exist in admin records (`web_admins`).

## 2. First Admin Bootstrap

`config.yml` enables this by default:

```yaml
webshop:
  admin-bootstrap:
    enabled: true
    username: admin
    password: admin123456
    role: SUPER_ADMIN
```

Recommendations:

1. Change password immediately after first login.
2. In production, disable or replace default bootstrap account.

## 3. Permission System

### 3.1 Admin Permissions

- `REDEEM_MANAGE`
- `PRODUCT_MANAGE`
- `PRODUCT_ZERO_PRICE`
- `ORDER_VIEW`
- `ECONOMY_MANAGE`
- `MARKET_MANAGE`
- `USER_SUPPORT`
- `AUDIT_VIEW`

### 3.2 Role Templates

- `SUPER_ADMIN`
- `SHOP_ADMIN`
- `SUPPORT_ADMIN`
- `MARKET_MODERATOR`
- `AUDITOR`

The admin console supports a combined model: template + custom permissions per admin account.

### 3.3 Super Admin Capabilities

Super admins can use:

- Admin metadata: `GET /api/admin/admin-users/meta`
- Admin list: `GET /api/admin/admin-users/list`
- Admin upsert: `POST /api/admin/admin-users/upsert`
- Enable/disable admin: `POST /api/admin/admin-users/active`

## 4. Main Admin Modules

### 4.1 Redeem Code Management

### 4.2 Product Management

### 4.3 Order Management

### 4.4 Economy Parameter Management

### 4.5 Market Management

### 4.6 User Support

- Reset password
- Unbind account
- Force logout
- Wallet adjustment

### 4.7 Audit Logs

- Query audit records

All critical admin actions record operator, action, target, and source IP.

## 5. Product Configuration Suggestions

### 5.1 Product Type Selection

- Command-based
- Item delivery
- Potion effect delivery
- Recycle
- Group-buy voucher

### 5.2 Dynamic Pricing Suggestions

- Enable dynamic pricing only for `GIVE_ITEM` / `RECYCLE_ITEM`.
- Set `dynamic_floor_price` and `dynamic_cap_price` to limit price volatility.
- Watch `dynamic_demand_score` to evaluate market heat changes.

## 6. User Support SOP

1. Use `lookup` first to verify user and binding status.
2. Perform reset/unbind/force logout only when necessary.
3. Always provide clear `reason` for wallet adjustments for audit clarity.
4. For disputed orders, check order status and delivery queue status first.

## 7. Security and Audit Suggestions

- Use strong passwords for super admin accounts and strictly limit personnel.
- Review admin permissions regularly and apply least privilege.

## 8. Related Docs

- [Commands and Permissions](./Commands-and-Permissions)
- [API Reference](./API-Reference)
- [Troubleshooting](./Troubleshooting)
