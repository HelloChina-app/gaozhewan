---
title: 摄像头把 GitHub 管理令牌打进前端：别让 CI 环境变量整包出货
heat: 安全研究者 hhh 于 2026 年 7 月 24 日披露，他分析 Hanwha Wisenet XNP-9300RW 的公开固件，通过固件升级程序中的硬编码材料还原 rootfs，随后发现同一个 GitHub token 被复制到约 30 个前端文件；研究者称该 token 对 Hanwha GitHub 组织的数百个仓库拥有管理权限，原因看起来是 Vite 构建把整个 process.env 注入前端对象。他随后抓取约 500 份相机固件，称约 62% 可用同一路径提取，只有 3 份包含同一 token；Hanwha 在收到邮件后 12 小时内回复并撤销令牌。截至 Asia/Katmandu 7 月 25 日复核时，Hacker News 讨论为 514 分、178 条评论。事实边界必须前置：具体权限、固件样本数、提取比例和厂商响应均来自研究者单方记录，尚未看到 Hanwha 独立公告或完整取证报告；研究者没有实体相机，不能确认这些变量是否真的随登录页网络响应发送给每位用户。令牌已被称为撤销，但这不等于历史访问范围、日志审计和所有受影响版本已完成确认；文章里的美国国防部 IP 只被作者标为推测，绝不能写成 Hanwha 与相关网络存在已证实连接。
window: 72h
competition: 中
publishedAt: 2026-07-25
updatedAt: 2026-07-25
novelty: 9.3
viral: 9.4
accessible: 9.6
angles:
  - 中文开发团队排雷向：复现“构建工具读取 process.env → 前端 bundle 与固件固化 → 设备长期分发”的泄露链，检查 Vite、Next.js、Docker 和 CI 中哪些变量会进入客户端；不要复刻或传播研究文中的任何密钥材料
  - 创作者硬件安全向：教相机、路由器与 IoT 用户区分公开固件分析、真实设备网络行为和厂商修复公告；当前没有证据证明所有 Hanwha 相机、所有固件或每次登录都暴露令牌
  - 负责任披露向：令牌据作者称已撤销，但撤销只是第一步；还需轮换关联凭据、检查仓库审计日志、清理构建缓存与历史制品、确认受影响版本并发布厂商说明，不能把快速回复等同于完整事故结案
headlines:
  - 一个 process.env 怎样污染 500 份固件？摄像头令牌泄露链拆解
  - GitHub token 被打进登录页：前端构建为什么不能看见整套 CI 环境
  - 514 分安全事件别写成谍战：已证实、未证实和该做的检查
relatedTopicIds:
  - openai-huggingface-eval-agent-security-incident
  - cursor-workspace-git-exe-0day-disclosure
  - gopro-founder-financing-creator-camera-crisis
materials:
  - hhh 原始固件分析与披露记录 :: https://hhh.hn/hanwha-github-token/
  - Hacker News 独立讨论（截至 7 月 25 日复核时 514 分 / 178 评论） :: https://news.ycombinator.com/item?id=49034292
  - Reddit Webdev 独立讨论 :: https://www.reddit.com/r/webdev/comments/1v5i57x/my_security_camera_shipped_a_github_admin_token/
  - GitHub 官方 token 类型与最小化凭据参考 :: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/about-authentication-to-github
---

## 先说结论：这不是“把密钥放进 .env”就能解决的问题

研究者描述的泄露链从公开固件开始。他先解开外层包，再从升级程序还原 rootfs 的解密流程，最后用 secret scanner 在约 30 个文件里发现同一 GitHub token。最关键的代码线索不是某位开发者手写了 token，而是前端构建对象疑似接收了整个 `process.env`，于是 CI 作业能看到的变量被一并固化进静态资源。只要资源进入固件，设备可能多年不更新，短期构建失误就变成长期供应链风险。

这对中文开发者很实用，因为相同错误不只发生在摄像头。Vite、Webpack、Next.js、移动应用打包、桌面壳和 Docker 构建都可能把服务端环境误带到客户端。正确做法不是把真实值换一个变量名，而是建立显式允许列表：只有确认可公开的键才能进入前端；客户端公开变量使用单独前缀和最小 CI job；构建后对 bundle、source map、镜像层与发布制品做 secret scan，并让发现结果阻断发布。

::: callout 不传播研究中的密钥材料
原文为说明固件提取过程公开了技术细节，并对 GitHub token 做了遮挡。二次内容没有必要复制解密 key、IV、IP 或任何 token 片段；读者需要的是泄露链、验证方法和修复清单，而不是可被滥用的材料。
:::

## 写作时必须把三种状态分开

第一种是研究者直接从下载固件观察到的内容：文件、环境变量和重复 token。第二种是研究者通过 GitHub 查询得到的权限与仓库范围，这部分仍需厂商或平台审计交叉确认。第三种是推测：实体设备是否把资源实际发给浏览器、历史上是否有人利用、环境里的特殊 IP 为什么存在。原作者明确把部分内容标为猜测，二次报道不能用军事背景拼出没有证据的攻击故事。

研究者称 Hanwha 在 12 小时内回复并撤销 token，这是积极的响应信号，却不是完整结案。负责的事故处理还要回答：哪些型号和版本受影响，token 何时创建、被哪些作业使用，是否有异常克隆或设置修改，历史固件和 CDN 缓存如何处理，其他环境变量是否包含可利用凭据，以及客户是否需要升级。没有官方公告时，只能把这些列为待确认问题。

一篇高价值内容可以附一份十分钟自查：搜索前端代码对 `process.env` 的展开，检查客户端变量前缀，导出生产 bundle 后跑 secret scanner，查看 source map 与静态 JSON，核对 CI 账号是否拥有组织管理权限，并把长期 token 改成短期、最小权限凭据。真正的教训不是“硬件公司也会犯低级错误”，而是任何能读取秘密的构建步骤，都必须证明输出不含秘密。
