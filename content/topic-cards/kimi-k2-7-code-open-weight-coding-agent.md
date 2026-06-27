---
title: Kimi K2.7 Code 来了——1T 开源编程 agent，把「思考 token」砍掉三成
heat: Moonshot AI（月之暗面）于 2026-06-12 发布 Kimi K2.7 Code，据 llm-stats 模型页，它在 Kimi K2.6 基础上专攻「真实世界长时程编程任务」，提升了任务完成率与指令遵循，同时把思考 token 用量相比 K2.6 降低约 30%（对按 token 计费的 agent 循环是实打实省钱）。架构为原生多模态 MoE，1T 总参数 / 32B 激活、256K 上下文、支持图像与视频输入，并默认开启 preserve_thinking 以服务多轮编程 agent。定价 $0.95/百万输入、$4.00/百万输出（Moonshot 与 Novita 两家供给，Novita 提供 int4）。许可证为「Modified MIT」——属开源权重，但限制商用，这点中文创作者务必写清楚。
window: 1 周
competition: 高
publishedAt: 2026-06-27
novelty: 6.5
viral: 7.5
accessible: 6.5
angles:
  - 实测/对比向（写给跑 coding agent 的开发者）：拿同一个仓库级任务，对比 Kimi K2.7 Code 与 K2.6、GLM-5.2，验证「思考 token 降 30%」到底省了多少钱、掉没掉准确率，诚实记录翻车点。
  - 省钱+合规/选型向（写给要落地的人）：做一张「2026 年 6 月开源编程 agent 对照表」（Kimi K2.7 Code / GLM-5.2 / DeepSeek V4），把价格、上下文、激活参数和最容易被忽略的「许可证能不能商用」一栏讲清楚——K2.7 的 Modified MIT 非商用限制就是重点。
  - agent 工作流向（写给搭多轮 agent 的人）：讲清 256K 上下文 + preserve_thinking + 多模态输入这套组合适合什么编程 agent 场景，以及 1T 参数自托管难、更适合走 API 的现实取舍。
headlines:
  - 同样的活，少想三成：Kimi K2.7 Code 把编程 agent 的「思考 token」砍下来了
  - 1T 开源、256K 上下文、却限制商用：Kimi K2.7 Code 到底该不该用
  - 开源编程 agent 又多一个选项——Kimi K2.7 Code 对比 GLM-5.2、DeepSeek V4 怎么选
materials:
  - llm-stats · Kimi K2.7 Code 规格/定价/许可证页 :: https://llm-stats.com/models/kimi-k2.7-code
  - llm-stats · 模型发布追踪（6 月新模型时间线）:: https://llm-stats.com/llm-updates
---
