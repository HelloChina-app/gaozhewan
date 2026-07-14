import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { site } from "@/lib/site";
import { getUsdtCheckoutConfig } from "@/lib/usdt";

export const runtime = "nodejs";

type OrderInput = {
  company?: unknown;
  email?: unknown;
  networkConfirmed?: unknown;
  note?: unknown;
  senderAddress?: unknown;
  txHash?: unknown;
};

function text(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

async function sendEmail(
  apiKey: string,
  payload: Record<string, unknown>
) {
  return fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload),
    cache: "no-store"
  });
}

function createOrderId() {
  const day = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  return `GZW-${day}-${randomBytes(3).toString("hex").toUpperCase()}`;
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || "0");
  if (contentLength > 12_000) {
    return NextResponse.json({ error: "请求内容过大。" }, { status: 413 });
  }

  const checkout = getUsdtCheckoutConfig();
  if (!checkout.enabled) {
    return NextResponse.json({ error: "USDT 收银台暂未开放。" }, { status: 503 });
  }

  let input: OrderInput;
  try {
    input = (await request.json()) as OrderInput;
  } catch {
    return NextResponse.json({ error: "订单数据格式无效。" }, { status: 400 });
  }

  if (text(input.company, 200)) {
    return NextResponse.json({ ok: true, orderId: "GZW-RECEIVED" }, { status: 202 });
  }

  const email = text(input.email, 254).toLowerCase();
  const txHash = text(input.txHash, 160);
  const senderAddress = text(input.senderAddress, 180);
  const note = text(input.note, 500);

  if (!isEmail(email)) {
    return NextResponse.json({ error: "请输入有效邮箱。" }, { status: 400 });
  }

  if (!/^(0x)?[A-Za-z0-9]{32,128}$/.test(txHash)) {
    return NextResponse.json({ error: "交易哈希格式无效。" }, { status: 400 });
  }

  if (input.networkConfirmed !== true) {
    return NextResponse.json(
      { error: "请先确认 USDT 网络和金额。" },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "订单通知服务暂不可用，请稍后重试。" },
      { status: 503 }
    );
  }

  const orderId = createOrderId();
  const from =
    process.env.PAYMENT_FROM_EMAIL ||
    process.env.SUBSCRIBE_FROM_EMAIL ||
    "Gaozhewan <news@gaozhewan.com>";
  const operator = process.env.ORDER_NOTIFICATION_EMAIL || site.email;
  const orderText = [
    `订单号：${orderId}`,
    `产品：${checkout.planName}`,
    `金额：${checkout.amount} USDT`,
    `网络：${checkout.network}`,
    `收款地址：${checkout.address}`,
    `客户邮箱：${email}`,
    `交易哈希：${txHash}`,
    `付款地址：${senderAddress || "未提供"}`,
    `备注：${note || "无"}`,
    "",
    "请人工确认：币种为 USDT、网络与收款地址正确、到账金额足够、确认数达标且 TxID 未被其他订单使用。"
  ].join("\n");

  const operatorResponse = await sendEmail(apiKey, {
    from,
    to: [operator],
    reply_to: email,
    subject: `[USDT 待核验] ${orderId}`,
    text: orderText
  });

  if (!operatorResponse.ok) {
    return NextResponse.json(
      { error: "订单通知发送失败，请稍后重试。" },
      { status: 502 }
    );
  }

  const receiptResponse = await sendEmail(apiKey, {
    from,
    to: [email],
    subject: `搞着玩 Pro 订单已登记：${orderId}`,
    text: [
      `你的订单 ${orderId} 已登记。`,
      `待核验：${checkout.amount} USDT / ${checkout.network}`,
      `交易哈希：${txHash}`,
      "",
      "订单提交不等于付款确认。核验通过后，我们会在 12 小时内把一年期 Pro 访问链接发送到本邮箱。",
      `如需帮助，请联系 ${site.email}。`
    ].join("\n")
  });

  return NextResponse.json(
    { ok: true, orderId, receiptSent: receiptResponse.ok },
    {
      status: 202,
      headers: { "Cache-Control": "no-store" }
    }
  );
}

