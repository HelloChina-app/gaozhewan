import { NextResponse } from "next/server";
import { getUsdtCheckoutConfig } from "@/lib/usdt";

export function GET() {
  const checkout = getUsdtCheckoutConfig();
  const emailDeliveryConfigured = Boolean(process.env.RESEND_API_KEY);
  const newsletterConfigured = Boolean(
    process.env.RESEND_API_KEY && process.env.RESEND_AUDIENCE_ID
  );

  return NextResponse.json(
    {
      ok: true,
      service: "gaozhewan",
      email: {
        deliveryConfigured: emailDeliveryConfigured,
        newsletterConfigured
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
