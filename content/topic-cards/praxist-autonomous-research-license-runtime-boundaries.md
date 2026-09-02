---
title: PRAXIST 五天冲到 6165 星：多 agent 研究循环先过评测、运行时与 Fair Source 三道门
heat: sapientinc/PRAXIST 于 8 月 27 日创建，定位为面向“已有可运行项目与可度量目标”的持续研究系统，让并行 peers 提出方案、由任务自己的 evaluator 产出证据，再跨 generation 汇总；截至 Asia/Katmandu 9 月 2 日 05:56，认证 GitHub API 显示 6165 星、518 forks，main 仍在更新。官方要求 CPython 3.11+；持续发布测试只覆盖 Linux 上的 Python 3.11/3.12，macOS 和其他 Python 3.11+ 组合只是兼容目标，首次 Codex-native 安装还会下载约 100–150 MB 的平台运行时，数据集、CUDA、模拟器与任务依赖都不随工具提供。事实与许可边界必须前置：仓库公开源码，但使用自定义 Fair Source License Agreement 1.0，不应简称为 OSI 开源；免费内部使用受集团年度总收入低于 100 万美元约束，达到阈值需按协议通知并协商商业许可，向第三方公开生成输出还要保留产品名署名，独立分发也有限制。一个第三方在 8 月 30 日对 commit 7af6a26 的 Debian 沙箱测试安装了 131 个包、占 905 MB，build 失败，tests 在 900 秒到 26% 时超时并出现失败标记；这只是特定旧提交、3 CPU/8 GB 容器的复测，不证明当前 main、所有主机或真实研究任务都会失败，也没有足够日志可断言根因。星数、项目方架构说明和一次外部测试都不是科研改进、成本可控或无人值守安全的证明。
window: 1 周
competition: 中
publishedAt: 2026-09-02
updatedAt: 2026-09-02
novelty: 9.1
viral: 8.9
accessible: 7.6
angles:
  - 最小研究复现向：不用真实训练任务，先拿一个有固定输入、基线、单一主指标与硬约束的小型优化题，记录 evaluator 是否能拒绝作弊、负结果是否保留、相同候选是否可重放；不能用 README 架构图替代实测提升
  - 运行与成本账向：逐项记录 Python/OS、安装体积、peer 数、generation 数、模型与缓存命中、token/算力、墙钟时间、失败重试、停止条件和产物目录；第三方 905 MB 与 900 秒超时只属于 commit 7af6a26 的单次环境
  - 许可与发布向：对照 Fair Source 原文标出 100 万美元集团收入阈值、内部使用、第三方分发、公开输出署名、可选遥测与新加坡法条款；源码可看可改不等于 OSI 开源，本文不提供法律意见
headlines:
  - 6165 星的 PRAXIST 能自动做研究吗？先给 evaluator 出一道反作弊题
  - 让多 agent 连续迭代之前，先算清 131 个依赖、运行预算与停止条件
  - 源码公开却不是 OSI 开源：PRAXIST 的 100 万美元许可门槛怎么读
relatedTopicIds:
  - cursor-agent-swarm-model-economics
  - openai-huggingface-eval-agent-security-incident
  - handbook-md-agent-policy-compliance-benchmark
materials:
  - PRAXIST 原始仓库、系统边界、运行模型、要求与当前开发状态 :: https://github.com/sapientinc/PRAXIST
  - Fair Source License Agreement 1.0 原文、收入阈值、分发和公开输出署名 :: https://github.com/sapientinc/PRAXIST/blob/main/LICENSE.md
  - 官方安装说明、持续测试平台、额外运行时与不随附依赖 :: https://github.com/sapientinc/PRAXIST/blob/main/docs/getting-started/installation.md
  - 第三方 commit 7af6a26 沙箱复测、安装体积、build 失败与 tests 超时边界 :: https://mrkeyoor.com/repos/praxist/
---

## 先说结论：它值得写的不是“自动发现科学”，而是把研究承诺变成可拒绝作弊的合同

PRAXIST 把常见的一次性 agent 提示，扩成多轮实验循环：多个研究 peer 尝试不同方向，统一 evaluator 把结果变成证据，保留下来的方案再影响下一代计划。这个结构对算法调参、模拟器策略、数据处理管线和有明确指标的工程优化都很诱人。但官方自己把入口条件写得很窄——项目必须已经能运行，目标必须可测，任务方要拥有基线、数据、约束与评价器。没有这些，系统不会凭空创造有效科学问题；有这些，也仍需证明评价器没有被候选钻空子。

中文创作者最适合先做一场小型公开复现。选一个十分钟内能跑完的任务，冻结数据和基线，给主指标规定方向，再加两条不可牺牲的约束。例如压缩图片体积时同时限制 SSIM 与处理时间，或者优化网页首屏时禁止删掉核心内容。先手工制造一个“分数变高但违反约束”的候选，观察 harness 会不会拒绝；再重复运行同一候选，检查结果、日志、随机种子和产物哈希是否一致。只有这两步通过，才值得增加 peers、generations 和模型预算。

::: callout 第三方失败复测是停止信号，不是永久判决
MrKeyoor 对 8 月 30 日 commit 7af6a26 的容器测试记录了 131 个安装包、905 MB、build 失败和 900 秒测试超时。报告没有给出足以确定 build 根因的日志，仓库此后也在快速更新。正确用法是复现同一 SHA、同一主机合同，再测当前固定 SHA；不能把旧提交的一次失败剪成“项目是骗局”，也不能因 main 已更新就忽略这条成熟度证据。
:::

成本表要和成绩表同时出现。至少记录宿主 OS、Python 版本、安装下载量与落盘量、模型供应商、每个 peer 的 token、缓存命中、并发、单次评价耗时、失败重试、生成数、总墙钟、总费用和手动干预次数。监视器关闭不代表后台 run 停止，长任务必须有预算上限、停止命令、磁盘配额和可恢复检查点。任何“提升 20%”都要附基线 SHA、候选 SHA、评价命令、重复次数、置信区间或方差，以及被拒绝候选的原因。

许可检查应在安装前完成。Fair Source 协议允许符合条件的内部使用和修改，但收入阈值按 licensee 与 affiliates 的全球总收入计算；公开生成输出的产品名署名、独立分发限制、商业许可协商时限和适用法律都可能影响公司采用。遥测在协议里被描述为单独明确 opt-in，不等于接受许可证就同意采集，但实测仍应抓出站请求并检查配置。所有来源、角度、标题、竞争度、时效窗口、评价表和复制简报都免费公开；读者可向搞着玩实验室免费提交自己的可度量研究题共同设计，付费只用于用户自己的 evaluator 诊断、实验原型或固定范围 MVP。
