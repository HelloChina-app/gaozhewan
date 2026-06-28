---
title: 把便宜模型「组队」打前沿——Sakana AI Fugu 用一个 API 让模型互相 review
heat: 日本 AI 实验室 Sakana AI 于 2026-06-25 发布 Fugu：一个 API 端点，在背后把多个公开可用模型按 Thinker / Worker / Verifier 三种角色编排协作，用「组队互查」而不是单一大模型去解题。据 ThursdAI 汇总的官方数据，它在 GPQA Diamond 拿到 95.5、LiveCodeBench 93.2、SWE-Bench Pro 73.7，宣称在多个基准上追平或超过前沿系统。它改变的是：不必自己拥有最强模型，靠编排就能把现成模型的上限往前推。
window: 1 周
competition: 中
publishedAt: 2026-06-28
novelty: 7.5
viral: 7.5
accessible: 7.0
angles:
  - 概念解读向（写给关注 agent 的人）：讲清 Thinker / Worker / Verifier 三角色编排是什么、为什么「多模型互查」能比单模型更稳，以及它和 mixture-of-agents、self-consistency 的区别。
  - 实测/性价比向（写给要落地的人）：拿 Fugu 跑一个真实编程或推理任务，和直接调用单个前沿模型对比，验证「便宜组队能不能真打平」，并算清编排带来的延迟与 token 成本。
  - 趋势向（写给做内容的人）：把 Fugu 放进「2026 年 6 月编排/路由潮」里一起讲——Sakana Fugu、OpenRouter Fusion、W&B HiveMind，说明「模型不再是终点，编排才是」。
headlines:
  - 不用最强模型也能打前沿：Sakana Fugu 让 AI 自己组队互查
  - 一个 API，三种角色：Fugu 把「模型编排」做成了开箱即用
  - GPQA 95.5、SWE-Bench Pro 73.7：Fugu 靠组队刷出的成绩单该怎么看
materials:
  - Sakana AI · Fugu 官方发布页 :: https://sakana.ai/fugu/
  - ThursdAI · 2026 年 6 月发布汇总（含 Fugu 基准数字与原始链接） :: https://thursdai.news/releases/2026-06
---
