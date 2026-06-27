---
title: 用 1/100 的价钱跑 agent——Unisound U2 靠 10B 激活做出前沿级推理
heat: 做医疗语音起家的中国老牌 AI 公司云知声（Unisound，港股 9678）于 2026-06-08 发布 U2，并首次把一款模型明确定位为「agent 基座模型」。据 llm-stats 6 月 25 日的深度评测，U2 是 266B 总参 / 10B 激活的 MoE（每 token 仅约 3.8% 激活），训练 15T token、文本输入输出、知识截止 2026-01-31。卖点是「智能密度」：在 llm-stats 自家 ZeroEval hub 独立实测（非厂商自报）拿到 GPQA Diamond 86.9、MATH-500 85.8、AIME 2025 73.3、SWE-bench Verified 约 73 分，价格却低到 $0.15/百万输入、$0.30/百万输出，缓存输入更只要 $0.003（约 50 倍折扣）——对反复重发同一段系统提示的 agent 循环极省钱。短板同样诚实：FACTS Grounding 44.3、长上下文抗干扰 NoLiMa(hard,16K) 仅 8.5，且为闭源、暂无开放权重。
window: 1 周
competition: 低
publishedAt: 2026-06-27
novelty: 7.0
viral: 6.0
accessible: 6.5
angles:
  - 性价比/省钱向（写给跑高频 agent 循环的人）：算一笔账——10B 激活 + $0.15/$0.30 + 缓存输入 50 倍折扣，意味着什么样的 agent 工作流能把成本压到「四舍五入是零」；同时诚实提醒它闭源、长上下文召回弱，别盲目迁移。
  - 实测/验证向（写给不信榜单的人）：用 LLM Stats Playground 把 U2 和你现在在用的模型摆一起，验证 86.9 GPQA / 85.8 MATH / 73 SWE 在真实任务上的体感，重点测它最弱的「从大段噪声里抠事实」。
  - 格局/叙事向（写给关注国产 AI 的人）：一家在 100+ 医院落地语音 AI 的老公司，转身做 agent 基座，走「智能密度」而非「堆参数」的路线——把这条少有人写的支线讲清楚，用真实分数说话。
headlines:
  - 缓存输入便宜 50 倍：Unisound U2 把「跑 agent」的成本算到了小数点后
  - 10B 激活打出前沿级推理：被低估的国产 agent 基座 U2 实测
  - 从医院语音到 agent 基座——云知声 U2 的「智能密度」是真功夫还是新话术
materials:
  - llm-stats · Unisound U2 深度评测（含 ZeroEval 独立实测分数）:: https://llm-stats.com/blog/research/u2-launch
  - llm-stats · Unisound U2 模型页 :: https://llm-stats.com/models/u2
---
