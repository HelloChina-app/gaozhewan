import type { Metadata } from "next";
import { SubscribeForm } from "@/components/subscribe-form";
import { TopicCardPreview } from "@/components/topic-card-preview";
import { getSortedTopicCards } from "@/lib/content";

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
    a: "MVP 阶段先加入早鸟名单。支付和站内 Pro 区放到 V1.0，早期可用小报童或人工交付承接。"
  }
];

export default function PricingPage() {
  const recentCards = getSortedTopicCards().slice(0, 3);
  return (
    <>
      <section className="page-shell">
        <div className="page-title">
          <p className="eyebrow">搞选题 Pro</p>
          <h1>第一款产品先帮你搞选题</h1>
          <p>
            搞着玩可以装很多东西，但 MVP 先用“全球信号 → 可发布选题”验证付费闭环。
          </p>
        </div>

        <div className="pricing-grid">
          <div className="price-card">
            <p className="eyebrow">早鸟计划</p>
            <h2>前 100 名锁定早鸟价</h2>
            <div className="price">
              <strong>¥99</strong>
              <span>/ 年</span>
            </div>
            <p>标准价 ¥199/年，月付 ¥29。现在先收早鸟名单，不在站内直接收款。</p>
            <SubscribeForm source="pricing-page" defaultInterest="搞选题" />
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
              <p className="eyebrow">交付样式</p>
              <h2>一张选题卡就是一个可执行信号包</h2>
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
              <h2>上线前最需要说清楚的事</h2>
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
