import type { Metadata } from "next";
import Link from "next/link";
import { SubscribeForm } from "@/components/subscribe-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "自己 DIY 一个具身智能体：SO-101 + LeRobot",
  description:
    "从 SO-101 开源机械臂与 LeRobot 开始，公开预算、采购、组装、遥操作、数据采集和首个动作训练，自己 DIY 一个会动手的 AI。"
};

const roadmap = [
  {
    number: "01",
    title: "选型与预算",
    text: "确认 SO-101 单臂或主从双臂路线，逐项核对电机、控制板、电源、打印件、摄像头和算力。"
  },
  {
    number: "02",
    title: "采购与组装",
    text: "记录中国区可买到的型号、替代件、实际价格和装配问题，不复制一份无法落地的海外清单。"
  },
  {
    number: "03",
    title: "校准与遥操作",
    text: "完成舵机配置、机械臂校准和主从遥操作，先让硬件稳定复现人的动作。"
  },
  {
    number: "04",
    title: "采集自己的数据",
    text: "选择一个桌面任务，录制摄像头、关节状态和动作数据，并公开数据质量检查方法。"
  },
  {
    number: "05",
    title: "训练首个策略",
    text: "从 LeRobot 支持的基础策略开始，记录训练环境、耗时、失败样本和模型表现。"
  },
  {
    number: "06",
    title: "完成第一个动作",
    text: "目标不是炫技视频，而是让机械臂稳定完成一次可重复测试的抓取、分类或整理任务。"
  }
];

const progress = [
  {
    status: "已完成",
    title: "确定开源起点",
    text: "以 SO-101 + LeRobot 为第一条路线，官方资料入口已经整理。"
  },
  {
    status: "进行中",
    title: "核对中国区采购清单",
    text: "逐项确认型号、价格、打印服务与可替代零件，再发布可直接照买的版本。"
  },
  {
    status: "待开始",
    title: "实机采购与组装",
    text: "硬件尚未采购完成；在真实开箱前，不发布伪装成实拍的 AI 图片。"
  },
  {
    status: "待开始",
    title: "数据采集与训练",
    text: "等机械臂完成校准和遥操作后，再确定第一个可重复验收的任务。"
  }
];

const officialSources = [
  {
    title: "Hugging Face LeRobot",
    text: "机器人数据采集、训练、评估和部署的开源框架。",
    href: "https://github.com/huggingface/lerobot"
  },
  {
    title: "SO-101 官方教程",
    text: "零件来源、安装 LeRobot、舵机配置和分步组装说明。",
    href: "https://huggingface.co/docs/lerobot/en/so101"
  },
  {
    title: "SO-ARM100 / SO-101 硬件仓库",
    text: "BOM、3D 打印文件、装配指南和中国区采购参考。",
    href: "https://github.com/TheRobotStudio/SO-ARM100"
  },
  {
    title: "LeLab 图形界面",
    text: "用界面完成机器人配置、遥操作、数据采集、训练和部署。",
    href: "https://huggingface.co/docs/lerobot/lelab"
  }
];

