import Link from "next/link";
import { GzwScore } from "@/components/gzw-score";
import { TopicUrgency } from "@/components/topic-urgency";
import type { TopicCard } from "@/lib/content";

type TopicCardPreviewProps = {
  card: TopicCard;
};

export function TopicCardPreview({ card }: TopicCardPreviewProps) {
  return (
    <Link className="topic-preview" href={`/topic/${card.id}`}>
      <div className="card-meta">
        <span>选题雷达</span>
        <span>窗口 {card.window}</span>
        <span>竞争度 {card.competition}</span>
        <TopicUrgency publishedAt={card.publishedAt} window={card.window} />
      </div>
      <h3>{card.title}</h3>
      <p>{card.heat}</p>
      <GzwScore scores={card.scores} compact />
      <div className="topic-mask">
        <span>{card.angles[0]}</span>
        <span>{card.headlines[0]}</span>
      </div>
    </Link>
  );
}
