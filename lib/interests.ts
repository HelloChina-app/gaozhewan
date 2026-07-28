export const interestOptions = [
  "搞选题",
  "搞工具",
  "自己玩 DIY",
  "一起玩共建"
] as const;

export type Interest = (typeof interestOptions)[number];

export function normalizeInterest(value: unknown): Interest {
  return typeof value === "string" &&
    interestOptions.includes(value as Interest)
    ? (value as Interest)
    : "搞选题";
}
