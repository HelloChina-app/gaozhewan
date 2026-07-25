---
title: Claude Opus 5 登顶独立榜单：同价升级也要算速度与总账
heat: Anthropic 于 2026 年 7 月 24 日发布 Claude Opus 5，API 定价维持 Opus 4.8 的每百万输入 5 美元、输出 25 美元，并称其在 Frontier-Bench、CursorBench、ARC-AGI 3、OSWorld 2.0 等编程、知识工作和计算机使用评测上显著进步；Fast mode 约为默认速度的 2.5 倍，但按基础价格的两倍收费。截至 Asia/Katmandu 7 月 25 日复核时，Hacker News 讨论为 1324 分、715 条评论；Artificial Analysis 将 max effort 版本列为 Intelligence Index 第 1/190、得分 61，同时测得约 54.8 tokens/s，并明确评价它相对同类昂贵、慢于平均水平。事实边界必须前置：Anthropic 页面中的大部分成绩来自公司自测或早期客户，部分图表使用特定 effort、harness、后端和多次尝试，不能直接外推到所有中文任务；Artificial Analysis 的第一名是会随新模型和评测版本变化的快照，不是永久结论。1M 上下文是容量上限，不等于长文全程保持同等准确；Fast mode 的速度数字和“半价接近 Fable”也不能改写成所有任务成本减半。
window: 72h
competition: 高
publishedAt: 2026-07-25
updatedAt: 2026-07-25
novelty: 8.7
viral: 9.8
accessible: 9.2
angles:
  - 中文创作者实测向：固定一组长文改写、资料核验、表格分析和代码修复任务，对比 Opus 5、Sonnet 5 与 Opus 4.8 的成功率、人工返工、输入输出 token 和总价；官方 benchmark 与第三方榜单只作选型起点
  - 成本拆解向：基础 API 仍为 5/25 美元，Fast mode 约快 2.5 倍却按双倍基础价收费；必须把缓存命中、effort、重试次数、工具调用和等待时间一起计算，不能把“同价升级”写成“更便宜”
  - 榜单边界向：Artificial Analysis 的 61 分和第 1 名是 7 月 25 日 max-effort 快照，约 54.8 tokens/s 也来自其统一测试；新模型、不同 effort、中文语料和真实 agent 环境都可能改变排序
headlines:
  - Claude Opus 5 真是第一吗？把 61 分、速度和账单放在一起看
  - 同价升级不等于省钱：Claude Opus 5 的三种隐藏成本
  - 1324 分热议背后：中文创作者该怎样验收 Claude Opus 5
relatedTopicIds:
  - claude-sonnet-5-cheap-agentic-coding
  - anthropic-fable-5-export-control-freeze
  - cursor-agent-swarm-model-economics
materials:
  - Anthropic 官方发布、定价、Fast mode 与评测说明 :: https://www.anthropic.com/news/claude-opus-5
  - Artificial Analysis 独立模型页、实时排名、速度与价格 :: https://artificialanalysis.ai/models/claude-opus-5
  - Hacker News 独立讨论（截至 7 月 25 日复核时 1324 分 / 715 评论） :: https://news.ycombinator.com/item?id=49038433
---

## 先说结论：它值得测，但不能只把“第一名”翻译成购买建议

Claude Opus 5 的发布信息很强：Anthropic 把它定位为接近 Fable 5 前沿能力、价格只有后者一半的日常高端模型，并保持 Opus 4.8 的 API 单价。公司展示的提升覆盖代码修复、计算机操作、自动化、科学研究和视觉输出，还把它设为 Claude Max 默认模型、Claude Pro 最强模型。对中文创作者和小团队，真正可执行的问题不是“要不要追最强”，而是哪些高价值任务能用更少返工抵消昂贵输出 token。

独立交叉来源给出了更完整的图景。Artificial Analysis 在 7 月 25 日把 max-effort 版本列为其 Intelligence Index 第一名，得分 61；但同一页面也记录约 54.8 tokens/s、每百万输入 5 美元和输出 25 美元，并认为它在相近能力模型中价格较高、速度低于平均。榜首和昂贵可以同时成立。若一篇文章只抄第一名、不写测试档位、速度和评测成本，就会把比较页面变成营销标题。

::: callout 榜单是快照，不是保修单
Artificial Analysis 排名会随新模型、样本和评测方法变化。Anthropic 的多项成绩也使用指定 effort、harness、云后端或多次尝试。发布内容应记录核验日期和配置，不能承诺中文写作、私有代码或任意 agent 工作流都复现同样优势。
:::

## 最值得做的是一份“成功任务成本”实测

准备四类中文任务：长材料压缩成可发布稿、带来源的事实核查、混合表格与文本的分析、真实仓库中的小型缺陷修复。每类任务固定输入、工具权限、最长时间和验收标准，分别运行 Opus 5、Sonnet 5 与仍可调用的旧模型。除了 token 账单，还要记录首轮通过率、人工修改分钟数、失败重试、错误引用、工具误操作和最终交付时间。

Fast mode 也应单独测。官方说它约为默认速度的 2.5 倍，但按基础价格两倍收费；对直播辅助、客户现场演示或等待成本高的工作可能合理，对离线批处理则未必。1M 上下文同样只说明能放入多少内容，不保证模型能在超长资料里稳定找到每个细节。应把关键事实放进可检索结构，并用引用回查验收，而不是把整库塞进提示词后相信容量数字。

最终结论可以按任务分层：低风险初稿继续用更便宜模型；高价值、可明确验收且返工昂贵的任务再升级 Opus 5；涉及发布、付款、删除或生产修改时仍保留人工批准。这样，“新榜首”才会变成一张能指导预算和工作流的表，而不是一天后就失效的排行榜截图。
