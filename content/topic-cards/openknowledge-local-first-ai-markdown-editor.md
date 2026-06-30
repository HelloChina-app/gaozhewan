---
title: 本地优先的 AI 笔记本来了：OpenKnowledge 让 Claude Code 直接读写你硬盘上的 Markdown
heat: YC 投资的文档 AI 创业公司 Inkeep 于 2026-06-27 开源 OpenKnowledge（GitHub：inkeep/open-knowledge，GPL-3.0，发布数日约 444 stars，当前 v0.18.0），同日作为 Show HN 登上 Hacker News 引发讨论。它是一个所见即所得的 Markdown 编辑器，最大不同是内置 MCP server：跑 `ok init` 会自动检测本机的 Claude Code / Codex / Cursor 并写好配置，让 AI agent 把本地整个知识库当作一等文件系统直接读写、数据不经过云端；底层用 yjs 的「双观察者」CRDT 让富文本视图与原始 Markdown 字节级实时同步，团队协作直接用 git/GitHub 做同步层。对中文创作者，这是「AI 帮你管笔记/写作库、但文件始终在自己硬盘上」这条路线里少见的、开箱即用的开源方案。
window: 1 周
competition: 中
publishedAt: 2026-06-30
novelty: 7.5
viral: 7.0
accessible: 7.5
angles:
  - 上手向（写给做知识库/第二大脑的人）：实测「ok init 一行命令把 Claude Code 接进本地笔记库」，给出把选题库、读书笔记、灵感卡片交给 AI 检索与改写的工作流，强调数据不出本地、文件就是普通 .md，随时可迁出。
  - 选型/横评向（写给在 Obsidian、Notion、Logseq 之间纠结又想要 AI 的人）：从「数据归属、AI 集成方式（MCP vs 插件）、协作（git vs 云）、平台支持、License（GPL 的含义）」几个维度，把 OpenKnowledge / Nimbalyst / Obsidian 摆在一起讲清各自适合谁。
  - 避坑/局限向（写给认真要长期用的人）：讲清两个真实限制——CRDT 的 tombstone 让删除内容不会真正清除、超大重度编辑库会有性能/内存增长；原生桌面版仅 Apple Silicon，Windows/Linux/Intel Mac 要用 CLI 跑 Node 24+ 的本地 Web 版。
headlines:
  - 文件还在你硬盘上，AI 已经能改了：OpenKnowledge 上手实测
  - 给 Obsidian 党的新选择：让 Claude Code 直接读写你的本地笔记库
  - Notion 留不住你的数据，这个开源编辑器把 AI 和本地文件焊在了一起
materials:
  - GitHub · inkeep/open-knowledge（GPL-3.0，源码与发布）:: https://github.com/inkeep/open-knowledge
  - Show HN · OpenKnowledge 讨论帖 :: https://news.ycombinator.com/item?id=48675435
  - Tech Times · 发布报道与架构解读 :: https://www.techtimes.com/articles/319223/20260628/open-source-ai-markdown-editor-openknowledge-wires-claude-codex-local-files.htm
---
