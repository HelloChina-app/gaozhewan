---
title: 微软把 Linux 命令搬进 Windows：Rust 版 Coreutils 给跨平台创作者省下的麻烦
heat: 微软在 2026-06-02 的 Build 2026 上发布「Coreutils for Windows」，是微软维护的 Rust Coreutils（基于开源 uutils 项目）分支，外加 findutils 与 grep。它让开发者无需 WSL、Git Bash 或任何兼容层，就能在 Windows 上原生运行约 75 个 Unix 命令行工具（ls、cat、cp、grep、find 等）。通过 winget 一行命令即可安装；安装后会为每个命令创建 NTFS 硬链接（如 ls.exe、cp.exe），统一指向 c:\Program Files\coreutils\coreutils.exe。卖点是内存安全、性能、以及与 NTFS 的原生整合；依赖 POSIX 专有特性的命令（如 chmod、chown、kill）不在其中。
window: 72h
competition: 中
publishedAt: 2026-06-25
novelty: 7.5
viral: 7.5
accessible: 8.0
angles:
  - 上手实测向（写给同时用 Windows 和 Mac/Linux 的创作者）：直接 winget 装一遍，演示「同一套脚本在三个系统跑通」，并诚实记录哪些命令缺失（chmod / kill 等）、和 Git Bash / WSL 比省了什么、又有哪些坑。
  - 趋势观察向：以「微软亲自下场维护 Rust 重写的 GNU 工具」为切口，讲 Rust 正在怎样吃掉系统底层、以及微软为什么愿意把开源 uutils 抬上 Windows 正统，对中文开发者学 Rust 是不是又多了一个理由。
  - 效率工具向（写给做自动化 / 脚本的人）：把它定位成「让跨平台脚本不再为路径和命令分叉」的效率工具，给一份「值得第一时间装上的 Windows 命令行配置」清单，附真实安装命令与注意事项。
headlines:
  - 微软官方把 Linux 命令塞进了 Windows：Coreutils for Windows 实测
  - 不用 WSL 也能 ls / grep：微软用 Rust 重写了 Windows 命令行
  - 一行 winget 装好 75 个 Unix 命令：跨平台创作者的新默认配置
materials:
  - 微软 Windows 开发者博客 · Build 2026 :: https://blogs.windows.com/windowsdeveloper/2026/06/02/build-2026-furthering-windows-as-the-trusted-platform-for-development/
  - Phoronix · Microsoft Coreutils For Windows :: https://www.phoronix.com/news/MS-Coreutils-For-Windows
  - BleepingComputer · Coreutils brings Linux commands to Windows :: https://www.bleepingcomputer.com/news/microsoft/microsofts-coreutils-project-brings-linux-commands-to-windows/
---
