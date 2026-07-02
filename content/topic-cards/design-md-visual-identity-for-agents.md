---
title: DESIGN.md：Google Labs 想用一个 Markdown 文件，把「设计系统」讲给 AI agent 听
heat: google-labs-code/design.md 提出 DESIGN.md 格式规范——给 coding agent 一份「持久、结构化」的设计系统理解。2026-06-25 登上 GitHub Trending，当日约 +619 stars（据 StartupCorners 趋势榜）。一个 DESIGN.md 文件把机器可读的 design token（YAML front matter）和人类可读的设计理由（Markdown 正文）合在一起：token 给 agent 精确数值，正文告诉它这些值为什么存在、该怎么用。配套 CLI 能对照 spec 校验 DESIGN.md、抓出坏掉的 token 引用、检查 WCAG 对比度、把结构化结论输出成 agent 能直接消费的 JSON；还能把 token 导出成别的格式（如 Tailwind v3 config）。目前处于 alpha，spec、token schema 和 CLI 都在活跃开发、会有 breaking change。它和这个站一贯的「用文件当唯一事实源」思路同源，是 files.md / design 系文件规范里最新、且出自 Google Labs 的一个。
window: 1 周
competition: 低
publishedAt: 2026-07-01
novelty: 8.0
viral: 6.5
accessible: 7.5
angles:
  - 实操向（写给用 AI 做前端/独立开发的人）：拿一个真实小项目写一份 DESIGN.md，跑它的 linter 和 Tailwind 导出，看 agent 拿到「token + 理由」后产出的 UI 一致性是不是真的变好——对比「只在 prompt 里口头描述设计」的做法。
  - 认知向（写给关心「文件即接口」趋势的人）：把 DESIGN.md 放进 CLAUDE.md / AGENTS.md / files.md 这条「用结构化 Markdown 喂 agent」的脉络里，讲清「token 给数值、正文给意图」为什么比截图或口述更适合让 agent 长期记住一套设计语言。
  - 观点向：alpha 阶段该不该现在就投入？聊「又一个 .md 规范」的疲劳感，以及一个设计系统规范由 Google Labs 牵头意味着什么——给中文读者一个克制的「先试小项目、别急着全量迁移」判断。
headlines:
  - DESIGN.md：把你的设计系统写成一个文件，喂给 AI 让它别再画歪
  - token 给数值、正文给意图：Google Labs 让 agent 记住设计语言的新格式
  - 又一个 .md 规范，但这次管的是「视觉一致性」——DESIGN.md 值不值得试
materials:
  - GitHub · google-labs-code/design.md :: https://github.com/google-labs-code/design.md
  - DESIGN.md · 格式规范 spec.md :: https://github.com/google-labs-code/design.md/blob/main/docs/spec.md
  - StartupCorners · GitHub Trending June 25 2026（当日 +619 stars 数据来源） :: https://startupcorners.com/digest/devtools-digest-2026-06-25
---
