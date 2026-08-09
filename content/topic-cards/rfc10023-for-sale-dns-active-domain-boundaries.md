---
title: RFC 10023 让在用域名也能标“出售”：一条 _for-sale TXT 的机会与风险
heat: IETF 于 2026 年 7 月发布 RFC 10023，定义保留的 `_for-sale` DNS 叶节点，让仍在正常建站和收信的域名用 TXT 记录声明出售意向；IANA 已将 `_for-sale` 登记到 Underscored and Globally Scoped DNS Node Names 注册表，Website Specification 在 8 月 8 日更新实作说明后再次引发讨论。截至 Asia/Katmandu 8 月 9 日 08:10，Hacker News 为 355 分、132 条评论。边界必须前置：RFC 10023 是经过 IETF 社区审查与 IESG 批准的 Informational RFC，不是 Internet Standards Track，也没有证据证明主流注册商、浏览器或域名市场已经普遍读取它；发布记录不会自动出现出售横幅、完成估价、验证卖家身份或形成买卖合同，`fval` 价格按 RFC 仅为非约束性参考。TXT 内容与 `furi` 链接都由域名控制方提供，读取器若不做净化、Unicode 防护和显式跳转确认，可能引入 XSS、SQL 注入、双向文本、同形字和恶意链接风险；DNSSEC 能增强来源完整性但不能证明报价真实、安全或具有法律约束力。
window: 1 周
competition: 低
publishedAt: 2026-08-09
updatedAt: 2026-08-09
novelty: 9.3
viral: 8.8
accessible: 9.0
angles:
  - 域名持有者实作向：用 `v=FORSALE1;` 加一项 `ftxt`、`furi` 或 `fval`，解释为什么一个 TXT 字符串最多 255 octets、同一记录只放一个内容标签、撤售必须删除记录；公开联系方式会带来垃圾邮件和隐私风险，报价也不构成出售承诺
  - 创作者域名资产向：展示一个仍在更新的网站怎样在不停车、不改首页和不中断邮箱的情况下对经纪人发出机器可读信号，再跟踪注册商与市场是否实际采纳；这是新出现的可选发现机制，不应写成“所有闲置域名从此都能自动成交”
  - 工具开发与安全向：做一个只读检查器，默认把 TXT 当不可信输入，转义文本、限制 URI scheme、防同形字与双向文本、禁止自动跳转，并展示 DNSSEC 验证状态；RFC 明示恶意文本仍可能语法有效，不能因记录存在就给卖家、链接或价格加可信徽章
headlines:
  - 不停站也能卖域名：RFC 10023 把出售意向写进 DNS
  - 一条 _for-sale TXT 能做什么，不能替你做什么
  - 域名报价进入 DNS 之后，解析器先要防住五类攻击
relatedTopicIds:
  - moving-digital-stack-to-europe
  - substack-own-site-posse-platform-boundaries
  - codepen-2-file-deploy-pro-classic-boundaries
materials:
  - RFC 10023 原文、Informational 状态、记录格式、价格与安全限制 :: https://www.rfc-editor.org/rfc/rfc10023.html
  - IANA DNS 参数注册表中的 _for-sale TXT 登记 :: https://www.iana.org/assignments/dns-parameters/dns-parameters.xhtml
  - Website Specification 8 月 8 日实作说明与常见错误交叉解读 :: https://specification.website/spec/foundations/for-sale-dns/
  - Hacker News 独立讨论与热度快照（截至 8 月 9 日 08:10 为 355 分 / 132 评论） :: https://news.ycombinator.com/item?id=49221668
---

## 先说结论：它补上了“已注册但愿意卖”这个长期缺失的机器可读状态

WHOIS 与 RDAP 擅长回答域名是否已注册，却通常无法告诉买家一个仍在使用的域名是否接受报价；隐私遮蔽也让冷邮件越来越难抵达真正持有人。RFC 10023 把信号放到 `_for-sale.example.com` 的 TXT 记录中。最小有效值以区分大小写的 `v=FORSALE1;` 开始，还可以分别附带自由文本 `ftxt`、联系 URI `furi`、参考价格 `fval` 或经事先约定解释的 `fcod`。

它与域名停放恰好相反。网站可以继续更新，邮箱继续收发，浏览器也不会因为 TXT 记录自动改变页面。只有主动查询这一节点的经纪人、注册商、搜索工具或买家才能看到信号。因此，新 RFC 的真实价值取决于生态采纳：IANA 登记说明命名不再只是私人约定，但并不代表 Chrome、Cloudflare、GoDaddy 或任何市场已经支持，更不代表记录会带来询价。

::: callout TXT 记录不是所有权证书或合同
`fval=USD750` 只是参考报价，发布者没有因此承诺成交；记录可能被劫持、伪造或写入恶意内容。交易仍需独立核验域名控制权、身份、托管、付款与法律条款。
:::

## 解析端的工作比 `dig` 多：所有内容都要按敌意输入处理

RFC 甚至给出语法上可接受的脚本标签例子，提醒实现者不能把“符合格式”误当作“可以直接渲染”。检查器需要对文本做上下文转义，检测 Unicode 双向控制符和同形字，对 URI 限定可接受 scheme，并在离开工具前要求用户确认。数据库写入必须使用参数化查询，价格字段也要保留原始币种和精度，不能把未知格式静默转换成看似权威的金额。

持有人同样要控制隐私与时效。公开 `mailto:` 或电话号码会被自动爬取，最稳妥的联系页应能限速、过滤垃圾信息并避免暴露私人身份。RFC 建议较短 TTL，撤售时没有“not for sale”值，只能删除记录；转让域名时尤其要确认旧报价和链接已经消失。DNSSEC 可以帮助读取器确认响应未在传输链中被篡改，但它只证明记录来自当前签名区，不能证明报价合理、链接无害或发布者拥有完成交易的法律资格。
