import type { Metadata } from "next";
import { SubscribeForm } from "@/components/subscribe-form";
import { TopicCardPreview } from "@/components/topic-card-preview";
import { getSortedTopicCards } from "@/lib/content";

export const metadata: Metadata = {
  title: "选题卡归档",
  description: "搞着玩选题卡归档：全球信号拆出的可执行选题，按时间从新到旧排列。"
};

export default function TopicsPage() {
  const cards = getSortedTopicCards();

  return (
    <section className="page-shell">
      <div className="page-title">
        <p className="eyebrow">选题卡</p>
        <h1>全部选题卡</h1>
        <p>
          每张卡是一条全球信号拆出的可执行选题，含写作角度、标题模板、竞争度和时效窗口。点开看完整内容。
        </p>
      </div>

      <div className="topic-grid">
        {cards.map((card) => (
          <TopicCardPreview card={card} key={card.id} />
        ))}
      </div>

      <section className="section">
        <div className="subscribe-band">
          <div>
            <p className="eyebrow">搞选题 Pro</p>
            <h2>每天 3 张选题卡发到你邮箱</h2>
            <p>免费层看摘要，Pro 给完整角度、标题模板和素材包。</p>
          </div>
          <SubscribeForm source="topics-archive" defaultInterest="搞选题" />
        </div>
      </section>
    </section>
  );
}
