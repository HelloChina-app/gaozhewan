import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/article-card";
import { getAllTags, getPostsByTag } from "@/lib/content";

type TagPageProps = {
  params: Promise<{ tag: string }>;
};

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag: encodeURIComponent(tag) }));
}

export async function generateMetadata({
  params
}: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  const label = decodeURIComponent(tag);
  return {
    title: `标签：${label}`,
    description: `搞着玩里关于「${label}」的全部文章。`,
    alternates: {
      canonical: `/tag/${tag}`
    }
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const label = decodeURIComponent(tag);
  const posts = getPostsByTag(label);

  if (posts.length === 0) {
    notFound();
  }

  const otherTags = getAllTags().filter((item) => item !== label);

  return (
    <section className="page-shell">
      <div className="page-title">
        <p className="eyebrow">标签</p>
        <h1>{label}</h1>
        <p>搞着玩里关于「{label}」的全部文章，共 {posts.length} 篇。</p>
      </div>

      <div className="article-grid">
        {posts.map((post) => (
          <ArticleCard post={post} key={post.slug} />
        ))}
      </div>

      <div className="filter-row" aria-label="其他标签">
        <Link href="/post">全部文章</Link>
        {otherTags.map((item) => (
          <Link href={`/tag/${encodeURIComponent(item)}`} key={item}>
            {item}
          </Link>
        ))}
      </div>
    </section>
  );
}
