"use client";

import { useState } from "react";
import { TopicCardPreview } from "@/components/topic-card-preview";
import { getAverageScore } from "@/lib/score";
import type { TopicCard } from "@/lib/content";

type SortKey = "newest" | "score";
type CompKey = "全部" | "低" | "中" | "高";

const compOptions: CompKey[] = ["全部", "低", "中", "高"];

export function TopicsExplorer({ cards }: { cards: TopicCard[] }) {
  const [comp, setComp] = useState<CompKey>("全部");
  const [sort, setSort] = useState<SortKey>("newest");

  const filtered = cards.filter(
    (card) => comp === "全部" || card.competition === comp
  );
  const sorted = [...filtered].sort((a, b) =>
    sort === "score"
      ? getAverageScore(b.scores) - getAverageScore(a.scores)
      : (b.publishedAt || "").localeCompare(a.publishedAt || "")
  );

  return (
    <>
      <div className="filter-row" aria-label="筛选与排序">
        {compOptions.map((option) => (
          <button
            key={option}
            type="button"
            className={comp === option ? "active" : undefined}
            onClick={() => setComp(option)}
          >
            {option === "全部" ? "全部" : `竞争度 ${option}`}
          </button>
        ))}
        <button
          type="button"
          className={sort === "newest" ? "active" : undefined}
          onClick={() => setSort("newest")}
        >
          最新
        </button>
        <button
          type="button"
          className={sort === "score" ? "active" : undefined}
          onClick={() => setSort("score")}
        >
          高分优先
        </button>
      </div>

      {sorted.length > 0 ? (
        <div className="topic-grid">
          {sorted.map((card) => (
            <TopicCardPreview card={card} key={card.id} />
          ))}
        </div>
      ) : (
        <p className="form-message">这个竞争度暂时没有选题卡，换个筛选看看。</p>
      )}
    </>
  );
}
