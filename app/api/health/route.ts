import { NextResponse } from "next/server";
import { getUsdtCheckoutConfig } from "@/lib/usdt";

export function GET() {
  const checkout = getUsdtCheckoutConfig();
  return NextResponse.json({
    ok: true,
    service: "gaozhewan",
    monetization: {
      asset: "USDT",
      checkoutConfigured: checkout.enabled,
      network: checkout.enabled ? checkout.network : null
    },
    timestamp: new Date().toISOString()
  });
}
