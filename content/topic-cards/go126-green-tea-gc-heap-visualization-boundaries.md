---
title: 把 Go 垃圾回收画成堆地图：Green Tea 更快，但不会搬走稀疏页里的活对象
heat: Phil Eaton 7 月 19 日发布的实验文章用 perf、对象地址和字符图观察 Go 1.26 默认启用的 Green Tea GC，并专门展示非移动式回收器面对稀疏 span/page 时的残余内存问题；截至 Asia/Katmandu 7 月 28 日复核时，7 月 25 日形成的 Hacker News 讨论为 182 分、17 条评论。Go 官方发布说明称，重度使用 GC 的真实程序预计可减少约 10%–40% 的“垃圾回收开销”，较新的 amd64 平台还可能因向量扫描再减少约 10%；这些数字不是整套应用的吞吐、延迟或内存占用保证，具体结果取决于对象布局、堆结构与硬件。Green Tea 已是 Go 1.26 默认项而非测试开关，但仍是非移动 mark-sweep 设计；文章标题中的“move through the heap”不能改写成“会搬动对象或自动压缩内存”。官方允许在构建时用 GOEXPERIMENT=nogreenteagc 暂时退出，并预计 Go 1.27 移除该退出项，生产迁移仍应以自身 benchmark、profile 和回归监控为准。
window: 1 周
competition: 中
publishedAt: 2026-07-28
updatedAt: 2026-07-28
novelty: 9.2
viral: 8.3
accessible: 8.8
angles:
  - 可视化科普向：借作者的对象地址字符图解释“同尺寸对象进入 span、回收器沿引用标记、页内只剩少量活对象时为何整页不能归还”；必须明确这是教学实验和特定分配模式，不是 Go 堆在所有服务中的固定形状
  - 性能报道核查向：把“GC 开销下降 10%–40%”与“整套应用快 10%–40%”严格分开；官方举例若应用原本只有 10% CPU 花在 GC，最终整体 CPU 改善大约只是 1%–4%，而某些工作负载可能收益很小
  - 创作者实测向：同一服务分别用默认 Green Tea 与构建时 nogreenteagc 做压测，记录 CPU profile、GC pause、分配率、RSS 和尾延迟；不要只截一次 benchmark，也不要把非移动回收器的稀疏页问题误称为内存泄漏
headlines:
  - Go 1.26 的新 GC 到底快在哪？一张堆地图讲清 Green Tea
  - 官方说 GC 开销降 10%–40%，为什么你的服务可能只快 1%
  - Go 不搬对象的代价：活对象只剩几个，整页内存为何还回不去
relatedTopicIds:
  - pgsimcity-postgresql-3d-model-boundaries
  - semisim-transistor-animations-accuracy-clarity
  - zilog-z80-fifty-years-constraint-design
materials:
  - Go 1.26 官方 release notes、默认启用与 10%–40% GC 开销口径 :: https://go.dev/doc/go1.26
  - Go 团队 Green Tea 原理、页级扫描与 benchmark 边界 :: https://go.dev/blog/greenteagc
  - Phil Eaton 实验文章的 Hacker News 讨论与公开快照线索（截至 7 月 28 日 182 分 / 17 评论） :: https://news.ycombinator.com/item?id=49045474
---

## 先说结论：这不是“会搬家的 GC”

Green Tea 最容易被标题带偏的地方，是把“回收器在堆里移动”理解成“活对象被搬到一起”。Go 1.26 的新回收器仍然是非移动式 mark-sweep：它从根引用出发标记仍可到达的对象，再把未标记空间交还给分配器。改变的是扫描工作的组织方式。旧路径更像把待扫描对象逐个放进全局工作队列；Green Tea 更强调按页聚集和扫描，让 CPU 在相邻内存上连续工作，减少等待内存的时间，也更容易利用多核和新硬件的向量指令。

Phil Eaton 的文章把这个抽象过程画成了可见的地址分布。程序随机分配不同尺寸的对象，再沿地址空间输出字符，读者可以看到同一 size class 的对象怎样聚进 span。这个画法特别适合中文图文或视频：先画对象与指针，再把“逐对象排队”和“按页聚集”并列，最后用 perf 数据说明缓存局部性为何会改变 GC CPU 成本。

::: callout 性能数字的分母不能偷换
Go 官方说的是重度 GC 工作负载中“垃圾回收开销”预计下降约 10%–40%，不是整套应用必然快 10%–40%。如果 GC 原本只占总 CPU 的 10%，GC 开销下降 10%–40% 对应的整机 CPU 改善大致是 1%–4%。
:::

## 稀疏页是这条内容真正有用的反面

非移动设计让 Go 避免了更新所有对象地址的复杂性，却也意味着只要一个 span 里还留着活对象，那些夹在中间的空位通常不能像压缩式 GC 那样通过搬家合并成完整空页。文章构造的分配与释放模式正是在观察这个问题：逻辑上已经释放许多对象，进程持有的页却未必等比例下降。

这不应直接写成“Go 1.26 内存泄漏”。泄漏通常意味着本应不可达的数据仍被引用；这里讨论的是可达对象的空间分布与非移动回收策略造成的碎片或稀疏页。可靠的实测要同时看 heap profile、RSS、分配率、GC CPU 与尾延迟，并固定 Go 版本、硬件和流量。Green Tea 已经是 1.26 默认项，迁移内容的重点也不是教读者永久关闭它，而是教会他们用自己的工作负载验证收益，在发现回归时保留 profile，并按官方要求反馈可复现证据。
