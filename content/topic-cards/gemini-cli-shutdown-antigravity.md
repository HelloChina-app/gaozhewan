---
title: Gemini CLI 停服、Antigravity 迁移与“反代封号”风险：事实核对
heat: Google 官方公告显示，Gemini CLI 与 Gemini Code Assist IDE 将于 2026-06-18 停止为免费用户及 Google AI Pro/Ultra 订阅者提供原入口服务，并引导迁移至 Antigravity CLI；企业、Google Cloud 和付费 API Key 路径不受同样影响，Gemini CLI 仓库仍保持 Apache 2.0 开源。
window: 1 个月
competition: 中
publishedAt: 2026-06-20
updatedAt: 2026-07-18
novelty: 7.0
viral: 7.5
accessible: 7.0
angles:
  - 事件梳理向：给中文开发者把「哪个入口停止服务、谁受影响、企业与付费 API 为什么不一样」讲清楚，附迁移注意点。
  - 风险澄清向：把官方迁移、正常配额限制和第三方反向代理的账户风险拆开，避免把所有报错都写成“封号”。
  - 行动清单向：按个人订阅、企业账号、API Key 和第三方代理四种场景给出迁移或留守判断。
headlines:
  - Gemini CLI 6 月迁移：哪些用户受影响，哪些入口还能继续用
  - Gemini CLI 不是“删库”：Antigravity 迁移与反代风险一次讲清
  - 从 Gemini CLI 到 Antigravity：个人开发者迁移前要检查什么
materials:
  - Google 官方迁移公告 :: https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/
  - Antigravity 官方迁移文档 :: https://www.antigravity.google/docs/gcli-migration
  - Gemini CLI GitHub 讨论与官方说明 :: https://github.com/google-gemini/gemini-cli/discussions/27274
---

## 先把三个容易混在一起的问题拆开

中文社区常把“Gemini CLI 停服”“额度用完”和“反代封号”放在同一个标题里，但它们不是一件事。第一件是 Google 对特定用户入口的产品迁移；第二件是账号或模型的正常配额限制；第三件是用户把凭据交给非官方代理、绕过区域或产品限制后可能触发的安全与条款风险。只有把入口、账号类型和认证方式说清楚，才能判断一次失败究竟属于哪一类。

## 6 月 18 日到底发生什么

Google 在 2026 年 5 月 19 日的开发者公告中写明：从 6 月 18 日起，Gemini CLI 与 Gemini Code Assist IDE 扩展不再为免费用户和 Google AI Pro/Ultra 订阅者提供原有服务，并建议迁移到 Antigravity CLI。企业侧的 Gemini Code Assist Standard、Enterprise、Google Cloud 使用方式，以及通过付费 Gemini API Key 的访问不按同一路径停止。

这更接近“消费者入口迁移”，不是删除 GitHub 仓库，也不是所有 Gemini CLI 用户同日失效。Gemini CLI 官方讨论中的维护者说明，该仓库仍为 Apache 2.0，并会继续服务企业相关更新。把事件概括成“Google 关停开源项目”会把服务端入口、开源代码和商业支持混成一件事；把 Antigravity 直接写成 Gemini CLI 的一比一替代也不准确，官方承认迁移初期并非所有能力完全对齐。

::: callout 一句话判断
个人免费或 AI Pro/Ultra 用户应准备迁移；企业、Cloud 或付费 API Key 用户先核对自己的认证路径，不必仅凭“Gemini CLI 停服”标题仓促更换工具。
:::

## 官方迁移会搬走什么

Antigravity CLI 首次启动会检测现有 Gemini CLI 设置，也可通过命令导入。Skills、Hooks、Subagents 和 Extensions 是官方列出的重点兼容对象，但目录与配置格式存在变化。工作区技能需要从 `.gemini/skills/` 迁到 `.agents/skills/`；MCP 配置转入 `.agents/mcp_config.json`，远程服务器字段也有调整。

迁移前不要直接覆盖原目录。先备份用户级与项目级配置，列出依赖的扩展、MCP 服务、允许列表、环境变量和自定义命令；导入后用一个非关键仓库逐项验证。尤其要检查：MCP 是否仍以预期权限启动、Hooks 是否在相同事件触发、项目指令是否被读取、模型与账单入口是否符合预期。

## “几次请求就触顶”不等于封号

配额错误通常会返回限流、余额或使用上限相关信息，等待窗口恢复、切换合规计费方式或降低请求量后仍可继续。账户处罚则可能表现为认证被撤销、产品访问被限制或收到安全通知，两者的处理路径完全不同。截图里只出现 429、quota exceeded 或请求失败，不能直接证明账号被封。

第三方反向代理的风险又更高一层：代理可能接触访问令牌、会话 Cookie、提示词和代码；它还可能改变请求来源、并发模式或认证用途。即使代理当下可用，也不代表 Google 对这种使用方式作出兼容或安全承诺。对工作账号、付费账号和私有代码，应优先使用官方客户端、正式 API Key 或组织批准的网关，不要把主账号凭据交给来源不明的服务。

## 四种用户的行动清单

- 免费版或 AI Pro/Ultra：备份配置，安装 Antigravity CLI，在非关键仓库完成导入和权限复核。
- 企业版或 Google Cloud：先问管理员确认组织策略、许可和支持周期，不要自行迁移生产工作流。
- 付费 Gemini API Key：核对客户端仍使用 API Key 而不是消费者登录态，同时检查预算和速率限制。
- 第三方反代用户：撤销已暴露的令牌，检查账号安全记录和组织日志，再迁回官方认证路径。

## 迁移后的验收标准

不要以“能发出第一条请求”为完成。至少验证同一仓库里的代码读取、文件写入审批、MCP 工具、Hooks、扩展、长上下文任务和失败重试；再比较迁移前后的响应质量、延迟、额度与账单。生产项目还应保留可回退的旧配置，但不要假设旧的消费者入口会无限期可用。

这场变化真正值得追踪的是工具生命周期风险：开源客户端不等于其免费后端永久存在，商业订阅也不等于所有入口长期不变。把认证、模型、工具配置和项目数据解耦，才是个人与团队降低迁移成本的办法。
