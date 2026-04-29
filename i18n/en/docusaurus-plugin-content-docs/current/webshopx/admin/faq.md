---
id: faq
title: FAQ
sidebar_label: FAQ
sidebar_position: 7
---

# FAQ

## 1. Plugin Fails to Start

### 1.1 Default Database Placeholders Not Replaced

Symptom: plugin is disabled right after startup.

Fix: set real values for `database.*`.

### 1.2 RSA Public Key Cannot Be Retrieved

:::tip[Tip]
This issue is generally fixed after v1.1.3.
:::

Symptom: startup shows errors like:

```text
[12:29:17 ERROR]: [WebShopX] WebShopX failed to start
com.zaxxer.hikari.pool.HikariPool$PoolInitializationException: Failed to initialize pool: RSA public key is not available client side (option serverRsaPublicKeyFile not set)
...
```

Cause: DB uses `caching_sha2_password`, but WebShopX embedded driver cannot fetch server public key during secure connection setup.

Workaround: switch the account to `mysql_native_password` (temporary, plugin upgrade recommended):

```sql
mysql -u root -p

-- 1. Ensure user_01 uses legacy authentication
ALTER USER 'user_01'@'localhost' IDENTIFIED WITH mysql_native_password BY 'admin123';

-- 2. Refresh privileges
FLUSH PRIVILEGES;
```

## 2. API Works but Web Page Cannot Open

Check first:

1. Is `server-mode` set to `external` (this mode does not host pages)?
2. Is `embedded-http.static-root` correctly hosted by your web server?
3. Are reverse-proxy routes and MIME settings correct?

## 3. A Node Has No Web/API

If `cluster.role=node`, not starting Web/API is expected behavior.

## 4. Players Report `GAME_COIN` Issues

Common cause: Vault not mounted or economy provider unavailable.

Troubleshooting:

1. Is Vault plugin installed and enabled?
2. Can `Economy` provider be obtained?
3. Do balance read/write operations fail with `vault_error`?

## 5. Frequent `listing_unavailable` in Market

Common root causes:

- Supply chest is unreachable (world/coordinate container invalid)
- Listing is paused
- Stock is 0 and restock failed

Suggestions:

- Check SUPPLY source container status
- Check `marketRuntime.supply` config
- Use restock refresh API to verify restock pipeline

## 6. Refund Dispute Handling

1. Verify order status and `refund_deadline`.
2. Verify current value of `refundUndeliveredEnabled`.
3. Verify whether order is already `DELIVERED` or voucher `CONSUMED`.
4. If needed, replay admin operations via audit logs.

## 7. Admin Permission Anomalies

Symptom: admin can log in, but action is rejected as `forbidden`.

Fix:

- Check the admin's `permissions`
- Check whether action requires super-admin
- Check whether account is disabled

## 8. Recommended Daily Checks

1. Check abnormal peaks in admin audit logs daily.
2. Check `WAIT_CLAIM` and `mailbox` backlog daily.
3. Before major promotions, make a config snapshot and rollback plan.

