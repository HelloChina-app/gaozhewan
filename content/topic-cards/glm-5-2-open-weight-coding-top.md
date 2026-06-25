---
title: 同一周，国产开源把编程榜「顶」上去了——GLM-5.2 用 1/6 的价钱逼平闭源前沿
heat: 智谱 Z.ai 于 2026-06-13 发布 GLM-5.2，开源权重（MIT）于 2026-06-16 在 Hugging Face 正式放出。它是 744B 参数的 MoE 模型，每 token 激活约 40B，上下文窗口扩到 100 万 token（约为 GLM-5.1 ~20 万的 5 倍），最大输出 131,072 token。第三方测评把它列为当前最强开源权重编程模型之一：SWE-bench Pro 62.1、Terminal-Bench 2.1 81.0（仅次于 Claude Opus 4.8）。VentureBeat 报道其在多项「长时程」编程基准上超过 GPT-5.5，而 API 价格仅约其 1/6（约 $4.40/百万输出 token）。这恰好发生在 Claude Fable 5 因美国出口管制对外国人停用的同一周——对中文创作者，这是一个「现在就能下载、能跑、能商用」的现实选项。
window: 1 周
competition: 高
publishedAt: 2026-06-25
novelty: 7.5
viral: 8.0
accessible: 8.0
angles:
  - 上手/实测向（写给想省钱跑 agent 的开发者）：写一篇「用 GLM-5.2 跑一个仓库级编程任务」的实录，验证 1M 上下文 + 81.0 Terminal-Bench 到底好不好用，诚实记录翻车点和与闭源模型的体感差距。
  - 选型/省钱向：把「闭源前沿被切断 + 开源权重逼平」这条主线讲清楚，做一张「2026 年 6 月中文创作者能用的开源编程模型对照表」（GLM-5.2 / DeepSeek V4 / Qwen3-Coder-Next），用价格和分数帮读者选。
  - 时代叙事向（写给关注国产 AI 的人）：把 GLM-5.2 的「MIT 开源 + 登顶开源榜 + 1/6 价格」放进「这一轮中国实验室用开源权重正面刚闭源」的脉络里，但用真实分数说话，不吹不黑。
headlines:
  - 闭源刚被关掉，开源就登顶：GLM-5.2 把编程榜顶上去用了多少钱
  - 100 万上下文 + MIT 开源 + 1/6 价格：GLM-5.2 到底强在哪、弱在哪
  - 你用不到 Fable 5，但能下载 GLM-5.2：一份能立刻动手的开源编程选型
materials:
  - VentureBeat · GLM-5.2 多项长时程编程基准超 GPT-5.5，价格仅 1/6 :: https://venturebeat.com/technology/z-ais-open-weights-glm-5-2-beats-gpt-5-5-on-multiple-long-horizon-coding-benchmarks-for-1-6th-the-cost
  - TestingCatalog · Z.ai 发布 GLM-5.2 开源模型，1M 上下文 :: https://www.testingcatalog.com/icymi-zai-launches-glm-5-2-open-model-with-1m-context/
  - CodingFleet · GLM-5.2 vs GLM-5.1 详细对比（1M 上下文 / 双思考 / +28 DeepSWE）:: https://codingfleet.com/blog/glm-5-2-vs-glm-5-1/
---
