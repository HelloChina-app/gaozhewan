import type { Metadata } from "next";
import Link from "next/link";
import { SubscribeForm } from "@/components/subscribe-form";
import { site } from "@/lib/site";
import { labServicePackages } from "@/lib/lab";

export const metadata: Metadata = {
  title: "免费订阅 AI 工具与全球选题周刊",
  description:
    "免费订阅搞着玩邮件，按你关注的方向接收全球新奇信号、AI 工具核验、实验室案例、具身智能 DIY 和完整中文创作选题。"
};

export default function SubscribePage() {
  const startingPackage = labServicePackages[0];
  const pageUrl = `${site.url}/subscribe`;
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "免费订阅 AI 工具与全球选题周刊",
    description: metadata.description,
    url: pageUrl,
    inLanguage: "zh-CN",
    isPartOf: {
      "@type": "WebSite",
      name: site.name,
      url: site.url
    }
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
        name: "免费订阅",
        item: pageUrl
      }
    ]
  };

  return (
    <>
      <section className="page-shell">
        <div className="page-title">
          <p className="eyebrow">免费邮件订阅</p>
          <h1>订阅 AI 工具与全球选题周刊</h1>
          <p>
            选你最想搞的方向，我们就把那条线的全球信号、工具核验和中文案例优先发给你：搞选题、搞工具、自己玩 DIY
            还是一起玩共建。
          </p>
        </div>

        <div className="subscribe-band">
          <div className="value-list">
            <div className="value-row">
              <h3>先判断值不值得跟</h3>
              <p>快速看懂一条全球信号是什么、为什么火、国内能不能用。</p>
            </div>
            <div className="value-row">
              <h3>每周收一封重点摘要</h3>
              <p>汇总值得继续追踪的选题、AI 工具、项目案例和副业线索。</p>
            </div>
            <div className="value-row">
              <h3>免费订阅，不需要付款</h3>
              <p>只需邮箱和兴趣方向；不连接钱包，也不会把邮箱出售给第三方。</p>
            </div>
          </div>
          <SubscribeForm source="subscribe-page" />
        </div>
      </section>

      <section className="section section-muted">
        <div className="section-inner subscribe-band">
          <div>
            <p className="eyebrow">有一个自己的问题？</p>
            <h2>内容免费，实验室帮你把创意做成第一版</h2>
            <p>
              周刊和选题卡不会设付费墙。需要个性化帮助时，先免费提交创意；适合实验室的项目再确认范围并使用 USDT 启动。
            </p>
            <div className="subscribe-actions">
              <Link className="button" href="/lab#submit">
                免费提交创意
              </Link>
              <Link className="text-button" href="/pricing">
                查看服务与定价
              </Link>
            </div>
          </div>
          <div className="value-list">
            <div className="value-row">
              <h3>{startingPackage.amount} USDT 起</h3>
              <p>从创意诊断开始，不急着写代码，也不强迫升级更大的服务。</p>
            </div>
            <div className="value-row">
              <h3>只接受 USDT</h3>
              <p>确认服务范围后，只使用 TRON（TRC20）USDT 启动。</p>
            </div>
            <div className="value-row">
              <h3>先确认，后付款</h3>
              <p>不适合实验室、范围不清或无法验收的创意，不进入付款环节。</p>
            </div>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  );
}
