---
title: 12 年前的老 CPU 也能跑的免费配音——82M 参数开源 TTS Kokoro 被实测「真能用了」
heat: 资深工程师 Ariya Hidayat（PhantomJS 作者）的实测文 7 月 7 日冲上 HN 首页，298 分、69 条评论：开源 TTS 模型 Kokoro 只有 82M 参数，纯 CPU 就能合成接近真人的语音——同一段测试文字，2013 年的 Intel i7-4770K 用 4.7 秒、Apple M2 Pro 4.5 秒、Ryzen 7 8745HS 只要 1.5 秒。支持英语、中文（普通话）、印地语等多语种，约 50 种音色（主要为英语优化）；一条 docker/podman 命令拉起 Kokoro-FastAPI 容器（约 5GB、预置音色），暴露 OpenAI speech API 兼容接口，现有程序几乎零改动即可接入，作者原话是「12 年前的古董 CPU 都干得动，你就知道它有多能打」。模型 2025 年初发布、并非新品，这次是作为「本地语音方案成熟」的信号被重新顶上首页：不用 GPU、不用云订阅、数据不出本机。（抓取于 2026-07-08，分数与评论数以当日页面为准。）
window: 72h
competition: 中
publishedAt: 2026-07-08
novelty: 6.5
viral: 6.5
accessible: 9.0
angles:
  - 实操向（视频/播客创作者）：手把手在自己电脑上把 Kokoro 跑起来给视频配音——一条命令起容器、localhost 网页试听选音色、批量把稿子变 MP3；重点实测中文效果并诚实讲短板（中文音色少、多音字、数字读法）。
  - 省钱账本向：把 ElevenLabs、剪映配音等云方案的订阅价和「本地免费方案」摆一起算账——多大产量的创作者值得切换、哪些场景（品牌声线、情感演绎）云服务仍然更值。
  - 趋势向（非技术读者也能写）：「AI 能力正在掉进旧电脑里」——从「12 年前 CPU 跑 4.7 秒」这组数字讲开：小模型正把隐私、免费、离线变成创作者的默认选项，配音只是第一站。
headlines:
  - 别再给配音交月费了？82M 的开源模型，12 年前的电脑就能跑
  - 一条命令，旧电脑变免费配音棚（还支持中文）
  - 4.7 秒一段真人感语音：本地 TTS 的拐点，被一篇实测文捅破了
materials:
  - 原文 · Local, CPU-Friendly, High-Quality TTS with Kokoro :: https://ariya.io/2026/03/local-cpu-friendly-high-quality-tts-text-to-speech-with-kokoro/
  - Hacker News 讨论（298 分） :: https://news.ycombinator.com/item?id=48821576
  - HuggingFace · hexgrad/Kokoro-82M 音色列表 :: https://huggingface.co/hexgrad/Kokoro-82M/blob/main/VOICES.md
---
