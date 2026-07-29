---
title: 《Half-Life》28 年后跑上 Mac OS 9：社区移植成功，不等于 Valve 官方重发
heat: Mac Classic 7 月 28 日报道 doctashay 基于 Xash3D FWGS 分支完成 PowerPC Mac OS 9 版《Half-Life》，页面称主线可从头玩到尾、支持多人，并提供 Blue Shift、Opposing Force 与 Uplink 相关入口；支持 G3/G4 和 Mac OS 9.0+，低于 8MB VRAM 的机器可能性能吃紧。截至 Asia/Katmandu 7 月 29 日复核时，Hacker News 讨论为 167 分、83 条评论；作者 7 月 14 日在 VintageApple 社区发布时获得 227 个赞，4 月的 Leopard 版本讨论已展示不同 Radeon 硬件可能出现低于 5 FPS 的兼容问题。必须把它写成社区 Xash3D 兼容引擎移植，而不是 Valve 在 2026 年发布官方 Mac OS 9 版；“引擎源码公开”也不等于《Half-Life》的关卡、音频、贴图和商标已开放。Xash3D 上游 README 要求用户复制合法取得的 `valve` 资源目录，只接受基于合法产品的问题，并警告第三方 repack 可能夹带恶意软件；doctashay 分支根目录没有独立 LICENSE 文件且 GitHub 未识别许可证，Mac Classic 下载页也未提供 Valve 授权说明。报道中的“完整可玩”和硬件门槛主要来自发布方与社区样本，不是覆盖所有 G3/G4、显卡和扩展包的独立基准。
window: 72h
competition: 低
publishedAt: 2026-07-29
updatedAt: 2026-07-29
novelty: 9.7
viral: 9.1
accessible: 9.0
angles:
  - 技术考古向：从 Valve 1999 年取消 Mac OS 9 计划、2013 年 Intel Mac 版，到社区用 Xash3D 兼容引擎补上 PowerPC 缺口；时间线要区分原游戏、官方移植和社区重实现，不能把三者混成一次“官方复活”
  - 老硬件实测向：选 G3、G4 与不同 Radeon/Nvidia 显卡记录安装、启动、帧率、声音、鼠标、多人和存档；8MB VRAM 是发布页提示，不是保证线，单台机器通关也不能代表所有 PowerPC Mac
  - 版权与下载安全向：只讲兼容引擎和合法自有游戏资源的组合，不提供来路不明的整包或破解步骤；Xash3D 上游已警告第三方 builds、modded launchers 与 repacks 可能带恶意软件，分支缺少清晰根许可证时也不应默认可随意再分发
headlines:
  - Valve 当年取消的 Mac OS 9《Half-Life》，28 年后被社区补完了
  - G3 老 Mac 终于能进黑山基地：先别把社区移植写成官方版
  - 引擎开源不等于游戏免费：复古移植最容易踩的版权与安全坑
relatedTopicIds:
  - silpheed-sega-cd-constraint-design
  - microsoft-comic-chat-open-source-visual-chat
  - ai-ports-cc-generals-to-iphone
materials:
  - Mac Classic 原始发布报道、系统要求与功能声明 :: https://mac-classic.com/news/half-life-ported-to-mac-os-9/
  - doctashay 的 PowerPC Xash3D FWGS 公开源码分支 :: https://github.com/doctashay/xash3d-fwgs
  - Xash3D FWGS 上游对合法游戏资源、官方构建与恶意 repack 的说明 :: https://github.com/FWGS/xash3d-fwgs
  - Hacker News 独立讨论（截至 7 月 29 日 167 分 / 83 评论） :: https://news.ycombinator.com/item?id=49089814
  - 作者 7 月 14 日 VintageApple 发布与社区硬件讨论 :: https://www.reddit.com/r/VintageApple/comments/1uwl1pb/halflife_on_mac_os_9_by_popular_demand/
---

## 先说结论：补上的不是“新游戏”，而是一段被取消的平台历史

《Half-Life》1998 年首发后，Valve 曾计划在 1999 年把它带到 Mac OS 9，却在上市前取消。2013 年出现的官方 Mac 版已经属于 Intel 与 Mac OS X 时代。doctashay 这次完成的是另一条路线：用兼容 GoldSrc 工作流的 Xash3D FWGS 引擎分支，让 PowerPC G3/G4 和 Mac OS 9.0+ 重新执行游戏。Mac Classic 页面称主线可完整游玩并支持多人，社区热度也说明复古玩家等这块拼图很久了。

这个故事适合中文科技视频，不只是因为“28 年后终于能玩”。它把软件保存拆成了三层：仍受版权保护的游戏内容、可以研究和移植的兼容引擎、以及已经退出商业支持的老硬件平台。社区可以重写渲染、输入、音频和平台接口，却不能因为引擎源码可见，就把 Valve 的关卡、贴图、对白和音乐自动变成可自由打包的素材。

::: callout 不要把下载链接直接做成教程结论
Xash3D 上游要求复制合法取得的 `valve` 资源目录，并明确警告非官方 repack 可能夹带矿工、间谍软件或凭据窃取程序。doctashay 分支没有清晰的根 LICENSE，发布下载页也没有展示 Valve 的再分发授权；最稳妥的内容边界是讲引擎移植，并要求读者使用合法自有资源。
:::

## 真正有信息量的实测，是把“能跑”拆开

发布页给出的最低范围是 G3/G4、Mac OS 9.0+，并提醒低于 8MB VRAM 可能吃力。但早先 Leopard 版本的社区反馈已经表明，PowerBook G4 上某些 Radeon 组合可能低到不足 5 FPS，而另一些同代显卡运行正常。CPU 年代相同不代表驱动、显存、OpenGL 路径和机器散热相同；“作者通关”也不能外推成所有扩展包、多人服务器和外设都没有问题。

一条负责的复古实测应记录机器型号、系统版本、CPU、显卡、显存、游戏资源版本和源码提交，再分别测试启动、过场、声音、鼠标、存档、多人和关键场景帧率。遇到失败时，把兼容问题回报给公开仓库，而不是换一个来历不明的整包。这样内容的主角就不只是情怀，而是社区如何在合法、安全和可复现的前提下，让被商业历史放弃的软件重新获得运行环境。
