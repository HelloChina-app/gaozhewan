---
title: Muse Spark 1.3 上线：少 20% 工具调用是厂商结果，Max 推理与开放权重仍在路上
heat: Meta 于 2026-09-02 发布 Muse Spark 1.3，并开始向 Muse Code 与 Meta Model API 推送；截至 Asia/Katmandu 2026-09-03 06:07，Hacker News 为 340 分、237 条评论。Meta 称相较 1.2，内部工程师比较中工具调用约少 20%、token 约少 25%，并强调长任务、多工作流、澄清问题与高后果操作前确认；这些数字来自厂商自测，没有公开证明所有语言、仓库和真实创作任务都能同比节省。边界必须前置：Max reasoning 仍要等额外安全测试，官方只说开放权重未来会来，两者都不是当前已交付能力；页面中的工程、音频和演示文稿案例是原型展示，不等于可复现产品验收。独立 Artificial Analysis 的首日数据也只是特定端点与基准快照，价格、速度和排名会变，中文创作者应以自己的任务集、隐私选项和完整成本复测。
window: 72h
competition: 高
publishedAt: 2026-09-03
updatedAt: 2026-09-03
novelty: 8.4
viral: 8.9
accessible: 8.2
angles:
  - 中文创作者实测向：用同一份混乱素材、同一交付格式和同一高后果确认点，对比 Muse Spark 1.2 与 1.3 的工具调用、token、返工次数和最终可用率；官方约少 20% 调用与约少 25% token 只能作为待验证假设
  - 产品设计向：拆解主动澄清、卡住时求助、不可逆动作前确认和长任务状态保持，说明一个“更会合作”的 agent 应怎样暴露暂停点、证据与人工决定，而不是只展示最终成品
  - 路线图核验向：把今日可用的 Muse Code / Model API、尚未开放的 Max reasoning、只被预告的开放权重分成三栏，持续更新交付状态；不把 coming soon 写成已经能本地部署
headlines:
  - Meta 新模型说能少调 20% 工具：我用一条真实创作流水线验证
  - Muse Spark 1.3 最值得抄的不是跑分，而是这四个人机协作动作
  - Max 推理和开放权重还没来：Muse Spark 1.3 今天到底交付了什么
relatedTopicIds:
  - cursor-agent-swarm-model-economics
  - claude-sonnet-5-cheap-agentic-coding
  - encrypted-reasoning-traces-leak-disclosed-boundaries
materials:
  - Meta AI Research 发布说明、内部效率数字与路线图边界 :: https://research.meta.ai/blog/introducing-muse-spark-1-3
  - Meta 开发者模型页与当前 API 入口 :: https://developer.meta.com/ai/models/muse-spark/
  - Axios 独立报道、定价与安全采访语境 :: https://www.axios.com/2026/09/02/meta-debuts-muse-spark-13-as-personal-agent-work-continues
  - Hacker News 独立讨论与热度快照 :: https://news.ycombinator.com/item?id=49541256
  - Artificial Analysis 独立首日速度、成本与基准快照 :: https://artificialanalysis.ai/models/muse-spark-1-3-xhigh
---

## 先说结论

Muse Spark 1.3 的可写价值，不是再做一张“谁打败谁”的模型榜，而是把长任务里真正影响交付的四件事拆出来：模型能否在资料互相冲突时继续追证据，能否把新指令放回正确任务，能否在卡住时承认并求助，以及能否在发布、删除、付款这类高后果动作前停下来确认。Meta 已在 9 月 2 日把 1.3 推向 Muse Code 与 Model API，但 Max reasoning 和开放权重仍是未来事项，今天不能当作可用功能写进教程。

## 官方数字怎样读

Meta 的发布说明称，在内部工程师比较中，1.3 相比 1.2 使用约少 20% 的工具调用、约少 25% 的 token，并减少了不必要的来回轮次。这能形成一个很清楚的测试假设，却不是面向所有人的统一节省率。模型可能因为更早问对问题而减少返工，也可能在复杂任务里花更多时间推理；不同 harness、上下文长度、工具失败率和输出要求都会改变账单。首日第三方基准可以帮助选候选，但单个端点的速度、首 token 延迟和榜单分数也不能代替中文任务的端到端复测。

## 一条免费可复现的测试怎么做

准备同一包公开素材，要求两个版本完成一项包含检索、表格、文档与最终导出的创作任务。事先写死验收项：来源必须可打开，冲突数字必须标明口径，禁止未经确认发布，最终文件必须按指定格式交付。记录总输入输出 token、工具调用数、失败重试、主动提问次数、人工接管次数和最终一次通过率。至少重复三轮，并公开原始提示、验收表和失败样本；不要只挑最好的一次，也不要把“生成了一个文件”当作内容正确。

如果要比较费用，还应把标准端点、可能涉及数据贡献的低价路径、缓存折扣和第三方网关分别列出。价格便宜不等于同一数据处理条件，展示客户素材前要先核对当日条款。涉及合同、未发布脚本、账号密钥和客户身份时，使用去标识化测试集，不要为了测模型把真实敏感资料上传到不明确的路径。

## 创作者可以直接复制的简报

“请在完全相同的公开素材与验收标准下，对 Muse Spark 1.2 和 1.3 各跑三次长任务。公开每轮工具调用、token、耗时、错误、澄清问题与人工确认点；把 Meta 的 20%/25% 写成厂商待验证数字，把 Max reasoning 和开放权重标为尚未交付。结论只回答哪些工作流真的更省、哪些仍需人工，不做泛化冠军宣言。”

搞着玩实验室继续免费接收这类可复现创意与测试记录；若需要为你自己的业务制作诊断、原型或固定范围 MVP，再单独明确范围与费用。
