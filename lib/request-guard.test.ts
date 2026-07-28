import { beforeEach, describe, expect, it } from "vitest";
import {
  getRequestKey,
  resetRateLimitsForTests,
  takeRateLimit
} from "@/lib/request-guard";

describe("request guard", () => {
  beforeEach(() => resetRateLimitsForTests());

  it("allows requests up to the configured limit", () => {
    expect(
      takeRateLimit("subscribe:test", {
        limit: 2,
        now: 1_000,
        windowMs: 10_000
      })
    ).toMatchObject({ allowed: true, remaining: 1 });
    expect(
      takeRateLimit("subscribe:test", {
        limit: 2,
        now: 2_000,
        windowMs: 10_000
      })
    ).toMatchObject({ allowed: true, remaining: 0 });
    expect(
      takeRateLimit("subscribe:test", {
        limit: 2,
        now: 3_000,
        windowMs: 10_000
      })
    ).toMatchObject({ allowed: false, remaining: 0 });
  });

  it("resets a bucket after the window", () => {
    takeRateLimit("lab:test", { limit: 1, now: 1_000, windowMs: 1_000 });
    expect(
      takeRateLimit("lab:test", {
        limit: 1,
        now: 2_000,
        windowMs: 1_000
      }).allowed
    ).toBe(true);
  });

  it("does not retain the raw forwarded IP", () => {
    const request = new Request("https://gaozhewan.com/api/subscribe", {
      headers: { "x-forwarded-for": "203.0.113.42, 10.0.0.1" }
    });
    const key = getRequestKey(request, "subscribe");

    expect(key).toMatch(/^subscribe:[A-Za-z0-9_-]{24}$/);
    expect(key).not.toContain("203.0.113.42");
  });
});
