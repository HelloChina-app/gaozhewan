import { NextResponse } from "next/server";
import { emailDeliveryConfigured } from "@/lib/email";
import { labIdeaStoreEnabled } from "@/lib/lab-ideas";
import { getUsdtCheckoutConfig } from "@/lib/usdt";

export function GET() {
  const checkout = getUsdtCheckoutConfig();
  const deliveryConfigured = emailDeliveryConfigured();
  const newsletterConfigured = deliveryConfigured;

  return NextResponse.json(
    {
      ok: true,
      service: "gaozhewan",
      email: {
        deliveryConfigured,
        newsletterConfigured,
        operatorNotificationsConfigured: deliveryConfigured,
        operatorRecipientExplicitlyConfigured: Boolean(
          process.env.ORDER_NOTIFICATION_EMAIL
        )
      },
      lab: {
        intakeConfigured: labIdeaStoreEnabled(),
        notificationsConfigured: deliveryConfigured,
        paymentsConfigured: checkout.enabled
      },
      monetization: {
        asset: "USDT",
        automaticVerification: checkout.automaticVerification,
        checkoutConfigured: checkout.enabled,
        network: checkout.enabled ? checkout.network : null
      },
      timestamp: new Date().toISOString()
    },
    {
      headers: {
        "Cache-Control": "no-store"
      }
    }
  );
}
