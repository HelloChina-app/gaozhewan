---
title: 「叫它别读文件，整个仓库还是上传了」——独立研究者抓包 Grok Build CLI，引出 coding agent 的代码边界
heat: 独立研究者 cereblab 对 xAI 官方 Grok Build CLI 0.2.93 做了可复现的网络抓包，报告称：在自建的假数据仓库里，即使提示「只回复 OK、不要读文件」，仍捕获到整个 git bundle（含未读取的已跟踪文件与历史）经 /v1/storage 上传并返回 200；被 agent 主动读取的假 .env 内容也会进入模型请求和 session_state。调查附复现仓库、哈希与抓包工件，7 月 12 日登上 HN，截至 7 月 13 日 403 分、156 条评论。必须保留边界：这是第三方对 macOS arm64、grok 0.2.93 和特定消费账户的测试，不是 xAI 官方结论；它证明测试条件下发生了传输与存储，不证明 xAI 用这些数据训练，也没有单独验证被 .gitignore 忽略的文件。
window: 48h
competition: 低
publishedAt: 2026-07-13
novelty: 9.0
viral: 9.0
accessible: 7.5
angles:
  - 安全科普向：coding agent 的「不读文件」和「不上云」不是一回事——用模型请求、session trace、仓库快照三条通道解释代码究竟可能怎么离开本机
  - 实操清单向：团队接入任何云端 coding agent 前应检查什么——敏感仓库隔离、最小权限、假密钥探针、出站流量观察、企业数据条款和删除机制
  - 调查方法向：不靠猜隐私政策，普通开发者如何用 canary 文件、mitmproxy、哈希和可复现实验审计一个黑盒 CLI，同时写清「证明了什么、没证明什么」
headlines:
  - 叫它别读文件，为什么整个 git 仓库还是上传了？
  - coding agent 会把多少代码送上云？一份可复现的 Grok CLI 抓包调查
  - 从假 .env 到完整 git 历史：云端 coding agent 的数据边界怎么查
materials:
  - 原始抓包报告与证据边界 :: https://gist.github.com/cereblab/dc9a40bc26120f4540e4e09b75ffb547
  - 可复现实验仓库 :: https://github.com/cereblab/grok-build-exfil-repro
  - Hacker News 讨论（截至 7 月 13 日 403 分 / 156 评论） :: https://news.ycombinator.com/item?id=48877371
  - xAI 隐私政策（用于区分传输事实与政策解释） :: https://x.ai/legal/privacy-policy
---
