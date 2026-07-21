---
title: Cursor 用 agent swarm 重写 SQLite：模型混搭把成本拉开近 8 倍
heat: Cursor 7 月 20 日公布新版 agent swarm 实验：多个规划 agent 拆分任务，较便宜的 worker 执行，再由专门角色处理冲突和审查；团队让系统仅凭 835 页 SQLite 文档、在看不到 SQLite 源码、测试套件、二进制与互联网的条件下用 Rust 重建数据库。官方称新版四种模型组合在 4 小时时通过 held-out SQL 测试套件的 73% 至 85%，之后都达到 100%；单次实验成本从 Opus 4.8 规划加 Composer 2.5 执行的 1339 美元，到全程 GPT-5.5 的 10565 美元，相差约 7.9 倍。截至 Asia/Katmandu 7 月 21 日复核时，Hacker News 讨论为 150 分、63 条评论。事实边界必须前置：全部成绩、成本和人工复核过程来自 Cursor 自家实验，尚无独立复现；通过 sqllogictest 不等于与生产 SQLite 在性能、安全、崩溃恢复、扩展和全部 API 上等价，公开 minisqlite 仓库也未显示可直接假定的许可证。
window: 72h
competition: 高
publishedAt: 2026-07-21
updatedAt: 2026-07-21
novelty: 9.1
viral: 8.6
accessible: 8.2
angles:
  - 成本工程向：把 1339 美元与 10565 美元拆成 planner 和 worker 两种预算，说明真正昂贵的不是“多 agent”三个字，而是哪些角色在持续消耗前沿模型 token
  - 团队流程向：把共享设计文档、中立冲突解决、膨胀文件阻断和多视角 review 翻译成小团队可用的四条规则，不需要先复制上千 agent
  - 验证边界向：解释 held-out 测试、100% 通过率与生产等价为何是三回事，并检查公开仓库的实现范围、许可证、性能和故障恢复证据
headlines:
  - 同样重写 SQLite，模型组合让账单从 1339 美元跳到 10565 美元
  - 大量 agent 不是重点：Cursor 这次真正解决的是冲突、记忆和审查
  - Agent swarm 跑过 100% 测试之后，为什么还不能叫“重造 SQLite 成功”
relatedTopicIds:
  - sakana-fugu-multi-agent-orchestration
  - codebase-memory-mcp-for-ai-agents
  - statewright-state-machines-reliable-agents
materials:
  - Cursor 官方 agent swarm 实验、成绩与成本数据 :: https://cursor.com/blog/agent-swarm-model-economics
  - Cursor 公布的 minisqlite 代码仓库 :: https://github.com/cursor/minisqlite
  - Hacker News 独立讨论（截至 7 月 21 日复核时 150 分 / 63 评论） :: https://news.ycombinator.com/item?id=48982535
  - SQLite 官方 sqllogictest 说明 :: https://www.sqlite.org/sqllogictest/doc/trunk/about.wiki
---

## 先说结论：最强模型不必做最多工作，协调系统才是实验主角

Cursor 的新版系统把大任务组织成一棵树：规划 agent 负责拆目标和做设计决定，worker agent 只处理狭窄的叶子任务。实验最值得中文开发者和技术创作者关注的，不是“几百个 AI 一夜写完数据库”的戏剧化叙事，而是同一任务、同一时间预算下，不同模型分工产生了接近八倍的成本差距。

官方数据里，worker 至少消耗 69% 的 token，多数运行超过 90%。当昂贵模型同时承担规划和执行，细碎实现会持续吞掉高价 token；让前沿模型只消除关键歧义，再把明确任务交给更便宜的模型，账单可以大幅下降。不过，较贵的规划模型也未必总让总成本更高：若它写出的计划导致 worker 少走弯路，整体 token 反而可能更少。选型不能只比较单价，还要看返工和协调开销。

## 从一千次提交里学到的，是组织设计

旧系统曾出现大量冲突、重复设计和超大文件。新版把设计决定留给规划者，用共享文档记录约束，让中立 agent 处理合并冲突，并在热门文件膨胀时暂停新提交、先拆模块。Cursor 还组合多个相关性较低的 review 视角，因为单一审查者无法发现所有错误。

这些做法不要求小团队真的运行上千 agent。哪怕只有两个并行编码会话，也可以先划清文件所有权，把跨模块决定写入共享设计文档，指定一个独立会话只做冲突合并，再用测试和静态检查作为不可绕过的门。可复用的是边界和反馈回路，不是 agent 数量。

::: callout 100% 只是这个测试面的 100%
sqllogictest 用大量已知答案查询比较 SQL 实现，适合发现语义差异；它不能单独证明性能、并发、崩溃恢复、扩展接口、安全边界和多年兼容性都等同于 SQLite。Cursor 也明确说公开代码尚未做深入人工分析。
:::

## 怎样把厂商实验写得准确

内容中应把“Cursor 报告”“公开仓库可见”“社区讨论认为”分开。四组新版运行最终通过测试，是厂商报告的实验结果；是否能被第三方用相同模型、提示、预算和基础设施复现，目前没有证据。公开仓库可以帮助检查实现范围，却不能替代独立基准，而且仓库页面没有显示许可证，不能因为代码可见就默认可用于商业项目。

这次实验更稳妥的结论是：在长时程软件任务里，模型能力只是成本函数的一部分，任务分解、共享记忆、冲突解决和多视角审查可能更重要。对普通创作者而言，先把规格写清、把高价模型留给真正含糊的决策、给便宜执行层设置测试门，比盲目增加 agent 数量更接近可落地的收益。
