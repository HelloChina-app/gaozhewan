import { CopyBriefButton } from "@/components/copy-brief-button";
import { ContentBody } from "@/components/content-body";
import { GzwScore } from "@/components/gzw-score";
import { ProGate } from "@/components/pro-gate";
import type { TopicCard } from "@/lib/content";

type TopicCardFullProps = {
  card: TopicCard;
  headingLevel?: "h1" | "h3";
  showPro?: boolean;
};

export function TopicCardFull({
  card,
  headingLevel = "h3",
  showPro = false
}: TopicCardFullProps) {
  const Title = headingLevel;
  const SectionTitle = headingLevel === "h1" ? "h2" : "h4";

  return (
    <article className="topic-full">
      <div className="card-meta">
        <span>{showPro ? "Pro 已解锁" : "免费预览"}</span>
        {showPro ? <span>时效 {card.window}</span> : null}
        {showPro ? <span>竞争度 {card.competition}</span> : null}
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

      {showPro ? (
        <>
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

          <div className="topic-section">
            <SectionTitle>素材包</SectionTitle>
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
        </>
      ) : (
        <>
          {card.materials.length > 0 ? (
            <div className="topic-section topic-sources-public">
              <SectionTitle>公开核验来源</SectionTitle>
              <p>事实与热度可免费核验；Pro 只锁定写作角度、标题模板和执行素材包。</p>
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
          <ProGate
            anglesCount={card.angles.length}
            headingLevel={headingLevel === "h1" ? "h2" : "h4"}
            templatesCount={card.headlines.length}
          />
        </>
      )}
    </article>
  );
}
