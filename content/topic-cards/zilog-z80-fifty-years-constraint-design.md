---
title: Z80 发布 50 年：3500 个晶体管、64KB 地址空间，为什么一颗 8 位 CPU 仍值得重讲
heat: Zilog Z80 于 1976 年 7 月上市，50 周年回顾长文重新梳理了它从 8008、8080 到 Z80 的设计谱系，以及单 5V 电源、DRAM 自动刷新、8080 代码兼容和更简洁外围电路如何推动早期微机、游戏机与嵌入式设备普及；截至 Asia/Katmandu 7 月 18 日，Hacker News 讨论达 168 分、54 条评论。事实边界必须前置：这篇周年长文是工程爱好者的个人回顾，具体历史细节应与博物馆口述史和厂商文件交叉核对；「完全兼容 8080」对正式指令集大体成立，但 HN 讨论指出奇偶标志等行为及未定义操作码存在边缘差异。Zilog 在 2024 年结束的是经典独立 Z84C00 的最后订购，不能写成所有 Z80 衍生核、兼容芯片、旧设备和模拟器同时消失；Game Boy 使用的 Sharp LR35902 也只是受 Z80 / 8080 影响的衍生设计，不是原版 Z80。
window: 1 周
competition: 中
publishedAt: 2026-07-18
novelty: 8.0
viral: 8.1
accessible: 9.0
angles:
  - 中文技术创作者约束实验向：在 64KB 地址空间里做一个能运行的小程序或游戏片段，用寄存器、栈和一条 LDIR 指令讲清「看得见每一步」的计算机基础
  - 产品史向：从单电源、内置刷新和更少外围芯片解释 Z80 赢的并不只是指令数量，而是让一台完整电脑更容易、也更便宜地搭出来
  - 考据纠错向：列出 8080 二进制兼容的例外、Z84C00 停产的准确范围，以及 Game Boy 衍生 CPU 与原版 Z80 的差别，避免把 50 年历史压成怀旧口号
headlines:
  - 一颗 8 位 CPU 活了 50 年，Z80 真正赢在少接几颗芯片
  - 64KB、3500 个晶体管：用 Z80 重新学一遍电脑怎么工作
  - Z80 五十岁了，但「停产」和「Game Boy 用 Z80」都只说对一半
materials:
  - 50 周年原始回顾、架构与历史参考 :: https://goliath32.com/blog/z80.html
  - Centre for Computing History · 1976 年 7 月发布记录 :: https://www.computinghistory.org.uk/det/5539/Zilog-releases-the-Z80-microprocessor/
  - Zilog Z84C00 End of Life / Last Time Buy 厂商通知镜像 :: https://mm.digikey.com/Volume0/opasdata/d220001/medias/docus/6798/Limited_ZAC24-0029_Z80_Z84C00HB.pdf
  - Hacker News 独立讨论（截至 7 月 18 日 168 分 / 54 评论） :: https://news.ycombinator.com/item?id=48951461
---
