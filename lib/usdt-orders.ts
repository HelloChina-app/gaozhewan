import { createHmac } from "node:crypto";
import { get, put } from "@vercel/blob";

export type StoredUsdtOrder = {
  accessExpiresAt: number;
  blockNumber: number;
  blockTimestamp: number;
  createdAt: string;
  emailHash: string;
  orderId: string;
  paidAtomic: string;
  txHash: string;
  v: 1;
};

function orderPath(txHash: string) {
  return `orders/usdt/${txHash}.json`;
}

export function automaticUsdtOrdersEnabled() {
  return Boolean(
    (process.env.USDT_ORDER_STORE === "vercel-blob" ||
      process.env.BLOB_READ_WRITE_TOKEN) &&
      process.env.PRO_ACCESS_SECRET &&
      process.env.PRO_ACCESS_SECRET.length >= 32
  );
}

export function hashOrderEmail(email: string) {
  const secret = process.env.PRO_ACCESS_SECRET || "";
  if (secret.length < 32) return "";
  return createHmac("sha256", secret)
    .update(`order-email:${email.trim().toLowerCase()}`)
    .digest("base64url");
}

export async function readUsdtOrder(txHash: string) {
  const result = await get(orderPath(txHash), { access: "private" });
  if (!result || result.statusCode !== 200 || !result.stream) return null;

  try {
    return (await new Response(result.stream).json()) as StoredUsdtOrder;
  } catch {
    return null;
  }
}

export async function saveUsdtOrder(order: StoredUsdtOrder) {
  try {
    await put(orderPath(order.txHash), JSON.stringify(order), {
      access: "private",
      addRandomSuffix: false,
      contentType: "application/json"
    });
    return order;
  } catch (error) {
    const existing = await readUsdtOrder(order.txHash);
    if (existing) return existing;
    throw error;
  }
}
