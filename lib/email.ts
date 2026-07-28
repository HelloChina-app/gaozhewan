export type TransactionalEmailPayload = {
  from: string;
  reply_to?: string;
  subject: string;
  text: string;
  to: string[];
};

export type EmailDeliveryResult = {
  configured: boolean;
  delivered: boolean;
  status: number | null;
};

export function emailDeliveryConfigured() {
  return Boolean(process.env.RESEND_API_KEY);
}

export function getTransactionalFromEmail() {
  return (
    process.env.PAYMENT_FROM_EMAIL ||
    process.env.SUBSCRIBE_FROM_EMAIL ||
    "搞着玩 <news@gaozhewan.com>"
  );
}

export async function sendTransactionalEmail({
  idempotencyKey,
  payload
}: {
  idempotencyKey: string;
  payload: TransactionalEmailPayload;
}): Promise<EmailDeliveryResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { configured: false, delivered: false, status: null };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": idempotencyKey.slice(0, 256)
      },
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: AbortSignal.timeout(8_000)
    });

    return {
      configured: true,
      delivered: response.ok,
      status: response.status
    };
  } catch {
    return { configured: true, delivered: false, status: null };
  }
}
