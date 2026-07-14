---
title: 每帧只有 8KiB、游戏画面只用 12 色——《Silpheed》把硬件缺陷做成了 1993 年的视觉奇观
heat: 工程作者 Fabien Sanglard 6 月 1 日发布对 Mega-CD 版《Silpheed》视频格式的逆向拆解，7 月 13 日重新冲上 Hacker News，截至 7 月 14 日 231 分、48 条评论。文章解释 Game Arts 如何在 12.5MHz CPU、单倍速 150KiB/s CD-ROM、15fps 视频每帧约 8KiB 的条件下，把平色多边形、16 色画面、tile 复用、ASIC 的 Font bit 和压缩 tilemap 组合起来；互动场景还为激光与爆炸预留 4 色，艺术家实际只用 12 色设计背景。边界是：这是作者对格式和硬件的技术逆向，不是 Game Arts 新发布，也不是对全部引擎源代码的官方复盘；原文已发布约六周，今日性来自 HN 再传播，历史规格可由 Game Arts 产品页交叉确认。
window: 1 周
competition: 低
publishedAt: 2026-07-14
novelty: 9.0
viral: 7.5
accessible: 8.0
angles:
  - 视觉创作向：为什么限制越狠反而越有风格——从 12 色、平面着色和低帧率拆出一套可用于像素动画、短片包装与独立游戏的约束设计练习
  - 技术解释向：用一帧画面讲懂 tile 去重、双色字形硬件和 tilemap 压缩，展示 1993 年开发者怎样把「没有 framebuffer」反过来变成省带宽工具
  - 内容方法向：老游戏考古不只做怀旧盘点——把逆向文章、官方产品资料、实际画面和玩家讨论拼成一篇「美术选择如何服从硬件预算」的证据链
headlines:
  - 每帧只有 8KiB，《Silpheed》为什么看起来像 3D 大片
  - 只给 12 种颜色，1993 年的游戏美术反而做出了未来感
  - 把硬件缺陷变成风格：Mega-CD《Silpheed》的压缩魔法
materials:
  - Fabien Sanglard 原始逆向长文 :: https://fabiensanglard.net/silpheed/
  - Game Arts 官方产品页（发行日、11 关与 4 万余背景画面） :: https://www.gamearts.co.jp/products/mcd-silpheed.html
  - Hacker News 讨论（截至 7 月 14 日 231 分 / 48 评论） :: https://news.ycombinator.com/item?id=48893639
---
