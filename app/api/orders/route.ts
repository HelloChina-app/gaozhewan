import { createHash, randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import {
  emailDeliveryConfigured,
  getTransactionalFromEmail,
  sendTransactionalEmail
} from "@/lib/email";
import { createProAccessToken } from "@/lib/pro-access";
import { readLabIdea, type StoredLabIdea } from "@/lib/lab-ideas";
import { notifyVerifiedOrder } from "@/lib/notifications";
import { getRequestKey, takeRateLimit } from "@/lib/request-guard";
import { site } from "@/lib/site";
import { verifyConfirmedTronUsdtTransfer } from "@/lib/tron-usdt";
import {
  getUsdtCheckoutConfigForProduct,
  PRO_PRODUCT_ID,
  type UsdtCheckoutConfig
} from "@/lib/usdt";
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
  productId?: unknown;
  referenceId?: unknown;
  senderAddress?: unknown;
  txHash?: unknown;
};

function text(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

function createOrderId() {
  const day = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  return `GZW-${day}-${randomBytes(3).toString("hex").toUpperCase()}`;
}

function createManualOrderId(txHash: string) {
  return `GZW-MAN-${txHash.slice(0, 10).toUpperCase()}`;
}

function emailPayloadHash(value: string) {
  return createHash("sha256").update(value).digest("base64url").slice(0, 16);
}

function storedOrderMatches(
  order: StoredUsdtOrder,
  checkout: UsdtCheckoutConfig,
  referenceId: string
) {
  const storedProductId = order.productId || PRO_PRODUCT_ID;
  return (
    storedProductId === checkout.productId &&
    (checkout.fulfillment !== "lab-service" ||
      order.referenceId === referenceId)
  );
}

function orderResult(
  order: StoredUsdtOrder,
  checkout: UsdtCheckoutConfig,
  email: string
) {
  if (checkout.fulfillment === "lab-service") {
    return {
      fulfillment: checkout.fulfillment,
      ok: true,
      orderId: order.orderId,
      productId: checkout.productId,
      receiptSent: false,
      referenceId: order.referenceId,
      verified: true
    };
  }

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
        fulfillment: checkout.fulfillment,
        ok: true,
        orderId: order.orderId,
        productId: checkout.productId,
        receiptSent: false,
        verified: true
      }
    : null;
}

