import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TopicCardFull } from "@/components/topic-card-full";
import { TopicCardPreview } from "@/components/topic-card-preview";
import {
  getSortedTopicCards,
  getTopicCardById,
  getTopicClustersForTopic
} from "@/lib/content";
import { site } from "@/lib/site";
import { truncateText } from "@/lib/utils";
import { getProAccess } from "@/lib/pro-access";

type TopicPageProps = {
  params: Promise<{ id: string }>;
};

export const dynamic = "force-dynamic";

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
  const access = await getProAccess();

  if (!card) {
    notFound();
  }

  const more = getSortedTopicCards()
    .filter((item) => item.id !== card.id)
    .slice(0, 3);
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
          <span>{access ? `时效 ${card.window}` : "免费预览"}</span>
        </div>

        <TopicCardFull
          card={card}
          headingLevel="h1"
          showPro={Boolean(access)}
        />

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
                <p className="eyebrow">更多选题</p>
                <h2>最近的选题卡</h2>
              </div>
              <Link className="text-button" href="/topics">
                全部选题卡
              </Link>
            </div>
            <div className="topic-grid">
              {more.map((item) => (
                <TopicCardPreview card={item} key={item.id} showPro={Boolean(access)} />
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
            <p className="eyebrow">{access ? "Pro 已解锁" : "搞选题 Pro"}</p>
            <h2>
              {access
                ? "完整角度、标题模板和素材包已显示"
                : "使用 USDT 开通完整选题卡"}
            </h2>
          </div>
          {access ? (
            <p className="form-message">授权邮箱：{access.email}</p>
          ) : (
            <Link className="button" href="/checkout">
              前往 USDT 收银台
            </Link>
          )}
        </div>
      </aside>
    </article>
  );
}
