---
title: Quill 3277 星：Mac 本地录会议、双轨分说话人，但现在只可靠转英语
heat: digimata 于 7 月 24 日创建 Quill，一周内在 GitHub 新仓库榜升到 3277 星、196 forks（截至 Asia/Katmandu 8 月 1 日 08:10）。它用 macOS Core Audio 同时把麦克风与系统输出录成两个 CAF 轨道，停止后在 Apple Silicon 本地调用 FluidAudio 的 Parakeet TDT 0.6B v2，按时间合并成 me/them 标注的 JSON 与 Markdown；文件落在本机，适合访谈、播客和会议素材整理。限制必须前置：仓库没有 Release 或 tag，需从源码编译并授予麦克风与系统音频权限；当前默认模型是英语专用，中文不会因为“本地 AI”自动可用，README 所说每小时音频约 20 秒是项目/上游在 Apple Silicon 的口径而非本卡独立复测；所谓双说话人来自麦克风和全局系统声两轨，不会识别通话另一端的多位嘉宾；全局 tap 会录到通知、音乐等所有播放声，Whisper 回退和按应用选择仍是计划/issue，不是已交付功能。录制他人前还需按所在地与平台规则取得必要同意。
window: 1 周
competition: 中
publishedAt: 2026-08-01
updatedAt: 2026-08-01
novelty: 8.8
viral: 8.9
accessible: 8.5
angles:
  - 中文创作者实测向：在 macOS 15+ 分别录耳机访谈、扬声器会议和夹杂通知的一小时素材，记录安装权限、模型首次下载、转写耗时、错字与时间轴；必须把英语结果和中文失败分开展示，不能用英文 benchmark 宣传中文准确率
  - 隐私工作流向：核验音频、模型缓存、转写文件和 on_stop 脚本实际落点，比较全本地处理与云会议助手的数据边界；“Nothing ever leaves the machine”是仓库设计声明，第三方依赖下载、用户自接的总结脚本和备份同步都可能改变边界
  - 产品设计向：解释双轨为何能免费得到 me/them 标签、CAF 为何利于崩溃后保留可读录音，再追踪重复转写、单应用选择、错误可见性和 Whisper PR；无 Release、无 tag、开放 issue 意味着它仍是早期源码工具，不应直接承诺团队生产稳定性
headlines:
  - Mac 本地会议转写只要一根羽毛？Quill 的双轨巧思和中文缺口
  - 3277 星 Quill 实测清单：先别把英语模型当成中文会议助手
  - 不上传云端也不等于零风险：本地录音工具该核验哪六件事
relatedTopicIds:
  - apple-speechanalyzer-vs-whisper-benchmark
  - willow-atlas-1-voice-dictation
  - moonshine-micro-470kb-voice-interface
materials:
  - Quill 原始仓库、安装、双轨文件、模型与已知限制 :: https://github.com/digimata/quill
  - Quill 开放 issue、重复转写仍待处理 :: https://github.com/digimata/quill/issues/19
  - Apple 官方 Core Audio taps 示例与捕获范围 :: https://developer.apple.com/documentation/coreaudio/capturing-system-audio-with-core-audio-taps
  - FluidAudio 上游模型与性能文档、v2 英语限制 :: https://github.com/FluidInference/FluidAudio
  - NVIDIA Parakeet TDT 0.6B v2 原始模型卡、语言与准确率边界 :: https://huggingface.co/nvidia/parakeet-tdt-0.6b-v2
---

## 先说结论：Quill 的亮点是音频管线，不是又一个“万能会议 AI”

Quill 把会议记录压缩成一个菜单栏按钮。开始录制后，它分别保存自己的麦克风和 Mac 正在播放的系统音频；停止时，两轨各自做本地转写，再按起始偏移与时间戳合并。因为“我”和“对方”天然位于不同轨道，它无需额外说话人识别模型就能生成 `me` / `them` 标签。每次会话还保留原始 CAF、元数据、JSON、Markdown 与日志，后续可接自己的归档或总结脚本。

这比只宣传“本地”更值得讲。CAF 在录制过程中持续可读，进程中断时不必等容器最后封口；文件系统同时充当任务队列，存在元数据但没有转写结果的会话会在下次启动时继续处理。对访谈、播客和研究型创作者，这是一个可观察、可二次加工的素材底座，而不只是把会议摘要藏进某家 SaaS。

::: callout 当前默认模型不支持中文
Quill 使用的 Parakeet TDT 0.6B v2 是英语 ASR。FluidAudio 的其他模型已经覆盖更多语言，但 Quill 目前没有把它们做成可选中文引擎；README 提到的 Whisper 仍是计划。
:::

## “两轨”“本地”和“快”都要按真实场景验收

两轨只能区分麦克风侧与系统侧。如果远端通话里有三位嘉宾，他们仍会混在同一条 `them` 轨道；如果外放导致声音漏回麦克风，还可能出现重复文本。项目提供麦克风回声处理开关，但会轻微压低其他播放声。全局系统 tap 也会收进消息提示、网页视频和音乐，公开前必须逐段检查并按所在地、会议平台和参与者约定处理录音同意。

性能数字同样要注明机器。FluidAudio 在 M4 Pro 上报告每小时音频约 19 至 20 秒，Quill 复用了这套 Core ML 管线；实际速度会受芯片、音频长度、首次模型下载和后台任务影响。更重要的是，仓库目前没有 Release 或 tag，安装流程要求 Swift 构建并复制二进制，开放 issue 已出现重复转写、错误提示、按应用捕获和崩溃恢复需求。负责任的中文评测应拿英语、普通话、粤语和中英混说分别跑一遍，公开原始片段、权限路径与失败日志。这样读者看到的是一套值得借鉴的本地录音架构，而不是把 GitHub 星数误写成成熟度或中文可用性的保证。
