import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const PRO_COOKIE_NAME = "gzw_pro_access";

export type ProAccessPayload = {
  email: string;
  exp: number;
  orderId: string;
  plan: "pro-yearly";
  v: 1;
};

function isPayload(value: unknown): value is ProAccessPayload {
  if (!value || typeof value !== "object") return false;
  const payload = value as Record<string, unknown>;
  return (
    payload.v === 1 &&
    payload.plan === "pro-yearly" &&
    typeof payload.email === "string" &&
    typeof payload.orderId === "string" &&
    typeof payload.exp === "number" &&
    Number.isFinite(payload.exp)
  );
}

export function verifyProAccessToken(
  token: string,
  secret = process.env.PRO_ACCESS_SECRET || ""
): ProAccessPayload | null {
  if (!secret || secret.length < 32 || token.length > 4096) return null;

  const [encodedPayload, encodedSignature, extra] = token.split(".");
  if (!encodedPayload || !encodedSignature || extra) return null;

  try {
    const expected = createHmac("sha256", secret)
      .update(encodedPayload)
      .digest();
    const actual = Buffer.from(encodedSignature, "base64url");

    if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) {
      return null;
    }

    const parsed: unknown = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf8")
    );

    if (!isPayload(parsed) || parsed.exp <= Math.floor(Date.now() / 1000)) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export async function getProAccess() {
  const cookieStore = await cookies();
  const token = cookieStore.get(PRO_COOKIE_NAME)?.value;
  return token ? verifyProAccessToken(token) : null;
}