export default function EmbodiedAiLabPage() {
  const pageUrl = `${site.url}/lab/embodied-ai`;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "自己 DIY 一个具身智能体：SO-101 + LeRobot",
    description: metadata.description,
    datePublished: "2026-07-28",
    dateModified: "2026-07-28",
    inLanguage: "zh-CN",
    mainEntityOfPage: pageUrl,
    author: {
      "@type": "Organization",
      name: site.name,
      url: site.url
    },
    about: ["具身智能", "SO-101", "LeRobot", "机器人学习", "DIY 机械臂"]
  };

  return (
    <>
      <section className="section-inner embodied-hero">
        <div>
          <p className="eyebrow">实验室 · 自己玩 001</p>
          <h1>自己 DIY 一个会动手的 AI</h1>
          <p>
            不从昂贵的人形机器人开始。我们先用 SO-101 开源机械臂和
            LeRobot，做一个能被示教、采集数据并学会第一个桌面动作的具身智能体。
          </p>
          <div className="hero-actions">
            <a className="button" href="#roadmap">
              看 6 步搭建路线
            </a>
            <Link className="text-button" href="/lab#submit">
              想做自己的版本
            </Link>
          </div>
          <div className="lab-trust-row" aria-label="实验原则">
            <span>真实采购</span>
            <span>真实失败</span>
            <span>开源优先</span>
            <span>持续更新</span>
          </div>
        </div>

        <aside className="embodied-brief">
          <p className="eyebrow">CURRENT STATUS</p>
          <strong>路线已公开</strong>
          <dl>
            <div>
              <dt>硬件</dt>
              <dd>SO-101</dd>
            </div>
            <div>
              <dt>框架</dt>
              <dd>LeRobot</dd>
            </div>
            <div>
              <dt>首个目标</dt>
              <dd>桌面抓取 / 分类</dd>
            </div>
            <div>
              <dt>实机状态</dt>
              <dd>采购准备中</dd>
            </div>
          </dl>
        </aside>
      </section>

      <section className="section section-muted">
        <div className="section-inner">
          <div className="section-head">
            <div>
              <p className="eyebrow">WHY THIS ROUTE</p>
              <h2>为什么从 SO-101 + LeRobot 开始</h2>
            </div>
          </div>
          <div className="embodied-reason-grid">
            <article className="value-row">
              <h3>门槛已经降到个人可尝试</h3>
              <p>
                官方硬件仓库提供 BOM、打印文件和装配说明。其中国区主从双臂基础物料参考约为
                1,343 元，实际还需考虑打印、摄像头、算力、运费和价格变化。
              </p>
            </article>
            <article className="value-row">
              <h3>不是一个停止维护的玩具</h3>
              <p>
                截至 2026 年 7 月，LeRobot GitHub
                已获得约 25.8k Stars，并持续发布机器人、策略、数据集和部署工具更新。
              </p>
            </article>
            <article className="value-row">
              <h3>过程本身就是有用内容</h3>
              <p>
                采购、接线、校准、采集和训练都有大量真实摩擦。把这些问题讲清楚，比转述具身智能新闻更容易被复现和搜索。
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section-dark embodied-budget">
        <div className="section-inner embodied-budget-grid">
          <div>
            <p className="eyebrow">BUDGET BASELINE</p>
            <h2>先公开成本，再决定玩多大</h2>
            <p>
              约 1,343 元只是官方仓库在中国区列出的主从双臂基础部件参考，不是我们的成交报价，也不代表最终总成本。
              第一版采购清单会把打印件、摄像头、算力和替代件单独列出。
            </p>
          </div>
          <div className="embodied-budget-number">
            <span>基础 BOM 参考</span>
            <strong>≈ ¥1,343</strong>
            <small>双臂基础部件 · 价格以采购当日为准</small>
          </div>
        </div>
      </section>

      <section className="section" id="roadmap">
        <div className="section-inner">
          <div className="section-head">
            <div>
              <p className="eyebrow">BUILD ROADMAP</p>
              <h2>从一箱零件到第一个真实动作</h2>
              <p>每一步都会拆成独立文章和短视频，并保留失败记录。</p>
            </div>
          </div>
          <div className="embodied-roadmap">
            {roadmap.map((item) => (
              <article className="value-row" key={item.number}>
                <strong>{item.number}</strong>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="section-inner embodied-progress-layout">
          <div>
            <p className="eyebrow">HONEST PROGRESS</p>
            <h2>现在做到哪里</h2>
            <p>
              这是公开搭建日志，不是已经完成的成品展示。只有经过实际操作和验证的步骤才会标记为完成。
            </p>
          </div>
          <div className="embodied-progress-list">
            {progress.map((item) => (
              <article className="embodied-progress-item" key={item.title}>
                <span data-status={item.status}>{item.status}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="section-head">
            <div>
              <p className="eyebrow">OFFICIAL SOURCES</p>
              <h2>从这些官方资料开始</h2>
              <p>实验路线优先引用项目官方仓库和文档，避免二手教程版本混乱。</p>
            </div>
          </div>
          <div className="embodied-source-grid">
            {officialSources.map((source) => (
              <a
                className="value-row embodied-source-card"
                href={source.href}
                key={source.href}
                rel="noreferrer"
                target="_blank"
              >
                <h3>{source.title}</h3>
                <p>{source.text}</p>
                <span>打开官方资料 ↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-lab-cta">
        <div className="section-inner subscribe-band">
          <div>
            <p className="eyebrow">FOLLOW THE BUILD</p>
            <h2>跟着这个具身智能体一起长出来</h2>
            <p>
              订阅采购、组装和训练更新；如果你已有自己的机器人想法，也可以提交给实验室一起做。
            </p>
            <Link className="text-button" href="/lab#submit">
              提交我的具身智能创意
            </Link>
          </div>
          <SubscribeForm
            source="embodied-ai-lab"
            defaultInterest="自己玩 DIY"
          />
        </div>
      </section>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
    </>
  );
}
