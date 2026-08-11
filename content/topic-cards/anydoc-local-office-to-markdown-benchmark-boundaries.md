---
title: AnyDoc 让 Office 文件在浏览器本地转 Markdown：14 格式、4.4ms 与无 OCR 边界
heat: Firecrawl 于 8 月 3 日创建并开放 AnyDoc，使用 Rust 将 Word、PowerPoint、Excel、OpenDocument、RTF、EPUB、CSV 和文本型 PDF 转为统一的 GitHub-Flavored Markdown，同时提供 Node.js、Python、WASM 与 CLI；截至 Asia/Katmandu 8 月 11 日 10:05，GitHub 为 13,672 星、696 forks，独立 Reddit 讨论在 8 月 4 日获得约 253 票。仓库自有基准称 100 份真实文档、14 种格式的中位转换时间为 4.4ms、质量分 81，但语料因版权不能再分发，质量由 Claude Sonnet 5 对文档前六页截图进行 LLM judging，速度还排除了部分进程启动成本，因此不能当作独立、公平或适用于所有文件的结论。AnyDoc 不做 OCR，图片型 PDF 会返回 unsupported；嵌入图片只保留 alt text 与原始字节，不自动理解图中文字。加密文件、宏、复杂公式、图表语义、版式像素级还原和恶意压缩包都需单独验证，MIT 代码许可也不等于输入文档与导出素材可自由再发布。
window: 1 周
competition: 中
publishedAt: 2026-08-11
updatedAt: 2026-08-11
novelty: 8.8
viral: 9.4
accessible: 9.6
angles:
  - 创作者资料库向：用浏览器 WASM 把采访提纲、客户 PPT、表格和 EPUB 在本地转成 Markdown，再接入检索或写作工作流；必须实测中文标题、合并单元格、脚注、演讲者备注和旧版二进制格式，说明“文件不离开浏览器”只适用于本地 demo，后续上传给模型仍会改变隐私边界
  - 真实基准复现向：公开一套可再分发的中文测试集，与 MarkItDown、Pandoc、LibreOffice、Docling 做冷启动与热启动对比，分别评分文本完整性、表格结构、格式和清洁度；官方 4.4ms 与 81 分是项目方基准，语料不公开且使用 LLM judge，不能剪成“比所有转换器快 250 倍且质量最好”
  - 安全与版权向：演示加密文档、图片型 PDF、宏、外链图片、超大压缩包和恶意文件时在隔离环境运行，设文件大小、解压深度与节点数上限；转换成功只改变格式，不消除合同、出版物、品牌素材、个人数据和嵌入图片的版权与保密义务
headlines:
  - 13,672 星的 AnyDoc，能否把你的 Office 素材安全喂给 AI
  - Word、PPT、Excel 本地转 Markdown：4.4ms 背后有哪些没算进去
  - 不上传文件也能转 Markdown，但 AnyDoc 仍读不了这类 PDF
relatedTopicIds:
  - diataxis-four-documentation-modes-resurfaced
  - freeink-open-ereader-stack-chinese-test
  - openworker-local-desktop-agent-beta-boundaries
materials:
  - AnyDoc 原始仓库、格式支持、WASM 本地 demo、内部基准方法与 MIT 许可 :: https://github.com/firecrawl/anydoc
  - AnyDoc 浏览器端 WASM 官方演示 :: https://firecrawl.github.io/anydoc/
  - Firecrawl Parse 官方产品页，用于区分本地解析与托管 OCR :: https://www.firecrawl.dev/parse
  - Reddit 独立讨论与热度快照（8 月 4 日约 253 票） :: https://www.reddit.com/r/AIDeveloperNews/comments/1vfhqjh/firecrawl_just_opensourced_anydoc_a_new_rustbased/
---

## 先说结论：AnyDoc 解决的是“结构化文本入口”，不是万能文档理解

内容团队把 Word、PPT、Excel、EPUB 和 PDF 接入 AI 工作流时，最大的摩擦往往不是模型，而是每种格式都要换一套转换器。AnyDoc 用 Rust 为多种 Office 与开放文档格式分别解析，再汇入同一个文档模型和 Markdown 序列化器。这样标题锚点、列表编号、表格转义、脚注、演讲者备注与嵌入资产可以在不同格式之间采用一致规则。Node.js 在 libuv 线程池运行，Python 释放 GIL，浏览器版则通过 WebAssembly 在本地处理文件，适合做不经服务器的快速预览。

官方基准很吸睛：100 份真实文档、14 种格式，中位转换 4.4ms，综合质量分 81。但这个数字必须连同方法一起展示。测试语料不能公开再分发；质量评估只取前六页，由 Claude Sonnet 5 盲评输出与 LibreOffice 渲染截图；不同工具支持的格式集合不同，速度测试也对库与 CLI 采用不同的启动成本处理。它是一个可审计的项目方基准，不是第三方定论。真正面向中文创作者的测试还需要补上中文字体、竖排、合并单元格、批注、复杂公式、图表和超长文档。

::: callout 本地转换不包含 OCR
AnyDoc 能处理有文本层的 PDF，但图片型扫描 PDF 会被判定为不支持。嵌入图片可以保留字节和元数据，却不会自动读图中文字；需要 OCR 时，必须另接本地 OCR 或明确告知文件会上传到托管服务。
:::

## 最实用的内容，是画清“文件从哪里到哪里”

一个可信教程应把流程拆成四段：原始文件进入浏览器或本地 CLI、解析为统一文档模型、序列化为 Markdown、最后才决定是否送入检索库或云端模型。前两段可以完全离线，不代表第四段也离线。应使用测试文件展示输出差异，检查是否遗漏工作表、备注、隐藏文本、公式结果、附件与外链图片，并在任何后续上传前让用户再次确认。

安全上也不能把解析器当普通字符串函数。老旧 Office 二进制、ZIP 容器、畸形 XML 与压缩炸弹都属于不可信输入。AnyDoc 已定义解压、嵌套和节点数量等资源限制错误，但部署者仍要在隔离进程中设 CPU、内存、文件大小和超时上限。版权上，MIT 只许可 AnyDoc 自身代码；客户合同、付费电子书、论文图表和品牌 PPT 转成 Markdown 后仍受原有权利约束。把这些边界写清，AnyDoc 才会从“爆火仓库”变成真正可用的创作者基础设施。
