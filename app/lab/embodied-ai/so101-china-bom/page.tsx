import type { Metadata } from "next";
import Link from "next/link";
import { SubscribeForm } from "@/components/subscribe-form";
import { site } from "@/lib/site";

const pagePath = "/lab/embodied-ai/so101-china-bom";
const pageUrl = `${site.url}${pagePath}`;
const officialHardwareUrl = "https://github.com/TheRobotStudio/SO-ARM100";
const officialTutorialUrl = "https://huggingface.co/docs/lerobot/en/so101";

export const metadata: Metadata = {
  title: "SO-101 中国区采购清单：单臂与双臂 BOM、型号和预算",
  description:
    "根据 SO-101 官方开源硬件仓库整理中国区采购清单：舵机型号、减速比、控制板、电源、打印件，以及单臂约 682 元、双臂约 1,343 元基础 BOM 的适用边界。",
  alternates: {
    canonical: pagePath
  },
  openGraph: {
    title: "SO-101 中国区采购清单与预算",
    description:
      "先分清单臂和主从双臂，再买对 STS3215 舵机减速比。价格、遗漏项和风险一次讲清楚。",
    type: "article",
    url: pageUrl,
    locale: "zh_CN"
  }
};

const followerBom = [
  ["STS3215 舵机", "7.4V、1/345、C001", "6", "¥97.72 / 个"],
  ["电机控制板", "SO-101 官方 BOM 对应型号", "1", "¥27"],
  ["USB-C 线", "官方表格为 2 根装", "1 组", "¥23.90"],
  ["电源", "与所选舵机电压匹配", "1", "¥22.31"],
  ["桌面夹具", "2 个", "1 组", "¥7.80"],
  ["螺丝刀套装", "至少包含 #0、#1 十字", "1", "¥14.90"]
];

const dualArmBom = [
  ["STS3215 舵机", "7.4V、1/345、C001", "7", "¥97.72 / 个"],
  ["STS3215 舵机", "7.4V、1/191、C044", "2", "¥97.72 / 个"],
  ["STS3215 舵机", "7.4V、1/147、C046", "3", "¥97.72 / 个"],
  ["电机控制板", "SO-101 官方 BOM 对应型号", "2", "¥27 / 个"],
  ["USB-C 线", "共 2 根", "2", "¥23.90 / 根"],
  ["电源", "与所选舵机电压匹配", "2", "¥22.31 / 个"],
  ["桌面夹具", "共 4 个", "4", "¥5.20 / 个"],
  ["螺丝刀套装", "至少包含 #0、#1 十字", "1", "¥14.90"]
];

const hiddenCosts = [
  {
    title: "3D 打印件",
    text: "官方基础 BOM 总价没有把打印服务单独算进去。官方建议 PLA+、15% 填充，并提供可直接打印的 STL。"
  },
  {
    title: "摄像头",
    text: "机械臂能动不等于能做视觉学习。采集图像数据通常还需要桌面或腕部摄像头。"
  },
  {
    title: "训练算力",
    text: "基础遥操作不等于完成模型训练。是否需要独立 GPU，取决于策略、数据量和训练方式。"
  },
  {
    title: "运费与备件",
    text: "舵机、控制板和打印件可能来自不同卖家。建议为线材、螺丝和易损件留出余量。"
  }
];

const faqs = [
  {
    question: "SO-101 自己采购最低需要多少钱？",
    answer:
      "按官方仓库 2026 年 7 月展示的中国区参考价，单个 follower 机械臂基础 BOM 合计约 682.23 元；经典主从遥操作双臂基础 BOM 合计约 1,343.16 元。两者都未完整包含 3D 打印服务、摄像头、训练算力、运费和备件。"
  },
  {
    question: "新手应该买单臂还是主从双臂？",
    answer:
      "如果目标只是装配、调试和编程控制，单个 follower 成本更低；如果想按 LeRobot 的经典路线进行人工示教和数据采集，主从双臂更直接。先明确实验目标，再决定是否多买一套 leader。"
  },
  {
    question: "SO-101 的 12 个舵机可以全部买同一型号吗？",
    answer:
      "不可以直接把主从双臂所需舵机都当成同一减速比。Follower 使用 6 个 C001；Leader 使用 3 个 C046、2 个 C044 和 1 个 C001。下单时要同时核对电压、减速比和型号代码。"
  },
  {
    question: "没有 3D 打印机还能做 SO-101 吗？",
    answer:
      "可以。官方仓库提供 STL 和打印服务入口，可以委托打印或购买包含打印件的套件。无论哪种方式，都应先核对版本、材料、打印精度和配件是否完整。"
  },
  {
    question: "摄像头和 GPU 包含在 1,343 元里吗？",
    answer:
      "不包含。1,343.16 元来自官方双臂基础物料表的合计行，不应被理解为完整具身智能训练系统总价。摄像头、计算机或云端训练、打印服务和运费需要另算。"
  },
  {
    question: "直接买整套套件是不是更省事？",
    answer:
      "通常更省采购和版本核对时间，但仍需确认套件采用 SO-101 而非已弃用的 SO-100、舵机减速比是否正确、是否包含控制板与打印件，以及售后能否处理舵机配置问题。"
  }
];

