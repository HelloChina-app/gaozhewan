---
title: SQLite 需要一个「2026 版」开关吗——一行 PRAGMA 想修掉 20 年兼容包袱
heat: 开发者 Mort 7 月 15 日提出借鉴 Rust editions，为 SQLite 增加 PRAGMA edition = 2026，一次启用外键约束、5 秒 busy timeout、WAL、synchronous=NORMAL，并让新表默认 strict；截至 7 月 16 日，HN 讨论达 125 分、50 条评论，Reddit r/programming 的交叉讨论集中在「更安全默认值」与「一个版本名反而隐藏配置」的取舍。事实基础可由 SQLite 官方文档核对：外键约束确因向后兼容默认关闭，STRICT 表自 3.37.0 才按表启用，WAL 在多数场景更快但并非普适。边界必须前置：这只是个人提案，不是 SQLite 官方路线图、已接受 RFC 或可用语法；统一默认也有真实代价——WAL 不适用于网络文件系统、跨多个 ATTACH 数据库不保证整体原子性，读多写少时可能略慢，NORMAL 同步还涉及断电耐久性权衡，5 秒锁等待也未必适合所有应用。
window: 72h
competition: 低
publishedAt: 2026-07-16
novelty: 8.2
viral: 7.5
accessible: 8.0
angles:
  - 独立开发者实操向：给博客、桌面工具和小型 SaaS 做一份 SQLite 启动清单，逐项解释 foreign_keys、busy_timeout、WAL、synchronous 与 STRICT 何时开、何时别开
  - 产品设计向：20 年不破坏兼容性为什么会留下危险默认值；用 Rust edition 的「显式选择新规则」解释软件如何同时照顾旧项目和新用户
  - 反方评测向：在本地磁盘、网络盘、读多写少、并发写和多数据库事务五种场景跑同一套配置，验证「一行现代默认值」到底减少 bug 还是制造新坑
headlines:
  - SQLite 外键默认不生效：一行 2026 edition 能不能解决历史包袱
  - 一条 PRAGMA 改掉五个默认值，这个 SQLite 提案为什么吵起来了
  - 不是 SQLite 慢，是默认值太老？先看 WAL 与严格模式的代价
materials:
  - Mort 原始提案与四组默认值说明 :: https://mort.coffee/home/sqlite-editions/
  - SQLite 官方外键文档（默认关闭与兼容性原因） :: https://www.sqlite.org/foreignkeys.html
  - SQLite 官方 WAL 文档（优势、网络文件系统与原子性限制） :: https://www.sqlite.org/wal.html
  - Hacker News 讨论（截至 7 月 16 日 125 分 / 50 评论） :: https://news.ycombinator.com/item?id=48928135
---
