---
title: Tailscale 追出 SQLite 16 年 WAL-Reset 数据竞态：修复版不是撤回的 3.52.0
heat: Tailscale 于 8 月 12 日披露其控制平面在六个月内经历 19 次 SQLite 数据库损坏，并与 SQLite 核心开发者追到 WAL checkpoint 与写事务之间的极罕见竞态；截至 Asia/Katmandu 8 月 13 日 08:08，Hacker News 为 814 分、148 条评论。官方说明竞态会让 checkpoint 误以为部分 WAL 页面已写回主库，实际页面却永久丢失，其他引用页继续落盘后形成损坏；SQLite 将其命名为 WAL-Reset bug，估计至少存在 16 年。边界必须前置：这不是“SQLite 或 WAL 一用就坏”，Tailscale 的单写者分片架构运行多年才在大规模下触发，SQLite 团队甚至需要专门加入故障注入才能稳定测试。最初包含修复的 3.52.0 因另一个 stale expression index 误报问题被撤回，随后发布的 3.51.3 才是只带 WAL-Reset 修复的维护版，3.53.0 再加入相关自愈索引能力；不能建议读者寻找或锁定已撤回的 3.52.0。升级只能阻止该竞态继续发生，不能自动修复既有损坏，也不能替代一致性快照、PRAGMA integrity_check、恢复演练和应用级数据核对。
window: 1 周
competition: 中
publishedAt: 2026-08-13
updatedAt: 2026-08-13
novelty: 9.6
viral: 9.4
accessible: 9.2
angles:
  - 自托管创作者排查向：先盘点应用实际链接的 SQLite 运行时版本、是否启用 WAL、是否存在并发 checkpoint 与长事务，再安排到受支持的含修复版本；不把 Tailscale 的罕见竞态扩大成所有本地数据库都已损坏
  - 备份恢复向：用副本验证快照、WAL、checkpoint、PRAGMA integrity_check 与恢复流程，记录 RPO、RTO 和应用级行数/外键核对；说明升级防未来触发，但历史备份和现有库仍需独立检查
  - 版本事实核验向：画清“3.52.0 首次带修复但被撤回—3.51.3 重新发布 WAL 修复—3.53.0 增加 stale expression index 自愈”的时间线，避免标题把两个不同问题、真实损坏与误报混成同一漏洞
headlines:
  - SQLite 16 年老 bug 让已提交数据消失：Tailscale 花半年抓到一次竞态
  - 别升级到已撤回的 3.52.0：SQLite WAL-Reset 修复版本一次说清
  - 19 次损坏不等于 SQLite 不可靠，这场事故真正该抄的是恢复方法
relatedTopicIds:
  - sqlite-editions-modern-defaults
  - pgsimcity-postgresql-3d-model-boundaries
  - fastmail-eu-data-region-not-eu-only
materials:
  - Tailscale 原始事故复盘、19 次损坏、竞态机制与版本时间线 :: https://tailscale.com/blog/sqlite-wal-reset-bug
  - SQLite 官方 WAL-Reset bug 说明 :: https://sqlite.org/wal.html#the_wal_reset_bug
  - SQLite 官方版本变更记录与 3.52.0 撤回说明 :: https://sqlite.org/changes.html#version_3_52_0
  - SQLite 官方 WAL-Reset 修复提交 :: https://sqlite.org/src/info/7168988acbec2d8d
  - Hacker News 独立讨论与热度快照（截至 8 月 13 日 08:08 为 814 分 / 148 评论） :: https://news.ycombinator.com/item?id=49272832
---

## 先说结论：真正危险的是“成功提交后悄悄消失”，不是一次普通报错

SQLite 的 WAL 模式先把新页面写入 write-ahead log，再由 checkpoint 把页面合并回主数据库。Tailscale 与 SQLite 团队定位到的竞态发生在 checkpoint 和写事务非常特殊的交错时序：checkpoint 看到 WAL 被另一个线程重置后，错误地把某些页面当作已经复制。写事务可以正常返回成功，后续事务却看不到那次提交；引用这些缺失页面的索引或其他页面继续落盘，最终让数据库结构不一致。

这也是问题多年未被发现的原因。Tailscale 的控制平面按分片使用单个 Go 进程和单写者 SQLite，完整快照每几分钟上传一次，这套架构从 2023 年起长期无事。直到生产规模把极低概率时序重复放大，团队才在六个月内遇到 19 次损坏。它们靠备份监控持续运行 `PRAGMA integrity_check`、遇到损坏立刻停止分片、保存取证信息，并把每个写 SQL 事务另记日志用于重放，才找到“已提交写入在后续事务中消失”的关键线索。

::: callout 修复版本有一段容易写错的插曲
3.52.0 首次包含 WAL-Reset 修复，却因浮点转换变化触发 stale expression index 的误报而撤回；SQLite 随后发布 3.51.3，只带回 WAL 修复。3.53.0 的索引自愈处理的是另一层问题，不能把它们写成同一个数据竞态。
:::

## 中文开发者最该复制的是验证链，而不是恐慌式迁库

先确认应用真正加载的 SQLite 版本，而不是只看系统命令或包管理器标签；桌面应用、移动端、Python、Node、Go 和容器可能各自捆绑不同运行时。再在数据库副本上检查 WAL 配置、checkpoint 策略、备份是否包含一致状态，并执行完整恢复演练。`integrity_check` 能发现结构问题，却不能证明每笔业务数据都存在，因此还要核对关键表行数、外键、时间序列连续性和应用级不变量。

已经出现异常的库不应在唯一副本上反复“修复”或盲目 checkpoint。先冻结写入、复制数据库及 WAL/SHM、记录版本和文件哈希，再从已验证快照恢复并重放可审计事务。公开内容应给出安全检查表与版本证据，不散布“SQLite 天生会丢数据”的结论。所有复盘框架、标题模板和恢复演练简报都应免费公开；读者也可向搞着玩实验室免费提交自己的备份流程，先共同找出验证缺口，再决定是否需要固定范围的个人诊断或原型服务。
