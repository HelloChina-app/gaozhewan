---
title: 能塞进本地机器的编程 agent 模型：阿里通义开源 Qwen3-Coder-Next
heat: 阿里通义（Qwen）推出并开源 Qwen3-Coder-Next——一个专为「编程 agent + 本地开发」设计的开源权重模型，采用 Apache-2.0 许可。它建立在 Qwen3-Next-80B-A3B-Base 之上：80B 总参数、约 3B 激活（A3B）的 MoE 架构，配合 hybrid attention（混合注意力）设计，主打小激活、可本地部署的路线；官方称它经过大规模「可执行任务合成 + 环境交互 + 强化学习」的 agentic 训练，目标是把多步任务完成、工具调用准确率这类「agent 真正干活」的能力做扎实。在多篇 2026 年的开源编程模型盘点里，它被列为面向 agentic coding 的小型混合模型代表之一。它改变的是「想跑一个能自己写代码、调工具的 agent，就得连闭源云端 API」的默认路径——对预算敏感、要数据留在本地的中文独立开发者，多了一个开源、可自托管的编程 agent 底座。（抓取于 2026-07-04；具体基准分、上下文长度与实际中文/本地部署体验待实测核验，勿引用未经核实的跑分。）
window: 1 周
competition: 中
publishedAt: 2026-07-04
novelty: 7.5
viral: 7.0
accessible: 6.0
angles:
  - 上手/本地部署向（写给想「白嫖」本地算力的独立开发者）：实测把 Qwen3-Coder-Next 接进一个开源 coding agent（如 OpenCode/Cline 等）跑真实任务，讲清 80B-A3B 这种「大参数小激活」在消费级/入门服务器上的可行性、速度与吃显存的真实感受。
  - 选型/横评向：把它放进「本地可跑的开源编程模型」这条线里对比——同为 agentic coding，它和 GLM-5.2、Kimi K2.7 Code、MiniMax M3 各自的定位、许可证与部署门槛差在哪，帮读者按「要不要本地、要不要 Apache 商用」来选。
  - 趋势解读向：从「阿里把编程 agent 模型直接开源 + 走小激活本地路线」看国产开源模型的策略——为什么 agent 时代大家都在拼「能不能塞进你自己的机器」，对中文创作者意味着什么。
headlines:
  - 80B 总参、只激活 3B：通义把编程 agent 模型塞进你的本地机器
  - 想要一个不连云端也能写代码的 agent？试试开源的 Qwen3-Coder-Next
  - 国产开源又出手：Apache-2.0 的 Qwen3-Coder-Next 到底适合谁本地跑
materials:
  - Qwen 官方博客 · Qwen3-Coder-Next: Pushing Small Hybrid Models :: https://qwen.ai/blog?id=qwen3-coder-next
  - MindStudio · The Best Open-Source LLMs for Agentic Coding in 2026 :: https://www.mindstudio.ai/blog/best-open-source-llms-agentic-coding-2026
---
