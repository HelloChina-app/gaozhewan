---
title: 你还没开始提问，coding agent 已经花掉 3.3 万 tokens——Claude Code 与 OpenCode 的隐性成本实测
heat: Systima 7 月 12 日发布一组 API 边界抓包测试，把 Claude Code 2.1.207 与 OpenCode 1.17.18 放在同一机器、同一模型和同一任务下：仅回复一个「OK」时，Claude Code 首轮固定载荷约 3.28 万 tokens，OpenCode 约 6900；一份 72KB 指令文件又会让两边每次请求各增加约 2 万 tokens。文章当天登上 Hacker News 前排，截至 7 月 13 日 470 分、266 条评论。边界也很重要：这是单机、小样本、特定版本的 2026 年 7 月快照；在多步骤任务里 Claude Code 因批量调用工具，请求总量反而略低于 OpenCode（约 12.1 万 vs 13.2 万），不能把首轮开销直接等同于整项任务成本。
window: 72h
competition: 中
publishedAt: 2026-07-13
novelty: 8.0
viral: 8.5
accessible: 8.5
angles:
  - 省钱实测向：照文章方法给自己的 coding agent 做一次「空任务体检」——逐个关掉 MCP、长指令和子 agent，测出每层配置到底多花多少 token
  - 创作者科普向：为什么你只问一句话，后台却先塞进几十个工具说明？用「登机前先搬完整工具箱」解释 system prompt、tool schema、缓存写入与上下文预算
  - 选型向：别只比单轮 token——把首轮载荷、请求次数、并行工具调用、缓存稳定性和最终任务质量做成一张 Claude Code / OpenCode 决策表
headlines:
  - 你还没开始提问，Claude Code 已经花掉 3.3 万 tokens
  - 同一个模型，为什么换个 coding agent 账单能差 4.7 倍？
  - MCP 和长指令有多贵？一次 coding agent 隐性成本拆账
materials:
  - Systima 原始测试与完整方法 :: https://systima.ai/blog/claude-code-vs-opencode-token-overhead
  - Hacker News 讨论（截至 7 月 13 日 470 分 / 266 评论） :: https://news.ycombinator.com/item?id=48883275
  - 测试使用的开源哈希链审计日志库 :: https://github.com/systima/aiact-audit-log
---