export default function So101ChinaBomPage() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "SO-101 中国区采购清单：单臂与双臂 BOM、型号和预算",
    description: metadata.description,
    datePublished: "2026-07-28",
    dateModified: "2026-08-10",
    inLanguage: "zh-CN",
    mainEntityOfPage: pageUrl,
    author: {
      "@type": "Organization",
      name: site.name,
      url: site.url
    },
    citation: [officialHardwareUrl, officialTutorialUrl],
    about: ["SO-101", "LeRobot", "具身智能", "机器人采购清单", "STS3215"]
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "首页",
        item: site.url
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "实验室",
        item: `${site.url}/lab`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "具身智能 DIY",
        item: `${site.url}/lab/embodied-ai`
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "SO-101 中国区采购清单",
        item: pageUrl
      }
    ]
  };
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "SO-101 主从双臂基础采购项目",
    numberOfItems: dualArmBom.length,
    itemListElement: dualArmBom.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `${item[0]}：${item[1]}，数量 ${item[2]}`
    }))
  };

  return (
    <>
      <article className="article-shell bom-article">
        <header className="bom-hero">
          <p className="eyebrow">实验室 · 自己玩 001.1</p>
          <h1>SO-101 中国区采购清单</h1>
          <p className="bom-answer">
            先说结论：只做一个 Follower 机械臂，官方中国区基础 BOM
            参考约为 <strong>¥682.23</strong>；按 LeRobot
            经典主从遥操作路线做两臂，基础 BOM 参考约为
            <strong> ¥1,343.16</strong>。打印件、摄像头、算力、运费和备件需要另算。
          </p>
          <div className="hero-actions">
            <a className="button" href="#dual-arm">
              直接看双臂清单
            </a>
            <Link
              className="text-button"
              href="/lab/embodied-ai/so101-calibration"
            >
              买完后配置与校准
            </Link>
            <Link className="text-button" href="/lab/embodied-ai">
              返回完整实验路线
            </Link>
          </div>
          <p className="bom-source-line">
            基准来源：
            <a href={officialHardwareUrl} rel="noreferrer" target="_blank">
              SO-ARM100 / SO-101 官方硬件仓库
            </a>
            ，核对日期 2026-07-28。价格会变化，本页不是销售报价。
          </p>
        </header>

        <section className="bom-summary-grid" aria-label="采购路线对比">
          <article>
            <p className="eyebrow">最低入门</p>
            <strong>¥682.23</strong>
            <h2>单个 Follower</h2>
            <p>适合先完成装配、校准和程序控制，不包含经典主从示教所需的 Leader。</p>
          </article>
          <article>
            <p className="eyebrow">经典示教路线</p>
            <strong>¥1,343.16</strong>
            <h2>Leader + Follower</h2>
            <p>适合人工遥操作、采集示教数据，再进入 LeRobot 训练流程。</p>
          </article>
        </section>

        <section className="bom-section">
          <div className="section-head">
            <div>
              <p className="eyebrow">BEFORE YOU BUY</p>
              <h2>最容易买错的是舵机减速比</h2>
            </div>
          </div>
          <div className="bom-warning">
            <p>
              <strong>Follower：</strong>6 个 C001（1/345）。
            </p>
            <p>
              <strong>Leader：</strong>3 个 C046（1/147）+ 2 个
              C044（1/191）+ 1 个 C001（1/345）。
            </p>
            <p>
              不要只搜索“STS3215”就下单。必须同时确认电压、减速比和型号代码。
            </p>
          </div>
        </section>

        <section className="bom-section">
          <div className="section-head">
            <div>
              <p className="eyebrow">ONE FOLLOWER ARM</p>
              <h2>单臂基础 BOM：约 ¥682.23</h2>
              <p>价格来自官方仓库中国区参考列，不含打印件和视觉系统。</p>
            </div>
          </div>
          <BomTable rows={followerBom} />
        </section>

        <section className="bom-section" id="dual-arm">
          <div className="section-head">
            <div>
              <p className="eyebrow">LEADER + FOLLOWER</p>
              <h2>主从双臂基础 BOM：约 ¥1,343.16</h2>
              <p>适合按官方经典路线进行遥操作和示教数据采集。</p>
            </div>
          </div>
          <BomTable rows={dualArmBom} />
          <p className="bom-table-note">
            注：以上保留官方表格中的型号、数量、人民币单价与合计口径；卖家、链接和价格可能随时间变化，请在官方仓库核对最新版本。
          </p>
        </section>

        <section className="bom-section">
          <div className="section-head">
            <div>
              <p className="eyebrow">NOT IN THE TOTAL</p>
              <h2>1,343 元之外还要准备什么</h2>
            </div>
          </div>
          <div className="bom-hidden-grid">
            {hiddenCosts.map((item) => (
              <article className="value-row" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bom-section">
          <div className="section-head">
            <div>
              <p className="eyebrow">BUYING DECISION</p>
              <h2>怎样选择采购方式</h2>
            </div>
          </div>
          <div className="bom-decision-grid">
            <article className="value-row">
              <h3>自己逐项采购</h3>
              <p>成本透明、便于替换零件，但需要自己核对舵机型号、打印版本和控制板兼容性。</p>
            </article>
            <article className="value-row">
              <h3>购买散件套装</h3>
              <p>减少跨店采购，仍需自己组装、配置舵机并检查是否包含打印件和夹具。</p>
            </article>
            <article className="value-row">
              <h3>购买已组装套件</h3>
              <p>启动最快，但要确认版本确实是 SO-101、减速比正确，并了解售后和校准状态。</p>
            </article>
          </div>
        </section>

        <section className="bom-section">
          <div className="section-head">
            <div>
              <p className="eyebrow">SO-101 FAQ</p>
              <h2>采购前最常问的问题</h2>
            </div>
          </div>
          <div className="bom-faq-list">
            {faqs.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="bom-official-note">
          <div>
            <p className="eyebrow">VERIFY BEFORE ORDERING</p>
            <h2>下单前回到官方资料再核对一次</h2>
            <p>
              本页负责中文整理与风险说明，不替代官方版本记录。采购前应重新检查硬件仓库、SO-101
              教程和最新 LeRobot 安装要求。
            </p>
          </div>
          <div className="hero-actions">
            <a
              className="button"
              href={officialHardwareUrl}
              rel="noreferrer"
              target="_blank"
            >
              查看官方 BOM
            </a>
            <a
              className="text-button"
              href={officialTutorialUrl}
              rel="noreferrer"
              target="_blank"
            >
              查看官方教程
            </a>
          </div>
        </section>
      </article>

      <section className="section section-lab-cta">
        <div className="section-inner subscribe-band">
          <div>
            <p className="eyebrow">FOLLOW THE BUILD</p>
            <h2>采购价格和实机进度会继续更新</h2>
            <p>
              订阅中国区采购复核、组装、校准和训练记录；如果你想做自己的具身智能版本，也可以提交给实验室。
            </p>
            <Link className="text-button" href="/lab#submit">
              提交具身智能创意
            </Link>
          </div>
          <SubscribeForm
            source="so101-china-bom"
            defaultInterest="自己玩 DIY"
          />
        </div>
      </section>

      {[articleJsonLd, faqJsonLd, breadcrumbJsonLd, itemListJsonLd].map(
        (schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        )
      )}
    </>
  );
}

function BomTable({ rows }: { rows: string[][] }) {
  return (
    <div className="bom-table-wrap">
      <table className="bom-table">
        <thead>
          <tr>
            <th>零件</th>
            <th>关键规格</th>
            <th>数量</th>
            <th>官方人民币参考</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={`${row[0]}-${row[1]}`}>
              {row.map((cell) => (
                <td key={cell}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
