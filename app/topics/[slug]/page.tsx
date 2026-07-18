import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContentBody } from "@/components/content-body";
import { TopicCardPreview } from "@/components/topic-card-preview";
import {
  getTopicCardById,
  getTopicClusterBySlug,
  topicClusters
} from "@/lib/content";
import { site } from "@/lib/site";

type TopicClusterPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return topicClusters.map((cluster) => ({ slug: cluster.slug }));
}

export async function generateMetadata({ params }: TopicClusterPageProps): Promise<Metadata> {
  const { slug } = await params;
  const cluster = getTopicClusterBySlug(slug);

  if (!cluster) return { title: "主题不存在" };

  return {
    title: cluster.title,
    description: cluster.description,
    alternates: { canonical: `/topics/${cluster.slug}` },
    openGraph: {
      title: cluster.title,
      description: cluster.description,
      type: "article",
      publishedTime: cluster.publishedAt,
      modifiedTime: cluster.updatedAt || cluster.publishedAt,
      url: `/topics/${cluster.slug}`
    }
  };
}

export default async function TopicClusterPage({ params }: TopicClusterPageProps) {
  const { slug } = await params;
  const cluster = getTopicClusterBySlug(slug);

  if (!cluster) notFound();

  const cards = cluster.topicIds.map(getTopicCardById).filter((card) => card !== undefined);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: cluster.title,
    description: cluster.description,
    datePublished: cluster.publishedAt,
    dateModified: cluster.updatedAt || cluster.publishedAt,
    inLanguage: "zh-CN",
    url: `${site.url}/topics/${cluster.slug}`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: cards.map((card, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: card.title,
        url: `${site.url}/topic/${card.id}`
      }))
    }
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "首页", item: site.url },
      { "@type": "ListItem", position: 2, name: "选题卡", item: `${site.url}/topics` },
      { "@type": "ListItem", position: 3, name: cluster.title, item: `${site.url}/topics/${cluster.slug}` }
    ]
  };

  return (
    <main className="page-shell topic-cluster-page">
      <div className="breadcrumb">
        <Link href="/">首页</Link><span>/</span><Link href="/topics">选题卡</Link><span>/</span><span>{cluster.eyebrow}</span>
      </div>
      <header className="article-hero">
        <p className="eyebrow">{cluster.eyebrow}</p>
        <h1>{cluster.title}</h1>
        <p>{cluster.description}</p>
      </header>

      <ContentBody blocks={cluster.body} />

      <section className="section">
        <div className="section-head"><div><p className="eyebrow">延伸阅读</p><h2>按问题继续读</h2></div></div>
        <div className="topic-grid">
          {cards.map((card) => <TopicCardPreview card={card} key={card.id} />)}
        </div>
      </section>

      <nav className="topic-cluster-links" aria-label="其他主题指南">
        <span>其他主题</span>
        {topicClusters.filter((item) => item.slug !== cluster.slug).map((item) => (
          <Link href={`/topics/${item.slug}`} key={item.slug}>{item.title}</Link>
        ))}
      </nav>

      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    </main>
  );
}
