import type { Metadata } from "next";
import Link from "next/link";
import { labServicePackages } from "@/lib/lab";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "实验室服务与 USDT 定价",
  description:
    "搞着玩内容永久免费；实验室为用户自己的创意提供 29 USDT 创意诊断、299 USDT 原型冲刺和 999 USDT MVP 共建启动服务。",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "搞着玩实验室服务与 USDT 定价",
    description: "不卖同一份内容，只为每个用户自己的问题交付固定范围结果。",
    type: "website",
    url: `${site.url}/pricing`
  }
};

const steps = [
  ["01", "免费提交", "说清真实问题、目标用户和第一版验收结果，获得私有创意编号。"],
  ["02", "先甄选再付款", "我们判断是否适合实验室，并在付款前确认固定范围、周期与边界。"],
  ["03", "USDT 启动", "只使用 TRON（TRC20）USDT；付款与创意编号绑定并自动核验。"],
  ["04", "交付与验收", "按页面列出的交付物完成第一版；超出范围的工作不会自动收费。"]
];

const faqs = [
  {
    q: "为什么选题卡不收费了？",
    a: "同一套内容很难长期为不同用户创造同等价值。搞着玩把信号、角度、标题和来源全部免费公开，用它们证明判断力和执行力。"
  },
  {
    q: "实验室究竟卖什么？",
    a: "卖针对你自己的问题所做的诊断、原型或固定范围 MVP 交付，不卖流量、收入或成功保证。"
  },
  {
    q: "能不能不提交创意直接付款？",
    a: "不能。先提交、甄选并确认范围，可以避免你为不适合实验室或无法验收的需求付款。"
  },
  {
    q: "支持哪些付款方式？",
    a: "只接受页面指定网络的 USDT。目前不接受人民币、美元、银行卡、PayPal、其他稳定币或其他加密资产。"
  },
  {
    q: "999 USDT 包含所有功能吗？",
    a: "不包含。999 USDT 是固定范围 MVP 的启动款，最终交付边界会在付款前确认；新增功能另行确认。"
  }
];

export default function PricingPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "搞着玩实验室固定范围服务",
    itemListElement: labServicePackages.map((item, index) => ({
      "@type": "Offer",
      position: index + 1,
      name: item.name,
      description: item.summary,
      price: item.amount,
      priceCurrency: "USDT",
      url: `${site.url}/lab#submit`
    }))
  };

  return (
    <>
      <section className="page-shell">
        <div className="page-title">
          <p className="eyebrow">实验室服务 · USDT ONLY</p>
          <h1>内容免费；只为你的问题收费</h1>
          <p>
            选题、工具核验和公开实验直接拿走。只有当你希望实验室诊断一个创意、做出原型或共建 MVP 时，才按固定范围付款。
          </p>
          <div className="hero-actions">
            <Link className="button" href="/lab#submit">
              免费提交创意
            </Link>
            <Link className="text-button" href="/topics">
              浏览免费选题
            </Link>
          </div>
        </div>

        <div className="lab-pricing-grid" id="services">
          {labServicePackages.map((item) => (
            <article className="lab-price-card" key={item.id}>
              <p className="eyebrow">{item.delivery}</p>
              <h2>{item.name}</h2>
              <div className="price">
                <strong>{item.amount}</strong>
                <span>USDT</span>
              </div>
              <p>{item.summary}</p>
              <ul>
                {item.deliverables.map((deliverable) => (
                  <li key={deliverable}>{deliverable}</li>
                ))}
              </ul>
              <Link className="button" href={`/lab#submit`}>
                先提交再决定
              </Link>
            </article>
          ))}
        </div>
        <p className="lab-price-note">
          页面价格不是无限范围报价。付款前必须用创意编号确认交付物、周期、修改次数和验收边界；未经确认，不应转账。
        </p>
      </section>

      <section className="section section-dark">
        <div className="section-inner">
          <div className="section-head">
            <div>
              <p className="eyebrow">从创意到第一版</p>
              <h2>四步形成真正的变现闭环</h2>
            </div>
          </div>
          <div className="value-list">
            {steps.map(([number, title, text]) => (
              <article className="value-row" key={number}>
                <strong>{number}</strong>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="section-inner">
          <div className="section-head">
            <div>
              <p className="eyebrow">FAQ</p>
              <h2>付款前先把边界讲清楚</h2>
            </div>
          </div>
          <div className="faq-list">
            {faqs.map((faq) => (
              <div className="faq-item" key={faq.q}>
                <h3>{faq.q}</h3>
                <p>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
    </>
  );
}
