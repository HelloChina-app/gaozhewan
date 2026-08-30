---
title: 腾讯 Hy4 preview 开放权重：770B/49B、1M 上下文，先拆厂商跑分与八卡门槛
heat: 腾讯于 8 月 28 日发布 Hy4 preview；官方模型卡给出 770B 总参数、每 token 激活 49B、1M 上下文，并以 Apache 2.0 发布 BF16 与 FP8 权重。官方 vLLM/SGLang 示例都把 FP8 部署设为 tensor parallel 8，不能把“49B 激活”误写成普通单卡或消费级电脑可轻松运行。截至 Asia/Katmandu 8 月 30 日 12:14，Hacker News 为 253 分、148 条评论；OpenRouter 当时列出 1,048,576 token 上下文、64K 最大输出，以及输入 $0.834/百万 token、输出 $2.501/百万 token、缓存读取 $0.042/百万 token，这些托管价格、延迟和可用性都是动态快照。事实边界必须前置：Hy4 仍明确标为 preview，模型卡承认复杂任务可能过度推理、反复验证；163 名腾讯内部专家对 203 个工程任务的盲评与其他 benchmark 均由厂商组织或列报，中文写作、引用准确率、前端审美、游戏原型和长上下文检索仍需独立复测。Apache 2.0 覆盖已发布权重与代码，不等于训练数据、完整训练过程和所有产品服务都已开源，也不能把 OpenRouter 的早期 token 流量当成质量证明。
window: 72h
competition: 高
publishedAt: 2026-08-30
updatedAt: 2026-08-30
novelty: 9.4
viral: 9.6
accessible: 8.8
angles:
  - 中文创作者实测向：用同一套事实核查、长文改写、表格生成、前端页面和小游戏原型，对比 Hy3 与 Hy4 preview 的完成率、首 token、总时长、输入输出、缓存命中、引用错误和人工返工；preview 与厂商盲评不能代替公开失败样本
  - 成本与部署向：把 OpenRouter 动态 API 价、默认 high reasoning 的额外输出、1M 上下文缓存，以及官方 FP8 八路张量并行示例放在一张账单里；49B 激活参数不等于模型权重只占 49B，也不等于本地部署已大众化
  - 开放边界向：逐项区分 Apache 2.0 权重、推理与微调配方、未公开训练数据、腾讯产品入口和第三方托管服务；“开放权重”“可自托管”“完整开源产品”不能混成同一句宣传
headlines:
  - 770B 总参数、49B 激活：腾讯 Hy4 preview 为什么仍不是单卡模型
  - 1M 上下文加便宜缓存，Hy4 preview 的真实账单要这样算
  - 厂商盲评略胜 GLM 与 Kimi：Hy4 preview 还缺哪几组中文复测
relatedTopicIds:
  - tencent-hy3-open-weight-model
  - qwen38-24t-a95b-open-weights-5tb-boundaries
  - gemini37-flash-ga-half-price-migration-boundaries
materials:
  - 腾讯官方发布、发布日期、免费体验窗口与内部盲评说明 :: https://www.tencent.com/tencent-releases-and-open-sources-tencent-hy4-preview/
  - Hy4 preview FP8 官方模型卡、架构、已知限制、八路部署与 Apache 2.0 许可 :: https://huggingface.co/tencent/Hy4-preview-FP8
  - OpenRouter 托管价格、上下文、输出上限与动态服务快照 :: https://openrouter.ai/tencent/hy4-preview
  - Hacker News 独立讨论与热度快照（截至 8 月 30 日 12:14 为 253 分 / 148 评论） :: https://news.ycombinator.com/item?id=49492632
---

## 先说结论：它值得测，但“开放权重”不等于普通电脑已经能跑

Hy4 preview 的看点不是单独某一张排行榜，而是模型规模、长上下文和真实生产任务被放进了同一次发布。官方称 770B 总参数中每个 token 激活 49B，并用内部软件工程、游戏、金融和安全专家参与构造任务。模型卡还给出 1M 上下文、工具调用、结构化输出、微调流程，以及 vLLM 和 SGLang 的推理配方。对做长资料整理、代码代理、演示文稿和小游戏的中文创作者，这确实是一组可以落到工作流里的能力主张。

但 49B 是每次计算激活的参数，不是需要保存的全部权重。官方 FP8 示例仍使用八路张量并行；能通过 API 调用与能在自己的工作站部署，是两种完全不同的成本结构。托管端也不能只看输入单价：默认 high reasoning 可能放大输出 token，长会话能否命中缓存、缓存保持多久、失败是否重试，都会改变最终账单。

::: callout Preview 与厂商 benchmark 都要保留失败出口
模型卡主动列出过度推理和过度验证问题。腾讯内部盲评说明 Hy4 在那组 203 个任务上略高于 GLM 5.3 与 Kimi K3，但任务选择、环境、评审和失败分布没有因此变成独立结论。中文团队应保存 prompt、版本、工具权限、超时与全部失败样本。
:::

## 最有价值的内容，是一份可复验的中文任务账本

先固定五类输入：有来源的新闻核查、十万字资料问答、带公式的表格、指定截图的前端还原、一个可玩的最小游戏。每类都定义成功标准，并同时记录首 token、总耗时、输入输出、缓存读取、工具调用、事实错误、视觉返工和人工分钟数。对照 Hy3 或另一款可用模型时，使用相同 harness、上下文和超时，避免把不同配置造成的差异归功于模型。

长上下文测试还要埋入可定位的矛盾、过期版本和无答案问题，检查模型是否真的检索到证据、会不会把不同文件拼成一个不存在的结论。游戏与前端任务则应保存可运行产物、截图和错误日志，不能只凭一次漂亮演示评分。

所有任务、来源、标题模板、成本公式、结果与失败样本都应免费公开。读者可向搞着玩实验室免费提交自己的中文任务集，共同扩充复测表；若需要处理用户自己的成本诊断、部署原型或固定范围 MVP，再单独界定付费交付物。
