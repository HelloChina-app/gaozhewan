---
title: QM 5215 星：把团队智能体做成多人工作空间，但官方安全文档先列出 13 类缺口
heat: yc-software 于 7 月 29 日创建 QM，定位为面向创业团队的“multiplayer agent harness for work”；截至 Asia/Katmandu 8 月 2 日复核时，GitHub 已有 5215 星、534 forks，Hacker News 讨论为 650 分、152 条评论。它让每个人和每个房间拥有独立 memory、文件、keychain 视图、权限、定时任务、Web app 与持久沙箱，可在 Slack 和网页使用，并允许 Pi、OpenCode、Codex、Claude Code 等不同 harness 驱动同一核心。限制必须前置：官方 SECURITY.md 明确称其为早期实验软件，隔离设计不是防泄漏承诺、认证或部署安全审查的替代；QM 不是加固过的公共多租户边界，命令策略可绕过，浏览器动作不经过部分核心审批，使用中的沙箱凭据为明文，自动内容筛查不完整，管理员可读敏感内容，持久数据可能无限期累积。部署还要求组织自有 Fly.io 或 AWS、身份邮件配置、模型/浏览器提供商与运维能力；GitHub 星数和 YC 背景不能证明中文团队已在生产验证成本、安全、准确率或权限隔离。
window: 1 周
competition: 高
publishedAt: 2026-08-02
updatedAt: 2026-08-02
novelty: 9.0
viral: 9.3
accessible: 7.4
angles:
  - 中文内容团队沙盘向：只用公开资料搭一个编辑部沙盒，让不同成员和项目各自检索、起草、审校并发布到测试站，验证个人 scope、共享 room、记忆继承、人工审批和审计记录是否真的阻止串库与越权
  - 安全事实核查向：逐条复现官方 SECURITY.md 的已知限制，重点测命令策略绕过、浏览器动作、提示注入、明文凭据、管理员读取、持久数据删除与 capability link；“有审批”只代表人看过展示动作，不等于结果安全
  - 成本与运维向：核算 Fly.io 或 AWS、Postgres、对象存储、邮件登录、Slack、浏览器服务和多模型 token 的完整账单，再与一个共享聊天机器人或人工 SOP 比较；项目没有生产部署工作流，也没有足够第三方长期案例证明复杂度一定值得
headlines:
  - 让全公司共用一个 AI，难点不是聊天而是权限：QM 的 scope 设计值得抄吗
  - 5215 星 QM 实测前先读 SECURITY.md：官方自己列了哪些不能保证的事
  - Slack、网页、多模型和持久沙箱全装上，团队智能体的真实成本怎么算
relatedTopicIds:
  - openworker-local-desktop-agent-beta-boundaries
  - everything-claude-code-agent-harness-os
  - statewright-state-machines-reliable-agents
materials:
  - QM 原始仓库、架构、功能、部署方式与 MIT 许可 :: https://github.com/yc-software/qm
  - QM 官方安全策略、威胁模型与已知限制 :: https://github.com/yc-software/qm/blob/main/SECURITY.md
  - QM 官方组织部署指南、Fly.io 或 AWS 与邮件身份要求 :: https://github.com/yc-software/qm/blob/main/docs/getting-started.md
  - Hacker News 独立讨论、质疑、用例与热度快照 :: https://news.ycombinator.com/item?id=49126604
  - Reddit 社区独立讨论与“仍缺第三方长期案例”的争议 :: https://www.reddit.com/r/myclaw/comments/1vcjl0u/yc_just_opensourced_its_own_openclaw_built_for/
---

## 先说结论：QM 在解决“谁的 AI、能看什么、能替谁做事”

个人智能体进入团队后，真正麻烦的不是再接一个模型，而是身份、上下文和副作用。QM 为每位成员与每个 Slack 房间或项目建立独立 scope，各自持有 memory、文件、凭据视图、定时任务、Web app 和持久沙箱；需要协作时再通过共享房间和授权把能力拼起来。底层 harness 也可替换，Pi、OpenCode、Codex 与 Claude Code 都能驱动同一个核心，这使“团队的工作状态”不必完全锁死在一家模型厂商里。

这套架构对中文内容团队很有想象力。选题组可以读取公共信号，作者拥有自己的草稿空间，编辑在共享 room 里审校，运营只拿到测试发布权限；定时任务还可以监控链接失效或数据更新。但想象力不是生产证据。仓库创建仅数日，星数快速增长，第三方讨论仍在追问它相对现有 agent、共享机器人和人工流程究竟提供了多少独特价值。部署不是下载一个桌面应用，还要准备 Fly.io 或 AWS、数据库、对象存储、身份邮件、模型和可能的浏览器服务，并承担持续账单与值班责任。

::: callout 隔离目标不等于安全保证
QM 官方明确写道，它是早期实验软件，不是加固过的公共多租户边界；安全文档列出的限制包括可绕过的命令策略、部分浏览器动作绕过核心门、使用中凭据明文、启发式提示注入筛查、管理员可读敏感内容和无到期时间的文件制品。
:::

## 中文团队应先做“假数据红队”，再谈接邮箱和生产系统

首轮测试可以只放公开稿件与伪造联系人，让三个账号分别扮演作者、编辑和运营。尝试在个人 scope 读取别人的草稿，在共享房间诱导 agent 泄露私有 memory，用网页内容做提示注入，让浏览器执行未再次审批的动作，并检查日志能否还原“谁授权了什么”。随后测试删除账号、撤销授权、轮换凭据和清理制品，观察持久数据是否真的消失。只有这些都能被团队理解和运维，才值得接入真实 Slack、邮箱、云盘或生产仓库。

还要把“审批”拆开看。人类点击允许，只证明接受了当时界面展示的动作，不保证脚本、浏览器页面或模型后续行为安全；审计日志能帮助追责，也不能阻止泄漏。QM 最值得写的角度不是“YC 开源了公司版 OpenClaw”，而是它把多用户 agent 的组织层问题具体化了，同时用一份异常坦率的安全文档告诉团队：权限、凭据、浏览器、数据生命周期与运维，仍然需要自己负责。
