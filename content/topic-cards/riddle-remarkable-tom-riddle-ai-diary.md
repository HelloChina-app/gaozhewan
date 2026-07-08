---
title: 「墨水会回写的日记」——有人用 Claude Fable 5 把 reMarkable 改造成汤姆·里德尔的日记
heat: 加拿大开发者 Maxime Rivest 开源 riddle：在 reMarkable Paper Pro 墨水屏上用笔写字，停笔约 2.8 秒后墨迹「被纸吸走」，日记里的「灵」用流动的手写体一笔一划写回你——复刻《哈利·波特与密室》里的汤姆·里德尔日记。7 月 6 日发上 HN 后冲到首页第一，608 分、406 条评论，TechRadar、Android Authority、Notebookcheck 等外媒跟进；HN 标题就叫「Fable turned reMarkable into Tom Riddle's diary」——工程由 Claude Fable 5 完成，作者当导演。技术上是 Rust 写的 takeover 应用：绕开原 UI 直驱 e-ink 引擎，实测约 0.9–1.1 秒出第一笔墨；回信用 Dancing Script 字体骨架化成单像素笔迹逐笔重放；后端接任意支持图像输入的模型（OpenAI 兼容 API 或本地服务），每页手写栅格化成 PNG 发给模型、读完即删，记忆只存本机（约 400 页），MIT 开源。它改变的是「AI 硬件玩法 = 屏幕 + 聊天框」的想象：没有 chat UI，纸和笔本身成了 AI 的界面。（抓取于 2026-07-08，分数与评论数以当日页面为准。）
window: 48h
competition: 中
publishedAt: 2026-07-08
novelty: 9.0
viral: 9.0
accessible: 6.0
angles:
  - 文化+体验向（非技术读者也能写）：从《密室》情节讲起——「往日记里写字、它写回来」这个当年吓人的桥段，如今一台 reMarkable 加一个开源项目就能拥有；写清墨迹淡去、手写体回信、翻笔即擦除、写「你还记得什么」召回旧页这些细节的魔法感从哪来。
  - 拆解向（写给想复刻的动手党）：这个项目怎么跑通——开发者模式与 remagic 一键安装、takeover 模式直驱 e-ink、手写体如何合成（栅格化→细化→描笔顺→动画重放）、怎么接自己的模型、隐私边界在哪（只上传当页 PNG、读完即删、记忆不出设备）。
  - 趋势向：这是一周内第二个「人当导演、Fable 当工程师」的爆款开源项目（上一个是《将军》移植 iPhone）——「一个人 + 一个前沿模型」开始交付过去要一个团队的作品，聊聊独立创作者的机会窗口。
headlines:
  - 有人真做出了汤姆·里德尔的日记：写字、墨水消失、它写回来
  - 不要屏幕不要聊天框：一支笔、一块墨水屏，AI 藏进了纸里
  - 《哈利·波特》里最阴森的魔法道具，被一个开发者和 Claude Fable 5 开源复刻了
materials:
  - GitHub · MaximeRivest/riddle :: https://github.com/MaximeRivest/Riddle
  - Hacker News 讨论（608 分） :: https://news.ycombinator.com/item?id=48811591
  - TechRadar 报道 :: https://www.techradar.com/tablets/ereaders/this-new-interactive-tool-on-the-remarkable-paper-pro-turns-your-device-into-tom-riddles-diary-from-harry-potter-and-its-one-of-the-smartest-e-reader-features-ive-seen
---
