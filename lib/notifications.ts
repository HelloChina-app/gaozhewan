import type { StoredLabIdea } from "@/lib/lab-ideas";
import type { StoredUsdtOrder } from "@/lib/usdt-orders";
import type { UsdtCheckoutConfig } from "@/lib/usdt";
import {
  getTransactionalFromEmail,
  sendTransactionalEmail
} from "@/lib/email";
import {
  markNotificationSent,
  notificationAlreadySent
} from "@/lib/notification-markers";
import { site } from "@/lib/site";

type NotificationResult = {
  customerDelivered: boolean;
  operatorDelivered: boolean;
};

async function sendOnce({
  key,
  payload
}: {
  key: string;
  payload: Parameters<typeof sendTransactionalEmail>[0]["payload"];
}) {
  try {
    if (await notificationAlreadySent(key)) return true;
  } catch {
    // Email provider idempotency still protects concurrent retries for 24 hours.
  }

  const delivery = await sendTransactionalEmail({
    idempotencyKey: key,
    payload
  });
  if (!delivery.delivered) return false;

  try {
    await markNotificationSent(key);
  } catch (error) {
    console.error(
      "Notification marker write failed:",
      error instanceof Error ? error.name : "unknown"
    );
  }
  return true;
}

export async function notifyLabIdeaSubmitted(
  idea: StoredLabIdea
): Promise<NotificationResult> {
  const from = getTransactionalFromEmail();
  const operator = process.env.ORDER_NOTIFICATION_EMAIL || site.email;
  const ideaText = [
    `创意编号：${idea.ideaId}`,
    `标题：${idea.title}`,
    `共建方式：${idea.selectedPackageId}`,
    `当前阶段：${idea.stage}`,
    `预算：${idea.budget}`,
    `联系邮箱：${idea.contactEmail}`,
    `其他联系方式：${idea.contactHandle || "未提供"}`,
    `允许后续确认后公开：${idea.publicConsent ? "是" : "否"}`,
    "",
    `真实问题：${idea.problem}`,
    "",
    `目标用户：${idea.audience}`,
    "",
    `第一版成果：${idea.outcome}`
  ].join("\n");

  const [operatorDelivered, customerDelivered] = await Promise.all([
    sendOnce({
      key: `lab-idea/${idea.ideaId}/operator`,
      payload: {
        from,
        to: [operator],
        reply_to: idea.contactEmail,
        subject: `[实验室新创意] ${idea.ideaId} · ${idea.title}`,
        text: ideaText
      }
    }),
    sendOnce({
      key: `lab-idea/${idea.ideaId}/customer`,
      payload: {
        from,
        to: [idea.contactEmail],
        subject: `搞着玩实验室已收到：${idea.ideaId}`,
        text: [
          `你的创意已私密保存，编号为 ${idea.ideaId}。`,
          `标题：${idea.title}`,
          "",
          "请保存这个编号。免费提交不保证入选；若选择付费共建，付款、范围确认和排期都会以该编号为准。",
          `如需补充信息，请联系 ${site.email}。`
        ].join("\n")
      }
    })
  ]);

  return { customerDelivered, operatorDelivered };
}

export async function notifyVerifiedOrder({
  accessUrl,
  checkout,
  email,
  idea,
  order
}: {
  accessUrl?: string;
  checkout: UsdtCheckoutConfig;
  email: string;
  idea?: StoredLabIdea | null;
  order: StoredUsdtOrder;
}): Promise<NotificationResult> {
  const from = getTransactionalFromEmail();
  const operator = process.env.ORDER_NOTIFICATION_EMAIL || site.email;
  const keyRoot = `verified-order/${order.txHash}`;
  const orderSummary = [
    `订单号：${order.orderId}`,
    `产品：${checkout.planName}`,
    `产品 ID：${checkout.productId}`,
    `金额：${checkout.amount} USDT`,
    `网络：${checkout.network}`,
    `交易哈希：${order.txHash}`,
    `实验室创意编号：${order.referenceId || "不适用"}`,
    `客户邮箱：${email}`
  ].join("\n");

  const customerText =
    checkout.fulfillment === "pro-access"
      ? [
          `订单 ${order.orderId} 已通过链上核验。`,
          "",
          accessUrl
            ? `一年期 Pro 访问链接：${site.url}${accessUrl}`
            : "访问链接暂未生成，请回复此邮件联系人工处理。",
          "",
          "该链接与本邮箱绑定，请勿公开转发。",
          `如需帮助，请联系 ${site.email}。`
        ].join("\n")
      : [
          `订单 ${order.orderId} 已通过链上核验。`,
          `实验室创意编号：${order.referenceId}`,
          "",
          "付款已与创意绑定。我们会按提交范围确认排期和下一步。",
          `如需补充信息，请联系 ${site.email}。`
        ].join("\n");

  const [operatorDelivered, customerDelivered] = await Promise.all([
    sendOnce({
      key: `${keyRoot}/operator`,
      payload: {
        from,
        to: [operator],
        reply_to: email,
        subject: `[USDT 已核验] ${order.orderId} · ${checkout.planName}`,
        text: [
          orderSummary,
          ...(idea
            ? ["", `创意标题：${idea.title}`, `期望成果：${idea.outcome}`]
            : []),
          "",
          checkout.fulfillment === "lab-service"
            ? "请确认共建范围、负责人和排期。"
            : "Pro 访问链接已在核验成功页生成；邮件副本按配置发送。"
        ].join("\n")
      }
    }),
    sendOnce({
      key: `${keyRoot}/customer`,
      payload: {
        from,
        to: [email],
        subject: `${checkout.planName}已核验：${order.orderId}`,
        text: customerText
      }
    })
  ]);

  return { customerDelivered, operatorDelivered };
}
