---
title: 「让 agent 写代码而不是吐 JSON」——用 smolagents 把 code-agent 这件事讲给中文读者
heat: Hugging Face 的 smolagents 是一个极简（核心逻辑约 1000 行 Python）的开源 agent 库，主张让 agent「用代码思考」：它的 CodeAgent 直接写并执行 Python 代码片段来调用工具，而不是生成 JSON / 文本格式的工具调用。官方说法是，相比传统 tool-calling，这种 code-agent 路线能减少约 30% 的步骤与 LLM 调用，并在复杂基准上表现更好；同时保留 ToolCallingAgent 兼容 JSON 调用，并支持经 E2B / Docker / Modal 等做沙箱执行。这是理解 2026 年「agent 改成写代码」这股范式转变最易上手的切口之一。
window: 1 周
competition: 中
publishedAt: 2026-06-22
novelty: 6.0
viral: 6.0
accessible: 8.5
angles:
  - 科普解释向（写给刚接触 agent 的人）：用最少术语讲清「为什么 2026 年的 agent 开始写代码而不是吐 JSON」——code-agent 和 tool-calling 的差别、为什么前者能少调几次模型，配一个 20 行能跑的最小例子。
  - 动手向：写一篇「1000 行库也能干活：用 smolagents + 本地/便宜模型搭一个会查资料、会算数的小 agent」，重点是「极简、可读、能在自己机器上沙箱跑」。
  - 安全/工程向：聊 code-agent 的真问题——让模型直接执行 Python 的风险，以及 E2B / Docker 沙箱怎么兜底，给想上生产的人一份现实提醒。
headlines:
  - 为什么 2026 年的 AI agent 都改成「写代码」了？用 smolagents 讲明白
  - 核心就 1000 行：smolagents 把「会写代码的 agent」做到了极简
  - 少调 30% 次模型：code-agent 路线到底强在哪，又危险在哪
materials:
  - GitHub · huggingface/smolagents（think in code）:: https://github.com/huggingface/smolagents
  - Hugging Face 博客 · Introducing smolagents :: https://huggingface.co/blog/smolagents
---
