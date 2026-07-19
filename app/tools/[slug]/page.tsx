import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GzwScore } from "@/components/gzw-score";
import { ArticleCard } from "@/components/article-card";
import { ContentBody } from "@/components/content-body";
import { SubscribeForm } from "@/components/subscribe-form";
import { getPostsByTool, getToolBySlug, tools } from "@/lib/content";
import { site } from "@/lib/site";

type ToolPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({
  params
}: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return { title: "工具不存在" };
  }

  return {
    title: tool.guide?.title || `${tool.name} - 工具实测与选题角度`,
    description: tool.guide?.description || tool.description,
    alternates: {
      canonical: `/tools/${tool.slug}`
    },
    openGraph: {
      title: tool.guide?.title || `${tool.name} - 搞着玩工具库`,
      description: tool.guide?.description || tool.description,
      type: "article",
      publishedTime: tool.guide?.publishedAt,
      modifiedTime: tool.guide?.updatedAt || tool.guide?.publishedAt,
      url: `/tools/${tool.slug}`
    }
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const href = tool.affiliateUrl || tool.url;
  const rel = tool.affiliateProvider
    ? "sponsored noopener noreferrer"
    : "noopener noreferrer";
  const relatedPosts = getPostsByTool(tool.slug);
  const guide = tool.guide;
  const comparedTool =
    tool.slug === "make"
      ? getToolBySlug("n8n")
      : tool.slug === "n8n"
        ? getToolBySlug("make")
        : undefined;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.description,
    applicationCategory: tool.category,
    url: tool.url,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    }
  };
  const guideJsonLd = guide
    ? {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        headline: guide.title,
        description: guide.description,
        datePublished: guide.publishedAt,
        dateModified: guide.updatedAt || guide.publishedAt,
        inLanguage: "zh-CN",
        mainEntityOfPage: `${site.url}/tools/${tool.slug}`,
        citation: guide.sources.map((source) => source.url),
        ...(comparedTool
          ? { relatedLink: `${site.url}/tools/${comparedTool.slug}` }
          : {}),
        author: { "@type": "Organization", name: site.name },
        publisher: { "@type": "Organization", name: site.name, url: site.url }
      }
    : null;
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "首页", item: site.url },
      { "@type": "ListItem", position: 2, name: "工具库", item: `${site.url}/tools` },
      { "@type": "ListItem", position: 3, name: tool.name, item: `${site.url}/tools/${tool.slug}` }
    ]
  };

  return (
    <article className="article-shell">
      <div>
        <div className="breadcrumb">
          <Link href="/">首页</Link>
          <span>/</span>
          <Link href="/tools">工具库</Link>
          <span>/</span>
          <span>{tool.category}</span>
        </div>

        <header className="article-hero">
          <div className="card-meta">
            <span>{tool.category}</span>
            {tool.featured ? <span>精选</span> : null}
          </div>
          <h1>{guide?.title || tool.name}</h1>
          <p>{guide?.description || tool.description}</p>
        </header>

        <div className="tag-row">
          {tool.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>

        <div className="hero-actions">
          <a className="button" href={href} rel={rel} target="_blank">
            打开 {tool.name}
          </a>
          <Link className="text-button" href="/tools">
            返回工具库
          </Link>
        </div>
        {tool.affiliateProvider ? (
          <p className="sponsor-note">合作链接，点击不影响你的价格。</p>
        ) : null}

        {guide ? <ContentBody blocks={guide.body} /> : null}

        {guide && comparedTool ? (
          <section className="section">
            <div className="section-head">
              <div>
                <p className="eyebrow">工具对比</p>
                <h2>{tool.name} 之外，还要比较 {comparedTool.name}</h2>
              </div>
            </div>
            <div className="value-row">
              <h3>
                <Link href={`/tools/${comparedTool.slug}`}>
                  阅读 {comparedTool.name} 中文指南
                </Link>
              </h3>
              <p>{comparedTool.description}</p>
            </div>
          </section>
        ) : null}

        <section className="section">
          <div className="section-head">
            <div>
              <p className="eyebrow">怎么用它搞选题</p>
              <h2>把工具变成可发布内容</h2>
            </div>
          </div>
          <div className="value-list">
            <div className="value-row">
              <h3>先测后写</h3>
              <p>
                用一个具体任务实测 {tool.name}，记录它擅长和不擅长的地方，再决定写成评测、教程还是对比。
              </p>
            </div>
            <div className="value-row">
              <h3>补中文视角</h3>
              <p>重点写清楚国内可用性、替代方案和适合谁，而不是搬运官网功能列表。</p>
            </div>
            <div className="value-row">
              <h3>做成系列</h3>
              <p>把同类工具放在一起做横向对比，比单独介绍一个工具更容易形成稳定选题。</p>
            </div>
          </div>
        </section>

        {relatedPosts.length > 0 ? (
          <section className="section">
            <div className="section-head">
              <div>
                <p className="eyebrow">相关文章</p>
                <h2>提到 {tool.name} 的内容</h2>
              </div>
            </div>
            <div className="article-grid">
              {relatedPosts.map((post) => (
                <ArticleCard post={post} key={post.slug} />
              ))}
            </div>
          </section>
        ) : null}

        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {guideJsonLd ? (
          <script
            type="application/ld+json"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: JSON.stringify(guideJsonLd) }}
          />
        ) : null}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      </div>

      <aside className="article-side">
        <GzwScore scores={tool.scores} />
        {guide && guide.sources.length > 0 ? (
          <div className="source-list">
            <h2>官方来源</h2>
            {guide.sources.map((source) => (
              <a href={source.url} key={source.url} rel="noopener noreferrer" target="_blank">
                {source.label}
              </a>
            ))}
          </div>
        ) : null}
        <div className="subscribe-band">
          <div>
            <p className="eyebrow">订阅</p>
            <h2>每天收一条值得搞的全球信号</h2>
          </div>
          <SubscribeForm source={`tool-${tool.slug}`} defaultInterest="搞工具" />
        </div>
        <p className="article-summary">
          想看更多工具？回到{" "}
          <Link className="text-button" href="/tools">
            工具库
          </Link>
          。来源：
          <a href={tool.url} rel={rel} target="_blank">
            {site.name}
          </a>
        </p>
      </aside>
    </article>
  );
}
