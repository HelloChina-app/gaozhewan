---
title: Mistral 的训练退出不是一个总开关：Vibe、API 与反馈要分开检查
heat: Mistral 本周更新数据治理帮助页，明确普通 Vibe 用户的输入输出默认可用于训练、可自行退出，Vibe Enterprise 则默认退出；Vibe 与 Mistral Studio/API 的退出开关彼此独立，关闭一处不会自动关闭另一处，上传文档也算输入数据。截至 Asia/Katmandu 2026-09-03 06:07，相关 Hacker News 讨论为 359 分、155 条评论。边界必须前置：帮助页描述的是当前产品设置，不等于历史数据自动删除、零数据保留或所有第三方接入都遵循同一规则；反馈渠道另有处理，官方提醒不希望反馈数据被用于改进时不要提交带评论的赞/踩。产品名称、套餐默认值和控制入口可能继续变化，发布前应按当日账号与合同复核，不能把“可退出”简化成“默认不训练”。
window: 1 周
competition: 中
publishedAt: 2026-09-03
updatedAt: 2026-09-03
novelty: 8.8
viral: 8.6
accessible: 9.4
angles:
  - 三分钟自查向：分别截图核对 Vibe 网页、Vibe 手机端与 Studio/API 的数据开关，再单列反馈、上传文件、第三方工具和历史数据；不给读者一个虚构的“一键全关”结论
  - 创作者工作流向：按公开草稿、客户未发布素材、合同与账号秘密三档给出上传边界，说明退出训练、删除记录、零数据保留和本地处理是四个不同问题
  - 产品文案核验向：对比普通 Vibe 默认参与、Enterprise 默认退出和 Studio 不同计费模式的说明，教团队把“默认值、可选项、适用产品、更新时间”写进采购与隐私清单
headlines:
  - 关掉一个开关还不够：Mistral 的 Vibe 和 API 要分别退出训练
  - 你上传的文档也算训练输入？三分钟查清 Mistral 当前设置
  - “可以退出”不等于“默认不训练”：AI 工具隐私文案最容易漏的四层
relatedTopicIds:
  - encrypted-reasoning-traces-leak-disclosed-boundaries
  - fastmail-eu-data-region-not-eu-only
  - chatto-open-source-self-hosted-chat
materials:
  - Mistral 官方退出训练步骤与分离开关说明 :: https://help.mistral.ai/en/articles/455207-can-i-opt-out-of-my-input-or-output-data-being-used-for-training
  - Mistral 官方各产品与套餐默认训练规则 :: https://help.mistral.ai/en/articles/347617-do-you-use-my-user-data-to-train-your-artificial-intelligence-models
  - Hacker News 独立讨论与热度快照 :: https://news.ycombinator.com/item?id=49535284
  - Mistral 官方 GDPR 权利、删除与退出入口 :: https://help.mistral.ai/en/articles/347639-how-can-i-exercise-my-gdpr-rights
---

## 先说结论

这条选题真正有用的地方，是把“我的内容会不会被拿去训练”从一句营销口号改成一张可以逐项勾选的表。Mistral 当前帮助页明确区分 Vibe、Vibe Enterprise、手机端、Studio/API 与反馈渠道。普通 Vibe 的输入输出默认可用于训练，用户可以退出；Enterprise 默认退出，由管理员控制是否加入。Vibe 的开关与 Studio/API 的 Anonymous improvement data 开关互不联动，所以只关闭聊天产品并不能证明 API 请求也已退出。

## 上传文件与反馈为什么容易漏

官方把 Vibe 中附加或上传的文档同样视作输入数据。这对创作者尤其重要：脚本、报价单、未发布视频字幕、客户邮件和研究笔记，往往不是在聊天框里手打，却仍进入同一处理边界。手机端还使用另一条设置路径，需要在 Account 下的 Data & Account Controls 关闭 Enable data sharing。团队若同时用网页、手机和 API，应按实际账号逐处核对，而不是转发一张别人界面的截图。

反馈又是单独一层。Mistral 的说明指出，带评论提交赞或踩会授权其使用评分、输入和输出改进行为；不希望这类数据被使用时，官方建议不要提交反馈。退出常规训练后仍随手把敏感失败案例塞进反馈框，会破坏团队原先的假设。最稳妥的做法是先把案例去标识化，再决定是否反馈。

## 四个概念不能混写

退出训练表示后续不再把输入输出用于训练目的，但它不自动等于删除账号与历史记录，也不等于 Zero Data Retention，更不证明第三方客户端、网关或插件没有自己的日志。删除、保留期限、训练用途和传输链路是四个问题，应分别查看产品设置、隐私政策、数据处理协议以及你实际使用的中间服务。企业合同可能给出更强承诺，也不能反推普通个人账号默认相同。

给内容团队的最低操作线可以很简单：公开资料允许进入常规工具；未发布但不敏感的草稿先确认训练和保留开关；合同、身份、付款、密钥及受保密约束的客户素材优先去标识化或留在本地。每次产品改名、套餐迁移或管理员变更后重新检查，并把截图日期和账号类型记入项目记录。

## 创作者可以直接复制的简报

“请基于 2026 年 9 月当日的 Mistral 官方帮助页，制作一张 Vibe 网页、手机端、Enterprise、Studio/API、反馈、上传文件、删除与 ZDR 的对照表。每格只写默认状态、退出路径和未覆盖事项；用一个虚构脚本项目演示风险，不上传真实客户资料。标题不得写成 Mistral 已默认停止训练，也不得把退出训练等同删除历史数据。”

这张清单及全部来源可免费复用，也欢迎向搞着玩实验室免费提交你遇到的界面差异；若需要针对你自己的业务做隐私诊断、原型或固定范围 MVP，再单独约定范围。
