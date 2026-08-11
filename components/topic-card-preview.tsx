import Link from "next/link";
import { GzwScore } from "@/components/gzw-score";
import type { TopicCard } from "@/lib/content";

type TopicCardPreviewProps = {
  card: Pick<TopicCard, "id" | "title" | "heat" | "scores" | "publishedAt"> &
    Partial<Pick<TopicCard, "window" | "competition">>;
};

export function TopicCardPreview({ card }: TopicCardPreviewProps) {
  return (
    <Link className="topic-preview" href={`/topic/${card.id}`}>
      <div className="card-meta">
        <span>选题雷达</span>
        {card.window ? <span>窗口 {card.window}</span> : null}
        {card.competition ? (
          <span>竞争度 {card.competition}</span>
        ) : null}
      </div>
      <h3>{card.title}</h3>
      <p>{card.heat}</p>
      <GzwScore scores={card.scores} compact />
      <div className="topic-mask">
        <span>完整角度</span>
        <span>标题模板</span>
      </div>
    </Link>
  );
}
