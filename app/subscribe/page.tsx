import type { Metadata } from "next";
import Link from "next/link";
import { SubscribeForm } from "@/components/subscribe-form";
import { site } from "@/lib/site";
import { getUsdtCheckoutConfig } from "@/lib/usdt";

export const metadata: Metadata = {
  title: "免费订阅 AI 工具与全球选题周刊",
  description:
    "免费订阅搞着玩邮件，按你关注的方向接收全球新奇信号、AI 工具实测、项目案例和中文创作选题；需要完整素材包时可用 USDT 开通 Pro。"
};

export default function SubscribePage() {
  const checkout = getUsdtCheckoutConfig();
  const network = checkout.network || "收银台页面指定网络";
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
            选你最想搞的方向，我们就把那条线的全球信号、工具实测和中文案例优先发给你：搞选题、搞工具、搞项目还是搞副业。
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
            <p className="eyebrow">需要完整写作包？</p>
            <h2>搞选题 Pro：每天 3 张可直接开写的选题卡</h2>
            <p>
              免费订阅负责发现和筛选；Pro 补全写作角度、标题模板、竞争度、时效窗口与素材链，适合需要稳定产出的创作者和内容团队。
            </p>
            <div className="subscribe-actions">
              <Link className="button" href="/checkout">
                使用 {checkout.amount} USDT 开通
              </Link>
              <Link className="text-button" href="/pricing">
                查看免费版与 Pro 对比
              </Link>
            </div>
          </div>
          <div className="value-list">
            <div className="value-row">
              <h3>{checkout.amount} USDT / 年</h3>
              <p>一次支付，解锁 365 天完整选题工作台。</p>
            </div>
            <div className="value-row">
              <h3>只接受 USDT</h3>
              <p>不收人民币、银行卡、PayPal 或其他代币。</p>
            </div>
            <div className="value-row">
              <h3>扫码付款，链上核验</h3>
              <p>进入收银台后扫描二维码，并严格使用 {network} 完成转账。</p>
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
