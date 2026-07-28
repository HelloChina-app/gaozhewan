import { createHash } from "node:crypto";

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

type RateLimitOptions = {
  limit: number;
  now?: number;
  windowMs: number;
};

type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();
const MAX_RATE_LIMIT_KEYS = 10_000;

export function getRequestKey(request: Request, scope: string) {
  const forwardedFor = request.headers.get("x-forwarded-for") || "";
  const clientIp = forwardedFor.split(",")[0]?.trim() || "unknown";
  const digest = createHash("sha256")
    .update(`${scope}:${clientIp}`)
    .digest("base64url")
    .slice(0, 24);
  return `${scope}:${digest}`;
}

export function takeRateLimit(
  key: string,
  { limit, now = Date.now(), windowMs }: RateLimitOptions
): RateLimitResult {
  const current = rateLimitStore.get(key);
  const entry =
    !current || current.resetAt <= now
      ? { count: 0, resetAt: now + windowMs }
      : current;

  entry.count += 1;
  rateLimitStore.set(key, entry);

  if (rateLimitStore.size > MAX_RATE_LIMIT_KEYS) {
    for (const [storedKey, storedEntry] of rateLimitStore) {
      if (storedEntry.resetAt <= now) rateLimitStore.delete(storedKey);
    }
    if (rateLimitStore.size > MAX_RATE_LIMIT_KEYS) {
      const oldestKey = rateLimitStore.keys().next().value as string | undefined;
      if (oldestKey) rateLimitStore.delete(oldestKey);
    }
  }

  return {
    allowed: entry.count <= limit,
    remaining: Math.max(0, limit - entry.count),
    retryAfterSeconds: Math.max(1, Math.ceil((entry.resetAt - now) / 1000))
  };
}

export function resetRateLimitsForTests() {
  rateLimitStore.clear();
}
