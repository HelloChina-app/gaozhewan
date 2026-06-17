export type GzwScore = {
  novelty: number;
  viral: number;
  accessible: number;
};

export function getAverageScore(scores: GzwScore) {
  return Number(
    ((scores.novelty + scores.viral + scores.accessible) / 3).toFixed(1)
  );
}
