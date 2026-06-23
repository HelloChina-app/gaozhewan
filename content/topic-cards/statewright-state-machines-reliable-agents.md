---
title: 「给 agent 立规矩，而不是换更大的模型」——Statewright 把状态机塞进 Claude Code，让小模型也能稳
heat: 在 Hacker News 的 Show HN 上 56 分、16 条讨论（作者 Ben Cochran，自述有 20+ 年工程经验、曾在 NVIDIA / AMD 任 Distinguished Engineer）。Statewright 的主张很反直觉：不靠更大模型或更长上下文，而用形式化状态机约束 agent——每个状态只开放特定工具、限定迭代次数和合法转移（规划态只读、实现态才给编辑工具、测试态只能跑测试命令），由协议而非 prompt 强制执行。作者称这让 13–20B 的小模型在 SWE-bench 类任务上稳定提升，连 Haiku / Sonnet / Opus 也更省 token、更少陷入「死循环」。核心是一个 Rust 引擎，通过 MCP 插件接入 Claude Code。
window: 1 周
competition: 中
publishedAt: 2026-06-23
novelty: 8.0
viral: 6.5
accessible: 6.0
angles:
  - 科普 / 认知向（写给所有觉得「agent 不稳」的人）：讲明白为什么「把问题改小」常常比「把模型改大」更有效——用状态机约束工具与每步上下文，配 Statewright 的「规划 / 实现 / 测试」三态例子，让没接触过形式化方法的人也能懂。
  - 动手向：「让你的 Claude Code 守规矩」——手把手用 Statewright 的 /plugin 装一个 bugfix 工作流，对比开启 / 关闭状态机时 agent 行为的差别，给读者一个能复现的小实验。
  - 冷静 / 思辨向：聊它的争议点——research 复现代码尚未完全公开、核心引擎号称 Apache 2.0 但又提到已申请临时专利（#64/054,240，含 35 项权利要求），给想采用的人一份「这开源到底开了多少」的提醒。
headlines:
  - 别再堆大模型了：用状态机给 AI agent 立规矩，小模型也能稳
  - 规划只读、实现才给改：Statewright 把「agent 守规矩」做成了协议
  - 前 NVIDIA 工程师的反直觉实验：把问题改小，而不是把模型改大
materials:
  - GitHub · statewright/statewright（状态机护栏 + MCP 插件）:: https://github.com/statewright/statewright
  - Hacker News · Show HN 讨论（56 分 / 16 评论）:: https://news.ycombinator.com/item?id=48108778
  - 官方 · Statewright 研究页与可视化编辑器 :: https://statewright.ai/research
---
