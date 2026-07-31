---
title: CodePen 2.0 把 Pen 变成可部署小站：免费版 3 文件，部署仍要 PRO
heat: CodePen 于 7 月 23 日正式推出重写多年的 2.0 编辑器，联合创始人 Chris Coyier 7 月 30 日用实际协作、npm、MJML 和小站部署案例再次引发讨论；截至 Asia/Katmandu 7 月 31 日 08:05，Hacker News 为 133 分、39 条评论。2.0 把原来的 Pen 与 Project 合并成带文件系统、版本历史、实时协作、Blocks 编译和一键部署的编辑器，Vue 改用 Vite，并新增 Tailwind、Lightning CSS、MJML、Nunjucks 等能力。限制必须前置：免费账户每个 Pen 只有 3 个用户文件，媒体上传不可用；部署是 PRO 专属，每站月流量上限 1 TB，降级或删号会让站点下线；部分低使用率旧处理器已弃用，Classic 编辑器目前仍可访问但未来迁移时间未定。官方说“每个 Pen 都可部署”描述产品能力，不等于免费托管，也不等于适合数据库、密钥、服务端任务或有 SLA 的生产应用。
window: 1 周
competition: 中
publishedAt: 2026-07-31
updatedAt: 2026-07-31
novelty: 8.8
viral: 8.2
accessible: 9.3
angles:
  - 中文前端实测向：用免费账户做三文件 demo，再用 PRO 对照多文件、媒体、版本、协作和部署，逐项标价与记录限制；不能把“每个 Pen 都能部署”写成“任何人永久免费建站”，部署、媒体、文件数与自定义域名都要按计划核对
  - 创作者工作流向：比较经典 HTML/CSS/JS 三栏、2.0 Classic Block 和完整文件系统三种入口，测试一个交互图解从实验、邀请协作者、npm 依赖到公开 demo 的路径；Classic 仍可用、部分旧 processor 已弃用，迁移前要先复制和导出重要作品
  - AI 时代产品定位向：讨论 CodePen 从代码片段展台变成可供人和 agent 共同构建的小站工作台，同时保留 HN 对复杂度、滥用和手工创作社区被稀释的争议；这些是用户观点，不是已证明的商业转型或 IPO 信号
headlines:
  - CodePen 2.0 不只是三栏编辑器了：但一键部署不是免费功能
  - 从 Pen 到小网站：三文件免费版到底能走到哪一步
  - AI 会让 CodePen 更有用还是更复杂？2.0 发布后的两种答案
relatedTopicIds:
  - canvas-ui-html-in-canvas-browser-license-boundaries
  - jelly-ui-soft-body-accessibility-boundary
  - scroll-world-agent-skill-brand-3d-site
materials:
  - CodePen 2.0 官方发布、文件系统、版本、协作、Blocks 与 Classic 说明 :: https://blog.codepen.io/2026/07/23/two-point-oh/
  - CodePen 官方文件额度、免费版 3 文件与各 PRO 层级限制 :: https://blog.codepen.io/docs/pens/files/
  - CodePen 官方部署文档、PRO 限制、1 TB 月流量与降级后下线说明 :: https://blog.codepen.io/docs/pens/deployment/
  - Chris Coyier 7 月 30 日真实协作、npm、MJML 与部署案例 :: https://chriscoyier.net/2026/07/30/codepen-2-0/
  - Hacker News 独立讨论与热度快照（截至 7 月 31 日 08:05 为 133 分 / 39 评论） :: https://news.ycombinator.com/item?id=49113338
---

## 先说结论：CodePen 2.0 扩大了“一个 Pen”的上限，也提高了需要读懂的边界

经典 CodePen 的魅力是打开三栏、写 HTML/CSS/JS、马上分享。2.0 没有放弃即时预览，却把 Pen 重新定义成一个小型项目：它有真实文件与目录、自动版本、可邀请编辑者和查看者、实时协作，以及能组合 Tailwind、MJML、Vue/Vite、Nunjucks 等工具的 Blocks。每个 Pen 还可以生成独立 `codepen.app` 站点，保存后手动部署，或选择保存即部署。

这对中文前端作者、课程老师和交互内容创作者很实用。过去一个演示需要把 JavaScript 拆到多个 Pen，再用外部资源串起来；现在可以把文件和 `package.json` 放回同一个项目，邀请远程搭档同步修改，再把可交互结果交给读者。Chris Coyier 的复盘给出了真实用例：他把合作对象分散的脚本合并成文件，用 package 管理 npm 依赖，也直接在 CodePen 写 MJML 邮件和发布小网站。

::: callout “每个 Pen 可部署”不是“免费账户可部署”
官方部署文档明确把 Pen Deployment 列为 PRO 功能。免费账户每个 Pen 只有 3 个用户文件，不能上传媒体；做评测时必须分别登录免费和付费账户，不能只看发布页的功能总表。
:::

## 迁移先看兼容、费用和它不是什么

CodePen 保留了 Classic 编辑器，也提供 Classic Block 与 Minimal UI，让习惯原来三栏的人逐步适应。官方称旧 Pen 和 Project 的能力大多能在新编辑器继续使用，但脚注明确有少数低使用率 processor 被弃用；Projects 已迁移，普通 Classic Pens 尚未强制转换，未来是否统一以及何时转换都没有确定日期。重要作品应先导出，检查 processor、外部资源、嵌入和只在 PRO 存在的功能，再决定迁移。

它也不是通用云应用平台。部署适合静态交互 demo 和小站，不能把前端代码里的密钥变安全，也没有因为支持 npm 就自动获得数据库、后台任务、私有网络或企业 SLA。每个已部署 Pen 每月流量上限 1 TB，超限可能被下线；取消 PRO 会让所有站点下线。HN 讨论一方面欢迎文件、版本和快速部署，另一方面担心 UI 复杂、免费托管滥用，以及 AI 生成改变手工前端社区。负责任的内容应该把这些争议标成社区观点，并用同一个小项目实测经典、免费 2.0 与 PRO 部署，而不是把新功能清单直接改写成“CodePen 已替代本地 IDE 和生产托管”。
