---
id: configuration
title: 配置
sidebar_label: 配置
sidebar_position: 3
---

# 配置

:::info[本页导读]
- 1.1.5+ 新配置怎么改
- 1.1.5 及以下 旧配置怎么看
- 新旧字段迁移对照
- 服主上线前检查清单
:::

## 1. 先看结论（服主必读）

1. `1.1.5+`：`config.yml` 主要保留“运行环境参数”（数据库、集群、Redis、内置 Web/API 启动）。
2. `1.1.5 及以下`：`config.yml` 同时包含大量“业务规则参数”（兑换、币种、市场税费、排行榜、广播模板等）。
3. 升级到 `1.1.5+` 后，很多旧字段已迁移到 Web 后台可视化管理，不建议继续在 `config.yml` 里维护这些业务项。

## 2. 1.1.5+ 新配置（推荐做法）

下面是面向服主的“默认风格示例”（已去掉个性化值）：

```yaml
webshop:
  # internal=插件内置 Web+API；external=只提供后端 API（前端走外部反代/CDN）
  server-mode: internal
  # external 模式建议填写完整公网地址；internal 可留空
  api-base-url: ''
  admin-bootstrap:
    # 首次启动自动创建管理员；上线稳定后可改为 false
    enabled: true
    # 首个管理员账号
    username: admin
    # 首个管理员密码（务必改成强密码）
    password: change-me
    # 初始角色，通常保持 SUPER_ADMIN
    role: SUPER_ADMIN
  embedded-http:
    # 内置 HTTP 监听地址；0.0.0.0 表示监听全部网卡
    host: 0.0.0.0
    # 内置 Web/API 端口
    port: 8819
    # 静态资源目录（相对插件目录）
    static-root: web

economy:
  inflation-control:
    # burn=回收销毁；treasury=进入国库账户（按插件实现）
    mode: burn
    # 国库用户 ID（mode=treasury 时生效）
    treasury-user-id: 0

database:
  # 数据库地址（推荐内网地址或本机）
  host: 127.0.0.1
  port: 3306
  # 数据库名
  schema: webshopx
  # 数据库账号（建议最小权限）
  username: root
  # 数据库密码（不要提交到公开仓库）
  password: change-me
  # 是否启用 TLS
  use-ssl: false
  # MySQL8/MariaDB 非 TLS 兼容项（按需开启）
  allow-public-key-retrieval: true
  # 可选：服务端 RSA 公钥文件路径或 PEM 文本
  server-rsa-public-key-file: ''
  # 连接池大小（小服 5-10，大服按并发调优）
  pool-size: 10

cluster:
  # standalone=单服；master/node=多节点
  role: standalone
  # 当前节点唯一 ID（多节点必须唯一）
  server-id: standalone
  # 节点在线状态 TTL（秒）
  presence-ttl-seconds: 120

redis:
  # 单服可关；跨服广播/多节点建议开
  enabled: false
  host: 127.0.0.1
  port: 6379
  # Redis 密码，无密码留空
  password: ''
  # 市场广播频道
  broadcast-channel: webshopx:market:broadcast
  # 集群事件频道（配置刷新、节点同步等）
  cluster-channel: webshopx:cluster:event
  # 兼容旧字段（可与 broadcast-channel 保持一致）
  channel: webshopx:market:broadcast
```

### 2.1 关键字段说明

字段说明已集成在上方 YAML 注释中，按注释逐项填写即可。

### 2.2 新版配置原则

1. `config.yml` 只放运行参数。
2. 业务规则优先在 Web 后台改（币种、兑换、市场税费、排行榜等）。
3. 不把数据库真实密码提交到 Git 仓库。

## 3. 1.1.5 及以下 旧配置（识别用）

旧版里常见这类业务字段（新版通常已迁移到后台）：

- `exchange.*`
- `currency.*`
- `economy.market.trade-fee-percent / trade-tax-percent`
- `webshop.leaderboard.*`
- `webshop.market.*`
- `webshop.broadcast.*`
- `sample-products`

如果你还在维护旧版本，以上字段仍可能有效；但对 `1.1.5+`，请按新版管理方式迁移。

## 4. 新旧字段对照（迁移重点）

| 旧版字段（1.1.5 及以下） | 1.1.5+ 建议 |
| --- | --- |
| `exchange.*` | 改到 Web 后台管理 |
| `currency.*` | 改到 Web 后台管理 |
| `economy.market.trade-fee-percent` | 改到 Web 后台管理 |
| `economy.market.trade-tax-percent` | 改到 Web 后台管理 |
| `webshop.leaderboard.*` | 改到 Web 后台管理 |
| `webshop.market.*` | 以后台配置为准（按版本能力） |
| `webshop.broadcast.*` | 优先后台配置；无对应项时再看运行配置 |
| `sample-products` | 不再作为主配置入口，建议后台维护商品 |

## 5. 服主升级步骤（旧 -> 新）

1. 先备份旧 `config.yml`（建议重命名为 `config.legacy.bak.yml`）。
2. 用新版最小配置启动（先保证数据库、端口、管理员引导可用）。
3. 登录后台，把币种/兑换/税费/排行榜等业务项逐项补回。
4. 完成后删除或注释旧版业务字段，避免“双份配置”产生歧义。

## 6. 上线前检查清单

1. 管理员默认密码是否已修改。
2. `database` 账号是否仅授予必要权限。
3. 是否误把生产密码写进公开仓库。
4. 单服是否误开集群模式。
5. 需要跨服广播时，Redis 和频道名是否一致。

