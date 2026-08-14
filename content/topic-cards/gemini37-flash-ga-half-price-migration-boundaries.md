---
title: Gemini 3.7 Flash 已 GA：1M 上下文与半价期背后，迁移参数也变了
heat: Google 于 8 月 13 日发布并将 `gemini-3.7-flash` 标为 generally available、可用于生产；官方给出 1M token 上下文、64K 最大文本输出、文本/图片/音频/视频输入与 low/medium/high 三档 thinking，默认 medium。截至 Asia/Katmandu 8 月 14 日 08:09，Hacker News 为 630 分、357 条评论。2026 年 12 月 31 日前的推广价为输入 $0.75/百万 token、输出 $3.75/百万 token，2027 年 1 月 1 日起翻倍为 $1.50/$7.50；这不是永久降价。官方基准称 FrontierCode 1.1 Main 由 3.6 Flash 的 34.4% 升至 43.6%、DeepSWE v1.1 由 49.0% 升至 65.3%，但结果来自 Google 页面及其列明的指定评测条件，中文写作、中文搜索、真实前端还需独立复测。边界必须前置：模型卡明确仍可能幻觉、偶发慢速或超时，知识截止主线为 2026 年 3 月、部分领域可能仍只到 2025 年 1 月；从 3.5 Flash、3 Flash Preview 或 3.1 Pro 迁移时需移除 `temperature`、`top_p`、`top_k` 和预填充 model turn，并用 `thinking_level` 替代旧式预算配置，不能只改模型 ID 就宣布无缝升级。
window: 72h
competition: 高
publishedAt: 2026-08-14
updatedAt: 2026-08-14
novelty: 9.1
viral: 9.7
accessible: 9.4
angles:
  - 中文创作者成本向：用同一组长文改写、资料核查、图片理解与网页生成任务比较 3.6/3.7 Flash 的输入输出 token、thinking 档位、首 token、总耗时、重试次数和人工返工；把 12 月 31 日前推广价与 2027 年翻倍价分开算
  - 迁移实务向：逐项检查模型 ID、弃用的 sampling 参数、prefilled model turn、thought signature 与 `thinking_level`，公开最小迁移 diff 和失败响应；GA 只说明服务阶段，不代表旧请求参数保持兼容
  - 基准复测向：复刻一个中文 issue 修复、一个设计稿还原和一个 100 页多模态资料任务，公开 prompt、环境、judge、成功标准、超时与失败样本；官方分数和客户引语只能作为待验证起点
headlines:
  - Gemini 3.7 Flash 真便宜了一半吗？先看清 2027 年翻倍条款
  - 只换模型 ID 会踩坑：Gemini 3.7 Flash 的 5 个迁移变化
  - 1M 上下文、64K 输出、三档思考：中文团队怎样验收 3.7 Flash
relatedTopicIds:
  - bytedance-seed-2-1-agent-model
  - claude-sonnet-5-cheap-agentic-coding
  - gemini-cli-shutdown-antigravity
materials:
  - Google 官方发布、价格期限与主要官方基准 :: https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-3-7-flash/
  - Gemini API 官方开发指南、GA 状态、规格与迁移清单 :: https://ai.google.dev/gemini-api/docs/latest-model
  - Google DeepMind 模型卡、输入输出、知识截止与已知限制 :: https://deepmind.google/models/model-cards/gemini-3-7-flash/
  - Hacker News 独立讨论与热度快照（截至 8 月 14 日 08:09 为 630 分 / 357 评论） :: https://news.ycombinator.com/item?id=49289112
---

## 先说结论：这是生产版工作马，但不是永久半价券

Gemini 3.7 Flash 的产品定位很清楚：以 Flash 的速度与价格处理 coding、agent 和复杂知识工作。API 文档把它标为 GA，模型 ID 为 `gemini-3.7-flash`，默认 medium thinking，并允许在 low、medium、high 之间调节延迟、质量和 token 消耗。模型卡列出的输入包括文本、图片、音频和视频，最大上下文 1M token，输出是最多 64K token 的文本。

真正影响预算的是脚注。$0.75 输入与 $3.75 输出只持续到 2026 年 12 月 31 日，次日标准价翻倍。团队若按推广价设计常驻工作流，至少要同时建立 2027 年价格、high thinking 放大输出 token、失败重试和长上下文缓存的压力表。官方跑分显示多项编码和 agent 指标进步，但不同 harness、工具、超时和 judge 都会改变结论；中文文案的事实准确率、风格保持和返工成本尤其不能从英文 benchmark 直接推导。

::: callout GA 不等于模型知道今天发生的一切
模型卡写明主知识截止为 2026 年 3 月，部分领域可能仍停在 2025 年 1 月，并承认幻觉、慢速与超时。涉及新闻、价格、法规和来源引用的输出仍要联网核验。
:::

## 迁移测试应该比发布会截图更早进入选题正文

从旧模型迁移时，用固定回归集跑两遍：第一遍只改模型 ID，记录被拒绝的 sampling 参数、prefilled turn、thought signature 和工具调用；第二遍按官方指南清理配置并设置 thinking level，再比较完成率、token、延迟与质量。网页生成任务应保存参考图、最终截图和可交互检查；长文任务应保存引用、事实错误和人工修改；agent 任务则必须记录工具越权、循环、超时与中断恢复。

所有测试输入、账单公式、标题模板、来源和失败样本都应免费公开。读者可向搞着玩实验室免费提交自己的中文任务集，共同扩展回归表；若需要处理用户自己的成本诊断、迁移原型或固定范围 MVP，再单独界定付费交付物。
