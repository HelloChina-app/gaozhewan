"use client";

import { useState } from "react";
import { TopicCardPreview } from "@/components/topic-card-preview";
import { getAverageScore } from "@/lib/score";
import { getDeadline } from "@/lib/window";
import type { TopicCard } from "@/lib/content";

type SortKey = "newest" | "score" | "closing";
type CompKey = "全部" | "低" | "中" | "高";

const compOptions: CompKey[] = ["全部", "低", "中", "高"];

// 按热度截止时间升序：越快关闭越靠前；无法解析窗口的排到最后。
// 截止时间 = 发布日 + 窗口时长，是确定值，服务端/客户端一致，排序无水合风险。
function byClosingSoon(a: TopicCard, b: TopicCard) {
  const da = getDeadline(a.publishedAt, a.window);
  const db = getDeadline(b.publishedAt, b.window);
  if (da == null && db == null) return 0;
  if (da == null) return 1;
  if (db == null) return -1;
  return da - db;
}

export function TopicsExplorer({ cards }: { cards: TopicCard[] }) {
  const [comp, setComp] = useState<CompKey>("全部");
  const [sort, setSort] = useState<SortKey>("newest");

  const filtered = cards.filter(
    (card) => comp === "全部" || card.competition === comp
  );
  const sorted = [...filtered].sort((a, b) => {
    if (sort === "score") {
      return getAverageScore(b.scores) - getAverageScore(a.scores);
    }
    if (sort === "closing") {
      return byClosingSoon(a, b);
    }
    return (b.publishedAt || "").localeCompare(a.publishedAt || "");
  });

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
        <button
          type="button"
          className={sort === "closing" ? "active" : undefined}
          onClick={() => setSort("closing")}
        >
          快关闭
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
