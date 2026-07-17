---
title: Kimi K3 把模型堆到 2.8T——但「开放权重」还要等到 7 月 27 日
heat: 月之暗面 7 月 16 日发布 Kimi K3，官方称其为 2.8T 总参数、原生视觉、100 万 token 上下文的 MoE 模型，每次激活 896 个专家中的 16 个；截至 Asia/Katmandu 7 月 17 日，Hacker News 讨论达 1193 分、746 条评论，Axios 与 Simon Willison 均在发布当天跟进。它已可通过 Kimi 网页、Kimi Code 与 API 使用，但事实边界必须前置：完整权重只承诺在 2026 年 7 月 27 日前发布，当前还不能把「开放权重」写成已经可下载部署；技术报告、架构细节与完整评测也将随权重后发。官方承认整体能力仍落后于最强闭源模型，现有对比大量来自厂商自测或上线初期样本，2.8T 是总参数而非每 token 全量激活，中文长文、真实仓库、视觉和超长上下文表现仍需独立复测。
window: 72h
competition: 高
publishedAt: 2026-07-17
novelty: 8.8
viral: 9.4
accessible: 7.8
angles:
  - 中文创作者实测向：用同一套中文长文改写、资料检索、网页前端和图片理解任务对比 Kimi K3 与 K2.7，公开速度、token、费用、引用准确率和翻车样本，不照搬官方榜单
  - 开放权重事实核查向：拆开「网页/API 已上线」「权重承诺 7 月 27 日前发布」「技术报告尚未发布」三个状态，解释为什么开放模型新闻最容易把未来时写成完成时
  - 架构科普向：用 896 个专家只激活 16 个解释 2.8T 总参数、激活参数和实际推理成本不是一回事，并在权重与部署方案公布后再更新硬件门槛
headlines:
  - 2.8T 的 Kimi K3 来了，但今天还不能下载权重
  - Kimi K3 刷屏之后，先把 2.8T、1M 上下文和开放权重说清楚
  - 我们该怎么测 Kimi K3：别只看官方榜单，先等权重和技术报告
materials:
  - Kimi K3 官方发布与规格、权重时间表 :: https://www.kimi.com/blog/kimi-k3
  - Simon Willison 发布日独立解读与试用观察 :: https://simonwillison.net/2026/Jul/16/kimi-k3/
  - Axios 发布日报道与早期表现边界 :: https://www.axios.com/2026/07/16/moonshot-kimi-ai-china-model-openai-anthropic
  - Hacker News 讨论（截至 7 月 17 日 1193 分 / 746 评论） :: https://news.ycombinator.com/item?id=48935342
---
