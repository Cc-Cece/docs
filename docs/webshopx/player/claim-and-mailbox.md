---
id: claim-and-mailbox
title: 领取与信箱
sidebar_label: 领取与信箱
sidebar_position: 5
---

# 领取与信箱

:::warning[]

这不是你的错。本页内容还在评估，功能可能计划更新或移除，固内容仅供参考。

:::

当发货不能即时完成时，你会接触到 `claim` 和 `mailbox` 两条兜底链路。

:::info[本页导读]
- 什么情况下会进入手动领取
- claim token 前缀与命令过滤
- 共享领取开关
- 信箱回退与常见错误
:::

## 1. 什么时候需要手动领取

常见场景：

- 自动发货失败
- 发货状态进入 `WAIT_CLAIM`
- 市场成交需要你手动领取

## 2. 领取命令

```text
/ws claim
/ws claim all
/ws claim ODR-...
/ws claim MKT-...
/ws claim CLM-...
/ws claim MCL-...
```

## 3. token 与编号前缀

| 前缀 | 含义 |
| --- | --- |
| `ODR-` | 官方订单号 |
| `MKT-` | 市场交易号 |
| `CLM-` | 官方订单领取 token |
| `MCL-` | 市场成交领取 token |

`CLM-` / `MCL-` token 由 16 位可分享码组成，字符集不包含易混淆字符（例如 `I`、`O`）。

## 4. 共享领取开关

配置：`allow-shared-claim-command`

- `true`：允许代领
- `false`：仅本人可领，代领报 `claim_forbidden`

## 5. 信箱回退机制

当背包无法接收物品时，系统会写入游戏信箱而不是直接丢失：

```text
/ws mailbox claim
```

## 6. 常见错误码

| 错误码 | 说明 |
| --- | --- |
| `claim_token_invalid` | token 无效、过期、复制不完整或状态变化 |
| `claim_forbidden` | 尝试代领但服务器未开启共享领取 |

<details>
  <summary>如果你一直领不到，先做这 4 步</summary>

1. 检查 token 是否完整（含前缀）。
2. 优先尝试 `/ws claim all`。
3. 背包留空格后再领一次。
4. 仍失败时联系服主核查该订单/交易状态是否已变更。

</details>
