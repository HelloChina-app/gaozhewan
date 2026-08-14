---
title: DeepSeek Harness 一天 5.7 万星：插件化 agent 已开源，0.1 RC 仍会破坏兼容
heat: DeepSeek 于 8 月 13 日开放 DeepSeek Harness developer preview 与 MIT 源码，把模型、工具、skills、session、sandbox、storage、loop、调度和 UI 都做成可替换插件；截至 Asia/Katmandu 8 月 14 日 08:09，官方 GitHub 仓库创建不足 15 小时已有 57,684 星、4,732 forks，Hacker News 为 564 分、247 条评论。官方页面还展示 append-only session log、Trajectory 检查、resume/fork/replay，以及 Standard、Code、Minimal、Creator 四种运行模式。边界必须前置：README 明写 developer preview 会出现 compatibility-breaking changes，npm 最新包仍是 `0.1.0-rc.6`，仓库没有稳定版 tag；“所有能力都是插件”是架构与扩展性承诺，不等于第三方插件可信、权限隔离完备、升级无迁移成本或任意 DeepSeek 模型都自动得到更好结果。session log 会记录 system prompt、reasoning、tool call、结果与 context injection，便于审计也会集中敏感信息；公开材料未给出企业级数据保留、自托管安全基线或插件供应链保证，真实代码和凭据进入前必须单独评审。
window: 72h
competition: 高
publishedAt: 2026-08-14
updatedAt: 2026-08-14
novelty: 9.6
viral: 9.8
accessible: 9.0
angles:
  - 中文开发者上手向：用脱敏小仓库分别跑 Standard、Code、Minimal 与 Creator，记录安装、模型接入、工具调用、上下文、失败恢复和事件日志；明确 npm 是 0.1 RC、官方承诺仍会破坏兼容，不能写成稳定生产框架
  - 插件边界向：把模型、工具、sandbox、storage、loop 与 UI 的可替换性画成配置表，再验证插件装卸、依赖冲突、最小权限、网络访问和密钥传递；“插件化”不等于插件可信，也不等于 prompt 里的限制能替代工具级权限
  - 审计与隐私向：利用 Trajectory、resume、fork、search、replay 检查一次 agent 事故能否复盘，同时列出 system prompt、reasoning、源码、终端输出和密钥可能进入 append-only log 的位置；在官方补齐保留、删除、导出与企业承诺前只用脱敏材料
headlines:
  - DeepSeek 不只发模型了：5.7 万星 Harness 把整个 agent 拆成插件
  - `npx` 一行启动不等于能进生产：DeepSeek Harness 0.1 RC 实测清单
  - 所有能力都是插件，所有运行都能回放：DeepSeek Harness 真正改变了什么
relatedTopicIds:
  - everything-claude-code-agent-harness-os
  - hermes-agent-self-improving-skills
  - smolagents-code-first-agents
materials:
  - DeepSeek Harness 官方发布、developer preview、四种模式与可追踪事件流 :: https://deepseek.com/harness/en/
  - DeepSeek 官方 GitHub 仓库、MIT 许可证、破坏性兼容提醒与安装方式 :: https://github.com/deepseek-ai/deepseek-harness
  - 官方架构文档与 Cordis 插件组成 :: https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/architecture.md
  - npm 公开包与当前 0.1.0-rc.6 版本 :: https://www.npmjs.com/package/@deepseek-ai/dsh
  - Hacker News 独立讨论与热度快照（截至 8 月 14 日 08:09 为 564 分 / 247 评论） :: https://news.ycombinator.com/item?id=49285244
---

## 先说结论：新闻不是“DeepSeek 又做了一个聊天壳”

DeepSeek Harness 把 agent 的运行外壳从固定应用改成可组合系统。Cordis kernel 负责插件装载、卸载和依赖，模型、工具、skills、session、sandbox、文件系统、storage、循环、调度与 UI 都可以通过配置替换。官方 Web UI 默认从本机 `127.0.0.1:3080` 启动；Standard 提供完整编码 agent，Code 让模型生成代码编排多轮工具调用，Minimal 只保留 shell 与编辑器用于基准隔离，Creator 则面向运行时检查和 preset 制作。

更值得中文团队测试的是事件流。官方称模型看到的 system prompt、reasoning、工具调用与结果、subagent 调度和 context injection 都写入 append-only session log，Trajectory 可以按来源检查，resume、fork、search 和 replay 共用同一事件流。这为复盘 agent 为什么改错代码提供了结构，但也意味着审计材料本身可能含客户数据、源码、终端输出与凭据。先能看见，不等于已经解决访问控制、脱敏、保留和删除。

::: callout Developer preview 不能按稳定平台采购
仓库明确警告会有破坏性兼容变化，npm 仍是 0.1 RC，且没有稳定 tag。星数代表注意力，不代表 API 稳定、插件安全、长任务可靠或企业治理已经经过独立验证。
:::

## 最有价值的内容，是一套可复制的“插件边界实验”

准备一个脱敏仓库与固定任务，在四种模式下记录首次安装时间、模型配置、工具权限、网络访问、context 增长、缓存、失败恢复和最终 diff。再故意加入一个只读插件、一个请求额外网络权限的插件和一次升级，观察权限是否真的由工具层限制、依赖冲突如何显示、session 能否重放、旧配置是否还能运行。结果应把官方声明、实测现象与作者判断分开。

所有来源、配置、失败样本、标题模板、选题角度和复制简报都应继续免费公开。读者可向搞着玩实验室免费提交自己的脱敏 agent 工作流，共同补齐兼容性矩阵；只有用户自己的安全诊断、插件原型或固定范围 MVP 才适合另行约定付费范围。
