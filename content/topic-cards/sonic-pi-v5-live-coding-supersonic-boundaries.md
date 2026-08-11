---
title: Sonic Pi v5 正式发布：SuperSonic 热换声卡、Link Audio 与一键录演出
heat: Sonic Pi 于 8 月 7 日发布非 prerelease 的 v5.0.0“SuperSonic”，这是 2025 年 6 月 v4.6.0 之后的首个正式版本；截至 Asia/Katmandu 8 月 11 日 10:05，Hacker News 为 327 分、80 条评论，官方仓库为 12,013 星、983 forks。v5 用 SuperSonic 取代原 scsynth 音频引擎，允许不停止音乐就在 GUI 热切输入/输出设备、采样率与 buffer size，并加入 Ableton Link 音频流、外部 MIDI clock、游戏手柄、Set 文件、原生文档交互、代码补全、屏幕阅读器与 reduced-motion 改进。边界必须前置：这是正式版但包含破坏性变化，`set_volume!` 从 0—5 改为 0—1、主混音器 limiter 与 FX 顺序变化会让旧作品听感不同，v4 偏好不会自动迁移；窗口+主混音录制与 Syphon/Spout GUI 流仅在 macOS/Windows，Linux 重点是原生 PipeWire 与 16×16 patchbay。主 app 源码为 MIT，但 GUI 二进制链接/包含 GPL 组件，教程与示例为 CC BY-SA 4.0，内置 samples/wavetables 为 CC0；用户自带采样、演出录像、直播音乐和第三方视觉素材仍需单独取得权利。
window: 1 周
competition: 中
publishedAt: 2026-08-11
updatedAt: 2026-08-11
novelty: 8.9
viral: 9.0
accessible: 9.5
angles:
  - 中文 live coding 入门向：用 Quickstart Cards、可运行 Docs、带实时预览的代码补全和十个 buffer 的 Set 文件，从零做一段 60 秒现场音乐；v5 的新手体验与屏幕阅读器改进值得实测，但不能把“accessibility work”直接等同于已通过所有 WCAG 或中文辅助技术场景
  - 演出工作流向：现场演示热插耳机、切换声卡、跟随外部 MIDI clock、接 Xbox 手柄、通过 Link Audio 与 DAW 协作，再把窗口和主混音录成视频；录制和 Syphon/Spout 仅 macOS/Windows，Linux PipeWire 路径不同，真实演出前还要测延迟、jitter、掉线、反馈啸叫与恢复方案
  - 升级与版权向：拿同一份 v4 Set 对比 v5 的 limiter、FX 链、volume/drive、配置目录和加载保存图标，制作可回滚的迁移清单；Sonic Pi 自带 samples 为 CC0 不代表用户导入的歌曲、采样、人声、视觉和直播平台音乐都可商用，分发二进制还需遵守 GPL 组件义务
headlines:
  - 插上耳机不用重启：Sonic Pi v5 把 live coding 最烦的事修了
  - 用代码、手柄和 MIDI 一起演出，Sonic Pi v5 工作流实测
  - 升级 v5 后声音变了？先看懂 volume、drive 与新 limiter
relatedTopicIds:
  - midi-hardware-2500-units-indie-business
  - openmontage-agentic-video-production
  - scroll-world-agent-skill-brand-3d-site
materials:
  - Sonic Pi v5.0.0 官方正式发布说明、完整变更、平台安装包与校验值 :: https://github.com/sonic-pi-net/sonic-pi/releases/tag/v5.0.0
  - Sonic Pi 官方仓库与多组件许可证说明 :: https://github.com/sonic-pi-net/sonic-pi
  - SuperSonic 官方浏览器 demo，用于理解新音频引擎 :: https://sonic-pi.net/supersonic/demo.html
  - Hacker News 独立讨论与热度快照（截至 8 月 11 日 10:05 为 327 分 / 80 评论） :: https://news.ycombinator.com/item?id=49208296
---

## 先说结论：v5 不只是加几个 synth，而是把现场演出的底层摩擦重新做了一遍

Sonic Pi 一直以“写代码就能做音乐”闻名，但旧版底层 scsynth 原本面向专业声音合成研究，音频设备变化经常需要隐藏适配甚至重启。v5 用过去一年开发的 SuperSonic 完整替换 scsynth，让输入设备、输出设备、采样率和 buffer size 可以直接在 GUI 中热切换，而正在运行的音乐不必停下。对录教程、上课、直播和小型现场来说，“演到一半插耳机不用重启”比新音色更能改变工作流。

协作能力也明显扩展。`link_audio` 可以把 Ableton Link 同伴发布的音频流接进 Sonic Pi；`use_bpm :midi` 能跟随外部 MIDI clock；手柄按钮和摇杆可像 MIDI 事件一样被 `sync` 与 `get`。macOS 和 Windows 还能把 Sonic Pi 窗口与主混音直接录成一个视频，或通过 Syphon/Spout 把 GUI 送进 Resolume、VDMX、OBS 等视觉软件。Linux 获得的是原生 PipeWire 和 16-in/16-out patchbay，不能把三套平台功能剪成“所有系统一键直播”。

::: callout 先复制作品，再升级演出机
v5 会把 `set_volume!` 的范围改成 0—1，并重排主混音器 limiter 与 FX 链；同一段 v4 代码可能更干净，也可能失去原来的失真感。v4 与 v5 配置相互独立，旧偏好不会自动迁移。正式演出前应在备用设备完整回放并记录差异。
:::

## 最好的中文内容，是一场“从空白到演出”的可复现实验

教程可以从 Quickstart Cards 开始，把可运行的代码卡拖进编辑器，再用带行内文档、音符键盘和参数滑杆的代码补全修改旋律。十个 buffer 可以一起保存为纯文本 `.sonicpi` Set，适合进 Git、做版本差异和分享演出脚本。新的 Docs pane 能直接运行示例与交互 synth，配合搜索、快捷键设置、可见焦点、屏幕阅读器反馈和 reduced-motion，让入门内容不必默认观众都能使用鼠标或看清动画。

真实演出还要补上工程边界：分别测不同 buffer size 的延迟与爆音，拔掉声卡、断开 Link peer、MIDI clock 抖动和手柄休眠时系统如何恢复；录制前确认麦克风权限、磁盘空间和主混音电平，并保留独立音频备份。许可证也要分层：主 app 源码是 MIT，内置 samples 与 wavetables 为 CC0，教程和示例是 CC BY-SA 4.0，完整 GUI 二进制又包含 GPL 组件。更重要的是，创作者导入的采样、人声、歌曲与视觉素材仍按原授权处理。Sonic Pi v5 降低了表演门槛，却没有替演出者消除技术和版权责任。
