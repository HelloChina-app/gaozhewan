---
title: 「25GB 内存跑 744B 大模型」——一个人用 1300 行 C 写的 colibrì，把 GLM-5.2 塞进了普通笔记本
heat: 7 月 9 日以「Show HN: Getting GLM 5.2 running on my slow computer」登上 HN 首页，399 分 103 条评论；纯 C、零依赖的单文件引擎，把 744B MoE 的 GLM-5.2 以 int4 跑在 25GB 内存的消费级机器上——常驻内存仅 9.9GB，370GB 模型放硬盘按需流式读取，Apple M5 Max 实测 1.06 tok/s。「本地跑前沿大模型」的想象力边界又被推了一格。
window: 72h
competition: 低
publishedAt: 2026-07-10
novelty: 9.0
viral: 7.5
accessible: 6.0
angles:
  - 极客故事向：一个人、一台 12 核 25GB 内存的笔记本、约 1300 行 C，怎么把 744B 模型「饿着养活」——用比喻讲清 MoE 按需加载 + 磁盘流式的原理，写给非工程师读者
  - 实测/科普向：0.05 tok/s 到 1 tok/s 意味着什么——「慢但真能跑」的本地前沿模型能干嘛（离线、隐私、学习研究），按 README 的硬件档位表给读者一个预期
  - 趋势向：从 Kokoro 老 CPU 配音到 colibrì 硬盘喂大模型——2026「平民本地 AI」路线盘点：什么适合本地、什么老实上云
headlines:
  - 一个人用 1300 行 C，把 744B 的 GLM-5.2 塞进 25GB 内存的笔记本
  - 不买 H100 也能跑前沿大模型？HN 近 400 分的开源项目做到了，就是有点慢
  - 把 370GB 模型放在硬盘里「流式喂进」内存：colibrì 的笨办法与巧办法
materials:
  - GitHub 仓库（colibrì，Apache 2.0） :: https://github.com/JustVugg/colibri
  - Hacker News 讨论（399 分） :: https://news.ycombinator.com/item?id=48842459
  - 预转换 int4 权重（Hugging Face） :: https://huggingface.co/jlnsrk/GLM-5.2-colibri-int4
---

与已发布的「GLM-5.2 发布」卡不同，本卡主角是推理引擎 colibrì 本身。写作红线：如实交代速度（作者自己的机器冷启动仅 0.05–0.1 tok/s，M5 Max 约 1 tok/s），不要夸成「流畅可用」；可写的记忆点：学习缓存会记住你常用的 experts、「越用越快」；作者公开求助社区跑质量基准——「一个人项目求测试机」本身就是好故事。数字均取自仓库 README 的实测表。
