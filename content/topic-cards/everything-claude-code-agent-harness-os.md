---
title: 一套配置喂饱所有 coding agent：Everything Claude Code 把 Claude Code/Cursor/Codex/OpenCode 统一成一个「agent 操作系统」
heat: 独立开发者 Affaan Mustafa 的开源项目 Everything Claude Code（ECC）在约五个月内冲上 GitHub 高星榜——不同报道统计其 star 数在快速攀升（从 10 万、16.3 万、17 万一路到 21 万+，各来源口径不一），成为最受关注的 AI 开发工具仓库之一。它的核心不是又一个 agent，而是一层「agent harness / 配置操作系统」：用 AGENTS.md 放在仓库根目录的约定 + 跨平台 hook 适配器，让同一套配置同时驱动 Claude Code、Cursor、Codex、OpenCode（新版本还覆盖 Gemini、Zed），并内置大量现成 skills / agents / commands（报道口径从「28 agents、119 skills、60 commands」到新版「262 skills、64 agents、84 commands」不等）。还配了开源安全审计器 AgentShield（red-team/blue-team/auditor 流水线，官方称约 102 条静态规则、1282 个测试、98% 覆盖），用来扫 CLAUDE.md、.cursorrules、agents.json 等配置里的提示注入与 guardrail 漏洞。作者自 2025 年 2 月起每天用 Claude Code，2025 年 9 月凭这套优化系统拿下 Anthropic x Forum Ventures 黑客松。它改变的是「每个 agent 工具各配一套」的碎片化现状——把 agent 的「人设、技能、记忆、安全」标准化成一份可跨工具复用的配置。（抓取于 2026-07-04；star 数与各项数量因版本/来源不同差异较大，引用前请以打开当天的仓库为准。）
window: 1 周
competition: 中
publishedAt: 2026-07-04
novelty: 8.0
viral: 8.0
accessible: 6.5
angles:
  - 上手/复用向（写给已经在用 Claude Code / Cursor 的创作者与独立开发者）：真机跑一遍——把 ECC 的 AGENTS.md 约定接到自己项目里，实测同一套 skills/commands 在两三个工具间复用的体验，讲清它到底省了哪些重复配置、哪些坑要自己填。
  - 趋势解读向：从 ECC 看「agent harness」正在成为一层新的基础设施——当模型和工具都在快速换代，真正沉淀下来的是你的「配置资产」（技能库、记忆、安全规则）。给中文读者讲清「把能力从工具里解耦出来」这件事为什么值得现在就开始做。
  - 安全/避坑向：借 AgentShield 这个点，讲一篇「你的 CLAUDE.md / .cursorrules 可能正在被提示注入」——面向所有让 agent 读写本地配置的人，说明配置文件也是攻击面，给一份自查清单。
headlines:
  - 21 万 star 的不是 agent，是「配置」：Everything Claude Code 想当所有 coding agent 的操作系统
  - 一份 AGENTS.md 通吃 Claude Code、Cursor、Codex：ECC 到底解决了什么
  - 你的 CLAUDE.md 也是攻击面：从 ECC 的 AgentShield 说说 agent 配置安全
materials:
  - GitHub · affaan-m/everything-claude-code :: https://github.com/affaan-m/everything-claude-code
  - Augment Code · Everything Claude Code hits 170K stars: what developers should know :: https://www.augmentcode.com/learn/everything-claude-code-github-stars
  - DataCamp · Everything Claude Code (ECC): Open-Source Framework Guide :: https://www.datacamp.com/tutorial/everything-claude-code
---
