---
id: webshopx-player-wallet-and-exchange
title: 钱包与兑换
sidebar_label: 钱包与兑换
sidebar_position: 3
---

# 钱包与兑换

WebShopX 使用双币钱包。理解这页后，你可以清楚知道“钱怎么加、怎么换、为什么会失败”。

:::info[本页导读]
- 双币模型与余额读取
- 兑换方向与计算公式
- Vault 经济挂接行为
- 典型错误码排查
:::

## 1. 双币模型

| 币种 | 说明 |
| --- | --- |
| `SHOP_COIN` | 商城币，常用于官方商店支付 |
| `GAME_COIN` | 游戏币，可选接 Vault 经济插件 |

余额读取入口：

- `GET /api/wallet`
- Web 前端钱包页

## 2. 兑换方向与开关

服务器可分别配置两条方向：

- `SHOP_COIN -> GAME_COIN`
- `GAME_COIN -> SHOP_COIN`

每条方向都有：

- `enabled`
- `ratio`

方向未开启时会返回 `exchange_disabled`。

## 3. 兑换计算公式

服务端按以下规则计算：

`converted = floor(amount * ratio)`

如果 `converted <= 0`，会返回 `invalid_ratio`。

:::warning[实战建议]
当汇率较小、兑换金额又很小的时候，容易触发 `converted=0`。先提高兑换数量再试。
:::

## 4. 幂等与重复提交

`POST /api/wallet/exchange` 支持 `idempotencyKey`。

- 同一业务操作重试时，复用同一 key。
- 可以降低网络抖动导致的重复扣款风险。

## 5. Vault 挂接行为

当服务器启用 Vault 且成功获取经济提供器时：

- `GAME_COIN` 可与外部经济余额同步。
- 提供器不可用时可能返回：
  - `vault_unavailable`
  - `vault_error`

## 6. 常见错误码速查

| 错误码 | 常见原因 |
| --- | --- |
| `invalid_exchange` | from/to 相同或方向非法 |
| `invalid_amount` | 金额小于等于 0 |
| `exchange_disabled` | 该兑换方向未启用 |
| `invalid_ratio` | 汇率导致结果为 0 |
| `insufficient_funds` | 钱包余额不足 |
| `vault_unavailable` | Vault 或 provider 未就绪 |

## 7. 玩家排障顺序

1. 先看方向是否开启（`enabled=true`）。
2. 再看输入金额是否大于 0。
3. 检查余额是否充足。
4. 若是 `GAME_COIN` 问题，联系服主核查 Vault 提供器状态。
