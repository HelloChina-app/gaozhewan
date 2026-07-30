---
title: Vision Pro 把住宅平面图变成可走的 USDZ：一上午 vibe coding，不等于建筑审图
heat: 独立开发者 Christian Selig 于 7 月 29 日公开 Prospector：他先在 Fusion 360 把住宅平面图拉成 3D、补家具与地形，再导出 USDZ，用 Claude 和 Codex 在一个上午做出可在 Apple Vision Pro 中用手柄行走、飞行和贴地移动的 visionOS 查看器；截至 Asia/Katmandu 7 月 30 日复核时，Hacker News 为 407 分、193 条评论，GitHub 仓库为 28 星、1 fork。事实边界必须前置：这是作者自用的粗糙原型，仓库只有 1 次提交，要求 Xcode、Apple 开发签名、Vision Pro（visionOS 2.5+）和游戏手柄，不能直接从 PDF 自动生成房屋，也不是可提交 App Store 的成品。沉浸感不能替代建筑师、结构/消防/无障碍审查或现场尺寸复核；作者从 IKEA、3D Warehouse 等渠道取得模型的做法不自动授予再发布或商业使用权，仓库当前也未声明代码许可证，改编和分发前必须逐项核对代码、模型、纹理与品牌素材授权。
window: 72h
competition: 中
publishedAt: 2026-07-30
updatedAt: 2026-07-30
novelty: 9.3
viral: 9.1
accessible: 7.9
angles:
  - 创作者实测向：选一个自己的小房间，用可公开使用的尺寸与 CC0 家具模型走通“2D 平面图、Fusion 拉墙、USDZ、Xcode、头显走查”；必须记录 Vision Pro、Mac、开发签名和手柄门槛，不能包装成手机点一下就能完成的 AI 户型工具
  - Vibe coding 复盘向：拆解作者为何把一次性 USDZ 查看需求做成可移动、贴地、飞行和一键显隐的私人小工具，同时展示 1 次提交、无许可证、硬编码模型名和未上架 App Store 等原型信号；“一上午做出来”不等于可维护、可交付或安全可用
  - 空间内容边界向：讨论 VR 如何帮助非建筑专业者感受走廊宽度、视线与家具尺度，再列出必须回到建筑师和真实测量的清单；第三方家具、纹理、户型、地形和品牌模型只可按各自许可使用，不要打包转载或拿演示模型冒充精确 BIM
headlines:
  - 他用 Vision Pro 走进了还没盖的家：一上午 vibe coding 了一个 USDZ 查看器
  - 从户型 PDF 到沉浸式走房，Prospector 能帮你做决定，但不能替你审图
  - 28 星小项目为什么冲上 HN：Vision Pro 终于找到一个不靠游戏的刚需
relatedTopicIds:
  - img2threejs-single-image-procedural-3d-skill
  - scroll-world-agent-skill-brand-3d-site
  - canvas-ui-html-in-canvas-browser-license-boundaries
materials:
  - Christian Selig 原始制作记录、发布日期、工具链与限制 :: https://christianselig.com/2026/07/vision-pro-house/
  - Prospector 原始仓库、visionOS 2.5+ 要求与控制说明（截至 7 月 30 日 28 星 / 1 fork） :: https://github.com/christianselig/Prospector
  - Hacker News 独立讨论与热度快照（截至 7 月 30 日 407 分 / 193 评论） :: https://news.ycombinator.com/item?id=49102774
---

## 先说结论：真正的新意是把“看模型”变成“在尺度里做决定”

Christian Selig 的案例不是又一个自动生成精美室内图的 AI 演示。他先在 Fusion 360 里照着平面图画墙、门窗和地形，再用家具与材质建立尺度参照，最后把模型导成 Apple 平台常用的 USDZ。普通文件预览虽然能打开模型，却无法让人自然走过一整套住宅；于是他用 Claude 和 Codex 做了 Prospector，让游戏手柄控制移动、转向、升降和六倍速，还可以贴着地形走、临时隐藏虚拟世界确认现实中的障碍物。

这个流程适合中文创作者的地方，是它把抽象尺寸变成可讲、可拍、可比较的体验。平面图上“13 英尺乘 15 英尺”很难形成身体尺度，放进床、书桌和厨房岛台后，门口第一眼能看到什么、走廊是否局促、家具周围还剩多少活动空间，会变成一段可以录屏讨论的内容。它也展示了一个健康的 vibe coding 使用场景：需求小、使用者就是作者、失败成本可控，代码不需要先被包装成通用 SaaS。

::: callout 别把沉浸感写成建筑准确性
头显里的“感觉很真实”不能证明模型尺寸、结构、采光、消防疏散或无障碍设计正确。住宅决定仍要由建筑师、工程师、规范审查和现场复核负责，VR 只是一种沟通与体验工具。
:::

## 复刻时最容易漏掉的是硬件、维护和素材权利

Prospector 目前不是下载即用的 App。README 要求把 USDZ 拖进 Xcode 工程、修改 Swift 文件里的模型名、配置开发团队签名，再把工程跑到 visionOS 2.5 以上的 Vision Pro；移动还需要配对手柄。仓库只有一次提交，作者明确称代码粗糙，也没有声明许可证。读者可以把它当作观察实现思路的样本，但不能默认拥有复制、改编或再发行权，更不应在没有测试的情况下把它交给客户现场使用。

模型资产也要单独处理。作者提到从 IKEA 和 3D Warehouse 获取家具模型、用转换工具改格式，这说明工作流可行，不代表所有素材可以被抓取、重打包或商业发布。可靠教程应优先使用自己制作、明确授权或 CC0 的模型与纹理，保留来源和许可记录；户型图若属于真实客户，还要去除地址、家庭动线等隐私。这个选题最好的落点不是“AI 已经替代建筑软件”，而是“一个人如何用现成 3D 格式、头显和临时代码，把不可逆的大决定提前变成一次低风险走查”。
