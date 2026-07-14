import { createHash } from "node:crypto";

export const TRON_USDT_CONTRACT = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
export const TRON_USDT_DECIMALS = 6;

const BASE58_ALPHABET =
  "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

type TronEvent = {
  block_number?: unknown;
  block_timestamp?: unknown;
  contract_address?: unknown;
  event_name?: unknown;
  result?: {
    from?: unknown;
    to?: unknown;
    value?: unknown;
  };
  transaction_id?: unknown;
};

type TronEventsResponse = {
  data?: unknown;
  success?: unknown;
};

export type TronUsdtVerification =
  | {
      blockNumber: number;
      blockTimestamp: number;
      from: string;
      ok: true;
      recipient: string;
      txHash: string;
      valueAtomic: string;
    }
  | {
      ok: false;
      reason:
        | "invalid_tx_hash"
        | "not_confirmed"
        | "underpaid"
        | "upstream_error"
        | "wrong_recipient"
        | "wrong_token";
    };

function doubleSha256(value: Uint8Array) {
  const first = createHash("sha256").update(value).digest();
  return createHash("sha256").update(first).digest();
}

function decodeBase58(value: string) {
  let decoded = BigInt(0);

  for (const character of value) {
    const index = BASE58_ALPHABET.indexOf(character);
    if (index < 0) return null;
    decoded = decoded * BigInt(58) + BigInt(index);
  }

  let hex = decoded.toString(16);
  if (hex.length % 2) hex = `0${hex}`;
  const body = hex ? Buffer.from(hex, "hex") : Buffer.alloc(0);
  let leadingZeroes = 0;
  while (value[leadingZeroes] === "1") leadingZeroes += 1;

  return Buffer.concat([Buffer.alloc(leadingZeroes), body]);
}

function encodeBase58(value: Uint8Array) {
  let remaining = BigInt(`0x${Buffer.from(value).toString("hex")}`);
  let encoded = "";

  while (remaining > BigInt(0)) {
    const index = Number(remaining % BigInt(58));
    encoded = `${BASE58_ALPHABET[index]}${encoded}`;
    remaining /= BigInt(58);
  }

  let leadingZeroes = 0;
  while (value[leadingZeroes] === 0) leadingZeroes += 1;
  return `${"1".repeat(leadingZeroes)}${encoded}`;
}

export function tronAddressToEventHex(address: string) {
  const decoded = decodeBase58(address.trim());
  if (!decoded || decoded.length !== 25) return null;

  const payload = decoded.subarray(0, 21);
  const checksum = decoded.subarray(21);
  const expectedChecksum = doubleSha256(payload).subarray(0, 4);

  if (!checksum.equals(expectedChecksum) || payload[0] !== 0x41) return null;
  return `0x${payload.subarray(1).toString("hex")}`;
}

export function tronEventHexToAddress(eventAddress: string) {
  const normalized = eventAddress.replace(/^0x/i, "");
  if (!/^[0-9a-fA-F]{40}$/.test(normalized)) return null;

  const payload = Buffer.from(`41${normalized}`, "hex");
  const checksum = doubleSha256(payload).subarray(0, 4);
  return encodeBase58(Buffer.concat([payload, checksum]));
}

export function usdtAmountToAtomic(amount: string) {
  if (!/^\d+(\.\d{1,6})?$/.test(amount)) return null;
  const [whole, fraction = ""] = amount.split(".");
  return BigInt(`${whole}${fraction.padEnd(TRON_USDT_DECIMALS, "0")}`);
}

function normalizeEventAddress(value: unknown) {
  if (typeof value !== "string") return "";
  const normalized = value.toLowerCase();
  return normalized.startsWith("0x") ? normalized : `0x${normalized}`;
}

export async function verifyConfirmedTronUsdtTransfer({
  amount,
  recipient,
  txHash
}: {
  amount: string;
  recipient: string;
  txHash: string;
}): Promise<TronUsdtVerification> {
  const normalizedTxHash = txHash.replace(/^0x/i, "").toLowerCase();
  if (!/^[0-9a-f]{64}$/.test(normalizedTxHash)) {
    return { ok: false, reason: "invalid_tx_hash" };
  }

  const recipientHex = tronAddressToEventHex(recipient)?.toLowerCase();
  const requiredAmount = usdtAmountToAtomic(amount);
  if (!recipientHex || requiredAmount === null) {
    return { ok: false, reason: "upstream_error" };
  }

  const headers: Record<string, string> = { Accept: "application/json" };
  if (process.env.TRONGRID_API_KEY) {
    headers["TRON-PRO-API-KEY"] = process.env.TRONGRID_API_KEY;
  }

  try {
    const endpoint = `https://api.trongrid.io/v1/transactions/${normalizedTxHash}/events?only_confirmed=true`;
    let response: Response | null = null;

    for (let attempt = 0; attempt < 2; attempt += 1) {
      response = await fetch(endpoint, {
        cache: "no-store",
        headers,
        signal: AbortSignal.timeout(8_000)
      });
      if (response.ok) break;
      if (attempt === 0 && (response.status === 429 || response.status >= 500)) {
        await new Promise((resolve) => setTimeout(resolve, 350));
        continue;
      }
      return { ok: false, reason: "upstream_error" };
    }

    if (!response?.ok) return { ok: false, reason: "upstream_error" };
    const payload = (await response.json()) as TronEventsResponse;
    if (payload.success !== true || !Array.isArray(payload.data)) {
      return { ok: false, reason: "upstream_error" };
    }

    const events = payload.data as TronEvent[];
    if (events.length === 0) return { ok: false, reason: "not_confirmed" };

    const usdtTransfers = events.filter(
      (event) =>
        event.event_name === "Transfer" &&
        event.contract_address === TRON_USDT_CONTRACT &&
        event.transaction_id?.toString().toLowerCase() === normalizedTxHash
    );
    if (usdtTransfers.length === 0) return { ok: false, reason: "wrong_token" };

    const matchingTransfer = usdtTransfers.find(
      (event) => normalizeEventAddress(event.result?.to) === recipientHex
    );
    if (!matchingTransfer) return { ok: false, reason: "wrong_recipient" };

    const rawValue = matchingTransfer.result?.value;
    if (typeof rawValue !== "string" || !/^\d+$/.test(rawValue)) {
      return { ok: false, reason: "upstream_error" };
    }
    if (BigInt(rawValue) < requiredAmount) {
      return { ok: false, reason: "underpaid" };
    }

    const blockNumber = Number(matchingTransfer.block_number);
    const blockTimestamp = Number(matchingTransfer.block_timestamp);
    if (!Number.isSafeInteger(blockNumber) || !Number.isSafeInteger(blockTimestamp)) {
      return { ok: false, reason: "upstream_error" };
    }

    return {
      blockNumber,
      blockTimestamp,
      from: normalizeEventAddress(matchingTransfer.result?.from),
      ok: true,
      recipient: recipientHex,
      txHash: normalizedTxHash,
      valueAtomic: rawValue
    };
  } catch {
    return { ok: false, reason: "upstream_error" };
  }
}
