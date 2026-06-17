import Link from "next/link";
import { GzwScore } from "@/components/gzw-score";
import type { Post } from "@/lib/content";
import { formatDate } from "@/lib/utils";

type ArticleCardProps = {
  post: Post;
  featured?: boolean;
};

export function ArticleCard({ post, featured = false }: ArticleCardProps) {
  return (
    <article className={featured ? "article-card article-card-featured" : "article-card"}>
      <div className="card-meta">
        <span>{post.category}</span>
        <span>{formatDate(post.publishedAt)}</span>
        <span>{post.readTime}</span>
      </div>
      <h3>
        <Link href={`/post/${post.slug}`}>{post.title}</Link>
      </h3>
      <p>{post.excerpt}</p>
      <div className="tag-row">
        {post.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <GzwScore scores={post.scores} compact />
    </article>
  );
}
