# 搞着玩 USDT 变现 SOP

## 商业模型

- 商品：搞选题 Pro 年度版
- 价格：由 `USDT_PRICE` 配置，页面默认展示 `14 USDT`
- 支付资产：只接受 USDT
- 支付网络：只开放 `USDT_NETWORK` 配置的一条网络
- 交付：已确认的链上交易自动核验后，站内发放 365 天签名访问权
- 去重：每个 TxID 在 Private Blob 中只登记一次

## 上线前配置

在 Vercel Production 环境配置：

- `USDT_NETWORK`：向用户展示的完整网络名，例如 `TRON (TRC20)`
- `USDT_WALLET_ADDRESS`：该网络对应的公开收款地址
- `USDT_PRICE`：正数，最多 6 位小数
- `PRO_ACCESS_SECRET`：至少 32 个随机字符，只放服务端
- `USDT_ORDER_STORE=vercel-blob`：启用项目级 Private Blob 自动订单闭环
- `BLOB_READ_WRITE_TOKEN`：旧式静态凭据兼容项；新 Private Blob 优先使用 Vercel 自动轮换的 OIDC，不需要复制长期密钥
- `TRONGRID_API_KEY`：可选；提高 TRON 官方查询接口额度
- `ORDER_NOTIFICATION_EMAIL`：可选；自动核验异常时接收人工订单
- `PAYMENT_FROM_EMAIL`：可选；Resend 已验证域名下的发件人

绝不把私钥、助记词或交易所登录信息放入项目或 Vercel 环境变量。

## 自动订单闭环

1. 用户只按页面指定的 `TRON (TRC20)` 网络向公开地址发送 USDT。
2. 用户提交邮箱和 64 位 TxID；服务端只查询 `only_confirmed=true` 的链上事件。
3. 同时确认：事件来自 Tether 官方 USDT 合约、类型为 `Transfer`、收款地址完全匹配、到账金额不少于标价。
4. 服务端以 TxID 为不可覆盖路径写入 Private Blob；重复 TxID 只能由第一次登记的邮箱哈希重试，不能用于第二个账号。
5. 核验通过后立即返回一年期签名访问地址，用户点击即写入 HttpOnly Cookie 并进入完整选题工作台。

Private Blob 记录只含 TxID、邮箱密钥哈希、金额、区块信息和访问到期时间，不含明文邮箱。

## 异常订单的人工处理

1. 打开运营邮箱中的 `[USDT 待核验]` 邮件，或客户从页面生成的订单邮件。
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
- 自动核验只接受 Tether 官方 TRC20 USDT 合约；其他同名代币一律拒绝。
- TRON 查询或 Blob 暂时不可用时不自动开通，用户可重试或转人工处理。
- `PRO_ACCESS_SECRET` 轮换后，旧访问链接和已登录 Cookie 会失效。
