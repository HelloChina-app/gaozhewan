import type { Metadata } from "next";
import Link from "next/link";
import { TopicCardPreview } from "@/components/topic-card-preview";
import { getSortedTopicCards } from "@/lib/content";
import { getUsdtCheckoutConfig } from "@/lib/usdt";

export const metadata: Metadata = {
  title: "搞选题 Pro 定价",
  description:
    "搞选题 Pro 每日交付 3 张全球选题卡，包含写作角度、标题模板、时效窗口和素材包。"
};

const compareRows = [
  ["内容", "免费", "Pro"],
  ["全球信号", "1 个话题轻量解读", "3 张可改写选题卡"],
  ["搞着玩指数", "新奇度、传播潜力、国内可用", "增加竞争度和时效窗口"],
  ["写作角度", "保留 1 个方向", "3 个角度 + 标题模板"],
  ["周刊", "3 条摘要", "10 条完整素材链"]
];

const faqs = [
  {
    q: "和免费内容有什么区别？",
    a: "免费内容帮你判断一件事值不值得关注，Pro 直接给可写角度、标题模板、素材链接和时效窗口。"
  },
  {
    q: "适合谁？",
    a: "适合科技、AI、工具、效率、设计、副业类账号，以及需要稳定选题输入的内容团队。"
  },
  {
    q: "现在怎么开通？",
    a: "进入 USDT 收银台，按页面指定的唯一网络付款并提交交易哈希。链上核验通过后，访问链接会发送到你的邮箱。"
  },
  {
    q: "支持哪些付款方式？",
    a: "只接受 USDT。本站不接受人民币、美元、银行卡、PayPal、其他稳定币或其他加密资产。"
  },
  {
    q: "付款后多久开通？",
    a: "采用人工链上核验，通常 12 小时内完成。提交交易哈希不等于付款确认，只有币种、网络、地址、金额和确认数全部匹配才会开通。"
  }
];

export default function PricingPage() {
  const checkout = getUsdtCheckoutConfig();
  const recentCards = getSortedTopicCards().slice(0, 3);
  return (
    <>
      <section className="page-shell">
        <div className="page-title">
          <p className="eyebrow">搞选题 Pro</p>
          <h1>把全球信号变成你能直接发的选题</h1>
          <p>
            每天从全球信号里挑出值得写的，拆成写作角度、标题模板和素材，让你打开就能写。
          </p>
        </div>

        <div className="pricing-grid">
          <div className="price-card">
            <p className="eyebrow">USDT ONLY</p>
            <h2>Pro 年度版</h2>
            <div className="price">
              <strong>{checkout.amount} USDT</strong>
              <span>/ 年</span>
            </div>
            <p>
              一次支付，解锁 365 天完整选题工作台。仅接受页面指定网络的 USDT，其他付款方式一律不支持。
            </p>
            <Link className="button" href="/checkout">
              前往 USDT 收银台
            </Link>
          </div>

          <div className="compare-table" aria-label="免费与 Pro 对比">
            {compareRows.map((row, index) => (
              <div className="compare-row" key={row.join("-")}>
                {row.map((cell) =>
                  index === 0 ? (
                    <strong key={cell}>{cell}</strong>
                  ) : (
                    <span key={cell}>{cell}</span>
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="section-head">
            <div>
              <p className="eyebrow">选题卡预览</p>
              <h2>一张选题卡，打开就能照着写</h2>
            </div>
          </div>
          <div className="topic-grid">
            {recentCards.map((card) => (
              <TopicCardPreview card={card} key={card.id} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="section-inner">
          <div className="section-head">
            <div>
              <p className="eyebrow">FAQ</p>
              <h2>几个你可能关心的问题</h2>
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
    </>
  );
}
