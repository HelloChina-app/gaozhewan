---
title: Canvas UI 12 天冲到 2300 星：把 WebGL 盖在真 HTML 上，先过浏览器与许可两道门
heat: DavidHDev/canvas-ui 7 月 16 日创建，用 canvas 与 WebGL 在真实、仍可选择和点击的 HTML 上叠加 Liquid、Glass、Shatter、VHS 等效果；项目 README 列出 25 个组件并支持 React、Solid、Preact、Vue、Svelte 与 vanilla，截至 Asia/Katmandu 7 月 28 日复核时为 2300 星、99 forks，7 月 24 日 CSS Script 已有独立介绍，Best of JS 也收录了项目。最关键的事实边界是，多数组件依赖仍属实验性的 html-in-canvas/canvas-draw-element：完整效果目前要求 Chrome 或 Edge 140+ 开启 flag，生产域名需申请 origin trial；其他浏览器会回退为普通 HTML 或 WebGL overlay，能打开不等于视觉、性能和交互完全等价。项目不是纯 MIT，而是自定义 “MIT + Commons Clause”：允许在应用、网站或产品中使用，包括商业用途，但禁止销售、再许可或重新分发组件本身、组件合集或移植版本；二创教程不能只写“MIT 随便卖”。仓库自述的降级、可访问性与性能仍需在目标设备上独立测试，尤其要尊重 reduced motion、键盘操作和低端手机。
window: 1 周
competition: 中
publishedAt: 2026-07-28
updatedAt: 2026-07-28
novelty: 9.5
viral: 9.3
accessible: 9.5
angles:
  - 视觉拆解向：解释它不是把按钮和文字全部画死在 canvas，而是让真实 DOM 保持选择、链接和交互，再把页面作为 WebGL 效果输入；同时展示不支持 html-in-canvas 时的回退截图，不能只录作者站点的 origin-trial 最佳效果
  - 中文品牌站实测向：挑 Liquid 或 Glass 做一个 hero，对 Chrome/Edge、Safari、Firefox、安卓中端机分别测 FPS、GPU 占用、首屏、键盘、文字选择和 prefers-reduced-motion；“无报错回退”不等于效果一致，更不等于已经通过无障碍验收
  - AI 装组件与许可向：shadcn-compatible registry 和 MCP 可把源码复制进 React/Vue/Svelte 项目，代码落地后仍由团队负责审查依赖、性能与安全；自定义 Commons Clause 允许把组件用于客户网站，但禁止把组件本身或改名移植版当模板包出售、再许可或重新分发
headlines:
  - 网页上的字还能选，火焰却能把它烧掉：Canvas UI 怎么做到的
  - 12 天 2300 星的 Canvas UI，为什么现在还不能无脑上生产
  - 不是纯 MIT：用 Canvas UI 做商业站前必须看懂的许可边界
relatedTopicIds:
  - scroll-world-agent-skill-brand-3d-site
  - jelly-ui-soft-body-accessibility-boundary
  - beam-engine-interactive-explainer-threejs-fable
materials:
  - Canvas UI 原始仓库、25 个组件、框架支持与浏览器说明 :: https://github.com/DavidHDev/canvas-ui
  - Canvas UI 官方安装文档、flag、origin trial 与回退行为 :: https://canvasui.dev/docs/installation
  - 项目自定义 MIT + Commons Clause 原始许可证 :: https://github.com/DavidHDev/canvas-ui/blob/main/LICENSE.md
  - CSS Script 7 月 24 日独立介绍与浏览器限制说明 :: https://www.cssscript.com/canvas-ui/
  - Best of JS 项目页与独立收录 :: https://bestofjs.org/projects/canvas-ui
---

## 先说结论：它没有为了特效把网页变成一张死图

传统 canvas 特效最棘手的地方，是一旦把文字、按钮和卡片全部画进像素，浏览器原生的文本选择、链接、语义和辅助技术能力就很容易丢失。Canvas UI 的卖点恰好相反：主要内容仍然是 DOM，文字可以选择、链接可以点击，实验性的 html-in-canvas API 把这块真实 HTML 交给 WebGL 读取和重绘，于是液体、玻璃、燃烧、碎裂等 shader 可以扭曲界面，同时保留底层内容。

这给中文视觉创作者一个很好的拆解角度：不要只录“鼠标一划，页面像水一样散开”，而要把 DOM、canvas 和 shader 三层分别画出来。组件又通过 shadcn-compatible registry 直接把源码复制进项目，React、Vue、Svelte 或 vanilla 用户拿到的不是封闭播放器，而是可修改的实现。对于需要快速做活动页、作品集或品牌 hero 的团队，这比从空白 WebGL 场景搭一整套交互更容易试验。

::: callout 作者站能跑，不等于所有访客都看到同一效果
官方安装页说明，部分组件完整运行仍需 Chrome 的 canvas-draw-element flag；canvasui.dev 自己使用绑定该域名的 origin trial token。其他站点要另行申请，Safari、Firefox 或未支持环境会回退。回退保证内容可呈现，不保证原特效完全保留。
:::

## 上生产前要同时做兼容、克制和许可测试

最小验证不该只在开发者的高端电脑录屏。先挑一个效果包住 hero，在 Chrome/Edge、Safari、Firefox 和一台安卓中端机上分别记录视觉差异、帧率、GPU 占用、首屏时间和滚动手感；再关闭动画、只用键盘、开启系统 reduced motion，确认文字、焦点与主要行动按钮仍然可用。WebGL overlay 回退没有报错，只能证明页面没有直接坏掉，不能证明品牌表达、可访问性或电量消耗已经合格。

设计上也要主动限量。Liquid、Glass、Shatter 和 VHS 同时堆叠会迅速吞掉阅读层级；更稳的用法是只把一个效果当作入口记忆点，正文区域恢复静态排版，并为低性能或减少动态偏好的用户提供明确关闭路径。独立介绍文章可以作为交叉观察，但性能结论必须来自自己的设备和页面，不能把项目 README 的描述当成第三方 benchmark。

许可更不能省略。仓库文件写的是自定义 “MIT + Commons Clause”，允许把组件用于应用、网站和商业产品，却禁止把组件自身、合集或移植版本拿去销售、再许可或重新分发。这和一句“MIT 开源组件库，随便打包卖”不是同一件事。给客户做网站通常落在许可证明确允许的产品使用场景；把组件改名后做成付费模板库、组件市场包或跨框架移植版出售，则可能触碰限制。正式商业项目应保存许可证文本、标记修改并让负责人按具体分发方式复核。
