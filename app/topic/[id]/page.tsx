import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TopicCardFull } from "@/components/topic-card-full";
import { TopicCardPreview } from "@/components/topic-card-preview";
import {
  getRelatedTopicCards,
  getTopicCardById,
  getTopicClustersForTopic
} from "@/lib/content";
import { site } from "@/lib/site";
import { truncateText } from "@/lib/utils";

type TopicPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params
}: TopicPageProps): Promise<Metadata> {
  const { id } = await params;
  const card = getTopicCardById(id);

  if (!card) {
    return { title: "选题卡不存在" };
  }

  const description = truncateText(card.heat, 150);

  return {
    title: `${card.title} - 选题卡`,
    description,
    alternates: {
      canonical: `/topic/${card.id}`
    },
    openGraph: {
      title: card.title,
      description,
      type: "article",
      publishedTime: card.publishedAt,
      modifiedTime: card.updatedAt || card.publishedAt,
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

  const more = getRelatedTopicCards(card);
  const clusters = getTopicClustersForTopic(card.id);
  const description = truncateText(card.heat, 150);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: card.title,
    description,
    datePublished: card.publishedAt || undefined,
    dateModified: card.updatedAt || card.publishedAt || undefined,
    inLanguage: "zh-CN",
    mainEntityOfPage: `${site.url}/topic/${card.id}`,
    citation: card.materials.map((material) => material.url),
    relatedLink: more.map((item) => `${site.url}/topic/${item.id}`),
    ...(clusters.length > 0
      ? {
          isPartOf: clusters.map((cluster) => ({
            "@type": "CollectionPage",
            name: cluster.title,
            url: `${site.url}/topics/${cluster.slug}`
          }))
        }
      : {}),
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name, url: site.url }
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "首页", item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "选题卡",
        item: `${site.url}/topics`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: card.title,
        item: `${site.url}/topic/${card.id}`
      }
    ]
  };

  return (
    <article className="article-shell">
      <div>
        <div className="breadcrumb">
          <Link href="/">首页</Link>
          <span>/</span>
          <Link href="/topics">选题卡</Link>
          <span>/</span>
          <span>完整公开</span>
        </div>

        <TopicCardFull card={card} headingLevel="h1" />

        {clusters.length > 0 ? (
          <nav className="topic-cluster-links" aria-label="所属主题">
            <span>继续系统阅读</span>
            {clusters.map((cluster) => (
              <Link href={`/topics/${cluster.slug}`} key={cluster.slug}>
                {cluster.title}
              </Link>
            ))}
          </nav>
        ) : null}

        {more.length > 0 ? (
          <section className="section">
            <div className="section-head">
              <div>
                <p className="eyebrow">相关阅读</p>
                <h2>沿着这个问题继续读</h2>
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
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      </div>

      <aside className="article-side">
        <div className="subscribe-band">
          <div>
            <p className="eyebrow">搞着玩实验室</p>
            <h2>有了选题，也可以把它做成第一版</h2>
            <p>提交真实问题，先免费甄选；需要诊断、原型或 MVP 共建时，只接受 USDT。</p>
          </div>
          <Link className="button" href="/lab#submit">
            提交创意
          </Link>
        </div>
      </aside>
    </article>
  );
}
