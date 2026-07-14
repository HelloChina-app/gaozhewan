import { createHmac } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

function loadEnv(filePath) {
  if (!existsSync(filePath)) return;
  for (const line of readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const separator = trimmed.indexOf("=");
    if (separator < 1) continue;
    const key = trimmed.slice(0, separator).trim();
    let value = trimmed.slice(separator + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnv(join(process.cwd(), ".env.local"));
loadEnv(join(process.cwd(), ".env"));

function arg(name) {
  const index = process.argv.indexOf(`--${name}`);
  return index >= 0 ? process.argv[index + 1] : "";
}

const email = arg("email").trim().toLowerCase();
const orderId = arg("order").trim();
const days = Number(arg("days") || "365");
const secret = process.env.PRO_ACCESS_SECRET || "";
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://gaozhewan.com").replace(/\/$/, "");

if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
  throw new Error("A valid --email is required.");
}
if (!orderId) throw new Error("--order is required.");
if (!Number.isInteger(days) || days < 1 || days > 730) {
  throw new Error("--days must be an integer between 1 and 730.");
}
if (secret.length < 32) {
  throw new Error("PRO_ACCESS_SECRET must contain at least 32 characters.");
}

const payload = {
  v: 1,
  email,
  orderId,
  plan: "pro-yearly",
  exp: Math.floor(Date.now() / 1000) + days * 24 * 60 * 60
};
const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
const signature = createHmac("sha256", secret)
  .update(encodedPayload)
  .digest("base64url");

console.log(`${siteUrl}/api/access/redeem?token=${encodedPayload}.${signature}`);

