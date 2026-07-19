---
title: 470 KiB 内存也能听和说——Moonshine Micro 把离线语音界面塞进微控制器
heat: Moonshine 团队 7 月 14 日公开 Moonshine Micro，官方 README 给出的 RP2350 演示管线包含语音活动检测、命令识别和神经网络语音合成，总计约 3.6 MiB Flash、约 468 KiB 预留 SRAM，项目因此写作「低至 470 KB RAM」；截至 Asia/Katmandu 7 月 19 日，Hacker News 讨论达 288 分、33 条评论。事实边界必须前置：热门标题的「less than 500kb」说的是运行内存量级，不是整个程序或模型只有 500 KB；参考平台有 520 KiB SRAM，带 Wi-Fi 的示例约用 491 KiB。当前识别器只覆盖可自训练的约 50 词命令集，不是连续语音听写；作者本人也说完整 ASR、更好的 TTS 音质和高级意图识别仍待完成。主仓库完整版本支持中文 TTS，不能据此推断 Micro 已支持中文命令或自然中文合成；项目未给出独立中文准确率、功耗或长期稳定性测试，80 美分也只是 RP2350 芯片参考价，不等于整机成本。
window: 1 周
competition: 中
publishedAt: 2026-07-19
novelty: 9.2
viral: 8.4
accessible: 8.8
angles:
  - 中文硬件创作者实测向：在 RP2350 开发板上复现语音配网演示，逐项记录 Flash、SRAM、延迟、功耗和整机物料成本，验证「80 美分芯片」离可用产品还有多远
  - 标题事实核查向：把约 470 KiB RAM、约 3.6 MiB Flash、50 词命令识别和完整连续听写拆成四个概念，纠正「500 KB 跑完整语音 AI」的过度概括
  - 中文可用性向：尝试训练少量中文命令并测试噪声、口音和误唤醒，同时明确主仓库支持中文 TTS 不代表 Micro 版本已具备同等语言覆盖
headlines:
  - 470 KiB 内存让芯片听懂命令，但它还不是一个迷你 Whisper
  - 80 美分芯片也能开口说话：Moonshine Micro 把语音界面缩到了哪一步
  - 别被「不到 500 KB」骗了：这套离线语音方案能做什么、不能做什么
materials:
  - Moonshine Micro 官方仓库、内存预算与许可证 :: https://github.com/moonshine-ai/moonshine/tree/main/micro
  - 项目作者 Pete Warden 发布说明与 50 词限制 :: https://petewarden.com/2026/07/14/launching-moonshine-micro/
  - Hacker News 独立讨论（截至 7 月 19 日 288 分 / 33 评论） :: https://news.ycombinator.com/item?id=48911793
---
