import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) {
    return;
  }

  const lines = readFileSync(filePath, "utf8").split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmed.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    let value = trimmed.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (key && !process.env[key]) {
      process.env[key] = value;
    }
  }
}

for (const fileName of [".env.local", ".env"]) {
  loadEnvFile(join(process.cwd(), fileName));
}

const requiredProductionVars = [
  "NEXT_PUBLIC_SITE_URL",
  "RESEND_API_KEY",
  "USDT_NETWORK",
  "USDT_WALLET_ADDRESS",
  "USDT_PRICE",
  "PRO_ACCESS_SECRET",
  "USDT_ORDER_STORE"
];

const isProductionCheck = process.argv.includes("--production");
const missing = requiredProductionVars.filter((key) => !process.env[key]);
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const urlErrors = [];
const paymentErrors = [];

if (siteUrl) {
  try {
    const parsedUrl = new URL(siteUrl);

    if (isProductionCheck && parsedUrl.protocol !== "https:") {
      urlErrors.push("NEXT_PUBLIC_SITE_URL must use https in production.");
    }
  } catch {
    urlErrors.push("NEXT_PUBLIC_SITE_URL must be a valid absolute URL.");
  }
}

if (
  process.env.USDT_PRICE &&
  (!/^\d+(\.\d{1,6})?$/.test(process.env.USDT_PRICE) ||
    Number(process.env.USDT_PRICE) <= 0)
) {
  paymentErrors.push("USDT_PRICE must be a positive decimal amount.");
}

if (
  process.env.PRO_ACCESS_SECRET &&
  process.env.PRO_ACCESS_SECRET.length < 32
) {
  paymentErrors.push("PRO_ACCESS_SECRET must contain at least 32 characters.");
}

if (
  process.env.USDT_ORDER_STORE &&
  process.env.USDT_ORDER_STORE !== "vercel-blob"
) {
  paymentErrors.push('USDT_ORDER_STORE must be "vercel-blob".');
}

if (!isProductionCheck) {
  console.log("Local env check complete. Production-only values may be empty.");
  process.exit(0);
}

if (missing.length > 0 || urlErrors.length > 0 || paymentErrors.length > 0) {
  for (const key of missing) {
    console.error(`Missing required production env var: ${key}`);
  }

  for (const error of urlErrors) {
    console.error(error);
  }

  for (const error of paymentErrors) {
    console.error(error);
  }

  process.exit(1);
}

console.log("Production env check passed.");
