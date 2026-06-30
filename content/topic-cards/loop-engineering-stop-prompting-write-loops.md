---
title: 从「写 prompt」到「写 loop」：Boris Cherny 一句话，把 AI 编程带进了 Loop Engineering 时代
heat: 2026 年 6 月，Claude Code 负责人 Boris Cherny 公开说「我已经不写 prompt 了，我写的是 loop——由 loop 去 prompt Claude、决定下一步」；OpenAI 的 Peter Steinberger 几乎同时呼应，Google 工程师 Addy Osmani 在 6 月 7 日的文章里把它命名并拆成六块原语（Automations / Worktrees / Skills / Connectors / Sub-agents / Memory），对应到 Claude Code 现成的 /loop、/goal、/schedule、/workflows 命令。核心机制是 /goal 用一个独立的、更快的「验证模型」在每轮后判断是否达标（写代码的 agent 不给自己打分）。但倡导者都附了警告：agent loop 的 token 成本会快速膨胀——到第 20 轮单次输入可超 5 万 token，一次 200 轮的开放式任务可能花掉 80 美元+，曾有团队一个周末烧掉约 4200 美元 API 费；Anthropic 自 2026-06-15 起把自动化负载单独计费（Pro $20 / Max 最高 $200 的独立额度池）。
window: 1 周
competition: 中
publishedAt: 2026-06-30
novelty: 7.0
viral: 7.5
accessible: 7.0
angles:
  - 科普/范式向（写给被各种「agent」名词绕晕的人）：用一篇讲清 prompt → context → harness → loop engineering 的演进，以及「为什么模型是无状态的、所以上下文必须落在文件/git/CLAUDE.md 里」，把 Loop Engineering 讲成普通创作者也能懂的系统设计思路。
  - 省钱/避坑向（写给想跑自动化又怕烧钱的人）：把「四个开跑前必做的决定」翻成中文清单——定义可机器校验的完成条件、用 --max-turns 设预算、maker/checker 分离、并行用 worktree 隔离；配真实烧钱案例，讲清「没有 verifier 的无人值守 loop 就是一台高置信度量产 bug 的机器」。
  - 实战搭建向（写给已经在用 Claude Code/Codex 的人）：手把手把 /loop、/goal、/schedule、/workflows 串成一个小 loop（例如每天自动整理选题、跑测试、不达标不停），强调 /goal 的独立验证模型是它区别于「定时重复 prompt」的关键。
headlines:
  - 不写 prompt 改写 loop：AI 编程正在进入 Loop Engineering 时代
  - 一个周末烧掉 4200 美元：自动化 agent 省钱避坑的四条铁律
  - /loop 和 /goal 到底差在哪？把 Claude Code 串成一个会自我验证的循环
materials:
  - Addy Osmani · Loop Engineering 原文 :: https://addyosmani.com/blog/loop-engineering/
  - The New Stack · Loop Engineering 报道 :: https://thenewstack.io/loop-engineering/
  - Tech Times · Loop Engineering 深度解读（含成本数据）:: https://www.techtimes.com/articles/318828/20260622/claude-code-loop-engineering-stop-prompting-start-designing-autonomous-agent-workflows.htm
---
