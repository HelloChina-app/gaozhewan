import { CopyBriefButton } from "@/components/copy-brief-button";
import { GzwScore } from "@/components/gzw-score";
import { ProGate } from "@/components/pro-gate";
import type { TopicCard } from "@/lib/content";

type TopicCardFullProps = {
  card: TopicCard;
  showPro?: boolean;
};

export function TopicCardFull({ card, showPro = false }: TopicCardFullProps) {
  return (
    <article className="topic-full">
      <div className="card-meta">
        <span>{showPro ? "Pro 已解锁" : "免费预览"}</span>
        {showPro ? <span>时效 {card.window}</span> : null}
        {showPro ? <span>竞争度 {card.competition}</span> : null}
      </div>
      <h3>{card.title}</h3>
      <p>{card.heat}</p>

      <GzwScore scores={card.scores} compact />

      {showPro ? (
        <>
          <CopyBriefButton card={card} />

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
        </>
      ) : (
        <>
          {card.materials.length > 0 ? (
            <div className="topic-section topic-sources-public">
              <h4>公开核验来源</h4>
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
            templatesCount={card.headlines.length}
          />
        </>
      )}
    </article>
  );
}
