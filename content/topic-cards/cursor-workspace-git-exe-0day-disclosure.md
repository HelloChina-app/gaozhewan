---
title: 打开一个仓库，Cursor 就可能执行里面的 git.exe——这场 0day 披露为什么吵翻开发者
heat: 安全公司 Mindgard 7 月 14 日公开报告称，Windows 版 Cursor 会在工作区根目录寻找并反复执行 git.exe；其无害 PoC 只需把计算器重命名后放进仓库，过程监控记录显示 Cursor 以 git rev-parse 参数启动该文件。报告称漏洞 2025 年 12 月已提交，最后一次公开验证是 2026 年 4 月 30 日的 Cursor 3.2.16；截至 7 月 15 日，HN 讨论达 259 分、109 条评论。争议必须写清：目前核心复现、披露时间线和「仍未修复」均来自 Mindgard，未见 Cursor 对此次公开报告的正式确认；攻击还要求恶意可执行文件先进入本机仓库，HN 对 Workspace Trust、Windows 执行控制与实际严重性存在明显分歧，因此不能把它写成已获厂商确认、适用于 macOS/Linux 或能远程无文件利用的定论。
window: 48h
competition: 中
publishedAt: 2026-07-15
novelty: 8.5
viral: 9.0
accessible: 8.2
angles:
  - 安全科普向：为什么「只是打开仓库」也可能跨过代码执行边界——用可执行文件搜索顺序、项目信任和 Windows 路径策略讲清 IDE 的隐形动作
  - 争议拆解向：把研究者报告、进程日志、厂商未回应与 HN 反方观点分层，回答这是不是 0day、攻击前提有多高、哪些结论还没被独立复现
  - 创作者实操向：下载陌生模板、课程源码和 AI 生成项目之前先做什么——隔离环境、查看根目录可执行文件、最小权限和 AppLocker / Windows App Control 清单
headlines:
  - 打开仓库就运行 git.exe？Cursor 0day 报告里已证明和未证明的事
  - 一份恶意仓库能不能接管 Cursor：259 分争论背后的 IDE 信任边界
  - AI 编程工具最危险的动作，可能发生在你第一次提问之前
materials:
  - Mindgard 原始披露、PoC 说明与时间线 :: https://mindgard.ai/blog/cursor-0day-when-full-disclosure-becomes-the-only-protection-left
  - Microsoft Sysinternals Process Monitor 官方说明 :: https://learn.microsoft.com/en-us/sysinternals/downloads/procmon
  - Hacker News 讨论（截至 7 月 15 日 259 分 / 109 评论） :: https://news.ycombinator.com/item?id=48910676
---
