export const DEFAULT_USDT_PRICE = "14";
export const PRO_PLAN_DAYS = 365;

export type UsdtCheckoutConfig = {
  address: string;
  amount: string;
  automaticVerification: boolean;
  enabled: boolean;
  network: string;
  planDays: number;
  planName: string;
};

function clean(value: string | undefined) {
  return value?.trim() || "";
}

export function getUsdtCheckoutConfig(): UsdtCheckoutConfig {
  const address = clean(process.env.USDT_WALLET_ADDRESS);
  const network = clean(process.env.USDT_NETWORK);
  const amount = clean(process.env.USDT_PRICE) || DEFAULT_USDT_PRICE;

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
    network,
    planDays: PRO_PLAN_DAYS,
    planName: "搞选题 Pro 年度版"
  };
}
