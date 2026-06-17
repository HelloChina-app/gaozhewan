import type { Metadata } from "next";
import Link from "next/link";
import { getPostsByType } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "周刊",
  description: "搞着玩周刊归档，每周整理全球新奇工具、话题和社区信号。"
};

export default function WeeklyPage() {
  const weeklies = getPostsByType("weekly");

  return (
    <section className="page-shell">
      <div className="page-title">
        <p className="eyebrow">周刊</p>
        <h1>每周五，把全球信号扫一遍</h1>
        <p>
          周刊免费版保留摘要，Pro 版提供完整 10 条素材链和可直接改写的标题模板。
        </p>
      </div>

      <div className="weekly-grid">
        {weeklies.map((post) => (
          <article className="weekly-item" key={post.slug}>
            <div className="card-meta">
              <span>{formatDate(post.publishedAt)}</span>
              <span>{post.readTime}</span>
            </div>
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
            <Link className="text-button" href={`/post/${post.slug}`}>
              阅读周刊
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

