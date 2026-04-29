---
id: quick-start
title: Quick Start
sidebar_label: Quick Start
sidebar_position: 2
---

# Quick Start

Goal of this page is simple: prepare your account and enter WebShopX successfully in 3 minutes.

:::info[In This Page]
- Part 1: 3 steps before first login
- Part 2: Account and password rules (validated in source code)
- Part 3: Session and common errors
:::

## 1. First Login

1. Run this in game:

```text
/ws password <yourNewPassword>
```

2. Log in to the web page with the same account (default is your Minecraft username) and that password.

## 2. Commands

```text
/ws market
/ws claim
/ws mailbox claim
```

## 3. Common Errors and Fixes

| Error Code | Meaning | Suggested Fix |
| --- | --- | --- |
| `invalid_username` | Invalid username format | Check length and characters (letters/numbers/underscore) |
| `invalid_password` | Invalid password length | Change to 8-64 characters |
| `username_exists` | Username conflict | Use another username and retry |
| `invalid_credentials` | Wrong login credentials | Verify account, password, and case |
| `auth_invalid` | Session expired/invalid | Log in again for a new token |

<details>
  <summary>Recommended Troubleshooting Order</summary>

1. Confirm you already ran `/ws password` in game.
2. Confirm password length is between 8 and 64.
3. If web session is invalid, fully log out and log in again.

</details>

