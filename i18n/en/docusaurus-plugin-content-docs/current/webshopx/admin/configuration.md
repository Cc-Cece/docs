---
id: configuration
title: Configuration
sidebar_label: Configuration
sidebar_position: 3
---

# Configuration

:::info[In This Page]
- How to configure 1.1.5+
- How to read legacy config in 1.1.5 and below
- Field migration mapping
- Pre-production checklist for server owners
:::

## 1. Key Takeaways First (Must Read)

1. `1.1.5+`: `config.yml` mainly keeps runtime environment parameters (database, cluster, Redis, built-in Web/API startup).
2. `1.1.5 and below`: `config.yml` also contains many business-rule parameters (exchange, currencies, market tax, leaderboard, broadcast templates, etc.).
3. After upgrading to `1.1.5+`, many old fields moved to visual management in the Web admin panel. It is not recommended to keep maintaining these business items in `config.yml`.

## 2. New Configuration for 1.1.5+ (Recommended)

Below is a default-style example for server owners (personalized values removed):

```yaml
webshop:
  # internal=built-in Web+API; external=API backend only (frontend via external reverse proxy/CDN)
  server-mode: internal
  # In external mode, set full public URL; can be empty in internal mode
  api-base-url: ''
  admin-bootstrap:
    # Auto-create admin at first startup; set false after production is stable
    enabled: true
    # First admin username
    username: admin
    # First admin password (must be changed to a strong password)
    password: change-me
    # Initial role, usually keep SUPER_ADMIN
    role: SUPER_ADMIN
  embedded-http:
    # Built-in HTTP listen address; 0.0.0.0 means all interfaces
    host: 0.0.0.0
    # Built-in Web/API port
    port: 8819
    # Static resource directory (relative to plugin directory)
    static-root: web

economy:
  inflation-control:
    # burn=remove from economy; treasury=move into treasury account (depends on plugin implementation)
    mode: burn
    # Treasury user ID (effective when mode=treasury)
    treasury-user-id: 0

database:
  # Database host (LAN address or localhost recommended)
  host: 127.0.0.1
  port: 3306
  # Database schema
  schema: webshopx
  # DB user (least privilege recommended)
  username: root
  # DB password (do not commit to public repositories)
  password: change-me
  # Enable TLS or not
  use-ssl: false
  # Non-TLS compatibility option for MySQL8/MariaDB (enable if needed)
  allow-public-key-retrieval: true
  # Optional: server RSA public key file path or PEM text
  server-rsa-public-key-file: ''
  # Connection pool size (small server 5-10, tune for concurrency on large servers)
  pool-size: 10

cluster:
  # standalone=single server; master/node=multi-node
  role: standalone
  # Unique current node ID (must be unique in multi-node setup)
  server-id: standalone
  # Node presence TTL in seconds
  presence-ttl-seconds: 120

redis:
  # Can be off in single-server setup; recommended on for cross-server broadcast/multi-node
  enabled: false
  host: 127.0.0.1
  port: 6379
  # Redis password; empty if no password
  password: ''
  # Market broadcast channel
  broadcast-channel: webshopx:market:broadcast
  # Cluster event channel (config refresh, node sync, etc.)
  cluster-channel: webshopx:cluster:event
  # Legacy compatible field (can match broadcast-channel)
  channel: webshopx:market:broadcast
```

### 2.1 Key Field Notes

Field explanations are already included as YAML comments above. Fill values field by field following those comments.

### 2.2 New Configuration Principles

1. Keep only runtime parameters in `config.yml`.
2. Prefer editing business rules in Web admin (currencies, exchange, market tax, leaderboard, etc.).
3. Never commit real database passwords to Git repositories.

## 3. Legacy Config in 1.1.5 and Below (For Identification)

In older versions, these business fields are common (and usually moved to admin panel in newer versions):

- `exchange.*`
- `currency.*`
- `economy.market.trade-fee-percent / trade-tax-percent`
- `webshop.leaderboard.*`
- `webshop.market.*`
- `webshop.broadcast.*`
- `sample-products`

If you still maintain old versions, these fields may still work. For `1.1.5+`, migrate using the new management model.

## 4. Old vs New Field Mapping (Migration Focus)

| Old field (1.1.5 and below) | Recommendation in 1.1.5+ |
| --- | --- |
| `exchange.*` | Move to Web admin management |
| `currency.*` | Move to Web admin management |
| `economy.market.trade-fee-percent` | Move to Web admin management |
| `economy.market.trade-tax-percent` | Move to Web admin management |
| `webshop.leaderboard.*` | Move to Web admin management |
| `webshop.market.*` | Prefer admin-panel config (based on version capability) |
| `webshop.broadcast.*` | Prefer admin-panel config first; fall back to runtime config if needed |
| `sample-products` | No longer a primary config entry; maintain products in admin panel |

## 5. Upgrade Steps for Server Owners (Old -> New)

1. Back up old `config.yml` first (recommended rename: `config.legacy.bak.yml`).
2. Start with minimal new config (ensure database, ports, and admin bootstrap are usable).
3. Log in to admin panel and restore business settings one by one (currencies, exchange, taxes, leaderboard, etc.).
4. Remove or comment legacy business fields to avoid ambiguity from duplicate config sources.

## 6. Pre-Launch Checklist

1. Default admin password has been changed.
2. `database` account has only required privileges.
3. No production passwords were committed to public repositories.
4. Cluster mode was not enabled accidentally on a single server.
5. If cross-server broadcast is needed, Redis and channel names are consistent.

