---
id: webshopx-player-notifications-and-leaderboard
title: 通知与排行榜
sidebar_label: 通知与排行榜
sidebar_position: 11
---

# 通知与排行榜

这页讲“系统如何告诉你发生了什么”，以及“排行榜数据从哪来、怎么排序”。

:::info[本页导读]
- 通知接口与常见来源
- 排行榜配置字段
- 指标、排序、返回字段
- 关闭场景与报错
:::

## 1. 通知系统

你可以通过通知接口查看：

- 列表（支持游标分页）
- 未读数量
- 标记已读（单条或全部）

常见入口：

- `GET /api/notifications/list`
- `GET /api/notifications/unread-count`
- `POST /api/notifications/mark-read`

### 1.1 通知常见来源

- 成交/下单结果
- 出价变化（例如被超价）
- 待领取提醒
- 系统公告

## 2. 排行榜配置

`GET /api/leaderboard/config` 会返回：

- `enabled`
- `showOnlineStatus`
- `defaultMetric`
- `defaultOrder`

## 3. 排行榜指标与排序

| 维度 | 支持值 |
| --- | --- |
| 指标 `metric` | `GAME_COIN` / `SHOP_COIN` / `ONLINE_TIME` |
| 排序 `order` | `DESC` / `ASC` |

## 4. 常见返回字段

| 字段 | 含义 |
| --- | --- |
| `rank` | 排名 |
| `username` | 玩家名 |
| `shopCoin` | 商城币余额（指标相关时） |
| `gameCoin` | 游戏币余额（指标相关时） |
| `onlineTimeMinutes` | 在线分钟数（在线时长指标） |
| `score` | 当前指标分值 |
| `online` | 在线状态（取决于 showOnlineStatus） |
| `myRank` | 当前用户名次 |

## 5. 你可能遇到的情况

- 若服主关闭排行榜（`enabled=false`），列表接口会返回 `feature_disabled`。
- 在线状态展示受 `showOnlineStatus` 控制，不一定总会返回在线信息。

## 6. 使用建议

1. 前端做未读数轮询时，频率不要太高。
2. 排行榜页先读 config，再决定默认 metric/order。
3. 对 `feature_disabled` 做优雅降级（隐藏入口而不是报错弹窗）。
