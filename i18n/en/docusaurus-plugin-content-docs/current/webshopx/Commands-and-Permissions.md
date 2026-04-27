# Commands and Permissions

[Back to Home](./Home)

## Root Command

- Main command: `/webshopx`
- Alias: `/ws`

## Player Commands

### Help

```text
/ws help
```

Shows basic command help.

### Set Web Login Password (Bind Account)

```text
/ws password <new-password>
```

- Can only be executed in-game.
- Password length requirement: 8-64.
- Username is the player's current Minecraft name.

### Market GUI and Listing

```text
/ws market #open GUI
/ws market gui #open GUI
/ws market sell <price> [amount] [currency] #list via command
/ws market logs [count] #view recent seller trade records
```

### Claim Pending Deliveries

```text
/ws claim
/ws claim all #claim all pending deliveries at once
/ws claim ODR-...
/ws claim MKT-...
/ws claim CLM-...
/ws claim MCL-...
```

- `ODR-...`: claim only by official order number.
- `MKT-...`: claim only by market trade number.
- `CLM-...`: official order claim code.
- `MCL-...`: market trade claim code.

Whether shared claim is allowed is controlled by `webshop.allow-shared-claim-command`.

## Admin Commands

### Reload Config and Web Assets

```text
/ws reload
```

Requires `webshop.admin` permission.

### Create Redeem Code

```text
/ws redeem create <shopCoin> <gameCoin> [maxUses] [perUserMaxUses] [minutes] [code]
```

Requires `webshop.admin` permission.

## Permission Nodes

### Bukkit Permissions

- `webshop.use`
  - default: `true`
  - standard player usage permission
- `webshop.admin`
  - default: `op`
  - admin command and admin console entry permission

### Admin Fine-Grained Permissions (`AdminPermission`)

After admin login, a second-layer permission check is applied:

- `REDEEM_MANAGE`: redeem code management
- `PRODUCT_MANAGE`: product management
- `PRODUCT_ZERO_PRICE`: allow zero-price products
- `ORDER_VIEW`: view orders
- `ECONOMY_MANAGE`: economy settings
- `MARKET_MANAGE`: market management
- `USER_SUPPORT`: user support (reset password / unbind / force logout / wallet adjust)
- `AUDIT_VIEW`: audit log access

## Built-In Role Templates

- `SUPER_ADMIN`
- `SHOP_ADMIN`
- `MARKET_MODERATOR`
- `SUPPORT_ADMIN`
- `AUDITOR`

Super admins can edit admin accounts, permissions, and templates from the admin console.

## Common Error Tips

- No permission: check `webshop.admin` and fine-grained admin permissions.
- Command can only run in-game: execute in game (for `password` / `market` / `claim`).

## Related Docs

- [Player Guide](./Player-Guide)
- [Admin Guide](./Admin-Guide)
- [API Reference](./API-Reference)
