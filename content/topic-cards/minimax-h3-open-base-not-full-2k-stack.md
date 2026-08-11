---
title: MiniMax H3 开放权重后再热：本地能跑 768p Base，不等于完整 2K 工作流已开源
heat: MiniMax 于 7 月 31 日发布 H3，并在 8 月初开放权重；8 月 11 日再次进入 GitHub Trending。截至 Asia/Katmandu 8 月 11 日 10:05，官方仓库为 4,538 星、281 forks，Stable Diffusion 社区的团队 AMA 获约 950 票。官方称 H3 可理解文本、图片、视频与音频上下文，生成 4—15 秒、24fps、原生 32kHz 双声道音视频，并支持中文等 11 种对话语言；但完整系统分为 H3-Context-IR、H3-Base 与 H3-Regenerate-2K，当前本地开放的核心是 BF16 的 768p H3-Base，关键 Context-IR 仍是托管流程，2K regenerate 模块尚未开放，初始开放版也没有稀疏注意力实现。官方“商用级”“最高 2K”和价格优势属于厂商陈述，社区已指出本地与官方 API 输出不可直接等同；模型使用自定义 MiniMax H3 Community License 而非 Apache/MIT，创作者必须另核许可、人物肖像、声音克隆、素材授权、平台规则与生成内容标识。
window: 1 周
competition: 高
publishedAt: 2026-08-11
updatedAt: 2026-08-11
novelty: 9.0
viral: 9.7
accessible: 7.5
angles:
  - 开放范围拆解向：画出 Context-IR→H3-Base→Regenerate-2K 三段链路，分别标注本地权重、托管 API、分辨率、数据去向和费用；当前只能把 768p Base 称为已开放权重，不能把完整官方 2K 体验写成“全栈开源”或“完全离线复现”
  - 中文创作实测向：用同一套中文分镜、首尾帧、人物参考和音频参考分别跑本地 FL2VA、Ref2VA 与官方 API，对比口型、双声道、中文对白、身份保持和多镜头连续性；官方 demo 与前期邀测不是独立基准，社区单个样片也不能证明所有题材、语言和设备都稳定
  - 生产与权利向：为广告、电商、短片和品牌内容建立输入素材权属表、人物/音色同意、生成标识、失败镜头与人工复核记录；Community License 需逐条核对，自动审核可能误拦或漏拦，本地模型没有托管过滤也不代表违法、色情、冒充或侵权用途被允许
headlines:
  - MiniMax H3 权重已开放，为什么本地仍复现不了官方 2K
  - 4,538 星之后，拆开 H3 的三段视频生成链路
  - 中文对白加原生双声道：H3 本地版最该怎么测
relatedTopicIds:
  - seedance-2-5-30s-reference-editing-boundaries
  - openmontage-agentic-video-production
  - minimax-m3-open-weight-computer-use
materials:
  - MiniMax 7 月 31 日原始发布、能力、厂商案例与权重开放时间线 :: https://minimaxi.com/blog/minimax-h3
  - MiniMax H3 官方仓库、三段架构、当前开放范围、输入规格与社区许可证入口 :: https://github.com/MiniMax-AI/MiniMax-H3
  - MiniMax H3 官方 Hugging Face 权重与模型文件 :: https://huggingface.co/MiniMaxAI/MiniMax-H3
  - Stable Diffusion 独立讨论，集中核对本地 768p 与未开放 Context-IR/2K 模块 :: https://www.reddit.com/r/StableDiffusion/comments/1ve0urz/minimaxh3_weights_up/
  - MiniMax 团队社区 AMA 与近千票热度 :: https://www.reddit.com/r/StableDiffusion/comments/1vh9rtw/ama_minimax_h3_team_ask_us_anything_about_our/
---

## 先说结论：这是重要的开放权重发布，但“开放 H3”不是一个布尔值

MiniMax H3 把文本、图像、视频和音频放进同一套上下文，让创作者用自然语言描述“参考哪段运镜、保留谁的身份、采用什么音色、在第几秒切镜”。官方规格支持 4—15 秒、多种画幅、24fps 与原生双声道，首尾帧 FL2VA 和多模态参考 Ref2VA 各有独立 checkpoint。对中文创作者来说，中文对白在官方列出的 11 种稳定语言中，也比只支持英语的开放视频模型更值得实测。

真正需要拆开的，是“本地”和“完整”。官方文档说明完整 H3 由三个模块组成：Context-IR 负责理解复杂参考并生成中间表示，H3-Base 生成 768p 音视频，Regenerate-2K 再利用原上下文重生成高分辨率结果。目前可下载的是 BF16 Base 权重；Context-IR 依赖多阶段托管模型和服务，没有包含在开放版本；2K 模块仍待发布。官方推荐的完整 2K workflow 因此会同时调用 API 与本地 Base。初始开放版还采用 full attention，训练时使用的 sparse attention 实现也被列为未来发布。

::: callout 不要把“权重可下载”缩写成“官方效果完全离线”
本地 768p Base、官方托管 Context-IR、官方 2K regenerate 是三个不同产品边界。教程必须标明每一步是否联网、上传什么素材、使用何种权重与 API，不能用官方 2K 样片替本地输出背书。
:::

## 最值得拍的不是样片合集，而是同输入、同种子、同流程的对照

实测可以准备三组合法素材：一组中文口播，一组首尾帧运动，一组人物、动作、声音混合参考。每组分别记录本地原始提示、按官方指南整理的提示、调用 Context-IR 后的中间提示和最终视频，对比主体一致性、镜头时序、口型、声道、字幕文字与背景人物动作。所有样片保留种子、版本、分辨率、显存、生成时间和失败次数，避免只选最好的一次。社区已有同提示对比，但不同模型对提示结构的偏好不同，“同一句 prompt”也不必然等于公平比较。

权利与安全是创作流程的一部分。图片、视频、声音参考应能追溯到授权或本人同意；真人音色、品牌标识、受版权保护角色和新闻影像不能因为在本地生成就失去限制。官方 API 会自动审核输入与增强提示，但过滤可能误判，且不替用户承担许可证和法律责任；本地工作流则需要创作者自己建立审核、来源记录与发布标识。把开放范围、复现实验和权利清单放在同一张表里，H3 才能成为可持续的生产工具，而不是又一轮“2K 开源神器”的标题竞赛。
