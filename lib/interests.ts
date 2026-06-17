export const interestOptions = ["搞选题", "搞工具", "搞项目", "搞副业"] as const;

export type Interest = (typeof interestOptions)[number];

export function normalizeInterest(value: unknown): Interest {
  return typeof value === "string" &&
    interestOptions.includes(value as Interest)
    ? (value as Interest)
    : "搞选题";
}
