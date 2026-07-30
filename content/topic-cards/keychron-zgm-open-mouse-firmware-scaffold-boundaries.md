---
title: Keychron 宣布开源游戏鼠标固件，仓库却还没有固件源码：ZGM 先看路线图
heat: Keychron 把 ZGM 宣传为基于 Zephyr RTOS、面向有线与无线游戏鼠标的 GPL-3.0 开源固件平台，目标覆盖传感器、按键、滚轮、灯光、低延迟输入和模块化硬件；7 月 29 日的 Digital Foundry 报道进入 Hacker News，截至 Asia/Katmandu 7 月 30 日为 297 分、112 条评论，认证 GitHub API 显示 Keychron/zgm 为 112 星、3 forks。最关键的事实边界是：仓库 README 明确写着“early setup phase”，根目录当前只有项目网站、文档、政策和贡献文件，没有固件源码、Zephyr 应用骨架、板级支持、编译说明或刷写指南；路线图也注明不是交付保证，官网的低延迟、有线/无线和可定制能力目前应视作目标而非已测功能。Keychron 的“世界首个开源游戏鼠标固件”是品牌口径，开放鼠标硬件和 QMK 固件生态早已有 Ploopy 等项目，除非先定义“游戏鼠标固件”，否则不能把“首个”当成已独立证明的事实。
window: 72h
competition: 中
publishedAt: 2026-07-30
updatedAt: 2026-07-30
novelty: 9.0
viral: 8.7
accessible: 8.3
angles:
  - 仓库验货向：把官网功能卡与 GitHub 根目录逐项对照，展示“项目已开源”和“可编译固件已交付”的差别；在出现源码、支持板、可复现构建、刷写和延迟测试前，不做安装教程，也不让读者拿现有鼠标冒险刷机
  - 开放硬件生态向：解释 Zephyr 的驱动/板级抽象为何可能让传感器、按键、滚轮和无线方案复用，再与 QMK、ZMK 及既有开放鼠标项目比较；Keychron 的“世界首个”必须作为厂商声明并给出定义争议，不能删除 Ploopy 等先例
  - 中文创客跟踪向：建立一张里程碑表，持续检查 firmware skeleton、HID 输入链、传感器集成、USB、无线、支持硬件与测量方法是否落地；GPL-3.0 只覆盖仓库代码，未来具体鼠标的 PCB、射频、二进制和保修政策不能提前假定同样开放
headlines:
  - Keychron 把游戏鼠标固件开源了？112 星仓库目前还只有路线图
  - 从 QMK 键盘到 ZGM 鼠标：真正的第一行固件代码还没公开
  - “世界首个”先打问号：开源游戏鼠标要过源码、硬件和延迟三道门
relatedTopicIds:
  - freeink-open-ereader-stack-chinese-test
  - midi-hardware-2500-units-indie-business
  - zilog-z80-fifty-years-constraint-design
materials:
  - Keychron ZGM 原始仓库、early setup 状态、路线图与 GPL-3.0 许可（截至 7 月 30 日 112 星 / 3 forks） :: https://github.com/keychron/zgm
  - ZGM 官方网站的 Zephyr、模块化、低延迟与有线/无线目标口径 :: https://zgm.gg/
  - Digital Foundry 独立报道与首发主张 :: https://www.digitalfoundry.net/news/2026/07/keychron-announces-first-open-source-firmware-for-gaming-mice
  - Hacker News 独立讨论与热度快照（截至 7 月 30 日 297 分 / 112 评论） :: https://news.ycombinator.com/item?id=49099715
---

## 先说结论：这是值得跟踪的公开承诺，还不是可以刷进鼠标的固件

ZGM 的方向很容易形成好标题。键盘玩家已经熟悉 QMK 和 ZMK：按键映射、层、宏和新硬件可以在公开代码里迭代；游戏鼠标却往往把传感器参数、去抖、滚轮、灯光、功耗和无线链路封在厂商软件与二进制里。Keychron 想用 Zephyr RTOS 建立一套模块化底座，把公共输入逻辑与具体 MCU、传感器和板级实现分开，并以 GPL-3.0 公开。这对做外设、嵌入式或输入设备内容的中文创客，确实是一个值得持续观察的信号。

但 7 月 30 日打开仓库，看到的不是可编译工程。README 明确说项目处于早期搭建阶段，目前主要是脚手架、政策文件和方向说明；根目录有项目网站、文档、许可证和贡献指南，却没有承诺中的 firmware sources、board support、build instructions 或 flashing guidance。路线图从 repository bootstrap 开始，后面才依次列固件骨架、HID 输入链、传感器、USB、硬件抽象、验证工作流和扩展功能。官网把低延迟、有线/无线、模块驱动写成产品能力卡，更准确的读法是目标清单。

::: callout 现在不要写“刷机教程”
在没有支持设备、构建产物、刷写步骤和恢复方案前，把任意 Keychron 鼠标接上未知固件都可能造成设备不可用或失去保修。当前可做的是阅读路线图、参与架构讨论和等待可复现源码。
:::

## “开源”和“世界首个”都要拆成可检查的问题

GPL-3.0 是清晰的代码许可，但它只覆盖仓库中实际发布的内容。未来某款鼠标是否公开 PCB、射频方案、传感器调校、bootloader、签名机制和量产测试，仍要等具体文件；“基于 Zephyr”也不会自动带来低延迟，轮询稳定性、点击延迟、无线丢包、睡眠唤醒和电池寿命都需要设备级测量。一个可靠的跟踪稿应记录每个 milestone 的提交、支持板、构建命令和测试数据，而不是只转载官网形容词。

Keychron 还把 ZGM 称作“世界首个开源游戏鼠标固件”。这个说法依赖定义：如果限定为某种现代无线竞技鼠标的通用平台，ZGM 也许在尝试填补空白；如果泛指可以驱动鼠标的开放固件，Ploopy 等硬件与 QMK 生态已经存在多年。中文内容最好保留“Keychron 自称”，并邀请读者比较目标硬件、延迟、无线、许可和可复现构建。真正有价值的故事不是抢一个“第一”，而是观察一家量产外设厂商能否把鼠标最封闭、最依赖调校的部分，持续变成社区可以检查和贡献的公共基础设施。
