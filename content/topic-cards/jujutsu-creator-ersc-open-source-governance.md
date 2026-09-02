---
title: Jujutsu 作者加入 ERSC 做 CTO：3.1 万星开源客户端与商业存储层如何分家
heat: East River Source Control 于 9 月 1 日宣布，Jujutsu（jj）创作者 Martin von Zweigbergk 出任 CTO，负责公司下一代版本控制平台；公司称他从 2019 年的业余项目做起，后来在 Google 全职开发 jj，并会继续担任 Apache-2.0 开源项目的核心维护者。认证 GitHub API 在 Asia/Katmandu 9 月 2 日 05:56 显示 jj 为 31324 星、1193 forks、当天仍有提交；Hacker News 同时为 170 分、136 条评论。ERSC 把产品论点写成“jj 改善笔记本上的版本控制，但远端仍是 Git，规模上来后存储层也要改变”，并称 ERSC Storage 会在 9 月进入 private beta。事实边界必须前置：任命、继续维护与 private beta 都来自公司新闻稿，尚无公开产品、客户、定价、架构基准或可复现实测，不能写成 ERSC 已解决大规模 Git 存储；任命也不保证个人投入比例、未来治理或社区共识不会变化。jj 官方仍提示 1.0 前工作流与磁盘格式可能有不兼容变化，Git submodule 等功能未完成并存在性能问题；Git-compatible 不等于所有 Git host、hook、签名、CI、GUI 和团队流程零成本替换。Apache-2.0 覆盖 jj 代码，不自动覆盖 ERSC 私有服务、品牌、托管数据或未来商业条款。
window: 1 周
competition: 低
publishedAt: 2026-09-02
updatedAt: 2026-09-02
novelty: 8.7
viral: 8.2
accessible: 8.0
angles:
  - 开源与公司边界向：把 jj 客户端、Git remote、ERSC Storage、维护者角色、Apache-2.0 和尚未公开的商业服务画成六格图；公司称“继续维护”是当前承诺，不是不可撤销保证
  - 迁移实测向：在临时镜像仓库比较 Git 与 jj 的 clone、提交、撤销、冲突、并发 workspace、push、CI 和回退，保留 Git 作为真实远端；submodule、签名、hook、GUI 与磁盘格式变化必须进入失败清单
  - 创作者职业路径向：从 2019 side project、Google 内部全职开发到创业公司 CTO，讨论维护者如何把本地工具经验转成存储层产品假设；不要把个人履历神化成产品性能、融资或商业成功证明
headlines:
  - 3.1 万星的 jj 作者去做商业存储层：开源项目会变吗？
  - Jujutsu 改的是你的电脑，ERSC 想改的是远端：一张版本控制分层图
  - 从 side project 到 CTO：开源维护者商业化前要公开的 10 条边界
relatedTopicIds:
  - regent-version-control-for-ai-agents
  - github-stacked-pull-requests-public-preview-boundaries
  - leaving-github-for-forgejo
materials:
  - ERSC 任命原始公告、CTO 职责、继续维护声明与 private beta 计划 :: https://ersc.io/blog/martin-joins-ersc
  - Jujutsu 原始仓库、Apache-2.0、项目状态、未完成能力与 1.0 前变化 :: https://github.com/jj-vcs/jj
  - Jujutsu 官方文档、当前稳定版与 Git 兼容/迁移入口 :: https://jj-vcs.github.io/jj/latest/
  - Hacker News 独立讨论与热度快照（截至 9 月 2 日 05:56 为 170 分 / 136 评论） :: https://news.ycombinator.com/item?id=49525297
---

## 先说结论：这不是“开源被收购”，而是一场客户端、远端与治理责任的分层实验

Jujutsu 的核心价值仍在开源仓库：它兼容 Git 数据模型，尝试用自动记录工作副本、操作日志、可编辑历史和一等冲突对象，减少开发者对暂存区与危险撤销命令的记忆负担。ERSC 的公告提出另一层问题：如果本地体验改变了、AI agent 同时产生更多分支与对象，远端存储和协作服务是否也要换架构？这是值得验证的产品假设，但目前只有公司表述和即将私测的时间表，没有公开基准可以证明答案。

最清楚的内容形式不是人物新闻，而是一张责任图。左边是 Apache-2.0 的 jj 客户端、社区仓库、贡献流程与当前维护者；中间是 Git-compatible remote、对象传输、认证、CI 和现有托管平台；右边才是 ERSC 计划提供的商业存储层、服务等级、数据迁移、定价与支持。把每个承诺放回对应层，读者就不会误以为 CTO 任命改变了 jj 的许可证，也不会误以为开源客户端能说明一家尚未公开 beta 的服务已经成熟。

::: callout “继续维护”要靠可观察治理兑现
公司公告称 Martin 会继续作为 jj 核心维护者，这是当前可引用的承诺。后续应观察 release 频率、review 分布、bus factor、治理文档、路线图决策和公司员工提交比例，而不是只盯个人头衔。社区项目与商业公司可以互相支持，也可能出现优先级冲突；没有数据时不要预判背叛或成功。
:::

迁移实测必须可回退。复制一个不含秘密的真实仓库，在固定 jj 版本下完成 clone、创建 change、拆分、合并、撤销、冲突处理、多个 workspace、推送到 GitHub、触发 CI、再用纯 Git 客户端读取结果。另开清单测试 submodule、LFS、签名提交、hook、IDE、release bot、保护分支和备份恢复。官方已说明 1.0 前仍可能出现工作流与磁盘格式的不兼容变化，所以教程要固定版本、保存 Git 镜像和恢复命令，不能把个人仓库的一周顺滑体验推广成企业迁移结论。

这条信号也适合创作者讨论开源职业路径：side project 可以在大公司获得全职资源，再进入创业公司负责相邻商业层；真正可学的不是“做 3 万星就能当 CTO”，而是长期积累的问题域、用户反馈、兼容约束和维护信誉。把时间线、角色、代码许可、产品假设、未公开事项与后续观察指标全部免费公开。读者可向搞着玩实验室免费提交自己的版本控制痛点和迁移样本；若需要用户自己的仓库诊断、工作流原型或固定范围 MVP，再单独界定付费交付物。
