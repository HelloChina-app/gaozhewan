import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GzwScore } from "@/components/gzw-score";
import { ArticleCard } from "@/components/article-card";
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
    title: `${tool.name} - 工具实测与选题角度`,
    description: tool.description,
    alternates: {
      canonical: `/tools/${tool.slug}`
    },
    openGraph: {
      title: `${tool.name} - 搞着玩工具库`,
      description: tool.description,
      type: "article",
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
          <h1>{tool.name}</h1>
          <p>{tool.description}</p>
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
      </div>

      <aside className="article-side">
        <GzwScore scores={tool.scores} />
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
