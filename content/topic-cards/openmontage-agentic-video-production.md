---
title: OpenMontage：把你的 Claude Code 变成一整个「视频制作厂」的开源项目
heat: calesthio/OpenMontage 自称「世界首个开源、agentic 的视频制作系统」，2026-06-20 冲到 GitHub Trending 第 1，06-25 当日新增约 +3719 stars（据 StartupCorners 趋势榜，为当天涨幅最高项目之一）。它不是又一个剪辑软件，而是把 Claude Code / Cursor / Copilot / Windsurf / Codex 这类 AI coding assistant 直接改造成视频制作工作室：内置 12 条 pipeline、52 个工具、500+ agent skills，你用大白话描述想要的视频，agent 就自动完成调研 → 写脚本 → 生成素材 → 剪辑 → 合成。写脚本前它会先去 YouTube、Reddit、Hacker News、新闻站和学术源检索、并在结构化 research brief 里逐条引用来源。素材链路可全免费本地跑（Piper TTS + FFmpeg + Remotion + Archive.org/NASA/Wikimedia 公共素材），也可接付费云服务（FLUX、Kling、Runway、ElevenLabs、Suno）。协议为 AGPLv3。
window: 72h
competition: 中
publishedAt: 2026-07-01
novelty: 8.5
viral: 8.5
accessible: 7.0
angles:
  - 实操向（写给做视频/口播的中文创作者）：跑一遍「全免费本地链路」（Piper + FFmpeg + Remotion + Archive.org 素材），把一个选题从一句话做到成片，记录每一步 agent 干了什么、卡在哪、成片能不能用——一篇真实的上手实测比任何介绍都值钱。
  - 认知向（写给关心「AI 怎么重构创作流程」的人）：拆解它的 pipeline / 52 工具 / 500+ skill 架构，讲清「把视频制作拆成可被 agent 调度的技能」这套思路，和传统剪辑软件、和一键生成视频的黑箱工具有什么本质区别。
  - 避坑/合规向：讲 AGPLv3 对商用意味着什么、免费本地链路 vs 付费云（Kling/Runway/ElevenLabs）的画质与成本取舍，以及「agent 自动抓 YouTube/Reddit 当素材」在版权上要注意的边界。
headlines:
  - 一句话生成一整条视频：把 Claude Code 变成视频厂的开源项目 OpenMontage
  - 12 条 pipeline、500+ 技能：GitHub 冲榜第一的 agentic 视频系统实测
  - 从调研到成片全自动、还能全免费本地跑：OpenMontage 到底能不能用
materials:
  - GitHub · calesthio/OpenMontage :: https://github.com/calesthio/OpenMontage
  - OpenMontage · AGENT_GUIDE.md（pipeline / 工具 / skill 说明） :: https://github.com/calesthio/OpenMontage/blob/main/AGENT_GUIDE.md
  - StartupCorners · GitHub Trending June 25 2026（当日 +3719 stars 数据来源） :: https://startupcorners.com/digest/devtools-digest-2026-06-25
---
