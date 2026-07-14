---
title: Telegram 的 t.me 链接一夜从全球 DNS 消失——创作者该补的不是新短链，而是渠道备份
heat: 7 月 13 日晚，Telegram 核心短域名 t.me 的 WHOIS 记录更新并出现 registry 侧的 serverHold，域名不再发布到 DNS；浏览器中的频道、群组、机器人和帖子短链因此全球失效，但 Telegram 客户端与既有会话并未随之整体宕机。截至 7 月 14 日，相关 HN 讨论达 260 分、187 条评论，WHOIS 仍显示 serverHold。必须写清未知项：ICANN 只能确认 serverHold 由域名注册局设置、会让域名停止解析，不能说明本次为什么触发；截至核验时 Telegram、.me 注册局和注册商尚无可核实的公开原因说明，也不能把它直接写成政府封禁、永久停用或 Telegram 服务终结，状态仍可能随时恢复。
window: 48h
competition: 中
publishedAt: 2026-07-14
novelty: 8.5
viral: 9.0
accessible: 9.0
angles:
  - 创作者应急清单向：盘点公众号、网站、邮件、视频简介里所有 t.me 入口，补上自有域名跳转页、邮件列表和第二社群渠道，并标出恢复后如何统一切回
  - 平台风险科普向：为什么 App 还能聊、网页链接却全死？用注册局、注册商、DNS、短链和客户端五层解释这次故障实际坏在哪里
  - 事实核查向：把「已证实的 serverHold」与「未知的触发原因」分开，示范突发平台事故中如何读 WHOIS、查 DNS、找官方声明，避免把推测写成封禁内幕
headlines:
  - Telegram 没宕机，为什么全网 t.me 链接突然都打不开了
  - 一个 serverHold，让创作者多年积累的 Telegram 外链瞬间归零
  - 别把社群入口只押在短链上：t.me 故障后的渠道备份清单
materials:
  - t.me WHOIS 记录（serverHold 状态快照） :: https://www.whois.com/whois/t.me
  - ICANN 官方 · EPP 状态码与 serverHold 解释 :: https://www.icann.org/resources/pages/epp-status-codes-2014-06-16-en
  - dev.ua · 故障范围与客户端仍可用的交叉报道 :: https://dev.ua/en/news/telegram-has-partially-stopped-working-worldwide-tme-short-links-do-not-open
  - Hacker News 讨论（截至 7 月 14 日 260 分 / 187 评论） :: https://news.ycombinator.com/item?id=48897878
---
