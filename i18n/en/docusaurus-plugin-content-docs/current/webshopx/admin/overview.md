---
id: overview
title: Overview
sidebar_label: Overview
sidebar_position: 1
---

# WebShopX Server Owner Docs

This section is for plugin installers, operators, and admin-panel managers.

:::info[Reading Map]
1. [Install and Deploy](./install-deploy)
2. [Configuration and Runtime Parameters](./configuration)
3. [Commands and Permission System](./commands-permissions)
4. [Market Governance and Risk Control](./governance)
5. [Delivery, Claim, and Refund Operations](./delivery-refund-ops)
6. [Operations Troubleshooting FAQ](./faq)
:::

## WebShopX Topology at a Glance

| Component | Description |
| --- | --- |
| Plugin Process | Built-in API service, can optionally host static pages |
| MySQL/MariaDB | Core business data storage |
| Vault (Optional) | `GAME_COIN` economy integration |
| Redis (Optional) | Cluster config refresh and market broadcast |

## Risks You Should Prioritize First

:::warning[High-Risk Configuration Reminder]
1. Do not keep placeholder database values (`127.0.0.1:3306/webshop/webshop/change_me`), or the plugin will refuse to start.
2. In production, replace the initial `admin-bootstrap` password immediately after first startup.
3. In cluster mode, `cluster.role=node` will not start Web/API. This is expected by design.
:::

## Recommended Operations Rhythm

1. First, make sure "can start, can log in, can place orders" works.
2. Then tune fees, limitation rules, and broadcast strategy.
3. Finally run high-concurrency and failure-scenario regression (refund, claim, restock, cluster sync).

