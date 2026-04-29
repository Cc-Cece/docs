---
id: overview
title: 总览
sidebar_label: 总览
sidebar_position: 1
---

# WebShopX 服主文档

## 问题反馈

- Issues 仓库：https://github.com/Cc-Cece/WebShopX-Issues

本目录面向插件安装者、运维与后台管理员。

:::info[阅读地图]
1. [安装与部署](./install-deploy)
2. [配置与运行时参数](./configuration)
3. [命令与权限体系](./commands-permissions)
4. [市场治理与风控](./governance)
5. [发货、领取与退款运维](./delivery-refund-ops)
6. [运维排障手册](./faq)
:::

## 一眼看懂 WebShopX 拓扑

| 组件 | 说明 |
| --- | --- |
| 插件进程 | 内置 API 服务，可选托管静态页 |
| MySQL/MariaDB | 核心业务数据存储 |
| Vault（可选） | `GAME_COIN` 经济挂接 |
| Redis（可选） | 集群配置刷新与市场广播 |

## 你最需要先关心的风险点

:::warning[高危配置提醒]
1. 不要保留默认数据库占位值（`127.0.0.1:3306/webshop/webshop/change_me`），插件会拒绝启动。
2. 生产环境建议首启后立刻替换 `admin-bootstrap` 初始密码。
3. 开启集群时，`cluster.role=node` 不会启动 Web/API，这是设计行为。
:::

## 运维节奏建议

1. 先把“可启动、可登录、可下单”跑通。
2. 再调费率、限制规则、广播策略。
3. 最后做高并发与故障场景回归（退款、领取、补货、集群同步）。

