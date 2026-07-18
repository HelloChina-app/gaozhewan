---
title: 79% 的开发者在用开放模型，真正上线的只有 51%——Mozilla 把「能下载」和「能生产」拆开了
heat: Mozilla 7 月 14 日发布首份《The State of Open Source AI》报告；Mozilla / SlashData 调查称，参与 AI 功能开发的受访者中 79% 使用开放模型，但开放模型团队只有 51% 进入生产，低于闭源模型团队的 63%，大中华区与东亚的开放模型采用率则达到 89%。报告在 7 月 18 日登上 Hacker News 前列，截至核验时讨论达 376 分、274 条评论。事实边界必须前置：这是一份 Mozilla 立场明确的行业报告和抽样调查，不是全体开发者普查；报告把 open models / open weights 放在同一叙事中，而 OSI 的 Open Source AI Definition 还要求训练数据说明、完整训练与运行代码、参数等可修改材料，二者不能直接画等号。报告的 OpenRouter token 份额只代表该平台，部分中间值由作者插值，财务与能力对比也需回到各自原始数据复核，不能把 79%、51% 或 89% 外推为所有市场的确定结论。
window: 72h
competition: 高
publishedAt: 2026-07-18
novelty: 8.4
viral: 8.8
accessible: 8.6
angles:
  - 中文创作者部署实测向：拿同一个中文内容工作流分别跑本地开放权重与托管闭源 API，公开显存、并发、延迟、运维时间和真实总成本，验证「下载免费」之后还要付什么
  - 术语事实核查向：对照 Mozilla 报告与 OSI 1.0 定义，把开放权重、开放模型和开源 AI 拆成三层，检查热门国产模型究竟开放了权重、代码、训练配方还是数据说明
  - 调查口径解读向：解释 79% 采用、51% 生产和东亚 89% 分别来自什么样本与问题，明确抽样、平台偏差和 OpenRouter 插值限制，避免把行业报告改写成普遍定律
headlines:
  - 开放模型人人都在试，为什么真正上线的反而更少
  - 79% 在用、51% 上线：开源 AI 的短板已经不是模型分数
  - 别再把开放权重都叫开源：Mozilla 报告里最该补的一张术语表
materials:
  - Mozilla 官方发布与调查摘要 :: https://blog.mozilla.org/en/mozilla/mozilla-state-of-open-source-ai-report/
  - 《The State of Open Source AI》完整交互报告与数据口径 :: https://stateofopensource.ai/
  - OSI Open Source AI Definition 1.0 :: https://opensource.org/ai/open-source-ai-definition
  - Hacker News 独立讨论（截至 7 月 18 日 376 分 / 274 评论） :: https://news.ycombinator.com/item?id=48947825
---
