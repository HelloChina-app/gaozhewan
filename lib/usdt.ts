import {
  getLabServicePackage,
  type LabServicePackageId
} from "@/lib/lab";

export const DEFAULT_USDT_PRICE = "14";
export const PRO_PLAN_DAYS = 365;
export const PRO_PRODUCT_ID = "pro-yearly";

export type CheckoutProductId =
  | typeof PRO_PRODUCT_ID
  | LabServicePackageId;

export type UsdtCheckoutConfig = {
  address: string;
  amount: string;
  automaticVerification: boolean;
  enabled: boolean;
  fulfillment: "lab-service" | "pro-access";
  network: string;
  planDays: number;
  planName: string;
  productId: CheckoutProductId;
};

function clean(value: string | undefined) {
  return value?.trim() || "";
}

function buildCheckoutConfig({
  amount,
  fulfillment,
  planDays,
  planName,
  productId
}: {
  amount: string;
  fulfillment: UsdtCheckoutConfig["fulfillment"];
  planDays: number;
  planName: string;
  productId: CheckoutProductId;
}): UsdtCheckoutConfig {
  const address = clean(process.env.USDT_WALLET_ADDRESS);
  const network = clean(process.env.USDT_NETWORK);

  return {
    address,
    amount,
    automaticVerification: Boolean(
      (process.env.USDT_ORDER_STORE === "vercel-blob" ||
        process.env.BLOB_READ_WRITE_TOKEN) &&
        process.env.PRO_ACCESS_SECRET &&
        process.env.PRO_ACCESS_SECRET.length >= 32 &&
        /TRON|TRC20/i.test(network)
    ),
    enabled: Boolean(
      address &&
        network &&
        /^\d+(\.\d{1,6})?$/.test(amount) &&
        Number(amount) > 0
    ),
    fulfillment,
    network,
    planDays,
    planName,
    productId
  };
}

export function getUsdtCheckoutConfig(): UsdtCheckoutConfig {
  return buildCheckoutConfig({
    amount: clean(process.env.USDT_PRICE) || DEFAULT_USDT_PRICE,
    fulfillment: "pro-access",
    planDays: PRO_PLAN_DAYS,
    planName: "搞选题 Pro 年度版",
    productId: PRO_PRODUCT_ID
  });
}

export function getUsdtCheckoutConfigForProduct(productId: unknown) {
  if (productId === PRO_PRODUCT_ID) return getUsdtCheckoutConfig();

  const labPackage = getLabServicePackage(productId);
  if (!labPackage) return null;

  return buildCheckoutConfig({
    amount: labPackage.amount,
    fulfillment: "lab-service",
    planDays: 0,
    planName: labPackage.name,
    productId: labPackage.id
  });
}
