---
title: Bonsai 27B 把 27B 模型压到 3.9GB——但「手机能跑」还不是「手机好用」
heat: PrismML 7 月 14 日发布基于 Qwen 3.6 27B 的 Bonsai 27B，称 1-bit 版仅 3.9GB、三值版 5.9GB，可在 iPhone、iPad、Mac 和 NVIDIA GPU 原生运行；帖子随后登上 Hacker News，截至 7 月 15 日 443 分、166 条评论。边界必须前置：90% / 95% 能力保留、速度与「首个手机 27B」均主要来自厂商自测，iPhone 演示还标注了图像上下文已缓存和预填充；HN 早期用户同时报告 LM Studio 兼容失败、Android 异常输出与低比特工具调用掉点，尚无独立中文、长上下文、功耗和持续 agent 循环基准，不能把「权重装得下」直接写成「普通用户已能稳定使用」。
window: 48h
competition: 中
publishedAt: 2026-07-15
novelty: 9.0
viral: 8.8
accessible: 8.0
angles:
  - 中文实测向：同一台手机上跑中文口播总结、OCR、工具调用和多轮 agent，把首 token、持续速度、峰值内存、发热、耗电与失败率一起测，避免只复述 3.9GB
  - 模型科普向：1-bit 为什么不是普通量化？拆开二值权重、三值权重、组缩放和量化感知训练，再解释 90% 综合分为何可能掩盖工具调用与视觉能力的明显下降
  - 创作者决策向：本地隐私、离线可用和零调用费很诱人，但运行时兼容、中文质量和电量才决定能否进生产——做一张手机本地模型采用清单
headlines:
  - 27B 大模型真塞进 iPhone 了？3.9GB 背后的成绩与四条边界
  - 手机端 AI 的 1-bit 时刻：Bonsai 27B 能跑，不等于已经好用
  - 不上云的 27B agent 来了，但先别被「保留 90% 智力」带跑
materials:
  - PrismML 发布原文、规格与厂商基准 :: https://prismml.com/news/bonsai-27b
  - 9to5Mac 独立报道与 Apple 关系核查 :: https://9to5mac.com/2026/07/14/prismml-releases-bonsai-27b-claiming-first-major-ai-model-of-its-size-fit-for-iphone/
  - Hacker News 讨论（截至 7 月 15 日 443 分 / 166 评论） :: https://news.ycombinator.com/item?id=48910545
---
