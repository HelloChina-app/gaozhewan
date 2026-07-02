---
title: Claude Sonnet 5 来了：把「接近 Opus」的 agent 能力打到 $2 一百万 token
heat: 2026-06-30，Anthropic 发布 Claude Sonnet 5，主打「更便宜地跑 agent」。官方与多家媒体（TechCrunch、MarkTechPost）给出的真实数据：在 SWE-bench Pro 上拿 63.2 分（GPT-5.5 为 58.6、Gemini 3.5 Flash 为 55.1），computer use 基准 OSWorld-Verified 达 81.2%（上一代 Sonnet 4.6 为 78.5%），Terminal-Bench 2.1 为 80.4%（但这项被 GPT-5.5 的 83.4 反超）；带 1M token 上下文，官方称质量已接近 Opus 4.8。定价是最大看点：截至 2026-08-31 的引入价 $2/百万 输入、$10/百万 输出，之后回到 $3/$15。它同时成为 claude.ai 免费版和 Pro 版的新默认模型，并已上线 Claude Code、Claude API、Cursor、VS Code 和 GitHub Copilot。
window: 72h
competition: 高
publishedAt: 2026-07-01
novelty: 6.5
viral: 8.0
accessible: 8.0
angles:
  - 实操向（写给天天跑 agent / Claude Code 的人）：用引入价窗口算一笔账——同样一条长跑 loop，Sonnet 5 相比 Opus 4.8、GPT-5.5 各要花多少钱，什么任务该降级到 Sonnet、什么任务仍值得用 Opus，给出「便宜到可以放开跑循环」的具体阈值。
  - 认知向（写给想看懂「模型分层」的人）：讲清 Anthropic 为什么要在 Opus 之下压一条「近 Opus、价格腰斩」的线，以及 SWE-bench Pro 领先但 Terminal-Bench 被 GPT-5.5 反超说明了什么——「哪一类 agent 活它真的更强」。
  - 蹭热点/避坑向：提醒引入价 8/31 到期会涨 50%，别把成本模型建在临时价上；顺带对比它作为免费版默认模型对普通用户意味着什么。
headlines:
  - Claude Sonnet 5：$2 一百万 token，把「接近 Opus」变成日常默认
  - SWE-bench Pro 63.2 领先、Terminal-Bench 被反超：Sonnet 5 到底强在哪
  - 便宜到可以放开跑循环：Sonnet 5 的 agent 成本账怎么算
materials:
  - Anthropic 官方发布 · Introducing Claude Sonnet 5 :: https://www.anthropic.com/news/claude-sonnet-5
  - TechCrunch · Anthropic launches Claude Sonnet 5 as a cheaper way to run agents :: https://techcrunch.com/2026/06/30/anthropic-launches-claude-sonnet-5-as-a-cheaper-way-to-run-agents/
  - MarkTechPost · Sonnet 5 vs 4.6 vs Opus 4.8 基准与定价对比 :: https://www.marktechpost.com/2026/06/30/anthropic-claude-sonnet-5-vs-sonnet-4-6-vs-opus-4-8-agentic-coding-benchmarks-api-pricing-and-cost-performance-tradeoffs-compared/
---
