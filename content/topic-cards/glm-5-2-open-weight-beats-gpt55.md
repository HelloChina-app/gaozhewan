---
title: 国产开源模型 GLM-5.2 在编程基准上越过 GPT-5.5——中文创作者今天能写什么
heat: 智谱 Z.ai 于 2026-06-16 发布开源权重模型 GLM-5.2，采用无限制 MIT 许可，744B 总参数 / 约 40B 激活（MoE）、100 万 token 上下文。第三方评测里它是当前得分最高的开源权重模型：Artificial Analysis 智能指数 v4.1 得 51 分（开源第一）。在「长周期编程」这组关键基准上，SWE-bench Pro 拿到 62.1，明确高于 GPT-5.5 的 58.6 和上一代 GLM-5.1 的 58.4；FrontierSWE 74.4%（仅落后 Claude Opus 4.8 的 75.1%，高于 GPT-5.5 的 72.6%）；Terminal-Bench 2.1 从 GLM-5.1 的 63.5 跳到 81.0。Design Arena 设计竞技场以 1360 ELO 排第一。API 报价 $1.40 输入 / $4.40 输出，约为 GPT-5.5（$5/$30）的六分之一，并可经 Unsloth 量化在本地高配机器上跑。它改变的是「自建 vs 采购」的算账方式：前沿级能力第一次能以开源权重 + 极低价拿到。
window: 72h
competition: 中
publishedAt: 2026-06-25
novelty: 8.0
viral: 8.5
accessible: 6.0
angles:
  - 解读向（写给关注国产 AI 的人）：把「MIT 开源 + 编程基准越过 GPT-5.5 + 价格只要六分之一」三件事拆开讲清楚，重点说明 SWE-bench Pro / FrontierSWE 这些「长周期编程」基准到底在测什么，以及为什么这次是「不只是接近、而是在特定项目上超过」闭源前沿。
  - 实测/省钱向：写一篇「用 GLM-5.2 接入 Claude Code / Cline / Kilo Code 跑真实仓库任务」的上手记，对比同任务用 GPT-5.5 的花费，把「便宜 6 倍」从报价变成肉眼可见的账单，并诚实记录它不如 Opus 4.8 的地方（Terminal-Bench、综合推理仍落后）。
  - 自建/隐私向：讲清「744B 模型怎么塞进自己机器」——IndexShare 把百万上下文的单 token 算力降 2.9 倍、Unsloth 动态量化把 1.51TB 压到 2-bit 约 245GB，配一台 256GB 内存的工作站就能本地跑，对「数据不能出境」的中文团队意味着什么。
headlines:
  - 开源权重也能正面越过 GPT-5.5：GLM-5.2 的跑分与水分都讲给你听
  - 价格只要六分之一：国产 GLM-5.2 把「自建 AI」重新变成一道值得算的题
  - 744B 塞进一台工作站：GLM-5.2 本地部署到底要多少内存
materials:
  - Flowtivity · GLM-5.2 实测与基准拆解（2026-06-24）:: https://flowtivity.ai/blog/glm-5-2-open-source-frontier-model/
  - Kilo · 2026 最佳开源编程模型榜（GLM 系列条目）:: https://kilo.ai/open-source-models
---
