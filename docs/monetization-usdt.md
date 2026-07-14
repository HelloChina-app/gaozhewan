# 搞着玩 USDT 变现 SOP

## 商业模型

- 商品：搞选题 Pro 年度版
- 价格：由 `USDT_PRICE` 配置，页面默认展示 `14 USDT`
- 支付资产：只接受 USDT
- 支付网络：只开放 `USDT_NETWORK` 配置的一条网络
- 交付：链上人工核验后，发放 365 天签名访问链接

## 上线前配置

在 Vercel Production 环境配置：

- `USDT_NETWORK`：向用户展示的完整网络名，例如 `TRON (TRC20)`
- `USDT_WALLET_ADDRESS`：该网络对应的公开收款地址
- `USDT_PRICE`：正数，最多 6 位小数
- `PRO_ACCESS_SECRET`：至少 32 个随机字符，只放服务端
- `ORDER_NOTIFICATION_EMAIL`：接收待核验订单的运营邮箱
- `PAYMENT_FROM_EMAIL`：Resend 已验证域名下的发件人

绝不把私钥、助记词或交易所登录信息放入项目或 Vercel 环境变量。

## 每笔订单的处理

1. 打开运营邮箱中的 `[USDT 待核验]` 邮件。
2. 在配置网络的官方/可信区块浏览器查询 TxID。
3. 同时确认：代币为 USDT、网络正确、收款地址完全匹配、实际到账不少于标价、确认数达到内部标准、TxID 未被其他订单使用。
4. 把订单号、邮箱、TxID、核验时间和状态记入运营台账，避免重复发放。
5. 在安全的本地环境生成访问链接：

   ```powershell
   npm run pro:access -- --email buyer@example.com --order GZW-20260714-ABC123 --days 365
   ```

6. 把生成的链接发送给订单邮箱。用户打开后，服务端写入 HttpOnly Cookie 并跳转到完整选题工作台。

## 风控边界

- 用户提交 TxID 不代表付款成功；必须人工核验。
- 不支持错误网络、错误币种、少付或无法确认的交易自动开通。
- 不代用户转账，不接触私钥或助记词。
- 当前 MVP 不含链上自动监听和数据库；订单去重依赖运营台账。
- `PRO_ACCESS_SECRET` 轮换后，旧访问链接和已登录 Cookie 会失效。