async function verifiedOrderResult(
  order: StoredUsdtOrder,
  checkout: UsdtCheckoutConfig,
  email: string,
  idea?: StoredLabIdea | null
) {
  const result = orderResult(order, checkout, email);
  if (!result) return null;

  let receiptSent = false;
  try {
    const notifications = await notifyVerifiedOrder({
      accessUrl: "accessUrl" in result ? result.accessUrl : undefined,
      checkout,
      email,
      idea,
      order
    });
    receiptSent = notifications.customerDelivered;
  } catch (error) {
    console.error(
      "Verified order notification failed:",
      error instanceof Error ? error.name : "unknown"
    );
  }

  return { ...result, receiptSent };
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

  const rateLimit = takeRateLimit(getRequestKey(request, "usdt-order"), {
    limit: 12,
    windowMs: 15 * 60 * 1000
  });
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "核验请求过于频繁，请稍后再试。" },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfterSeconds) }
      }
    );
  }

  let input: OrderInput;
  try {
    input = (await request.json()) as OrderInput;
  } catch {
    return NextResponse.json({ error: "订单数据格式无效。" }, { status: 400 });
  }

  const productId = text(input.productId, 80) || PRO_PRODUCT_ID;
  const checkout = getUsdtCheckoutConfigForProduct(productId);
  if (!checkout) {
    return NextResponse.json({ error: "付款产品无效。" }, { status: 400 });
  }

  if (!checkout.enabled) {
    return NextResponse.json({ error: "USDT 收银台暂未开放。" }, { status: 503 });
  }

  if (text(input.company, 200)) {
    return NextResponse.json({ ok: true, orderId: "GZW-RECEIVED" }, { status: 202 });
  }

  const email = text(input.email, 254).toLowerCase();
  const txHash = text(input.txHash, 160);
  const senderAddress = text(input.senderAddress, 180);
  const note = text(input.note, 500);
  const referenceId = text(input.referenceId, 80).toUpperCase();
  let labIdea: StoredLabIdea | null = null;

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

  if (checkout.fulfillment === "lab-service") {
    if (!/^GZL-\d{8}-[0-9A-F]{8}$/.test(referenceId)) {
      return NextResponse.json(
        { error: "实验室创意编号无效，请先提交创意。" },
        { status: 400 }
      );
    }

    try {
      labIdea = await readLabIdea(referenceId);
    } catch {
      return NextResponse.json(
        { error: "暂时无法读取实验室创意，请稍后重试。" },
        { status: 503 }
      );
    }

    if (!labIdea) {
      return NextResponse.json(
        { error: "没有找到该实验室创意，请返回重新提交。" },
        { status: 404 }
      );
    }

    if (
      labIdea.contactEmail !== email ||
      labIdea.selectedPackageId !== checkout.productId
    ) {
      return NextResponse.json(
        { error: "邮箱或服务档位与创意提交记录不一致。" },
        { status: 409 }
      );
    }
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

        if (!storedOrderMatches(existing, checkout, referenceId)) {
          return NextResponse.json(
            { error: "该交易哈希已经用于其他产品或项目。" },
            { status: 409 }
          );
        }

        const result = await verifiedOrderResult(
          existing,
          checkout,
          email,
          labIdea
        );
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
        productId: checkout.productId,
        referenceId: referenceId || undefined,
        txHash: normalizedTxHash
      });

      if (order.emailHash !== emailHash) {
        return NextResponse.json(
          { error: "该交易哈希已经用于其他订单。" },
          { status: 409 }
        );
      }

      if (!storedOrderMatches(order, checkout, referenceId)) {
        return NextResponse.json(
          { error: "该交易哈希已经用于其他产品或项目。" },
          { status: 409 }
        );
      }

      const result = await verifiedOrderResult(
        order,
        checkout,
        email,
        labIdea
      );
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

  if (!emailDeliveryConfigured()) {
    return NextResponse.json(
      {
        error: "自动登记暂不可用，请使用页面下方的邮件登记。",
        fallbackEmail: site.email
      },
      { status: 503 }
    );
  }

  const orderId = createManualOrderId(normalizedTxHash);
  const from = getTransactionalFromEmail();
  const operator = process.env.ORDER_NOTIFICATION_EMAIL || site.email;
  const orderText = [
    `订单号：${orderId}`,
    `产品：${checkout.planName}`,
    `产品 ID：${checkout.productId}`,
    `实验室创意编号：${referenceId || "不适用"}`,
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
  const receiptText = [
    `你的订单 ${orderId} 已登记。`,
    `产品：${checkout.planName}`,
    ...(referenceId ? [`实验室创意编号：${referenceId}`] : []),
    `待核验：${checkout.amount} USDT / ${checkout.network}`,
    `交易哈希：${txHash}`,
    "",
    checkout.fulfillment === "pro-access"
      ? "订单提交不等于付款确认。核验通过后，页面会立即生成一年期 Pro 访问链接；邮件服务可用时也会发送副本。"
      : "订单提交不等于付款确认。核验通过后，我们会按实验室创意编号确认范围和排期。",
    `如需帮助，请联系 ${site.email}。`
  ].join("\n");

  const operatorResponse = await sendTransactionalEmail({
    idempotencyKey: `manual-order/${normalizedTxHash}/operator/${emailPayloadHash(orderText)}`,
    payload: {
      from,
      to: [operator],
      reply_to: email,
      subject: `[USDT 待核验] ${orderId}`,
      text: orderText
    }
  });

  if (!operatorResponse.delivered) {
    return NextResponse.json(
      {
        error: "自动登记暂不可用，请使用页面下方的邮件登记。",
        fallbackEmail: site.email
      },
      { status: 502 }
    );
  }

  const receiptResponse = await sendTransactionalEmail({
    idempotencyKey: `manual-order/${normalizedTxHash}/customer/${emailPayloadHash(receiptText)}`,
    payload: {
      from,
      to: [email],
      subject: `${checkout.planName}订单已登记：${orderId}`,
      text: receiptText
    }
  });

  return NextResponse.json(
    {
      fulfillment: checkout.fulfillment,
      ok: true,
      orderId,
      productId: checkout.productId,
      receiptSent: receiptResponse.delivered,
      referenceId: referenceId || undefined,
      verified: false
    },
    {
      status: 202,
      headers: { "Cache-Control": "no-store" }
    }
  );
}
