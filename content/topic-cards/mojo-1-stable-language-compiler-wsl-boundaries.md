---
title: Mojo 1.0 正式发布：语言进入稳定期，但编译器开源与原生 Windows 仍在路上
heat: Modular 于 8 月 11 日发布 Modular 26.5 与正式版 Mojo 1.0.0，结束 5 月 b1、6 月 b2 的 beta 阶段；截至 Asia/Katmandu 8 月 12 日 08:10，Hacker News 为 298 分、132 条评论，modular/modular 仓库为 26,720 星、2,901 forks。官方把 1.0 定义为长期可构建的稳定语言基础，26.5 统一变量、闭包与 Pointer 表达，加入 Python 风格 lambda、改进 LSP，并增强引用失效的内存安全诊断。边界必须前置：官方仍说明 1.x 可能以受控方式发生破坏性变化，robust async、pattern matching、unions 等能力尚在后续路线；标准库与仓库贡献采用 Apache 2.0 with LLVM Exceptions，但 Mojo、MAX 的使用与分发另受 Modular Community License 约束，编译器和工具链只承诺在 2026 年继续开放，不能写成“整套已经完全开源”。Mojo 不原生支持 Windows，只能通过兼容 Ubuntu 的 WSL；官方测试环境是 Ubuntu 22.04+、glibc 2.34+ 与 Apple Silicon macOS 15+，跨平台、Python 互操作、包生态和性能结论仍需按真实项目复测。
window: 1 周
competition: 中
publishedAt: 2026-08-12
updatedAt: 2026-08-12
novelty: 9.0
viral: 9.1
accessible: 9.2
angles:
  - 中文开发者上手向：在 macOS、Linux 与 Windows WSL 各跑同一组 CPU/GPU 小例子，记录安装、LSP、Python 互操作、编译产物和错误提示；1.0 的“稳定”是官方兼容承诺，不等于所有平台、库和工作负载都已成熟
  - 迁移审计向：从 1.0 的 var、闭包、单一 Pointer、lambda 与引用失效诊断入手，把 beta 项目迁移成可重复构建的样板；同时锁定 package version、保留测试与回滚，不把“1.x 主要增量演进”误写成绝无破坏性变化
  - 开源与许可向：画清仓库贡献/标准库的 Apache 2.0 with LLVM Exceptions、Mojo/MAX 使用分发的 Modular Community License，以及尚待 2026 年开放的编译器工具链；公开源码片段、课程和二进制前分别核对对应条款
headlines:
  - Mojo 终于 1.0：像 Python 写 GPU 代码，现在适合正式项目了吗
  - Mojo 1.0 不是“全部开源”：标准库、编译器和许可证要分开看
  - Windows 开发者实测 Mojo 1.0：为什么官方路径仍然是 WSL
relatedTopicIds:
  - assembly-hall-of-shame-x86-safety-boundaries
  - go126-green-tea-gc-heap-visualization-boundaries
  - sonic-pi-v5-live-coding-supersonic-boundaries
materials:
  - Modular 26.5 与 Mojo 1.0 官方发布、稳定性承诺和后续路线 :: https://www.modular.com/blog/modular-26-5-mojo-1-0-is-here
  - GitHub 正式 Release MAX 26.5 / Mojo 1.0.0 :: https://github.com/modular/modular/releases/tag/max/v26.5.0
  - Mojo 官方系统要求与 Windows WSL 边界 :: https://mojolang.org/docs/requirements/
  - Modular 官方仓库与 Apache 2.0 LLVM Exceptions、Community License 分层说明 :: https://github.com/modular/modular
  - Hacker News 独立讨论与热度快照（截至 8 月 12 日 08:10 为 298 分 / 132 评论） :: https://news.ycombinator.com/item?id=49261128
---

## 先说结论：1.0 最重要的变化是“可以开始谈兼容性”，不是“生态已经毕业”

Mojo 从 2023 年首次亮相时的实验语言走到 1.0，核心承诺是让使用稳定接口的项目在 1.x 期间更容易持续构建。26.5 收敛了过去并存的表达方式：变量统一用 `var`，闭包模型和 Pointer 类型更一致，还加入 Python 风格的 `lambda`、更可靠的 LSP，以及对 `List.append` 使内部引用失效这类内存安全问题的诊断。对写推理内核、音视频处理、科学计算或性能敏感工具的中文开发者，这终于是一个值得重新做完整实测的时间点。

“1.0”仍不能替代验收。官方明确说 1.x 以增量演进为主，但必要的破坏性变化仍会按成熟语言的方式管理；robust async、pattern matching、unions 等通用系统编程能力还在后续路线。包生态、调试器、跨语言边界和不同 GPU 后端也不可能因为版本号变化就自动成熟。教程应该固定版本、公开测试项目与硬件，分别记录编译时间、运行时间、内存、二进制大小和错误处理，而不是只贴一个最快数字。

::: callout Windows 用户看到“支持”时要再读一行
Mojo 官方支持表把 Windows 写作 WSL 路径，并明确没有原生 Windows 支持。课程若在 Windows 录制，应说明 Ubuntu 版本、WSL 配置、GPU 驱动与文件系统位置，不能把 WSL 成功剪成原生安装成功。
:::

## 许可证也必须按组件拆开

官方仓库的代码贡献和开放标准库采用 Apache License 2.0 with LLVM Exceptions，但 README 同时说明 Modular、MAX 与 Mojo 的使用和分发受 Modular Community License 管理。更关键的是，发布公告写的是编译器与工具链将在 2026 年继续开放，而不是在 1.0 当天已经完整开源。因此，“Mojo 是开源语言”这句话若不标明具体组件，会误导想分发编译器、做商业工具链或复制训练材料的读者。

一篇可信的中文上手内容应提供三个结果：macOS 或 Linux 的原生复现、Windows WSL 的独立复现，以及一个失败清单。用同一算法对比 Python、Mojo 和现有 C++/Rust 实现时，还要统一输入、精度、预热、编译缓存与硬件，否则只是品牌演示。所有源码、测试方法、标题模板和迁移简报都可以免费公开；如果读者有真实的性能工作负载，也可以向搞着玩实验室免费提交实验设计，再决定是否需要固定范围的个人诊断或原型服务。
