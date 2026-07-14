"use client";

import { useEffect, useMemo, useState } from "react";
import { TopicCardPreview } from "@/components/topic-card-preview";
import { getAverageScore } from "@/lib/score";
import { getDeadline, isClosed } from "@/lib/window";
import type { TopicCard } from "@/lib/content";

type ExplorerCard = Pick<
  TopicCard,
  "id" | "title" | "heat" | "scores" | "publishedAt"
> &
  Partial<
    Pick<TopicCard, "angles" | "competition" | "headlines" | "window">
  >;

type SortKey = "newest" | "score" | "closing";
type CompKey = "全部" | "低" | "中" | "高";
type HeatKey = "全部" | "writable" | "closed";

const compOptions: CompKey[] = ["全部", "低", "中", "高"];

// 按热度截止时间升序：越快关闭越靠前；无法解析窗口的排到最后。
// 截止时间 = 发布日 + 窗口时长，是确定值，服务端/客户端一致，排序无水合风险。
function byClosingSoon(a: ExplorerCard, b: ExplorerCard) {
  const da = a.window ? getDeadline(a.publishedAt, a.window) : null;
  const db = b.window ? getDeadline(b.publishedAt, b.window) : null;
  if (da == null && db == null) return 0;
  if (da == null) return 1;
  if (db == null) return -1;
  return da - db;
}

// 挂载后用「当前时间」修正排序：已过热度的卡沉到最后；
// 还能写的卡里越快关闭越靠前。让创作者第一眼看到「现在还来得及写」的选题。
function byClosingSoonAware(a: ExplorerCard, b: ExplorerCard, now: number) {
  const da = a.window ? getDeadline(a.publishedAt, a.window) : null;
  const db = b.window ? getDeadline(b.publishedAt, b.window) : null;
  const ca = isClosed(da, now);
  const cb = isClosed(db, now);
  if (ca !== cb) return ca ? 1 : -1; // 已过的排后面
  return byClosingSoon(a, b);
}

// 把一张卡里创作者会搜的字段拼成一段可检索文本：标题、热度、写作角度、标题模板。
function haystack(card: ExplorerCard): string {
  return [card.title, card.heat, ...(card.angles || []), ...(card.headlines || [])]
    .join(" ")
    .toLowerCase();
}

// 关键词以空格分词，全部命中才算匹配（AND）；中文无空格时即单词子串匹配。
function matchesQuery(card: ExplorerCard, terms: string[]): boolean {
  if (terms.length === 0) return true;
  const text = haystack(card);
  return terms.every((term) => text.includes(term));
}

export function TopicsExplorer({
  cards,
  showPro = false
}: {
  cards: ExplorerCard[];
  showPro?: boolean;
}) {
  const [comp, setComp] = useState<CompKey>("全部");
  const [sort, setSort] = useState<SortKey>("newest");
  const [heat, setHeat] = useState<HeatKey>("全部");
  const [query, setQuery] = useState("");
  // 挂载后才拿到「当前时间」；挂载前（含 SSR）按 null 处理，
  // 不做任何依赖当前时间的筛选/排序，保证首屏与服务端一致，无水合风险。
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
  }, []);

  const terms = useMemo(
    () => query.trim().toLowerCase().split(/\s+/).filter(Boolean),
    [query]
  );

  // 还在热度窗口内的卡数：仅挂载后可知，用于按钮提示与计数。
  const writableCount = useMemo(() => {
    if (now == null) return null;
    return cards.filter((card) =>
      card.window
        ? !isClosed(getDeadline(card.publishedAt, card.window), now)
        : false
    ).length;
  }, [cards, now]);

  const filtered = cards.filter((card) => {
    if (showPro && comp !== "全部" && card.competition !== comp) return false;
    if (!matchesQuery(card, terms)) return false;
    // 热度筛选依赖当前时间，仅挂载后生效；挂载前不过滤，保持首屏一致。
    if (showPro && heat !== "全部" && now != null && card.window) {
      const closed = isClosed(getDeadline(card.publishedAt, card.window), now);
      if (heat === "writable" && closed) return false;
      if (heat === "closed" && !closed) return false;
    }
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "score") {
      return getAverageScore(b.scores) - getAverageScore(a.scores);
    }
    if (sort === "closing") {
      return now == null ? byClosingSoon(a, b) : byClosingSoonAware(a, b, now);
    }
    return (b.publishedAt || "").localeCompare(a.publishedAt || "");
  });

  return (
    <>
      <div className="topic-search">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="搜你想写的方向，如 开源、AI 搜索、浏览器"
          aria-label="按关键词搜索选题"
        />
      </div>

      <div className="filter-row" aria-label="筛选与排序">
        {showPro
          ? compOptions.map((option) => (
              <button
                key={option}
                type="button"
                className={comp === option ? "active" : undefined}
                onClick={() => setComp(option)}
              >
                {option === "全部" ? "全部" : `竞争度 ${option}`}
              </button>
            ))
          : null}
        {showPro ? (
          <button
            type="button"
            className={heat === "writable" ? "active" : undefined}
            onClick={() => setHeat(heat === "writable" ? "全部" : "writable")}
          >
            {writableCount != null ? `还能写 ${writableCount}` : "还能写"}
          </button>
        ) : null}
        {showPro ? (
          <button
            type="button"
            className={heat === "closed" ? "active" : undefined}
            onClick={() => setHeat(heat === "closed" ? "全部" : "closed")}
          >
            热度已过
          </button>
        ) : null}
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
        {showPro ? (
          <button
            type="button"
            className={sort === "closing" ? "active" : undefined}
            onClick={() => setSort("closing")}
          >
            快关闭
          </button>
        ) : null}
      </div>

      <p className="topic-count" aria-live="polite">
        {terms.length > 0
          ? `匹配到 ${sorted.length} 条选题`
          : `共 ${sorted.length} 条选题`}
      </p>

      {sorted.length > 0 ? (
        <div className="topic-grid">
          {sorted.map((card) => (
            <TopicCardPreview card={card} key={card.id} showPro={showPro} />
          ))}
        </div>
      ) : (
        <p className="form-message">
          {heat === "writable"
            ? "这个筛选下暂时没有还在热度窗口内的选题，换个竞争度或清空搜索看看。"
            : terms.length > 0
              ? "没找到匹配的选题，换个关键词，或清空搜索看看全部。"
              : "这个筛选暂时没有选题卡，换个条件看看。"}
        </p>
      )}
    </>
  );
}
