---
title: Apple 内置转写第一次在实测里赢过 Whisper——但这组 2.12% 词错率只代表英文朗读
heat: Inscribe 7 月 13 日发布一组可下载原始转写的端侧语音基准：在同一台 M2 Pro、macOS 26.5.1 上跑完 LibriSpeech 的 5559 条英文朗读，Apple SpeechAnalyzer 在 test-clean / test-other 的词错率为 2.12% / 4.56%，低于其测试的 Whisper Small（3.74% / 7.95%），处理速度约快 3 倍；旧 SFSpeechRecognizer 则为 9.02% / 16.25%。文章随后登上 Hacker News，截至 7 月 14 日 461 分、185 条评论。边界必须前置：这是销售转写产品的单一团队、单台机器和英文有声书语料测试，Whisper 使用 WhisperKit CoreML 量化版本，速度尚未在空闲专机上重跑；它不能证明中文、口音、多人会议或所有 Whisper 实现都被 Apple 超越，SpeechTranscriber 的语言覆盖也远少于 Whisper。
window: 72h
competition: 中
publishedAt: 2026-07-14
novelty: 8.0
viral: 8.0
accessible: 8.5
angles:
  - 音视频创作者实测向：不要照搬英文榜单——拿同一批中文口播、采访噪声和专有名词，实测 SpeechAnalyzer 与 Whisper 的错字率、时间戳、速度和离线隐私
  - 基准识读向：为什么「2.12% 打赢 3.74%」仍不足以宣布换代？拆解语料类型、文本归一化、量化实现、语言覆盖和单机测试如何改变结论
  - 产品决策向：Apple 设备上的创作者工具何时该优先系统引擎、何时保留 Whisper——把系统版本、中文支持、跨平台、模型体积和数据不出机做成选择树
headlines:
  - Apple 内置转写赢过 Whisper？先看懂这组 5559 条英文实测
  - 2.12% 词错率、快约 3 倍：SpeechAnalyzer 真能替代 Whisper 吗
  - 做字幕不用再装模型？Apple 新语音 API 的成绩与四条边界
materials:
  - Inscribe 原始基准、方法与可下载转写 :: https://get-inscribe.com/blog/apple-speech-api-benchmark.html
  - Apple Developer · SpeechAnalyzer 官方文档 :: https://developer.apple.com/documentation/speech/speechanalyzer
  - Hacker News 讨论（截至 7 月 14 日 461 分 / 185 评论） :: https://news.ycombinator.com/item?id=48894752
---
