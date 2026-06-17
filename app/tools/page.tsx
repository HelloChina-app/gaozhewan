import type { Metadata } from "next";
import Link from "next/link";
import { ToolCard } from "@/components/tool-card";
import { categories, tools } from "@/lib/content";
import { cx } from "@/lib/utils";

export const metadata: Metadata = {
  title: "工具库",
  description: "适合中文内容创作者实测、选题和改写的全球工具信号库。"
};

type ToolsPageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function ToolsPage({ searchParams }: ToolsPageProps) {
  const { category } = await searchParams;
  const activeCategory = category ? decodeURIComponent(category) : "";
  const visibleTools = activeCategory
    ? tools.filter((tool) => tool.category === activeCategory)
    : tools;

  return (
    <section className="page-shell">
      <div className="page-title">
        <p className="eyebrow">工具库</p>
        <h1>全球工具，先测后写</h1>
        <p>
          工具库用于支撑文章内链和联盟转化。每张卡片都保留分类、标签、外链和搞着玩指数。
        </p>
      </div>

      <div className="filter-row" aria-label="工具分类">
        <Link className={cx(!activeCategory && "active")} href="/tools">
          全部
        </Link>
        {categories.map((item) => (
          <Link
            className={cx(activeCategory === item && "active")}
            href={`/tools?category=${encodeURIComponent(item)}`}
            key={item}
          >
            {item}
          </Link>
        ))}
      </div>

      <div className="tool-grid">
        {visibleTools.map((tool) => (
          <ToolCard tool={tool} key={tool.slug} />
        ))}
      </div>
    </section>
  );
}

