---
title: 「会用电脑的开源大模型」——MiniMax M3 凭什么让中文创作者今天就该写一篇
heat: 国产模型 MiniMax 于 2026-06-01 发布 M3，被官方与多家媒体（MarkTechPost、the-decoder）称为「首个把前沿编程能力、100 万 token 上下文、原生多模态合在一个开源权重模型里」的尝试。底层是新的 MiniMax Sparse Attention（MSA）稀疏注意力。公开报道的跑分：SWE-Bench Pro 59.0%（被报道为超过 GPT-5.5 与 Gemini 3.1 Pro），OSWorld-Verified 70.06%（衡量「直接操作电脑桌面」的能力），支持文本 / 图像 / 视频输入并能原生操作桌面。发布当天仅经 API 与 MiniMax Agent 开放，官方称约 10 天内公开权重与技术报告。
window: 1 周
competition: 高
publishedAt: 2026-06-22
novelty: 8.5
viral: 8.0
accessible: 6.0
angles:
  - 解读向（写给关注国产 AI 的人）：把「开源权重 + 会用电脑（OSWorld 70%）+ 100 万上下文」这三件事拆开讲清楚——为什么把它们塞进同一个模型是稀奇事，对想本地/低成本跑 agent 的中文开发者意味着什么。
  - 实测/上手向：等权重放出后，写一篇「用 MiniMax M3 跑一个会自己点鼠标、填表单的桌面任务」，把「能用电脑」从跑分变成肉眼可见的 demo，并诚实记录翻车的地方。
  - 横向对比向：把 M3 和已经在写的 DeepSeek V4、Qwen3-Coder 等国产开源模型放一起，讲清这一波「中国实验室用开源权重正面刚闭源前沿模型」的格局，以及创作者该怎么选。
headlines:
  - 国产开源大模型开始「自己用电脑」了：MiniMax M3 值不值得追
  - 100 万上下文 + 原生多模态 + 会操作桌面：拆解 MiniMax M3 这条新路线
  - 开源权重也能刚 GPT-5.5？MiniMax M3 的跑分与水分都讲给你听
materials:
  - MiniMax 官方博客 · MiniMax M3 :: https://www.minimax.io/blog/minimax-m3
  - MarkTechPost · MiniMax 发布 M3（MSA / 1M 上下文 / agentic coding）:: https://www.marktechpost.com/2026/06/01/minimax-releases-minimax-m3-with-msa-architecture-supporting-1m-token-context-native-multimodality-and-agentic-coding/
  - the-decoder · 开源权重 + 百万上下文挑战闭源 :: https://the-decoder.com/minimax-m3-open-weight-model-with-a-million-token-context-challenges-proprietary-leaders/
---
