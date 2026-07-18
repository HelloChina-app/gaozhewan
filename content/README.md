# Content

内容现在是**文件驱动**的：新增一个 Markdown 文件就能发文章或选题卡，不需要改任何代码。
应用在 `lib/content.ts` 里通过 `lib/markdown.ts` 解析器读取这些文件并静态生成页面。

## 目录结构

- `posts/*.md`：免费全球信号文章。文件名即 slug（URL）。
- `topic-cards/*.md`：搞选题 Pro 选题卡。文件名即 id。
- `templates/post.md`、`templates/topic-card.md`：新建内容时复制这两个模板。
- `seed-backlog.md`：首批内容抓取方向、入选标准和不发布标准。
- `_drafts/`：`npm run signals` 抓取生成的草稿，**不会被发布**，已被 git 忽略。

工具库（tools）是缓慢变化的目录，仍维护在 `lib/content.ts` 中。

## frontmatter 写法

- 普通字段：`key: 值`
- 列表字段：`key:` 换行后每行 `  - 内容`
- 带链接的字段（sources / materials）：`  - 名称 :: https://链接`
- 分数：`novelty` / `viral` / `accessible` 三个 0–10 的数字

## 正文写法（仅 posts 需要）

- `## 小标题` → 小标题
- `- 列表项` → 列表
- 普通段落直接写
- 高亮框：

  ```
  ::: callout 标题
  正文
  :::
  ```

## 每日流程

这个站点设计成可以完全由 AI 自动跑：从抓取信号到产出选题卡，每一步都能交给 Claude 定时任务完成（见 `daily-signal-draft` 定时任务）。

完整闭环（`抓取 → 草稿 → 成卡`）：

1. **抓取**：`npm run signals`（或定时任务用网页抓取做兜底），从 Hacker News、GitHub 拉真实候选信号，写到 `content/_drafts/<日期>/`，frontmatter 里角度/标题/分数/时效全是 TODO 占位。
2. **成卡**：把每条草稿补全成正式选题卡——这是编辑判断，AI 可代劳但用真实事实，不编造数据。五步：
   - 标题改写：仓库/帖子原名 → 一个中文选题角度。
   - heat：一句话写清「在哪火 + 热度数字 + 它改变了什么」，数字来自真实抓取。
   - window / competition：定时效窗口和竞争度。
   - 搞着玩指数：给 novelty / viral / accessible 三个 0–10 分。
   - 写 3 个角度 + 3 个标题，materials 填真实链接。
3. **发布**：补全的文件放进 `topic-cards/`（或据此写一篇 `posts/` 文章），删掉对应草稿。
4. **分发**：正式选题卡会自动进入首页、选题工作台、独立详情页、sitemap 和 RSS；来源链接保持公开可核验，写作角度与标题模板继续由 Pro 解锁。
5. **校验**：`npm run check:content` 通过后提交部署。

### 两个真实例子（2026-06-17 抓取）

- `topic-cards/lazy-ai-agent-ponytail.md`：来自 GitHub 仓库 ponytail（2.7 万星）。标题改写成「AI 编程的新共识：最好的代码是你没写的代码」，传播潜力打 8.6，给了观点 / 实测 / 趋势三个角度。
- `topic-cards/on-device-tool-calling-needle.md`：来自 Hacker News 帖子 Needle（637 分）。标题改写成「端侧 AI 新方向：26M 小模型也能干好工具调用」，新奇度打 8.3，materials 同时保留仓库和 HN 讨论链接。

对照看 `_drafts/` 里同源的占位草稿，就能明白「补全」具体补了什么。
