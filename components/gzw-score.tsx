import { getAverageScore, type GzwScore } from "@/lib/score";

type GzwScoreProps = {
  scores: GzwScore;
  compact?: boolean;
};

const scoreItems = [
  { key: "novelty", label: "新奇度" },
  { key: "viral", label: "传播潜力" },
  { key: "accessible", label: "国内可用" }
] as const;

export function GzwScore({ scores, compact = false }: GzwScoreProps) {
  const average = getAverageScore(scores);

  return (
    <div className={compact ? "score score-compact" : "score"}>
      <div className="score-head">
        <span>搞着玩指数</span>
        <strong>{average}</strong>
      </div>
      <div className="score-bars">
        {scoreItems.map((item) => {
          const value = scores[item.key];

          return (
            <div className="score-row" key={item.key}>
              <span>{item.label}</span>
              <div className="score-track" aria-hidden="true">
                <i style={{ width: `${Math.max(0, Math.min(value, 10)) * 10}%` }} />
              </div>
              <b>{value.toFixed(1)}</b>
            </div>
          );
        })}
      </div>
    </div>
  );
}
