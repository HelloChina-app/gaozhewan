---
title: Substack 写作者要不要自建站？431 分讨论背后先分清所有权与平台控制权
heat: 马来西亚华裔写作者 Elizabeth Tai 6 月 10 日发布“Substack writers, you need a website”，主张把自有域名网站当内容原点，再用 Substack 做分发；文章 7 月 28 日进入 Hacker News 热榜，截至 Asia/Katmandu 7 月 29 日复核时为 431 分、215 条评论，原站也显示 69 条回应。它是一位长期独立写作者的经验与主张，不是 SEO 对照实验、平台事故报告或“所有人必须迁移”的行业结论。原文用“内容都属于平台”批评 `xx.substack.com`，但 Substack 7 月 20 日更新的 Publisher Agreement 明确写着创作者仍拥有原创内容，并把订阅者名单称为创作者控制的 List；真正的风险是域名、页面能力、搜索入口、支付关系和账号可用性仍受平台规则约束，不能把修辞误写成法律上的版权转移。Substack 官方当前支持自定义域名，收取一次性 50 美元，要求用 `www` 等子域并让根域 301 跳转；即使接入自定义域，邮件发件地址仍是 `@substack.com`。自建站也会带来托管、安全、备份、邮件送达与重复内容治理成本，POSSE 是架构选择，不是零成本万能答案。
window: 1 周
competition: 中
publishedAt: 2026-07-29
updatedAt: 2026-07-29
novelty: 8.7
viral: 9.3
accessible: 9.8
angles:
  - POSSE 实操向：把自有域名网站设为 canonical 内容源，RSS、Substack、社交平台只做分发；用一篇文章演示 URL、canonical、摘要、订阅入口和更新顺序，避免多站全文复制导致搜索归因混乱
  - 所有权事实核查向：区分“版权和订阅者名单归创作者”“平台拥有服务规则与账号处置权”“域名和外链资产由谁控制”三件事；不能沿用原文修辞声称 Substack 已取得作者版权，也不能把可导出名单写成付费关系可无摩擦迁移
  - 中文创作者最小方案向：不要求立刻自托管整套 CMS，先买并续费自有域名、保存内容与名单备份、开放 RSS、建立独立联系页，再按 SEO、商店、作品集或会员需求决定用静态站、托管 WordPress、Ghost 还是 Substack 自定义域
headlines:
  - 别急着逃离 Substack：先把你的域名、文章和订阅入口排好主次
  - 内容明明归作者，为什么 431 分讨论仍劝写作者自建站
  - 自建站不是再维护一个平台：POSSE 如何让一篇文章只认一个家
relatedTopicIds:
  - moving-digital-stack-to-europe
  - telegram-tme-serverhold-channel-risk
  - leaving-github-for-forgejo
materials:
  - Elizabeth Tai 原始文章、POSSE 主张与作者经验边界 :: https://elizabethtai.com/2026/06/10/substack-writers-you-need-a-website/
  - Hacker News 独立讨论（截至 7 月 29 日 431 分 / 215 评论） :: https://news.ycombinator.com/item?id=49086788
  - Substack 自定义域官方说明、一次性 50 美元与子域限制 :: https://support.substack.com/hc/en-us/articles/360051222571-How-do-I-set-up-my-custom-domain-on-Substack
  - Substack 7 月 20 日 Publisher Agreement 的内容所有权、名单与平台处置条款 :: https://substack.com/pa
---

## 先说结论：要争取的是可迁移性，不是平台纯洁

Elizabeth Tai 的核心建议可以压缩成 POSSE：Publish on your Own Site, Syndicate Elsewhere。文章先在自己控制的域名和网站发布，再把 Substack、社交平台与聚合服务当成读者发现内容的渠道。这样换平台时，作者要更换的是分发管道，而不是让多年外链、作品集和搜索记录一起搬家。对依赖公众号、知乎、小红书、Substack 或 Medium 的中文写作者，这个架构问题比“哪家平台更好用”更耐久。

原文最容易被二次传播写错的，是把“租地”比喻直接翻译成法律事实。Substack 当前协议明确说原创内容仍归创作者，也把订阅者名单描述为创作者控制的 List。平台风险不在于它已经自动拿走版权，而在于它可以改变产品、算法、费用和条款，也保留暂停账号或停止分发的权利；自定义域虽然能保住一部分品牌和链接资产，却不会让发件邮箱、支付流程和所有页面能力脱离 Substack。

::: callout 自定义域不等于完整独立站
Substack 官方当前收取一次性 50 美元，要求出版物使用 `www` 等子域，根域通过 301 跳转；接入后邮件仍从 `@substack.com` 发出。它能改善品牌 URL，却没有把托管、邮件和账号控制权全部交还作者。
:::

## 中文创作者可以从“四件小事”开始

第一，注册并持续续费自己的域名，让个人名或品牌名成为长期入口。第二，定期导出文章、图片、订阅者名单和关键分析数据，并实际演练恢复，而不是只相信“可以导出”。第三，为网站提供 RSS、联系页、作者介绍和稳定的文章 URL。第四，明确唯一内容源：如果网站是 canonical，就让 Substack 发摘要、改写版或正确的 canonical 关系，避免同一全文在多个域名互相竞争。

这并不要求每个人立刻维护服务器。只写通讯、没有 SEO 与作品集需求的人，Substack 加自有域名可能已经够用；需要产品页、课程、商店、中文搜索优化或复杂内容结构的人，才更值得加静态站、托管 WordPress 或 Ghost。自建会引入更新、安全、备份、性能和邮件送达的新责任。好的内容不是鼓动读者从一个平台仓促跳到另一个平台，而是给出一张资产清单：域名归谁、原文在哪里、名单如何备份、付费关系如何迁移、平台消失后读者还能从哪里找到你。
