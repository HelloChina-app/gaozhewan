import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SubscribeForm } from "@/components/subscribe-form";
import { TopicCardFull } from "@/components/topic-card-full";
import { TopicCardPreview } from "@/components/topic-card-preview";
import {
  getSortedTopicCards,
  getTopicCardById,
  topicCards
} from "@/lib/content";
import { site } from "@/lib/site";

type TopicPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return topicCards.map((card) => ({ id: card.id }));
}

export async function generateMetadata({
  params
}: TopicPageProps): Promise<Metadata> {
  const { id } = await params;
  const card = getTopicCardById(id);

  if (!card) {
    return { title: "选题卡不存在" };
  }

  return {
    title: `${card.title} - 选题卡`,
    description: card.heat,
    alternates: {
      canonical: `/topic/${card.id}`
    },
    openGraph: {
      title: card.title,
      description: card.heat,
      type: "article",
      url: `/topic/${card.id}`
    }
  };
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { id } = await params;
  const card = getTopicCardById(id);

  if (!card) {
    notFound();
  }

  const more = getSortedTopicCards()
    .filter((item) => item.id !== card.id)
    .slice(0, 3);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: card.title,
    abstract: card.heat,
    datePublished: card.publishedAt || undefined,
    url: `${site.url}/topic/${card.id}`,
    publisher: { "@type": "Organization", name: site.name }
  };

  return (
    <article className="article-shell">
      <div>
        <div className="breadcrumb">
          <Link href="/">首页</Link>
          <span>/</span>
          <Link href="/topics">选题卡</Link>
          <span>/</span>
          <span>时效 {card.window}</span>
        </div>

        <TopicCardFull card={card} />

        {more.length > 0 ? (
          <section className="section">
            <div className="section-head">
              <div>
                <p className="eyebrow">更多选题</p>
                <h2>最近的选题卡</h2>
              </div>
              <Link className="text-button" href="/topics">
                全部选题卡
              </Link>
            </div>
            <div className="topic-grid">
              {more.map((item) => (
                <TopicCardPreview card={item} key={item.id} />
              ))}
            </div>
          </section>
        ) : null}

        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </div>

      <aside className="article-side">
        <div className="subscribe-band">
          <div>
            <p className="eyebrow">搞选题 Pro</p>
            <h2>每天 3 张这样的选题卡，直接发到你邮箱</h2>
          </div>
          <SubscribeForm source={`topic-${card.id}`} defaultInterest="搞选题" />
        </div>
      </aside>
    </article>
  );
}
