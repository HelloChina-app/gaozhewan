---
title: GitHub 原生支持 stacked PR：478 分热议背后，public preview 还不是团队默认
heat: GitHub 于 7 月 30 日把 stacked pull requests 推入 public preview：开发者可以用 github.com、GitHub CLI 扩展、移动端或 coding agent 把大改动拆成有依赖顺序的小 PR，逐层审查，再一次合并全部或只合并底部若干层；截至 Asia/Katmandu 7 月 31 日 08:05，Hacker News 为 478 分、166 条评论。事实边界必须前置：功能仍在未来数日滚动开放到各仓库，merge queue 支持还要未来数周渐进上线，不能假定每个组织今天都已看到相同入口；GitHub 团队在 HN 回复称跨 fork stack 尚未支持，多 fork stack 因自动 rebase 的安全问题目前不在计划内，单一 fork 指向上游的 stack 才是后续目标。官方案例和引语说明团队觉得审查更顺，不是独立研究证明 stacked PR 必然提升质量；自动 rebase、retarget 与整栈合并会改动分支关系，正式采用前仍要用非关键仓库验证权限、保护规则、CI、评论保留和回滚路径。
window: 72h
competition: 高
publishedAt: 2026-07-31
updatedAt: 2026-07-31
novelty: 9.1
viral: 9.4
accessible: 8.8
angles:
  - 中文开发团队实测向：用一个三层小功能建立 base、API、UI 三个 PR，记录逐层 diff、并行 review、部分合并后的自动 rebase/retarget 和 branch protection 结果；public preview、分批 rollout 与 merge queue 渐进支持必须写在开头，不能做成“所有仓库已正式可用”的教程
  - AI 代码审查向：讨论 coding agent 让改动速度上升后，大 PR 如何把阅读变成瓶颈，再比较“按依赖拆层”和“只把一个 PR 切成很多提交”；官方客户引语只能作为采用案例，不能写成 stacked PR 已被证明减少缺陷或自动解决 AI 代码质量
  - 开源协作与锁定向：实测同仓库 stack、单一 fork 指向上游和多 fork 三种拓扑，明确当前跨 fork 缺口、CLI 扩展依赖与 GitHub 专属元数据；在确认评论、检查和回滚都可追踪前，不把核心发布流程一次性迁移到预览功能
headlines:
  - GitHub 终于原生支持 stacked PR，但你的 fork 工作流可能还用不了
  - 478 分热议的 stacked PR：AI 写得更快以后，审查该怎样拆层
  - 一键合并整栈之前，先测清自动 rebase、CI 和回滚这三件事
relatedTopicIds:
  - agentic-coding
  - openai-gpt-5-6-sol-limited-preview
  - leaving-github-for-forgejo
materials:
  - GitHub 7 月 30 日原始公告、public preview、CLI 与渐进 rollout 说明 :: https://github.blog/changelog/2026-07-30-stacked-pull-requests-are-now-in-public-preview/
  - GitHub 官方反馈讨论区与预览用户问题 :: https://github.com/orgs/community/discussions/201439
  - Hacker News 独立讨论、跨 fork 回应与热度快照（截至 7 月 31 日 08:05 为 478 分 / 166 评论） :: https://news.ycombinator.com/item?id=49112232
---

## 先说结论：它解决的是依赖改动的可读性，不是自动替你做好代码审查

Stacked PR 的核心并不神秘：第一层从 `main` 拉分支，第二层以第一层为 base，第三层再叠在第二层之上。每个 PR 只展示本层引入的差异，审查者可以分别讨论数据结构、后端接口和界面，而开发者不用等最底层合并后才开始下一层。GitHub 这次把依赖图、逐层 review、检查与整栈合并放进原生 PR 体验；合并底部一部分时，上层 PR 会保持打开并自动 rebase、重新指向新的 base。

这对使用 coding agent 的中文团队很及时。生成代码变快以后，一个任务可能在很短时间里膨胀成几千行 diff，真正稀缺的反而是人类能否理解改动顺序、发现跨层假设并留下可追踪意见。把认证基础、业务逻辑和 UI 分开，通常比让审查者面对一个巨型 PR 更容易建立心智模型。但“小 PR”本身不保证好设计：如果拆分顺序错误、每层不能独立通过测试，或者 agent 只是机械切文件，依赖图仍会把复杂性藏起来。

::: callout 现在是预览期，不要直接替换关键发布流程
GitHub 明确写的是 public preview，并且功能与 merge queue 支持分批 rollout。先在可丢弃分支或低风险仓库验证，不要因为公告里出现“一键合并”就跳过现有保护规则和人工批准。
:::

## 最值得测的是部分合并、fork 和审查历史

一个可靠的实测不应只演示安装 `github/gh-stack` 扩展和创建三条 PR。先让每层各自运行 CI、各自接受评论，再只合并最底层，观察上层自动 rebase 后检查是否重跑、评论是否仍对应正确代码、merge queue 是否可用以及失败时怎样恢复。官方称现有 reviews、checks、merge requirements 会继续工作，但预览期的价值正是用自己的分支规则去验证这句话，而不是把产品说明当成完成验收。

开源贡献还有明显边界。GitHub 团队在 HN 讨论中确认跨 fork stack 仍在开发，涉及多个不同 fork 的 stack 因自动 rebase 带来的安全问题目前基本排除；未来目标是允许整套分支都位于贡献者的同一个 fork，最底层 PR 再指向上游。对依赖 fork 提交的社区，这不是小细节。最负责任的选题落点，是展示原生 stacked PR 怎样减少手工维护分支的摩擦，同时把平台锁定、预览状态、fork 拓扑和可恢复性放进采用清单。
