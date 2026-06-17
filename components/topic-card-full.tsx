import { GzwScore } from "@/components/gzw-score";
import type { TopicCard } from "@/lib/content";

type TopicCardFullProps = {
  card: TopicCard;
};

export function TopicCardFull({ card }: TopicCardFullProps) {
  return (
    <article className="topic-full">
      <div className="card-meta">
        <span>公开样品</span>
        <span>时效 {card.window}</span>
        <span>竞争度 {card.competition}</span>
      </div>
      <h3>{card.title}</h3>
      <p>{card.heat}</p>

      <GzwScore scores={card.scores} compact />

      <div className="topic-section">
        <h4>推荐写作角度</h4>
        <ol>
          {card.angles.map((angle) => (
            <li key={angle}>{angle}</li>
          ))}
        </ol>
      </div>

      <div className="topic-section">
        <h4>标题模板</h4>
        <ul>
          {card.headlines.map((headline) => (
            <li key={headline}>「{headline}」</li>
          ))}
        </ul>
      </div>

      <div className="topic-section">
        <h4>素材包</h4>
        {card.materials.map((material) => (
          <a
            href={material.url}
            key={material.url}
            rel="noopener noreferrer"
            target="_blank"
          >
            {material.label}
          </a>
        ))}
      </div>
    </article>
  );
}
