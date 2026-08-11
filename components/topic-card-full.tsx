import { CopyBriefButton } from "@/components/copy-brief-button";
import { ContentBody } from "@/components/content-body";
import { GzwScore } from "@/components/gzw-score";
import type { TopicCard } from "@/lib/content";

type TopicCardFullProps = {
  card: TopicCard;
  headingLevel?: "h1" | "h3";
};

export function TopicCardFull({
  card,
  headingLevel = "h3"
}: TopicCardFullProps) {
  const Title = headingLevel;
  const SectionTitle = headingLevel === "h1" ? "h2" : "h4";

  return (
    <article className="topic-full">
      <div className="card-meta">
        <span>完整公开</span>
        <span>时效 {card.window}</span>
        <span>竞争度 {card.competition}</span>
      </div>
      <Title>{card.title}</Title>
      <p>{card.heat}</p>

      <GzwScore scores={card.scores} compact />

      {headingLevel === "h1" && card.body.length > 0 ? (
        <section className="topic-deep-read">
          <p className="eyebrow">免费深读</p>
          <ContentBody blocks={card.body} />
        </section>
      ) : null}

      <CopyBriefButton card={card} />

      <div className="topic-section">
        <SectionTitle>推荐写作角度</SectionTitle>
        <ol>
          {card.angles.map((angle) => (
            <li key={angle}>{angle}</li>
          ))}
        </ol>
      </div>

      <div className="topic-section">
        <SectionTitle>标题模板</SectionTitle>
        <ul>
          {card.headlines.map((headline) => (
            <li key={headline}>「{headline}」</li>
          ))}
        </ul>
      </div>

      {card.materials.length > 0 ? (
        <div className="topic-section topic-sources-public">
          <SectionTitle>公开核验来源</SectionTitle>
          <p>事实、判断、写作角度和标题模板全部免费公开；引用前请回到原始来源再次核对。</p>
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
      ) : null}
    </article>
  );
}
