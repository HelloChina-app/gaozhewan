---
title: Gemini Robotics 2 能走、抓、协作，但五指任务最低只有 32%：先看早期访问边界
heat: Google DeepMind 于 7 月 30 日发布 Gemini Robotics 2 家族：Robotics 2 VLA 负责全身与双臂动作，ER 2 负责数分钟任务规划和多机器人协作，On-Device 2 可在机器人本地运行并用通常少于 200 个样本、数小时数据适配新机体；截至 Asia/Katmandu 7 月 31 日 08:05，Hacker News 为 481 分、396 条评论。所有能力和数字目前主要来自 Google 自己的演示与评测，不能写成独立复现或量产可靠性：官方图表中五指任务从扫帚簸箕 32%、拧灯泡 36%、扎垃圾袋 44%、封 Ziplock 40% 到旋出灯泡 92%，公司也承认多指灵巧与移动速度仍具挑战。ER 2 可在 AI Studio 试用，但 VLA 与 On-Device 模型只向 early-access partners 开放；安全报告明确不评估合规部署所需的认证硬件、冗余和实时保证，并显示没有模型同时达到接近零漏停与零误停，因此不能把“最安全版本”写成可取消急停、限力、围栏或人工接管。
window: 72h
competition: 高
publishedAt: 2026-07-31
updatedAt: 2026-07-31
novelty: 9.7
viral: 9.6
accessible: 7.8
angles:
  - 演示验数向：逐帧拆解走路、下蹲、双手操作和多机器人协作，再把视频能力映射到官方成功率与失败项；必须标出 Google 自测、任务定义、early access 和没有公开独立复现，不能用最佳片段代表连续家庭劳动
  - 中文机器人开发者向：区分可在 AI Studio 调用的 ER 2、负责电机动作的 VLA 和本地 On-Device 2，解释少于 200 个样本是官方典型适配口径而非任何中国机械臂都能即插即用；硬件接口、数据授权、算力、延迟与语言适配仍需实机验证
  - 物理 AI 安全向：用安全报告里的漏停/误停权衡说明语义模型为什么不能取代急停、速度/力限制、区域监控和认证控制器；99% 人体检测与 96% 安全姿态切换来自实验室场景，报告又明确排除完整 functional safety，标题不能写“机器人已安全进入家庭”
headlines:
  - Gemini Robotics 2 会全身干活了？先看 32% 到 92% 的五指任务成绩
  - 一套模型迁移多种机器人，Google 的“数小时适配”还缺哪些实机证据
  - 最安全版本也不能拆急停：读懂 Gemini Robotics 2 的安全报告
relatedTopicIds:
  - bytedance-seed-2-1-agent-model
  - nvidia-cosmos-3-open-world-model
  - statewright-state-machines-reliable-agents
materials:
  - Google DeepMind 原始发布、三模型分工、公司评测与访问范围 :: https://deepmind.google/blog/gemini-robotics-2-brings-whole-body-intelligence-to-robots/
  - Gemini Robotics 2 官方安全评测、功能安全排除项与漏停/误停权衡 :: https://storage.googleapis.com/deepmind-media/gemini-robotics/Gemini-Robotics-2-Safety.pdf
  - Gemini Robotics ER 2 官方 Model Card :: https://deepmind.google/models/model-cards/gemini-robotics-er-2/
  - Hacker News 独立讨论与热度快照（截至 7 月 31 日 08:05 为 481 分 / 396 评论） :: https://news.ycombinator.com/item?id=49111237
---

## 先说结论：进步在“同一个智能层统筹身体”，不是机器人已经能稳定包办家务

Gemini Robotics 2 把三个过去常被分开演示的问题放到一起。ER 2 看图、听懂要求、把几分钟任务拆成步骤并与人沟通；Robotics 2 把语言和视觉计划转成全身、双臂、手指或夹爪动作；On-Device 2 则为断网、低延迟场景提供本地 VLA。官方展示 Apollo 2 走到桌前拿起物体、弯腰放进低层架，也展示两台不同机器人分工整理房间，以及同一 checkpoint 控制不同手和夹爪。

对内容创作者最重要的不是重复视频，而是把成功率放回画面。Google 的图表显示，标准双指夹爪在部分拣选、装配任务上达到中高成功率；五指手的波动明显更大，扫帚簸箕只有 32%，拧灯泡 36%，扎垃圾袋 44%，封 Ziplock 40%，旋出灯泡则有 92%。这说明“能做过”与“每次都能做”是两回事，绳结、柔性袋和接触丰富的动作仍是难点。官方也承认移动速度与人类级精细操作还需提高。

::: callout 普通开发者拿不到完整动作模型
ER 2 已进入 Google AI Studio，Enterprise 平台仍是 private preview；真正输出机器人动作的 VLA 与 On-Device 2 只开放给 early-access partners。现在可以研究接口和模型卡，不能承诺读者用 API key 就能复刻完整人形机器人演示。
:::

## “本地运行”和“安全评测”都不能省略系统边界

On-Device 2 的亮点是跨机体适配。官方称对新的双臂机器人，通常用少于 200 个示例、数小时数据即可适配；这比从头收集大规模演示更有吸引力，但仍是公司在选定平台与任务上的口径。传感器标定、控制频率、末端执行器、碰撞模型、算力、中文指令和故障恢复都会改变结果。除非有独立团队在公开协议下复现，不能把它推广成“任何机器人半天学会家务”。

安全报告反而给了最值得写的边界。它强调急停、围栏、速度/力限制等传统保护仍不可少，并明确没有评估认证硬件、冗余和实时系统保证。在人体接近测试里，降低漏停会带来更多误停，降低误停又可能漏掉真正危险，没有模型进入两者都接近零的理想区。实验室的 99% 人体检测和 96% 安全姿态切换可以说明进展，却不能代替完整风险评估。好的中文报道应把智能规划、动作能力与合规安全分成三层，既不否认突破，也不把精剪演示提前写成消费级家用产品。
