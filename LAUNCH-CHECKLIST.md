# 搞着玩上线清单

## 已自动完成

- Next.js App Router MVP：母品牌“搞着玩”，核心命题“搞着玩”
- 第一条商业主线：搞选题 / 搞选题 Pro
- 扩展入口：搞工具、搞项目、搞副业
- 订阅表单：邮箱、开搞方向、来源字段
- 本地演示兜底：`localhost` 缺少 Resend 配置时仍可演示提交成功
- SEO 基础：metadata、Open Graph 图、sitemap、robots
- 工具详情页 `/tools/[slug]`：关联文章内链、SoftwareApplication 结构化数据、已纳入 sitemap
- 上线体量内容：17 个工具、5 篇文章（含 2 篇常青方法论）、3 张 Pro 选题卡
- 浏览器图标与 Web App manifest
- 健康检查：`/api/health`
- 安全响应头：`X-Content-Type-Options`、`X-Frame-Options`、`Referrer-Policy`、`Permissions-Policy`
- 环境变量检查脚本：`npm run check:env:production`
- 本地依赖安全审计：`npm audit --audit-level=moderate` 0 漏洞

## 需要人工配置

1. 域名与部署
  - 将 `gaozhewan.com` 指向 Vercel 或其他部署平台。
  - 部署环境设置 `NEXT_PUBLIC_SITE_URL=https://gaozhewan.com`。
   - 部署前运行 `npm run check:env:production`。

2. 邮件订阅
   - 在 Resend 添加 `gaozhewan.com`，并在 Cloudflare 配置 SPF、DKIM 后确认域名通过验证。
   - 创建独立的 Full access API Key，并仅在 Vercel Production 配置 `RESEND_API_KEY`。
   - 配置 `SUBSCRIBE_FROM_EMAIL` 与 `PAYMENT_FROM_EMAIL`，发件地址必须属于已验证域名。
   - 检查 `/api/health`：`email.deliveryConfigured` 与 `email.newsletterConfigured` 均应为 `true`。

3. 公众号二维码
   - 用正式公众号二维码替换 `public/wechat-qr-placeholder.svg`。

4. 付费承接
   - 只接受收银台指定网络的 USDT，不展示或承诺法币付款方式。
   - 在 Vercel Production 配置 `USDT_NETWORK`、`USDT_WALLET_ADDRESS`、`USDT_PRICE`、`PRO_ACCESS_SECRET` 和 `USDT_ORDER_STORE=vercel-blob`。
   - 检查 `/api/health`：`checkoutConfigured` 与 `automaticVerification` 均应为 `true`。
   - 用一笔独立的小额测试交易验证扫码、TxID 核验、访问链接和邮件回执全链路后再扩大流量。

5. 首批真实内容
   - 至少准备 7 天每日“全球信号”。
   - 至少准备 10 张搞选题 Pro 样例卡。
   - 每篇文章保留来源链接和事实边界。

## 本地验收命令

```powershell
$env:Path = "C:\Users\Main\gaozhewan\.tools\node-v24.16.0-win-x64;" + $env:Path
.\.tools\node-v24.16.0-win-x64\npm.cmd run typecheck
.\.tools\node-v24.16.0-win-x64\npm.cmd run check:env
.\.tools\node-v24.16.0-win-x64\npm.cmd run check:content
.\.tools\node-v24.16.0-win-x64\npm.cmd run build
.\.tools\node-v24.16.0-win-x64\npm.cmd audit --audit-level=moderate
.\.tools\node-v24.16.0-win-x64\npm.cmd run smoke:local
```

## 预览地址

本地服务启动后打开：

```text
http://localhost:3000
```

健康检查：

```text
http://localhost:3000/api/health
```
