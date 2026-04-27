# Troubleshooting

[Back to Home](./Home)

> For real-time help, you can join the [QQ Group](https://qun.qq.com/universal-share/share?ac=1&authKey=EMHvFOsEqOBnEQi%2FJZtN%2BFwamTisdy0A02IwhRsxJG8t9GWK4uKs2G4CgZpT3yHW&busi_data=eyJncm91cENvZGUiOiI2MzY4MDMzNzIiLCJ0b2tlbiI6ImlpV3lHR3BFT3NvdWxUYysrSnFBN3lSWGRGU1BlTmF4a3FJSnNXeFBNZkI0emZRVDUxdCszbzdEc1NzUlNDTS8iLCJ1aW4iOiI5NTg2MzAxNDYifQ%3D%3D&data=8nepSQv0_dZIm_ZCWW-lPMXP8xlcFXyNWUolkq1DvckJaLbB0JYLVwmuOfmH0Z7mKXGgRx6yhwpi9bjWCvi66Q&svctype=4&tempid=h5_group_info).

## 1. Startup Failures

### 1.1 Database Placeholder Values Not Updated

Symptom: plugin disables itself after startup, logs indicate default DB config.

Check: verify whether `database.*` in `config.yml` still uses placeholders.

Fix: fill in actual database address/account/password and restart.

### 1.2 Port Conflict

Symptom: embedded HTTP service fails to start.

Check: whether `webshop.embedded-http.port` is already occupied.

Fix: change port or free the occupying process.

### 1.3 Invalid Timezone Config

Symptom: startup error `Invalid webshop.time-zone`.

Fix: use a valid timezone ID, such as `Asia/Shanghai` or `UTC`.

## 2. Login and Session Issues

### 2.1 Cannot Open Web Page

Symptom: page cannot be opened in browser.

Checks:

- Is the plugin started normally? (run `/plugins` and verify `webshopx` is enabled)
- Is the port blocked by firewall/port-forwarding/network settings?

### 2.2 Cannot Log In on Web

Checks:

- Did you run `/ws password <new-password>` in game first?
- Is username your current Minecraft username?
- Does password length satisfy 8-64?

### 2.3 API Returns `auth_invalid` / `auth_required`

Cause: session token missing, expired, or malformed.

Fix:

- Verify request header `Authorization: Bearer <token>`
- Log in again to obtain a new token

## 3. Wallet and Exchange Issues

### 3.1 Exchange Failed with `exchange_disabled`

Cause: this exchange direction is not enabled in config.

### 3.2 `insufficient_funds`

Cause: insufficient balance.

### 3.3 Vault-Related Exceptions

Symptom: `vault_unavailable` or `vault_error`.

Check:

- Is Vault installed and enabled?
- Is an economy provider available?

## 4. Order and Delivery Issues

### 4.1 Order Not Received After Purchase

Check order status.

Run:

```text
/ws claim all
```

Then verify:

- Whether order is in `WAIT_CLAIM`
- Whether inventory is full
- Whether auto-refund already happened

### 4.2 Refund Failed

Common causes:

- Status not allowed (not in `PENDING/WAIT_CLAIM`)
- Cooldown window exceeded
- Group-buy voucher already redeemed

## 5. Market Issues

### 5.1 Listing Failed

Common errors:

- `not_bound`: account not bound
- `listing_limit`: listing limit reached
- `invalid_item` / `invalid_price`

### 5.2 Supply-Chest Errors

- `supply_missing`: container invalid or inaccessible
- `sync_timeout` / `sync_interrupted`: sync operation timed out or interrupted

Fix:

1. Check whether the container exists and is accessible.
2. Check main-thread load (TPS).
3. Refresh supply manually or rebind.

### 5.3 Auction Funds Issues

- Bid funds are frozen.
- Outbid funds should be auto-returned.
- If not returned in time, check logs for bid/refund exceptions.

## 6. Admin Issues

### 6.1 Login Succeeds but API Returns `forbidden`

Meaning: logged in, but missing required fine-grained admin permission.

Fix: have a super admin review and adjust `AdminPermission`.

### 6.2 Admin Was Disabled by Mistake

If only one super admin remains in the system, it cannot be disabled.

## 7. Web Deployment Issues (`external` mode)

### 7.1 Blank Page or API 404

Check:

- Is `webshop.server-mode` set to `external`?
- Are static assets hosted correctly from plugin export directory?
- Is `/api/` reverse proxy configured correctly?

### 7.2 Client CORS Errors

Embedded CORS allows `*`. If errors persist, the proxy layer often overrides response headers.

## 8. Recommended Troubleshooting Order

1. Check plugin logs (including files under `webshop.logging.*`).
2. Check DB connection and schema.
3. Verify `/health`.
4. Verify player login flow.
5. Verify key APIs for orders, market, and admin.

## 9. Suggested Information for Issue Reports

Submit feedback: [WebShopX-Issues](https://github.com/Cc-Cece/WebShopX-Issues/issues/new/choose)

When reporting, include:

- WebShopX version
- Server version (Paper/Spigot)
- Java version
- Relevant config snippets (masked)
- Error logs and reproduction steps

## 10. Related Docs

- [Installation and Deployment](./Installation-and-Deployment)
- [API Reference](./API-Reference)
- [Database Schema](./Database-Schema)
