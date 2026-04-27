---
sidebar_position: 10
---
# 故障排查

[返回首页](./Home)

>可以加入 [QQ群](https://qun.qq.com/universal-share/share?ac=1&authKey=EMHvFOsEqOBnEQi%2FJZtN%2BFwamTisdy0A02IwhRsxJG8t9GWK4uKs2G4CgZpT3yHW&busi_data=eyJncm91cENvZGUiOiI2MzY4MDMzNzIiLCJ0b2tlbiI6ImlpV3lHR3BFT3NvdWxUYysrSnFBN3lSWGRGU1BlTmF4a3FJSnNXeFBNZkI0emZRVDUxdCszbzdEc1NzUlNDTS8iLCJ1aW4iOiI5NTg2MzAxNDYifQ%3D%3D&data=8nepSQv0_dZIm_ZCWW-lPMXP8xlcFXyNWUolkq1DvckJaLbB0JYLVwmuOfmH0Z7mKXGgRx6yhwpi9bjWCvi66Q&svctype=4&tempid=h5_group_info) 获取实时帮助

## 1. 启动失败类问题

### 1.1 数据库占位配置未修改

现象：插件启动后自我禁用，日志提示默认数据库配置。

排查：检查 `config.yml` 中 `database.*` 是否仍是占位值。

处理：填入真实数据库地址、账号、密码后重启。

### 1.2 端口冲突

现象：内置 HTTP 启动失败。

排查：`webshop.embedded-http.port` 是否被占用。

处理：换端口或释放占用进程。

### 1.3 时区配置非法

现象：启动报 `Invalid webshop.time-zone`。

处理：改成合法时区 ID，例如 `Asia/Shanghai`、`UTC`。

## 2. 登录与会话问题

### 2.1 无法打开网页

现象：在浏览器访问web时无法打开。

检查项及操作：

- 插件是否正常启动 （输入`/plugins` 查看`webshopx`是否已启用）
- 是否未开放对应端口、防火墙、或端口转发等

### 2.2 网页无法登录

检查项：

- 是否先在游戏内执行 `/ws password <新密码>`
- 用户名是否为当前 Minecraft 用户名
- 密码长度是否满足 8-64

### 2.3 接口返回 `auth_invalid` / `auth_required`

原因：session token 缺失、过期或格式错误。

处理：

- 确认请求头 `Authorization: Bearer <token>`
- 重新登录获取新 token

## 3. 钱包与兑换问题

### 3.1 兑换失败 `exchange_disabled`

原因：配置中该兑换方向未开启。

### 3.2 `insufficient_funds`

原因：余额不足。

### 3.3 Vault 相关异常

现象：`vault_unavailable` 或 `vault_error`。

检查：

- Vault 插件是否安装并启用
- 经济提供器是否可用

## 4. 订单与发货问题

### 4.1 下单后未到账

检查订单状态

执行：

```text
/ws claim all
```

再检查：

- 订单是否为 `WAIT_CLAIM`
- 背包是否已满
- 是否已自动退款

### 4.2 退款失败

常见原因：

- 状态不允许（非 `PENDING/WAIT_CLAIM`）
- 超出冷静期
- 团购券已核销

## 5. 市场问题

### 5.1 上架失败

常见错误：

- `not_bound`：未绑定账号
- `listing_limit`：达到上架上限
- `invalid_item` / `invalid_price`

### 5.2 供货箱异常

- `supply_missing`：容器失效或不可访问
- `sync_timeout` / `sync_interrupted`：同步操作超时或中断

处理：

1. 检查容器是否存在且可访问。
2. 检查主线程负载（TPS）。
3. 手动刷新供货或重新绑定。

### 5.3 竞拍资金问题

- 出价资金会冻结。
- 被超价后应自动退回。
- 如未及时退回，检查日志中竞拍/退款相关异常。

## 6. 后台问题

### 6.1 登录成功但接口 `forbidden`

说明：已登录但缺少对应后台细粒度权限。

处理：由超级管理员检查并调整 `AdminPermission`。

### 6.2 管理员被误禁用

若系统只剩一个超级管理员，不允许将其禁用。

## 7. Web 部署问题（external 模式）

### 7.1 页面空白或接口 404

检查：

- `webshop.server-mode` 是否为 `external`
- 静态资源是否已从插件目录正确托管
- `/api/` 反向代理是否配置正确

### 7.2 客户端跨域异常

内置 CORS 允许 `*`，若仍异常通常是代理层覆盖了响应头。

## 8. 建议排查顺序

1. 看插件日志（含 `webshop.logging.*` 文件日志）。
2. 检查数据库连接与 schema。
3. 验证 `/health`。
4. 验证玩家登录流程。
5. 验证订单、市场、后台关键接口。

## 9. 反馈信息建议

提交反馈：[WebShopX-Issues](https://github.com/Cc-Cece/WebShopX-Issues/issues/new/choose)

提交问题时请附带：

- WebShopX 版本
- 服务端版本（Paper/Spigot）
- Java 版本
- 相关配置片段（脱敏）
- 报错日志与复现步骤

## 10. 相关文档

- [安装与部署](./Installation-and-Deployment)
- [API 参考](./API-Reference)
- [数据库结构](./Database-Schema)
