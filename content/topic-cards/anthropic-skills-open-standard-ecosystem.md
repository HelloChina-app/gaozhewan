---
title: Agent Skills 从「Claude 的功能」长成了行业标准——anthropics/skills 这个仓库该怎么写
heat: Anthropic 的公开仓库 anthropics/skills（收录可复用的 Agent Skills）热度持续走高：截至 2026-06-11 约 14.9 万 star、1.76 万 fork（2 月时约 7.3 万 star），近期数据已报到约 15.5 万，提交记录更新到 6 月。仓库里的 skill 横跨创意（美术、音乐、设计）、技术（测试 Web 应用、生成 MCP server）到企业工作流。更关键的是：Agent Skills 已不再是 Claude 专属——其格式于 2025-12-18 在 agentskills.io 作为开放标准发布，到 2026 年 6 月已有约 40 个客户端接入，包括 GitHub Copilot、VS Code、Cursor、OpenAI Codex、Gemini CLI、Goose、OpenCode 等。一个原本属于单一厂商的能力，正在变成跨工具的生态标准。
window: 1 周
competition: 中
publishedAt: 2026-06-26
novelty: 7.5
viral: 7.5
accessible: 7.5
angles:
  - 概念扫盲向（写给刚听说「Skill」的中文创作者/独立开发者）：用大白话讲清 Agent Skill 到底是什么、和 prompt、MCP、插件有什么区别，为什么「一段带元数据的 Markdown + 脚本」能成为标准，配 anthropics/skills 里几个真实 skill 拆解。
  - 抄作业向：从 anthropics/skills 仓库挑 2-3 个高质量 skill（如文档生成、Web 测试）逐字拆它的写法和目录结构，总结一套「自己写第一个 skill」的模板，让读者今天就能动手。
  - 生态格局向：以「Agent Skills 成为 agentskills.io 开放标准、40+ 客户端接入」为主线，讲 skill 标准化对创作者意味着什么——一次写好、多个 agent 复用，以及「source-available 而非纯开源」的边界要注意。
headlines:
  - 14 万 star 的 anthropics/skills，到底在教我们怎么写 Agent Skill
  - Skill 不再是 Claude 专属：一个正在变成行业标准的 Markdown 格式
  - 抄 Anthropic 的官方仓库，写出你的第一个 Agent Skill
materials:
  - GitHub · anthropics/skills :: https://github.com/anthropics/skills
  - 仓库内 skills 目录 :: https://github.com/anthropics/skills/tree/main/skills
  - 第三方梳理 · Anthropic Skills 研究（Ry Walker）:: https://rywalker.com/research/anthropic-skills
---
