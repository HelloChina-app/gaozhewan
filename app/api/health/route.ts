import { NextResponse } from "next/server";
import { labIdeaStoreEnabled } from "@/lib/lab-ideas";
import { getUsdtCheckoutConfig } from "@/lib/usdt";

export function GET() {
  const checkout = getUsdtCheckoutConfig();
  const emailDeliveryConfigured = Boolean(process.env.RESEND_API_KEY);
  const newsletterConfigured = emailDeliveryConfigured;

  return NextResponse.json(
    {
      ok: true,
      service: "gaozhewan",
      email: {
        deliveryConfigured: emailDeliveryConfigured,
        newsletterConfigured
      },
      lab: {
        intakeConfigured: labIdeaStoreEnabled(),
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
