---
title: Mac Studio 接上 25GbE 只多读到 1.4GB/s：视频创作者先算散热和整条链路
heat: Jeff Geerling 7 月 31 日发布 Mac Studio 25GbE 改造实测；截至 Asia/Katmandu 8 月 1 日 08:10，Hacker News 为 144 分、85 条评论。原机 10GbE 已能从 NAS 直接剪 4K、备份约 1 GB/s；他把一块服务器拆机 OCP 2 网卡接到 Thunderbolt 3 转接板，iperf3 多线程约 20 Gbps 单向、25 Gbps 双向，但 Samba 实际只有约 1.4 GB/s 读、1 GB/s 写，写入没有超过原有工作流。价格与工程边界必须前置：同类成品官方价约 399 至 1099 美元，测试转接器从 1 月约 160 美元涨到 299 美元；被动盒体让芯片烫手并出现掉线风险，作者拆前盖、3D 打印风道、焊接 5V Noctua 风扇后才在 10 分钟测试中压到 36°C 以下。结果只来自一台 Mac、一个 Ampere Altra NAS、特定 SSD/SMB/iperf 配置；Thunderbolt 5 接口不会把转接器内部 Thunderbolt 3 控制器变快，改盒、焊线和服务器拆机卡也不等于有保修、静音或长期稳定性。
window: 72h
competition: 中
publishedAt: 2026-08-01
updatedAt: 2026-08-01
novelty: 8.4
viral: 8.5
accessible: 8.7
angles:
  - 视频创作者算账向：用同一套 4K/8K 素材分别测 Mac Studio 内置 10GbE 与 25GbE 的单文件、多流、代理生成、缓存和备份，连同交换机、光模块、光纤、转接器、风扇与工时计算总成本；不能把 iperf 峰值写成剪辑软件必得吞吐
  - 改造复现向：先记录原盒温度、掉线和功耗，再对比外置送风、散热片与 3D 风道；作者焊接 4.8V 取电、移除面板的做法只适合有经验者，需前置断电、绝缘、保修、火灾与长期热循环风险，不能做成无警告购物教程
  - 瓶颈诊断向：把 Thunderbolt 3 控制器、iperf 版本与线程、NAS CPU、SMB multichannel、SSD 阵列和应用缓存逐层拆开，解释 20 至 25 Gbps 网络测试为何只得到 1.4 GB/s 文件读取；单一 Arm NAS 的结果不能外推所有 Mac、交换机和存储
headlines:
  - 花钱把 Mac Studio 升到 25GbE，为什么剪片只多了 0.4GB/s
  - 25GbE 转接器烫到掉线：视频工作站升级最容易漏算的散热账
  - Thunderbolt 5 口也救不了 TB3 控制器：Mac 高速 NAS 的完整瓶颈图
relatedTopicIds:
  - openmontage-agentic-video-production
  - nativ-mac-local-model-workbench
  - vision-pro-house-usdz-immersive-walkthrough-boundaries
materials:
  - Jeff Geerling 原始改造、价格、iperf/SMB 结果与散热记录 :: https://www.jeffgeerling.com/blog/2026/getting-25g-ethernet-mac-thunderbolt/
  - Christian Kohlschütter 独立原始方案、OCP 网卡与 Thunderbolt 转接实测 :: https://kohlschuetter.github.io/blog/posts/2026/01/27/tb25/
  - Hacker News 独立讨论与热度快照（截至 8 月 1 日 08:10 为 144 分 / 85 评论） :: https://news.ycombinator.com/item?id=49125034
  - Raiden Digit LightOne 25GbE 成品规格与官方价格交叉来源 :: https://store.raidendigit.com/products/lightone-25gbe-thunderbolt-docking-station
  - 作者公开的 25G Thunderbolt 网卡 80mm 风扇风道 :: https://www.printables.com/model/1789472-80mm-fan-mod-for-25g-thunderbolt-nic
---

## 先说结论：网络链路翻倍，不会让创作工作流自动翻倍

Jeff Geerling 的起点已经很高：Mac Studio 自带 10GbE，能直接从 NAS 剪 4K，备份约 1 GB/s。他的机架和 NAS 已升级到 25GbE，于是尝试用服务器拆机 OCP 2 网卡加 Thunderbolt 3 转接板补上 Mac 缺少 PCIe 插槽的缺口。新版多线程 `iperf3` 把单向吞吐推到约 20 Gbps，双向合计约 25 Gbps，证明链路确实越过 10GbE。

真正复制文件时，差距却缩小了。Samba 从 NAS 到 Mac 约 1.4 GB/s，写回约 1 GB/s；后者几乎没有超过原来的备份速度。作者使用的是较低功耗 Ampere Altra NAS，启用了 SMB multichannel，后端是企业 NVMe 阵列，但 CPU、协议、文件类型和应用缓存仍可能成为瓶颈。这正是创作者值得写的部分：跑分回答“网卡能多快”，剪辑、代理、缓存和备份回答“时间到底省在哪”。

::: callout Thunderbolt 5 端口不会升级转接器内部控制器
这套便宜方案内部仍是 Thunderbolt 3，作者测得约 20 Gbps 单向已接近其现实上限。把它插进 Thunderbolt 5 Mac，不会凭接口名称自动获得 40 或 80 Gbps。
:::

## 被忽略的成本不是网卡，而是热、噪声和整条基础设施

OCP 2 网卡原本住在高风压服务器里，小被动盒体没有把芯片热量有效导出，测试时外壳烫手，存在掉线风险。Jeff 先试低矮散热片和 USB 风扇，仍嫌热和吵；最后拆掉前盖、打印风道、装 80mm Noctua 风扇，并把线焊到转接板约 4.8V 的取电点。低速风扇约用 0.5W，十分钟后温度低于 36°C。这个结果说明主动风道有效，却不是多年稳定性、所有批次 PCB 或无人值守安全的证明。

内容创作者若复刻，应该先画完整链路：Mac、转接器、光模块、交换机端口、NAS CPU、存储阵列、SMB 与剪辑软件，每层都记录成本和吞吐。成品 25GbE Thunderbolt 方案约 399 至 1099 美元，便宜转接器也已从约 160 涨到 299 美元，还要加光纤、散热、3D 打印和时间。最有价值的结论不是“DIY 一定更划算”，而是给出升级门槛：只有当多流高码率素材、缓存或大批量备份持续撞满 10GbE，而且 NAS 与存储能供得上，25GbE 才可能把复杂度换成真实节省。
