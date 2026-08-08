---
title: 一条 x86 指令怎样被拖到 62 秒：Assembly Hall of Shame 的反向性能实验
heat: 安全研究者 Christopher Domas 于 8 月 6 日创建 MIT 许可仓库 Assembly Hall of Shame，反向寻找“单条指令能慢到什么程度”；README 当前榜首在作者的 AMD Ryzen 7 5800H 上，让 fxrstor64 从高延迟 MMIO 读取 512 字节状态，并用其他核心制造 PCIe 争用，记录 198,002,498,236 cycles、约 62 秒。截至 Asia/Katmandu 8 月 8 日 09:25，仓库为 307 星、2 forks，Hacker News 为 273 分、65 条评论。事实与安全边界必须前置：数据来自项目作者的特定硬件与方法，未见跨机器独立复现，排行榜按 CPU base clock 归一化也不是通用 CPU 性能榜；ARM 和 RISC-V 仍为 T.B.D.。多个案例涉及特权指令、未公开 MMIO、PCIe/GPU 寄存器或违反规范的访问，可能挂起、损坏状态或触发硬件异常，不能在日用机、生产机或不拥有的设备上照抄；MIT 许可证只覆盖代码权利，不是硬件安全保证。
window: 72h
competition: 低
publishedAt: 2026-08-08
updatedAt: 2026-08-08
novelty: 9.7
viral: 9.3
accessible: 8.4
angles:
  - 可视化科普向：把 nop 的 1 cycle、idiv 的 77 cycles、MMIO 读取的数亿 cycles 到 fxrstor64 的 1980 亿 cycles 做成对数轴动画，解释缓存、微码、总线和外设争用怎样把“一条指令”拖慢；数值只能标注为项目作者在指定硬件上的记录，不外推到所有 x86 CPU
  - 性能测量方法向：拆解“只计一条不可中断指令、允许任意 setup、按 base clock 归一化”的排行榜规则，说明为什么实验测到的是指令与整套硬件路径的最坏耦合，不是 ISA 文档里的普通延迟，也不是 AMD 与 Intel 的品牌输赢
  - 安全内容边界向：用仓库作为阅读材料讲 MMIO、特权寄存器和 PCIe 非 posted transaction，但演示只做静态图、源码走读或隔离且可牺牲的研究设备；不发布可直接复制的危险地址和执行步骤，不鼓励绕过规范或在云主机、公司设备上复现
headlines:
  - 一条指令跑 62 秒：CPU 性能最荒诞的反向排行榜
  - 从 1 cycle 到 1980 亿 cycles，x86 到底被什么拖住了
  - 这不是跑分：Assembly Hall of Shame 怎样寻找硬件最坏路径
relatedTopicIds:
  - gigatoken-simd-tokenization-benchmark-boundaries
  - zilog-z80-fifty-years-constraint-design
  - codex-security-open-cli-pre1-boundaries
materials:
  - Assembly Hall of Shame MIT 仓库、规则、x86 排行榜与作者测量 :: https://github.com/xoreaxeaxeax/asm-hall-of-shame
  - Hacker News 独立讨论与热度快照（截至 8 月 8 日 09:25 为 273 分 / 65 评论） :: https://news.ycombinator.com/item?id=49214098
---

## 先说结论：它测的不是“这颗 CPU 有多慢”，而是单条指令能牵动多长的硬件路径

通常的指令延迟表会尽量隔离噪声，回答加法、除法或访存平均需要多少周期。Assembly Hall of Shame 反过来允许为目标指令准备最不友好的环境，只要求最终计分的是一条不可中断的指令。于是排行榜从几乎什么也不做的 `nop` 开始，逐步经过微码辅助、缓存写回、特权寄存器和 I/O 端口，最后进入未公开的 GPU / PCIe MMIO 区域。榜首方案让一个核心执行 `fxrstor64`，同时让其他核心不断读取另一段高延迟 MMIO，迫使 512 字节状态读取在 PCIe 路径上排队，作者记录约 1980 亿周期、62 秒。

这个结果适合做硬件系统科普，却不能变成“AMD 某型号一条指令要一分钟”的标题党。时间来自一台 Ryzen 7 5800H、特定固件、设备映射和作者实验环境；仓库规则用 CPU base clock 归一化，但不同平台的 MMIO 拓扑、微码、外设与保护机制并不相同。ARM、RISC-V 排行榜还没有数据，x86 项目也没有给出多团队、多主板的系统复现报告。它展示的是最坏路径探索，不是日常程序会自然遇到的延迟分布。

::: callout 不要照抄地址和特权指令做“挑战”
未公开 MMIO、MSR、控制寄存器和违反规范的访问可能让系统挂死、破坏设备状态或触发不可预测行为。日用机、生产机、云主机和他人设备都不适合复现。
:::

## 最好的内容形态是安全的对数轴解释器

中文创作者可以把榜单做成从 1 cycle 到 1980 亿 cycles 的交互时间轴：第一层讲指令自身执行单元，第二层讲微码和缓存，第三层讲 CPU uncore，第四层讲 PCIe 与外设。每个案例只解释“为什么硬件必须等待”，并固定展示处理器、测量规则、是否需要特权、是否触及 MMIO 和是否有独立复现五个标签。这样观众会看到，ISA 中看似单一的操作，真实完成条件可能跨越整个机器。

安全和许可也要分开讲。仓库的 MIT 许可证允许阅读、修改和再分发代码，但不会替实验者保证某个寄存器地址在另一台机器上有效，更不会承担硬件风险。公开视频可以使用作者图表前先检查具体素材许可和署名要求，最稳妥的方式是自己根据公开数值重绘，并链接原仓库与讨论。若要验证普通、非特权指令，应使用隔离进程和成熟基准方法；涉及 MMIO 或特权状态的部分只做静态走读，把“不要执行”作为内容设计的一部分。
