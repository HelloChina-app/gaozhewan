---
title: 「AI 当工程师、人类当导演」——23 年前的《命令与征服：将军》被移植上 iPhone，全程工程日志开源
heat: 设计师 Ammaar Reshi 于 7 月 4 日开源 Generals-Mac-iOS-iPad，把 2003 年的《命令与征服：将军—绝命时刻》（C&C Generals: Zero Hour）原生搬上 Apple Silicon Mac、iPhone 和 iPad——不是模拟器，是真引擎编译到 ARM64，DirectX 8 调用经 DXVK→Vulkan→MoltenVK→Metal 渲染，战役、遭遇战、将军挑战都能玩，还配了为 RTS 设计的触屏操作（点选、框选、双指滚动、捏合缩放）。项目基于 EA 官方开源（GPL v3）的引擎源码和社区 GeneralsX 的 macOS 移植，不含任何游戏资产、需自购正版（Steam 促销约 $5）。README 写明这是一次 human+AI 协作：工程由 Claude Code（Fable 模型）完成，作者负责指挥方向和真机试玩，docs/port/PORTING_PLAYBOOK.md 留下了未删改的完整工程日志——每个失败、根因和修复都在。上线首日 HN 363 分、143 条评论，仓库 280★。它改变的是「AI 编程只能写网页 CRUD」的印象：老引擎跨平台移植这种硬活，「人定方向 + AI 干工程」的分工已经能交付了。（抓取于 2026-07-05，星数与讨论数以当日页面为准。）
window: 72h
competition: 低
publishedAt: 2026-07-05
novelty: 8.0
viral: 8.0
accessible: 6.5
angles:
  - 工作流拆解向（写给想「指挥 AI 干大活」的人）：精读 PORTING_PLAYBOOK.md 这份未删改工程日志，提炼「人类导演 + AI 工程师」的实际分工——人怎么定验收标准、AI 怎么排查黑小地图/静音语音这类诡异 bug，整理成一套可复用的方法论。
  - 情怀+文化向（非技术读者也能写）：给当年玩《将军》《红警》的一代讲「23 年前的 RTS 如何在 iPhone 上复活」——EA 开源了引擎、社区接力移植、AI 补上最后一段路，顺带讲清「引擎开源但资产要自购正版」的边界。
  - 讨论向：从这个项目聊独立创作的新可能——一个不以工程见长的设计师加一个 AI，交付了过去要一个团队才能做的移植；哪些「想做但没人手做」的项目现在值得重新评估？
headlines:
  - 一个设计师 + 一个 AI，把 2003 年的《将军》搬上了 iPhone
  - 不是模拟器：23 年前的 RTS 被原生移植到 iPad，AI 干工程、人管方向，日志全公开
  - 「命令与征服」被 AI 征服：这份开源移植日志，值得每个想指挥 AI 的人读一遍
materials:
  - GitHub · ammaarreshi/Generals-Mac-iOS-iPad :: https://github.com/ammaarreshi/Generals-Mac-iOS-iPad/tree/main
  - Hacker News 讨论（363 分） :: https://news.ycombinator.com/item?id=48788283
  - 完整工程日志 PORTING_PLAYBOOK.md :: https://github.com/ammaarreshi/Generals-Mac-iOS-iPad/blob/main/docs/port/PORTING_PLAYBOOK.md
---
