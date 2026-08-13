---
title: Qwen3.8 首次开放 Max 级 2.4T 权重：95B 激活也要搬近 4.9TB
heat: Qwen 于 8 月 12 日公开 Qwen3.8-2.4T-A95B 模型卡与权重，把官方称为“Qwen-Max 级”的模型首次开放下载；截至 Asia/Katmandu 8 月 13 日 10:04，Hacker News 为 534 分、117 条评论，Hugging Face 为 567 likes、978 downloads。官方规格为 2.4T 总参数、每 token 激活 95B，262,144 原生上下文并可扩展到 1,010,000；模型索引列出 213 个 BF16 safetensors 分片、总计 4,892,365,451,008 bytes，不能把“95B 激活”误写成普通工作站只需装下 95B 权重。边界必须前置：开放仓库版是 text-only，所有交互必须开启 thinking，不能关闭，也不支持视觉；Qwen Cloud 的 Qwen3.8-Max 才另含视觉、默认 1M 上下文、非思考模式与内置工具。模型卡跑分主要是 Qwen 自测，部分为内部双语 benchmark 或依赖指定 harness、长超时和 judge，尚需独立复现。仓库标记 `license: other`，采用自定义 Qwen3.8-Max License：一般允许使用、修改和商用，但超 1 亿月活或月收入 2000 万美元的商业产品需显著展示模型名；模型服务或 AI 编程/办公助手业务连续 12 个月合计收入超 5000 万美元时需另取商业许可，不能简称为无条件开源或标准 Apache/MIT。
window: 72h
competition: 高
publishedAt: 2026-08-13
updatedAt: 2026-08-13
novelty: 9.5
viral: 9.6
accessible: 8.5
angles:
  - 中文创作者选型向：把开放仓库的 text-only、强制 thinking、262K 原生上下文，与 Qwen Cloud 的视觉、可关闭 thinking、默认 1M 和内置工具分栏对照；避免拿托管版功能给可下载权重做宣传
  - 本地部署算账向：从 4.892TB BF16 权重、213 个分片、95B 每 token 激活解释“计算稀疏不等于存储只要 95B”，再实测多机并行、量化、吞吐、首 token 延迟和上下文 KV cache；官方未给普通工作站最低配置，不承诺单机可跑
  - 跑分与许可核验向：把公开 benchmark、内部 benchmark、harness、超时、judge 和缺失独立结果逐项标注，并把 1 亿月活/月收 2000 万美元署名门槛与 5000 万美元模型服务/AI 助手另行许可条款放进发布前清单
headlines:
  - 95B 激活不等于 95B 能装下：Qwen3.8 开放权重接近 4.9TB
  - Qwen3.8-Max 开源了吗？先分清下载版、云端版和自定义许可证
  - 2.4T 的 Qwen3.8 值得本地跑吗：硬件、功能和跑分边界一次算清
relatedTopicIds:
  - qwen3-coder-next-open-coding-agent-model
  - us-startups-chinese-open-weight-ai-access-letter
  - inkling-open-weights-600gb-vram
materials:
  - Qwen3.8-2.4T-A95B 官方模型卡、规格、限制与权重入口 :: https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B
  - Qwen3.8 官方发布博客与云端 Max 功能说明 :: https://qwen.ai/blog?id=qwen3.8
  - Qwen3.8-Max 自定义许可证原文 :: https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B/blob/main/LICENSE
  - Hugging Face 权重索引，列出 213 个分片与总字节数 :: https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B/blob/main/model.safetensors.index.json
  - Hacker News 独立讨论与热度快照（截至 8 月 13 日 10:04 为 534 分 / 117 评论） :: https://news.ycombinator.com/item?id=49273478
---

## 先说结论：这是可下载的前沿模型，但不是一张消费级显卡的新玩具

Qwen3.8-2.4T-A95B 使用 MoE：总共 512 个 routed experts，每个 token 选择 10 个，再加一个 shared expert。这样的稀疏激活可以把单 token 计算量压到约 95B 参数规模，却不会让未激活专家从权重文件里消失。官方索引的 BF16 文件接近 4.9TB，部署仍需把完整专家集合放在可访问的内存、显存或分层存储中，并处理跨设备路由和通信。实际硬件取决于量化、并行方式、推理引擎、上下文和吞吐目标；模型卡没有给出普通 PC 的最低配置。

功能边界也必须按两个产品写。开放仓库版是纯文本模型，默认并且强制输出 thinking，不能接图片，也不能切到 non-thinking；262K 是原生上下文，约 1.01M 是扩展配置。官方托管的 Qwen3.8-Max 才增加视觉输入、默认 1M、可关闭 thinking 和内置工具。把云端网页的体验剪成“下载后本地就有”，会直接误导创作者的部署计划和预算。

::: callout 开放权重不等于没有条件的开源许可证
许可证允许大多数个人和商业使用，但设置了超大产品署名条件，以及高收入 Model as a Service / AI Work Assistant 业务的另行许可要求。仓库也明确标记 `license: other`，内容发布前应让法务按真实业务复核，而不是写成 MIT、Apache 或 OSI 已认证。
:::

## 最有价值的中文内容，是把“能下载”拆成可复现的成本表

团队可以先通过官方或第三方 API，用固定中文长文、代码仓库、搜索与多步工具任务验证输出质量，公开 prompt、输入、token、延迟、费用、引用准确率和失败样本。若真要自托管，再记录权重下载量、节点数量、GPU/CPU 内存、互联带宽、加载时间、量化损失、每秒 token 和长上下文 KV cache；不要用每 token 激活参数替代整套部署账单。

跑分同样需要拆来源。模型卡给出了大量编程、agent 与通用能力结果，但若干项目是 Qwen 内部 benchmark，其他项目也使用指定 Claude Code、OpenCode 或 Qwen-Agent harness、长时间上限和模型 judge。它们适合形成待复测假设，不是跨平台无条件排名。所有测试脚本、来源、标题模板、许可摘录和复制简报都应免费公开；读者可向搞着玩实验室免费提交自己的中文任务集，先共同设计可重复评测，再决定是否需要固定范围的个人诊断或 MVP 原型服务。
