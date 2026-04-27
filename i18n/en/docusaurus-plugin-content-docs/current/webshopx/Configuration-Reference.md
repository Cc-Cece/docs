# Configuration Reference

[Back to Home](./Home)

> Main config file: `plugins/WebShopX/config.yml`
> This file already includes full Chinese comments. This page explains key parts only. The effective source of truth is `config.yml`.

## Reload and Effect

- Most settings support hot reload via `/ws reload`.

## Top-Level Structure

- `webshop.*`: web runtime, session, delivery, market, logging, admin bootstrap
- `database.*`: database connection pool
- `exchange.*`: dual-currency exchange (deprecated soon, use web console)
- `currency.*`: display names for currencies
- `economy.*`: market fee/tax settings (deprecated soon, use web console)
- `redis.*`: reserved settings (not wired to business logic in current version)
- `sample-products`: sample product definitions (deprecated soon, create products in web console)

## Key `webshop` Settings

### Web Runtime

- `webshop.server-mode`
  - `internal`: plugin serves API + static pages
  - `external`: API only, static resources exported for external hosting
- `webshop.api-base-url`
  - Commonly used in `external` mode as the frontend API base URL

### Session and Auth

- `webshop.session-expire-hours`: session TTL (hours)
- `webshop.bind-request-expire-minutes`: bind request TTL (minutes)
- `webshop.access-token-length`: token length (recommended 32-64)

### Time and Orders

- `webshop.time-zone`: business timezone (affects product schedule interpretation)
- `webshop.order-cooldown-seconds`: order cooldown window
- `webshop.refund-undelivered-enabled`: allow refunds for undelivered orders
- `webshop.allow-shared-claim-command`: allow shared/manual claim by claim code

### Delivery Loop

- `webshop.delivery-batch-size`: number of delivery tasks per cycle
- `webshop.delivery-retry-seconds`: retry interval after failures

### Player Market

- `webshop.market.max-active-listings`: default max active listings per player
- `webshop.market.supply.*`: supply-chest mode parameters
  - `auto-refresh-threshold`
  - `default-transfer-batch-size`
  - `max-transfer-batch-size`
  - `default-transit-stock`
  - `max-transit-stock`

### Maintenance Cleanup

- `webshop.maintenance.cleanup-interval-minutes`
- `webshop.maintenance.pending-bind-retention-hours`
- `webshop.maintenance.pending-password-retention-hours`
- `webshop.maintenance.bind-request-retention-hours`
- `webshop.maintenance.redeem-code-retention-days`

### Logging

- `webshop.logging.enabled`
- `webshop.logging.level`: `ERROR | WARN | INFO | DEBUG | TRACE`
- `webshop.logging.directory`
- `webshop.logging.max-file-size-mb`
- `webshop.logging.max-files`
- `webshop.logging.retention-days`

### Admin Bootstrap

- `webshop.admin-bootstrap.enabled`
- `webshop.admin-bootstrap.username`
- `webshop.admin-bootstrap.password`
- `webshop.admin-bootstrap.role` (for example `SUPER_ADMIN`)

### Embedded HTTP

- `webshop.embedded-http.host`
- `webshop.embedded-http.port`
- `webshop.embedded-http.static-root`

## `database` (Must Be Correct)

- `database.host`
- `database.port`
- `database.schema`
- `database.username`
- `database.password`
- `database.use-ssl`
- `database.pool-size`

Note: placeholder defaults trigger protection checks and block normal startup.

## `exchange` Dual-Currency Exchange

- `exchange.shopcoin-to-gamecoin.enabled`
- `exchange.shopcoin-to-gamecoin.ratio`
- `exchange.gamecoin-to-shopcoin.enabled`
- `exchange.gamecoin-to-shopcoin.ratio`

Exchange is directional. If one direction is disabled, related APIs return `exchange_disabled`.

## `currency` Display Names

- `currency.shopcoin.name`
- `currency.shopcoin.short`
- `currency.gamecoin.name`
- `currency.gamecoin.short`

These affect display only and do not change enum values.

## `economy` Market Economy

### Market Costs

- `economy.market.trade-fee-percent`: seller-side fee
- `economy.market.trade-tax-percent`: buyer-side tax

Both can be changed dynamically in admin settings and are applied separately during market settlement.

### Inflation Control

- `economy.inflation-control.mode`
  - `burn`: destroy currency
  - `treasury`: send to treasury account
- `economy.inflation-control.treasury-user-id`

## `redis` (Reserved)

- `redis.enabled`
- `redis.host`
- `redis.port`

Current version does not wire Redis into production business flow yet.

## Vault Integration Notes

- When Vault + an economy provider is available, `GAME_COIN` balance is read from Vault and mirrored to local wallet tables.
- When Vault is unavailable, `GAME_COIN` uses local wallet fields.

## Related Docs

- [Installation and Deployment](./Installation-and-Deployment)
- [API Reference](./API-Reference)
- [Troubleshooting](./Troubleshooting)
