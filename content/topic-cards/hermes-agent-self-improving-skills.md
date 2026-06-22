---
title: 「越用越快的 AI agent」——Nous Research 的 Hermes Agent 把自我进化做进了运行时
heat: Nous Research 的 Hermes Agent 是一个开源（MIT）、可自托管、模型无关的自主 agent，卖点是把「自我改进闭环」直接做进运行时：它不止完成任务，还会记住、把成功的做法编译成可复用的「技能」，越用越熟。其自我进化机制基于 GEPA（被报道为 ICLR 2026 Oral），据报道当 agent 积累 20 个以上自生成技能后，重复任务可快约 40%。据报道最新版本 v0.13.0（2026-05-07）累计 864 次提交、295 位社区贡献者，支持经 OpenRouter 等接入 200+ 模型，并集成 Discord / Slack 等消息渠道。（具体版本号与数字以官方仓库为准，发布前已附仓库链接供核实。）
window: 1 周
competition: 中
publishedAt: 2026-06-22
novelty: 8.0
viral: 6.5
accessible: 6.0
angles:
  - 概念解读向（写给做 agent 的人）：讲清「自我进化 / 技能编译」到底改了什么——传统 agent 每次会话清空状态，Hermes 把成功轨迹沉淀成可复用技能，这和「记忆」「微调」有何本质区别，对长期跑的自动化任务意味着什么。
  - 上手实测向：写一篇「自托管 Hermes Agent，让它在重复任务里自己攒技能」，记录前几次和攒够技能后的速度/质量差异，把「越用越快」这句话用数据验证或证伪。
  - 趋势向：把 Hermes 与 OpenClaw 等本地优先助手放一起，聊 2026 年「个人/自托管 AI agent」这股潮流——为什么大家都在把 agent 搬回自己机器、并让它自己长本事。
headlines:
  - 会自己攒技能、越用越快的开源 agent：Hermes Agent 了解一下
  - 把「自我进化」做进运行时：Nous Research 的 Hermes Agent 到底新在哪
  - 自托管 + 模型无关 + 会沉淀技能：给独立开发者的 Hermes Agent 上手笔记
materials:
  - GitHub · NousResearch/hermes-agent-self-evolution（GEPA 自我进化）:: https://github.com/NousResearch/hermes-agent-self-evolution
  - DigitalApplied · Hermes Agent v0.10 自我改进开源指南 :: https://www.digitalapplied.com/blog/hermes-agent-v0-10-self-improving-open-source-guide
---
