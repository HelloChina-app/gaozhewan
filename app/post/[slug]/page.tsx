import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GzwScore } from "@/components/gzw-score";
import { ProGate } from "@/components/pro-gate";
import {
  getPostBySlug,
  getToolBySlug,
  posts,
  type BodyBlock
} from "@/lib/content";
import { site } from "@/lib/site";
import { formatDate } from "@/lib/utils";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "文章不存在"
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/post/${post.slug}`
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      url: `/post/${post.slug}`
    }
  };
}

function renderBlock(block: BodyBlock, index: number) {
  if (block.type === "heading") {
    return <h2 key={`${block.type}-${index}`}>{block.text}</h2>;
  }

  if (block.type === "paragraph") {
    return <p key={`${block.type}-${index}`}>{block.text}</p>;
  }

  if (block.type === "list") {
    return (
      <ul key={`${block.type}-${index}`}>
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }

  return (
    <aside className="callout" key={`${block.type}-${index}`}>
      <strong>{block.title}</strong>
      <p>{block.text}</p>
    </aside>
  );
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedTools = post.relatedTools
    .map((toolSlug) => getToolBySlug(toolSlug))
    .filter(Boolean);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: {
      "@type": "Organization",
      name: site.name
    },
    publisher: {
      "@type": "Organization",
      name: site.name
    },
    mainEntityOfPage: `${site.url}/post/${post.slug}`
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "首页", item: site.url },
      { "@type": "ListItem", position: 2, name: "文章", item: `${site.url}/post` },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${site.url}/post/${post.slug}`
      }
    ]
  };

  return (
    <article className="article-shell">
      <div>
        <div className="breadcrumb">
          <Link href="/">首页</Link>
          <span>/</span>
          <Link href="/post">文章</Link>
          <span>/</span>
          <span>{post.category}</span>
        </div>
        <header className="article-hero">
          <div className="card-meta">
            <span>{post.category}</span>
            <span>{formatDate(post.publishedAt)}</span>
            <span>{post.readTime}</span>
          </div>
          <h1>{post.title}</h1>
          <p>{post.excerpt}</p>
        </header>

        <p className="article-summary">一句话：{post.oneLiner}</p>

        <div className="article-body">
          {post.body.map((block, index) => renderBlock(block, index))}
        </div>

        <ProGate
          anglesCount={post.proAngles.length}
          templatesCount={post.headlineTemplates.length}
        />

        {relatedTools.length > 0 ? (
          <section className="section">
            <div className="section-head">
              <div>
                <p className="eyebrow">相关工具</p>
                <h2>这篇提到的工具</h2>
              </div>
            </div>
            <div className="value-list">
              {relatedTools.map((tool) =>
                tool ? (
                  <div className="value-row" key={tool.slug}>
                    <h3>
                      <Link href={`/tools/${tool.slug}`}>{tool.name}</Link>
                    </h3>
                    <p>{tool.description}</p>
                  </div>
                ) : null
              )}
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
        <GzwScore scores={post.scores} />
        <div className="source-list">
          <h2>来源</h2>
          {post.sources.map((source) => (
            <a href={source.url} key={source.url} rel="noopener noreferrer" target="_blank">
              {source.label}
            </a>
          ))}
        </div>
      </aside>
    </article>
  );
}

