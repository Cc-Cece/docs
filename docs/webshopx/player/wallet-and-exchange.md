---
id: wallet-and-exchange
title: 钱包与兑换
sidebar_label: 钱包与兑换
sidebar_position: 3
---

# 钱包与兑换

WebShopX 使用双币钱包。阅读这页后，你可以清楚知道“钱怎么加、怎么换、为什么会失败”。

:::info[本页导读]
- 双币模型与余额读取
- 兑换方向与计算公式
- Vault 经济挂接行为
- 典型错误码排查
:::

## 1. 双币模型

:::tip[提示]

本页的币种是默认币种，如果你的服务器不是它们，请以服务器为准，但本教程依旧可以参考。

:::

| 币种 | 符号 | 说明 |
| --- | --- | --- |
| `SHOP_COIN` | SC | 商城币，常用于官方商店支付 |
| `GAME_COIN` | GC | 游戏币，可选接 Vault 经济插件 |

你可以在web的账户->钱包查看到你的实时余额。

## 2. 兑换方向与开关

`SHOP_COIN`和`GAME_COIN` 在允许的条件下可进行兑换，兑换汇率由服务器管理员设定。

## 3. 兑换计算公式

服务端按以下规则计算：

`converted = floor(amount * ratio)`

如果 `converted <= 0`，会返回 `invalid_ratio`。

:::warning[实战建议]
当汇率较小、兑换金额又很小的时候，容易触发 `converted=0`。先提高兑换数量再试。
:::

## 4. Vault 挂接行为（可选）

:::tip[提示]
仅在插件成功检测到Vault时自动启用，管理员可在管理面板查看对接状态。
:::

当服务器启用 Vault 且成功获取经济提供器时：

- `GAME_COIN`余额 由Vault 接管。

## 5. 常见错误码速查

| 错误码 | 常见原因 |
| --- | --- |
| `invalid_exchange` | from/to 相同或方向非法 |
| `invalid_amount` | 金额小于等于 0 |
| `exchange_disabled` | 该兑换方向未启用 |
| `invalid_ratio` | 汇率导致结果为 0 |
| `insufficient_funds` | 钱包余额不足 |
| `vault_unavailable` | Vault 或 provider 未就绪 |

## 6. 玩家排障顺序

1. 先看兑换方向是否开启（`enabled=true`）。
2. 再看输入金额是否大于 0。
3. 检查余额是否充足。
4. 若是 `GAME_COIN` 问题，联系服主核查 Vault 提供器状态。
