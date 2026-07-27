---
title: PGSimCity 把 PostgreSQL 画成一座 3D 城市：最值得学的是它主动标出的“不准确”
heat: Nikolay Samokhvalov 7 月 25 日公开 PGSimCity v0.1，把 shared_buffers、WAL、checkpoint、autovacuum、锁、堆页、B-tree 与主从复制画成可步行探索的 3D 城市；截至 Asia/Katmandu 7 月 27 日复核时，Hacker News 讨论为 245 分、32 条评论，GitHub 仓库为 29 星、Apache-2.0 许可。事实边界必须前置：作者在启动页和 README 两次声明这是“早期、未经审阅、几乎肯定含有错误”的手写教学模型，不是模拟器；浏览器里没有运行 PostgreSQL 源码，也不解析 SQL，1024 个缓冲帧和粒子数量都为可观看性而缩放，不能用它验证查询计划、性能、故障恢复或具体版本行为。项目代码可按 Apache-2.0 使用，但二次发布仍需保留许可证与 NOTICE；PostgreSQL 名称是商标，不能暗示得到官方背书。
window: 72h
competition: 低
publishedAt: 2026-07-27
updatedAt: 2026-07-27
novelty: 9.5
viral: 8.6
accessible: 9.2
angles:
  - 技术科普拆解向：用“连接进入—后端执行—缓冲命中或淘汰—写 WAL—checkpoint 落盘—standby 重放”走完一条可视化路径，同时逐段标出真实 PostgreSQL 文档与 PGSimCity 缩放模型的差异
  - 交互内容方法向：分析作者怎样用城市分区、颜色语义、14 章导览和可触发场景，把 shared_buffers 抖动、长事务阻塞 vacuum、同步提交代价变成可操作叙事；可复用的是信息架构，不是把动画直接当证据
  - 许可与准确性向：项目代码为 Apache-2.0，改编需保留许可证和 NOTICE，PostgreSQL 商标不随代码授权；截图、讲解与二创应明确写“独立教育原型”，并用官方文档或真实实例复核每个机制
headlines:
  - 把 PostgreSQL 走成一座城：PGSimCity 如何解释 WAL、缓存和 vacuum
  - 245 分的数据库可视化先给自己打警告：它不是 PostgreSQL 模拟器
  - 长事务为什么让表越变越胖？这座 3D 城市把过程演给你看
relatedTopicIds:
  - beam-engine-interactive-explainer-threejs-fable
  - semisim-transistor-animations-accuracy-clarity
  - sqlite-editions-modern-defaults
materials:
  - PGSimCity 原始交互页面与 v0.1 准确性警告 :: https://nikolays.github.io/PGSimCity/
  - PGSimCity 官方仓库、模型说明与 Apache-2.0 许可 :: https://github.com/NikolayS/PGSimCity
  - PostgreSQL 官方体系结构文档，用于复核进程与内存模型 :: https://www.postgresql.org/docs/current/tutorial-arch.html
  - Hacker News 独立讨论（截至 7 月 27 日复核时 245 分 / 32 评论） :: https://news.ycombinator.com/item?id=49063754
---

## 先说结论：这不是一台藏在网页里的 PostgreSQL

PGSimCity 最抓眼球的地方，是把抽象名词变成空间。客户端从北侧进入，postmaster 为连接建立后端进程；中央广场是 shared_buffers，每个缓冲帧的高度表示 clock-sweep 使用计数，颜色表示干净、脏页等状态；东边是 WAL，地下是堆文件和索引，南边的 standby 稍慢一步重放主库送来的日志。读者可以缩小缓冲区、制造长事务、触发 checkpoint storm，直接看一组机制怎样相互牵动。

但作者没有把“能动”包装成“真实运行”。README 明确说它是手写模拟：1024 个缓冲帧代表现实中可能更多的页面，一个粒子代表大量元组；网页不会解析 SQL，也没有 PostgreSQL 代码在浏览器里执行。它适合回答“这些部件大致怎样协作”，不适合回答“我的查询为什么慢 37%”“某个版本会不会丢数据”或“这个参数该设成多少”。

::: callout 模型里的因果链要回到真实文档复核
动画可以让人看到 checkpoint 后 full-page write 增加、长事务压低 xmin horizon、同步提交让后端等待 WAL flush，但具体触发条件、时序和代价仍应以 PostgreSQL 官方文档、源码、EXPLAIN 与真实监控为准。
:::

## 中文创作者可以怎样把它写得既好看又可靠

最稳妥的结构不是录屏逛一圈，而是选一个问题做双轨解释。例如从“为什么一个忘记提交的事务能让表持续膨胀”开始：先用 PGSimCity 展示 xmin horizon 下沉、autovacuum 反复工作却无法回收；再打开官方 MVCC 与 vacuum 文档，解释哪些旧版本必须继续保留；最后在隔离测试库里用真实 SQL 和统计视图复现。这样，动画负责建立直觉，文档负责定义，实验负责验证。

第二个值得借鉴的是它的“诚实层”。启动页直接写明 early, unreviewed prototype，检查器也说明哪些地方经过简化。科普内容常担心承认模型不完整会削弱气势，PGSimCity 反而证明：把省略项放在显眼位置，能让读者知道什么时候该停止类比。中文二创也应把“不解析 SQL、不是官方项目、数字已缩放”放进标题附近，而不是埋在结尾。

许可同样要拆开讲。仓库采用 Apache-2.0，允许在满足条件时复制和修改代码，但需要保留许可与 NOTICE；PostgreSQL 名称和标识并不会因此变成任意使用的素材。若只想做视频或图文，优先录制自己的操作画面、链接原项目、注明独立教育原型，并用官方文档校对讲稿。它真正可复制的不是一套漂亮城市贴图，而是“空间隐喻 + 可触发场景 + 明示误差 + 原始资料复核”这条内容生产链。
