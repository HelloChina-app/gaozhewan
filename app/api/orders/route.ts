import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { createProAccessToken } from "@/lib/pro-access";
import { site } from "@/lib/site";
import { verifyConfirmedTronUsdtTransfer } from "@/lib/tron-usdt";
import { getUsdtCheckoutConfig } from "@/lib/usdt";
import {
  automaticUsdtOrdersEnabled,
  hashOrderEmail,
  readUsdtOrder,
  saveUsdtOrder,
  type StoredUsdtOrder
} from "@/lib/usdt-orders";

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

function accessResult(order: StoredUsdtOrder, email: string) {
  const token = createProAccessToken({
    v: 1,
    email,
    orderId: order.orderId,
    plan: "pro-yearly",
    exp: order.accessExpiresAt
  });

  return token
    ? {
        accessUrl: `/api/access/redeem?token=${encodeURIComponent(token)}`,
        ok: true,
        orderId: order.orderId,
        receiptSent: false,
        verified: true
      }
    : null;
}

function verificationError(
  reason:
    | "invalid_tx_hash"
    | "not_confirmed"
    | "underpaid"
    | "upstream_error"
    | "wrong_recipient"
    | "wrong_token"
) {
  if (reason === "not_confirmed") {
    return NextResponse.json(
      { error: "暂未查到这笔已确认交易，请等待链上确认后重试。" },
      { status: 409 }
    );
  }

  if (reason === "upstream_error") {
    return NextResponse.json(
      {
        error: "链上核验服务暂不可用，请稍后重试或改用邮件登记。",
        fallbackEmail: site.email
      },
      { status: 503 }
    );
  }

  const messages = {
    invalid_tx_hash: "交易哈希格式无效。",
    underpaid: "该交易的 USDT 到账金额不足。",
    wrong_recipient: "该交易未转入本站公布的收款地址。",
    wrong_token: "该交易不是 Tether 官方 TRC20 USDT 转账。"
  } as const;

  return NextResponse.json({ error: messages[reason] }, { status: 422 });
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

  if (!/^(0x)?[0-9a-fA-F]{64}$/.test(txHash)) {
    return NextResponse.json({ error: "交易哈希格式无效。" }, { status: 400 });
  }

  if (input.networkConfirmed !== true) {
    return NextResponse.json(
      { error: "请先确认 USDT 网络和金额。" },
      { status: 400 }
    );
  }

  const normalizedTxHash = txHash.replace(/^0x/i, "").toLowerCase();

  if (checkout.automaticVerification && automaticUsdtOrdersEnabled()) {
    try {
      const emailHash = hashOrderEmail(email);
      const existing = await readUsdtOrder(normalizedTxHash);

      if (existing) {
        if (existing.emailHash !== emailHash) {
          return NextResponse.json(
            { error: "该交易哈希已经用于其他订单。" },
            { status: 409 }
          );
        }

        const result = accessResult(existing, email);
        return result
          ? NextResponse.json(result, {
              status: 202,
              headers: { "Cache-Control": "no-store" }
            })
          : NextResponse.json(
              { error: "访问权生成失败，请联系人工处理。" },
              { status: 503 }
            );
      }

      const verification = await verifyConfirmedTronUsdtTransfer({
        amount: checkout.amount,
        recipient: checkout.address,
        txHash: normalizedTxHash
      });

      if (!verification.ok) return verificationError(verification.reason);

      const now = Math.floor(Date.now() / 1000);
      const order = await saveUsdtOrder({
        v: 1,
        accessExpiresAt: now + checkout.planDays * 24 * 60 * 60,
        blockNumber: verification.blockNumber,
        blockTimestamp: verification.blockTimestamp,
        createdAt: new Date().toISOString(),
        emailHash,
        orderId: createOrderId(),
        paidAtomic: verification.valueAtomic,
        txHash: normalizedTxHash
      });

      if (order.emailHash !== emailHash) {
        return NextResponse.json(
          { error: "该交易哈希已经用于其他订单。" },
          { status: 409 }
        );
      }

      const result = accessResult(order, email);
      return result
        ? NextResponse.json(result, {
            status: 202,
            headers: { "Cache-Control": "no-store" }
          })
        : NextResponse.json(
            { error: "访问权生成失败，请联系人工处理。" },
            { status: 503 }
          );
    } catch (error) {
      console.error(
        "Automatic USDT order intake failed:",
        error instanceof Error ? error.name : "unknown"
      );
    }
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error: "自动登记暂不可用，请使用页面下方的邮件登记。",
        fallbackEmail: site.email
      },
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
      {
        error: "自动登记暂不可用，请使用页面下方的邮件登记。",
        fallbackEmail: site.email
      },
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
