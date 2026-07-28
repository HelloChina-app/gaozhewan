import { afterEach, describe, expect, it, vi } from "vitest";
import {
  getUsdtCheckoutConfig,
  getUsdtCheckoutConfigForProduct
} from "@/lib/usdt";

afterEach(() => vi.unstubAllEnvs());

describe("USDT checkout configuration", () => {
  it("requires a wallet, network and positive decimal amount", () => {
    vi.stubEnv("USDT_WALLET_ADDRESS", "");
    vi.stubEnv("USDT_NETWORK", "TRON (TRC20)");
    vi.stubEnv("USDT_PRICE", "14");
    expect(getUsdtCheckoutConfig().enabled).toBe(false);

    vi.stubEnv("USDT_WALLET_ADDRESS", "TRON_TEST_ADDRESS");
    vi.stubEnv("USDT_PRICE", "-1");
    expect(getUsdtCheckoutConfig().enabled).toBe(false);
  });

  it("only enables automatic verification for the TRON private-store path", () => {
    vi.stubEnv("USDT_WALLET_ADDRESS", "TRON_TEST_ADDRESS");
    vi.stubEnv("USDT_NETWORK", "TRON (TRC20)");
    vi.stubEnv("USDT_PRICE", "14");
    vi.stubEnv("USDT_ORDER_STORE", "vercel-blob");
    vi.stubEnv(
      "PRO_ACCESS_SECRET",
      "test-secret-that-is-longer-than-thirty-two-characters"
    );

    const config = getUsdtCheckoutConfig();
    expect(config.enabled).toBe(true);
    expect(config.automaticVerification).toBe(true);

    vi.stubEnv("USDT_NETWORK", "Ethereum (ERC20)");
    expect(getUsdtCheckoutConfig().automaticVerification).toBe(false);
  });

  it("rejects unknown product IDs", () => {
    expect(getUsdtCheckoutConfigForProduct("not-a-product")).toBeNull();
  });
});
