---
title: 公众号排版终于「一键化」了——两位中文作者开源的 gzh-design-skill，让 AI 把 Markdown 排成不掉格式的公众号 HTML
heat: GitHub 搜索 API 实测：7 月 1 日创建、8 天 1542 星，冲进近两周新仓库星标榜前八；由公众号作者「甲木 × 摸鱼小李」联名开源，把「Markdown → 可直接粘贴进公众号编辑器的 HTML」做成任何 coding agent（Claude Code / Codex / Cursor，国产模型也行）都能跑的 Agent Skill——公众号排版从「买第三方编辑器」变成「让 AI 自己排」。
window: 72h
competition: 低
publishedAt: 2026-07-09
novelty: 7.5
viral: 8.0
accessible: 9.5
angles:
  - 实测向：拿自己一篇旧文让它重排，6 套主题横评 + 前后对比图——公众号博主人人可写、素材就是自己的文章
  - 教程向：写给不会代码的公众号作者的「第一个 Agent Skill」安装课，顺带把 Agent Skill 是什么讲明白（npx 一行装好）
  - 观察向：约束优于自由、质量靠校验脚本不靠模型自觉——从这个项目的设计哲学，看 Agent Skill 正在怎么吃掉传统排版编辑器的蛋糕
headlines:
  - 公众号排版神器开源了：写完 Markdown，AI 一键排出不掉格式的 HTML
  - 8 天 1500 星：两位公众号作者做的排版 Skill，可能改变你的日更方式
  - 别再手动排版了——我让 Claude Code 给公众号排了一周版，聊聊这个开源项目
materials:
  - GitHub 仓库（gzh-design-skill） :: https://github.com/isjiamu/gzh-design-skill
---

公众号排版是中文创作者独有的高频痛点，此前被第三方编辑器（135、秀米等）垄断。这个项目把排版逻辑沉淀成组件库 + 双关卡校验脚本，模型只做装配，换模型不走样；AGPL-3.0 联名开源。对「搞着玩」读者是罕见的「今天装、今天用、今天就能写」选题。
