---
title: Zed 把 agent 对话、代码与评审放进 Delta：实时协作已演示，仍是私测
heat: Zed 于 8 月 12 日发布 Delta，把 agent 对话、持续变化的 worktree 与逐行评论放进同一线程，并以 DeltaDB 在参与者之间实时复制代码和上下文；截至 Asia/Katmandu 8 月 13 日 08:08，Hacker News 为 410 分、138 条评论。官方称它继续使用现有 Git 仓库，用户仍可照常 commit、push，未使用 Delta 的同事看到的是普通 Git 仓库；浏览器端则把同一 Rust 应用编译为 WebAssembly，并先接入 Claude Code 等第三方 agent harness。边界必须前置：Delta 目前只向首批用户发出 private beta 邀请，DeltaDB 也仍标注 Early Access，公开页面没有给出正式开放时间、定价、自托管、离线工作、数据驻留、保留期限或企业合规承诺；实时同步、评论锚定、云端 runner 与大 transcript 的性能来自官方演示，尚无独立规模测试。线程默认私有且只对受邀者开放是产品声明，不等于敏感源码、prompt、工具输出和密钥可以未经审查上传；“兼容 Git”也不等于 Delta 的细粒度历史与对话能无损导出到其他工具。
window: 72h
competition: 中
publishedAt: 2026-08-13
updatedAt: 2026-08-13
novelty: 9.3
viral: 9.1
accessible: 9.0
angles:
  - 中文开发团队工作流向：拿同一个 agent 改动分别走“本地对话加 GitHub PR”和 Delta 线程，比较交接时间、评论漂移、上下文缺失、冲突处理与最终 Git 历史；明确当前只能申请私测，不能写成人人可下载的正式产品
  - 隐私与治理向：在上传客户代码、密钥、终端输出和完整 agent transcript 前，逐项核对自托管、数据驻留、保留与删除、训练用途、成员撤权和审计导出；官方“线程默认私有”不能替代组织自己的安全评审
  - 可移植性验证向：测试普通 Git 用户能否继续 clone、review、revert 与跑 CI，同时单独验证 DeltaDB 的逐操作历史、对话锚点和云端 runner 状态能否导出；把“Git 仓库兼容”与“协作上下文无锁定”分开写
headlines:
  - Agent 写代码太快，PR 评审跟不上：Zed Delta 想把对话和 worktree 绑在一起
  - Delta 不是 Zed 新面板，而是一套私测中的多人 agent 协作应用
  - 兼容 Git 就没有锁定吗？试用 Zed Delta 前先问这 7 个问题
relatedTopicIds:
  - cursor-agent-swarm-model-economics
  - github-stacked-pull-requests-public-preview-boundaries
  - humanlayer-agentic-ide-anti-slop
materials:
  - Zed Delta 原始发布、private beta、Git 兼容与 Claude Code 接入说明 :: https://zed.dev/blog/introducing-delta
  - DeltaDB 官方技术背景、逐操作历史与 Early Access 状态 :: https://zed.dev/blog/introducing-deltadb
  - DeltaDB 官方 Early Access 页面与功能声明 :: https://zed.dev/deltadb
  - Hacker News 独立讨论与热度快照（截至 8 月 13 日 08:08 为 410 分 / 138 评论） :: https://news.ycombinator.com/item?id=49276574
---

## 先说结论：Delta 改的不是补全按钮，而是 agent 时代的交接面

传统 agent 工作流常把关键上下文拆成三处：终端或聊天里有需求和判断，未提交的 worktree 里有正在变化的实现，PR 里只剩最后一个 diff。接手者能看见结果，却要从提交信息和过期评论反推为什么这样写。Delta 的核心提案是让对话、每次编辑和逐行评论共用一条可复制的历史；队友可以在工作尚未提交时进入线程，评论当前代码，甚至继续让同一个 agent 解释或修改。

这对多代理开发和远程协作确实有吸引力。官方称每位参与者在本地拥有同步的代码副本，云端 runner 可以在笔记本关闭后继续工作，浏览器也能打开共享线程。DeltaDB 以细粒度 delta 为代码与对话建立稳定引用，试图解决普通行号评论随代码移动而失效的问题；Git 与 CI 仍保留，承担提交、检查和外部生态连接。

::: callout 私测产品不能按成熟基础设施采购
目前公开的是产品方向和官方 demo，不是经过大团队、超大仓库、断网、冲突风暴与合规审计验证的通用结论。正式开放时间、价格、自托管和数据策略没有在发布页完整说明。
:::

## 最值得写的不是“PR 已死”，而是一套可重复的交接实验

中文团队可以准备一个包含需求变更、agent 误改、人工纠正和 CI 失败的固定任务，让两组成员分别使用现有 PR 流程与 Delta 私测。记录新成员找到原始意图所需时间、评论是否仍指向正确代码、未提交改动如何恢复、普通 Git 用户看到什么，以及退出 Delta 后还剩下哪些可审计材料。只有这些结果能回答产品是否真的减少协作成本。

安全验证必须同步进行。agent transcript 可能含客户数据、路径、工具输出和凭据，实时复制 worktree 也会扩大数据流转范围。试用前应使用脱敏仓库，确认成员撤权、线程删除、导出、日志保留与第三方模型调用边界，再决定能否触碰真实项目。选题卡、测试表、标题模板和复现实验应继续免费公开；读者可向搞着玩实验室免费提交自己的协作流程，先共同设计安全的对照实验，再考虑是否需要固定范围的个人诊断或原型服务。
