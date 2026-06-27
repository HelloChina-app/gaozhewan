---
title: Google 开源了一个「会扩散」的语言模型——DiffusionGemma 用画图的方式写字，本地推理快 4 倍
heat: Google DeepMind 于 2026-06-10 放出实验性开源权重模型 DiffusionGemma 26B-A4B（Apache 2.0），据 llm-stats 模型页，它基于 Gemma 4 的 26B-A4B MoE 架构，但不再是逐字自回归生成，而是用「离散扩散」（discrete diffusion）并行去噪一个 256 token 的画布，因此在专用 GPU 上文本生成最高可快约 4 倍。规格上 25.2B 总参数、3.8B 激活、256K 上下文、支持文本+图像输入，知识截止 2025 年 1 月。对中文创作者，这是少有的「大厂出品 + 开源权重 + 架构层面真新」的选题：扩散式文本模型一直停留在论文里，这次以 Gemma 之名落地、还能本地跑。
window: 1 周
competition: 中
publishedAt: 2026-06-27
novelty: 9.0
viral: 7.5
accessible: 8.0
angles:
  - 科普/原理向（写给想搞懂「为什么能快 4 倍」的人）：用一篇大白话讲清「自回归逐字写」与「扩散并行去噪 256 token 画布」的区别，配一张时序对比图，把扩散式文本模型这个冷概念讲热，强调这是架构之争而非又一个刷榜模型。
  - 上手/本地部署向（写给想白嫖开源权重的开发者）：25.2B 总参但只激活 3.8B、Apache 2.0 可商用，写一篇「在自己机器上把 DiffusionGemma 跑起来」的实录，诚实记录它「实验性」的翻车点和与普通 Gemma 4 的体感差距。
  - 趋势/选型向（写给关注本地 AI 的人）：把它定位成「低延迟、低并发的本地生成」专用工具，讲清楚扩散式文本模型现在适合做什么、不适合做什么，避免被「快 4 倍」的标题带偏。
headlines:
  - 不再逐字蹦：Google 用「扩散」重写了 Gemma，本地生成快 4 倍是怎么做到的
  - 25B 参数只激活 3.8B、还能商用：DiffusionGemma 把扩散式文本模型搬进了你的电脑
  - 论文里的「扩散写字」终于能下载了——DiffusionGemma 上手实测与避坑
materials:
  - llm-stats · DiffusionGemma 26B-A4B 规格/许可证/上下文页 :: https://llm-stats.com/models/diffusiongemma-26b-a4b-it
  - llm-stats · 模型发布追踪（6 月新模型时间线）:: https://llm-stats.com/llm-updates
---
