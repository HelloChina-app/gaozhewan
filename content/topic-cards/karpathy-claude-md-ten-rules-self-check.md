---
title: 那个 20 万星的 CLAUDE.md「进化」了：从 4 条规则到 10 条，开始教 agent 自我刹车
heat: 2026-06-28，一份署名 Andrej Karpathy、副标题为「A Short List of Rules, Earned by Watching the Same Mistakes Twice」的十条规则 CLAUDE.md 在 X 上开始流传（真实性未经本人确认，Karpathy 未回应）。它在社区四条版基础上新增六条，把重点从「怎么写代码」转向「agent 怎么监控自己的推理」：先写能复现 bug 的测试再修、调试时一次只改一个变量、把每个依赖当作长期负担、用「不确定就说不确定」替代「我觉得应该行」，并给出四种该立刻停手的失败模式——Kitchen Sink（让你修水龙头你把整个厨房翻新了）、Wrong Abstraction、Optimistic Path、Runaway Refactor。背景是社区四条版（开发者 Forrest Chang 据 Karpathy 1 月帖整理，repo forrestchang / multica-ai 的 andrej-karpathy-skills，两处合计 20 万+ stars，被称为 GitHub 史上增长最快的文件之一）。
window: 72h
competition: 中
publishedAt: 2026-06-30
novelty: 7.0
viral: 8.0
accessible: 8.5
angles:
  - 实操向（写给天天用 Claude Code/Codex 的人）：把十条规则逐条翻成中文 + 一份可直接粘进项目根目录的 CLAUDE.md 模板，重点讲「新增六条」在自动化/长跑 loop 里为什么比四条更值钱，并提醒只从官方 repo 取、警惕被投毒的 CLAUDE.md。
  - 认知向（写给想理解「为什么一个文件能改变模型行为」的人）：讲清 CLAUDE.md 是被注入到对话上下文（不是 system prompt）、因此是「影响而非强制」，由此解释为什么要给 agent 一套能自我识别失败模式的词汇，以及它和 /goal 独立验证模型的关系。
  - 蹭热点/观点向：从「社区四条 vs 流传十条」的争论切入——内部工作文件该不该外泄、单个配置文件凭什么左右前沿模型——给中文读者一个有立场但克制的解读，附上「先别神化、自己 A/B 一下」的实操建议。
headlines:
  - 20 万星的 CLAUDE.md 又长大了：新增六条，开始教 AI 自己踩刹车
  - 让 agent 学会说「我不确定」：流传中的十条 Karpathy 规则全文解读
  - Kitchen Sink、Runaway Refactor：四种该让 AI 立刻停手的失败模式
materials:
  - GitHub · andrej-karpathy-skills（社区四条版，含 CLAUDE.md 原文）:: https://github.com/multica-ai/andrej-karpathy-skills
  - Tech Times · 十条规则版报道与逐条解读 :: https://www.techtimes.com/articles/319214/20260628/karpathy-claudemd-grows-ten-rules-new-self-check-protocol-ai-coding-loops.htm
---
