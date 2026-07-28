import { describe, expect, it } from "vitest";
import {
  createProAccessToken,
  verifyProAccessToken,
  type ProAccessPayload
} from "@/lib/pro-access";

const secret = "test-secret-that-is-longer-than-thirty-two-characters";
const payload: ProAccessPayload = {
  email: "reader@example.com",
  exp: Math.floor(Date.now() / 1000) + 3600,
  orderId: "GZW-TEST-001",
  plan: "pro-yearly",
  v: 1
};

describe("Pro access token", () => {
  it("round-trips a valid signed token", () => {
    const token = createProAccessToken(payload, secret);
    expect(token).not.toBeNull();
    expect(verifyProAccessToken(token || "", secret)).toEqual(payload);
  });

  it("rejects tampering and a different secret", () => {
    const token = createProAccessToken(payload, secret) || "";
    expect(verifyProAccessToken(`${token}x`, secret)).toBeNull();
    expect(
      verifyProAccessToken(
        token,
        "different-secret-that-is-also-longer-than-thirty-two"
      )
    ).toBeNull();
  });

  it("rejects expired access", () => {
    const token = createProAccessToken(
      { ...payload, exp: Math.floor(Date.now() / 1000) - 1 },
      secret
    );
    expect(verifyProAccessToken(token || "", secret)).toBeNull();
  });

  it("refuses short signing secrets", () => {
    expect(createProAccessToken(payload, "too-short")).toBeNull();
  });
});
