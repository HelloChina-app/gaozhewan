# 搞着玩

搞着玩 = 把全球新奇信号变成中文创作者可发布、可改写、可变现的选题资产。MVP 先从“搞选题”开始。

## 当前实现

- Next.js App Router 项目骨架
- 首页、搞选题、搞工具、搞着玩实验室、自己玩 DIY、周刊、订阅、定价、关于页
- 搞着玩指数组件、搞选题 Pro 留白区块、示例选题卡
- SEO 基础：metadata、sitemap、robots、Article 与 SoftwareApplication JSON-LD
- Resend Audience 邮件订阅 API，本地缺少配置时可演示提交
- 工具详情页 `/tools/[slug]`、选题卡详情页 `/topic/[id]`，含关联内容与结构化数据
- 选题卡归档 `/topics`（按发布日期排序）、标签页 `/tag/[标签]`（长尾 SEO 与浏览）
- RSS feed `/feed.xml`，首页自动发现，footer 可订阅
- SEO 基础：metadata、sitemap（含文章/工具/选题卡/标签页）、robots、Article 与 SoftwareApplication JSON-LD
- Resend Audience 邮件订阅 API，本地缺少配置时可演示提交
- 11 篇文章、17 个工具卡片、100+ 张选题卡（每日自动增长）
- 文件驱动内容：新增 `content/posts/*.md` 或 `content/topic-cards/*.md` 即可发布，无需改代码（详见 `content/README.md`）
- 选题信号抓取脚本 `npm run signals`：从 Hacker News / GitHub 拉候选，生成待人工核验的选题卡草稿

## 自动化（Codex 定时任务）

- `automation`（每天 8:00、10:00）：把当天真实信号补足到 3 张选题卡（带日期、去重）→ 校验 → 发布 → 验证生产。
- `weekly-digest`（每周五 9:00）：把本周发布的选题卡聚合成一篇 `weekly` 周刊文章，并完成 CI、部署与生产验证。
- `seo-geo`（每周一 9:00）：强化一组 SEO/GEO 内容与站内结构，并完成发布验证。
- 红线：只基于真实抓取的事实和链接产出，绝不编造数据/来源；不确定降级为 `_drafts/` 草稿。

## 产品架构

- 母品牌：搞着玩
- 核心命题：搞着玩
- MVP 主线：搞选题，把全球信号变成中文创作者可发布的选题资产
- 后续方向：搞工具、搞着玩实验室、自己玩 DIY

## 本地运行

如果系统已经有 Node.js：

```bash
npm install
npm run dev
```

当前 Windows 环境使用项目内置 Node：

```powershell
$env:Path = "C:\Users\Main\gaozhewan\.tools\node-v24.16.0-win-x64;" + $env:Path
.\.tools\node-v24.16.0-win-x64\npm.cmd install
.\.tools\node-v24.16.0-win-x64\npm.cmd run dev
```

打开 `http://localhost:3000`。

常用检查：

```powershell
.\.tools\node-v24.16.0-win-x64\npm.cmd run lint
.\.tools\node-v24.16.0-win-x64\npm.cmd run typecheck
.\.tools\node-v24.16.0-win-x64\npm.cmd run check:env
.\.tools\node-v24.16.0-win-x64\npm.cmd run check:content
.\.tools\node-v24.16.0-win-x64\npm.cmd run build
```

启动本地服务后可跑：

```powershell
.\.tools\node-v24.16.0-win-x64\npm.cmd run smoke:local
```

## 邮件订阅配置

复制 `.env.example` 到 `.env.local`，填入：

```bash
RESEND_API_KEY=...
SUBSCRIBE_FROM_EMAIL=Gaozhewan <news@gaozhewan.com>
PAYMENT_FROM_EMAIL=Gaozhewan Payments <news@gaozhewan.com>
```

`RESEND_API_KEY` 需要 Full access 权限，因为服务端同时使用最新的 `POST /contacts` 接口写入联系人，并发送 USDT 订单邮件。Resend 不再要求 Audience ID。发信前还需要在 Resend 验证 `gaozhewan.com` 的 SPF 和 DKIM 记录。

未配置时，订阅接口会返回配置缺失提示，不会静默丢数据；`/api/health` 的 `email` 字段会报告联系人写入和邮件交付是否完成配置。

在 `localhost` 本地演示时，即使没有配置 Resend，订阅表单也会返回成功提示；部署到正式域名后仍需要配置环境变量。

部署前运行：

```bash
npm run check:env:production
```

该脚本会自动读取 `.env.local` 和 `.env`。

## 上线清单

部署、域名、邮件、公众号二维码和付费承接见 `LAUNCH-CHECKLIST.md`。

