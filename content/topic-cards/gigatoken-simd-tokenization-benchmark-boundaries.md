---
title: GigaToken 把分词推到 GB/s：1000 倍不是所有工作负载的通行证
heat: GigaToken 作者把 SIMD、预分词专用实现、缓存和减少 Python/线程通信组合成 Rust 分词器，项目 README 在双路 AMD EPYC 9565 上以 11.9 GB OpenWebText 测得 GPT-2 24.53 GB/s，并报告相对 Hugging Face Tokenizers 989 倍；Apple M4 Max 的 GPT-2 项目自测为 8.79 GB/s、1268 倍。截至 Asia/Katmandu 7 月 23 日复核时，Hacker News 讨论为 408 分、81 条评论，认证 GitHub API 显示仓库 1326 星、47 forks。事实边界必须前置：这些数字来自作者自测而非独立基准，而且 GigaToken 读取完整 11.9 GB 文件，Hugging Face 和 tiktoken 对照分别只取预切分的前 100 MB 与 1 GB；作者解释未缓存的对照吞吐应近似均匀，但不同 I/O、文本分布、批大小和机器仍需重测。接近 1000 倍主要出现在最快原生 API 与部分 BPE 词表，兼容模式会付出性能成本，SentencePiece 提升明显较小、WordPiece 尚不支持，Windows 测试不足且作者建议优先用 WSL；仓库没有正式 Release，不能直接写成生产可无风险替换。
window: 72h
competition: 中
publishedAt: 2026-07-23
updatedAt: 2026-07-23
novelty: 9.2
viral: 8.8
accessible: 8.4
angles:
  - 中文模型数据工程向：用同一批简体、繁体、代码和中英混合语料，对 Qwen、DeepSeek、GLM 与 Kimi 词表分别跑正确性和吞吐；项目表格不是中文语料独立验证，输出逐 token 一致之前不能只看速度
  - 本地推理成本向：区分离线大规模数据预处理、在线短请求与 Python 小批量调用；原生文件 API 的 GB/s 不等于聊天首 token 延迟会按同样倍数下降，兼容层、磁盘、解压和模型推理都可能重新成为瓶颈
  - 工程选型向：先检查 WordPiece、SentencePiece、Windows、padding、truncation 和 Unicode normalization 覆盖，再用固定提交压测；仓库无正式 Release、Windows 测试不足，适合灰度实验而非直接替换生产分词链
headlines:
  - 分词快 1000 倍？GigaToken 的数字该怎样正确复现
  - AI 数据预处理冲到 24 GB/s，中文团队先别跳过一致性测试
  - SIMD、缓存和少过 Python：GigaToken 为什么能把分词推到 GB/s
relatedTopicIds:
  - claude-code-opencode-token-overhead
  - small-ai-offline-models-global-trend
  - bonsai-27b-phone-local-agent
materials:
  - GigaToken 官方仓库、基准方法、兼容模式与已知限制 :: https://github.com/marcelroed/gigatoken
  - Hacker News 独立讨论（截至 7 月 23 日复核时 408 分 / 81 评论） :: https://news.ycombinator.com/item?id=49010167
  - Hugging Face Tokenizers 官方文档与对照接口 :: https://huggingface.co/docs/tokenizers/
---

## 先说结论：这是一条值得复现的工程路线，不是一张可直接采购的倍数海报

GigaToken 的价值不只是把同一段 Rust 再优化一点。作者把常被交给通用正则引擎的预分词改成针对多种词表的专用 SIMD 路径，又用预 token 缓存减少重复单词的合并工作，并尽量让文件读取、切分和并行留在 Rust 内，避免 Python 对象与线程之间的搬运。对于要清洗 Common Crawl、训练语料或大批量离线索引的团队，分词原本可能是昂贵的 CPU 前置步骤；如果输出完全一致，吞吐提升就能减少机器时间，也能让数据迭代更快。

但“1000 倍”只描述了一组特定对照。README 的最快路径让 GigaToken 直接读取完整文件，而 Hugging Face 与 tiktoken 基线接收已经切好的较小样本；作者说明两者不做缓存，因而单位吞吐近似稳定，这个解释合理却仍需要外部复现。表格本身也显示不同词表差距很大：部分 BPE 模型在高核数机器上接近数百到上千倍，SentencePiece 系列则可能只剩个位数到几十倍。把最大值写成所有模型、所有机器与所有 API 的保证，会抹掉真正有用的选型信息。

::: callout 先验证 token，再比较秒表
分词器只要在 Unicode normalization、特殊 token、截断或边界切分上有一个差异，后续训练与推理就可能悄悄偏离。压测脚本应先对每条中文与混合语料逐 token 对齐，再记录冷启动、峰值内存、单线程和多线程吞吐。
:::

## 中文团队最该做的是一张工作负载矩阵

可以准备四组数据：新闻与长文、社交短句、代码仓库、简繁中英混合文本；再分别测试原生文件 API、Hugging Face 兼容模式和常用 Python 小批量调用。机器至少覆盖普通 8 至 16 核开发机、Apple Silicon 和实际服务器，记录数据是否在内存、是否压缩、批大小及线程数。这样得到的不是一个夸张倍率，而是“在我的语料和部署方式下，哪一段值得替换”。

项目当前没有正式 Release，已知问题还包括 WordPiece 未支持、SentencePiece 优化不足、文件 sink 未实现与 Windows 覆盖有限。更稳妥的采用方式是固定提交、保留原分词器作为一致性 oracle，先把它放进可回退的离线流水线；确认长时间稳定、内存曲线和输出一致后，再考虑延伸到在线服务。真正的选题不是宣布旧分词器过时，而是教读者如何把一个很亮眼的系统基准变成可复核的中文工程结论。
