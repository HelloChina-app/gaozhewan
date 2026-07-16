---
title: 975B 开放权重模型来了，但最低 600GB 显存——Inkling 把「开放」和「跑得起」分开了
heat: Thinking Machines Lab 7 月 15 日发布首个正式模型 Inkling：975B 总参数、41B 激活，原生接收文本、图像和音频，最长 100 万 token 上下文，Apache 2.0 权重已开放；截至 7 月 16 日，HN 讨论达 714 分、185 条评论，Artificial Analysis 独立测试把它列为当前美国实验室领先的开放权重模型。边界必须前置：官方明确称它不是当前最强模型；大部分对比仍混有厂商自报或特定 harness，中文与方言表现没有单独公开基准。更关键的是，BF16 自托管至少需 2TB 聚合显存，NVFP4 量化版也至少需 600GB，所谓「开放权重」不等于普通创作者能在本地电脑运行；Tinker 微调和第三方推理仍是云服务路径。
window: 72h
competition: 中
publishedAt: 2026-07-16
novelty: 9.0
viral: 8.8
accessible: 8.2
angles:
  - 概念拆解向：用 Inkling 的 2TB / 600GB 显存门槛解释 open weights、open source、可下载、可微调与个人可本地部署并不是同一件事
  - 中文创作者实测向：不复读英文榜单，拿中文长文、图片理解、音频转写和工具调用在 Tinker / 第三方 API 上做同题测试，记录价格、延迟、事实错误与多轮退化
  - 产品选型向：开放许可证提供定制与集成自由，但 975B 模型把算力重新变成门槛——对比直接用 API、云端微调、租 GPU 和选择小模型的真实成本
headlines:
  - 975B 权重全开放，为什么你的电脑还是跑不了 Inkling
  - 开放权重不等于本地模型：Inkling 最低 600GB 显存的现实
  - Thinking Machines 第一款模型发布了，真正的卖点不是跑分而是可定制
materials:
  - Thinking Machines Lab 官方发布与架构说明 :: https://thinkingmachines.ai/news/introducing-inkling/
  - Inkling 官方模型卡（许可证、硬件门槛与限制） :: https://thinkingmachines.ai/model-card/inkling/
  - Artificial Analysis 独立基准与价格交叉核验 :: https://artificialanalysis.ai/articles/thinking-machines-has-released-inkling-the-new-leading-u-s-open-weights-model
  - Hacker News 讨论（截至 7 月 16 日 714 分 / 185 评论） :: https://news.ycombinator.com/item?id=48924912
---
