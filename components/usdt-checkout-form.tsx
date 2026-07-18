"use client";

import { FormEvent, useState } from "react";
import { QRCodeSVG } from "qrcode.react";

type CheckoutState =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "error"; mailto?: string; message: string }
  | {
      accessUrl?: string;
      kind: "success";
      orderId: string;
      receiptSent: boolean;
      verified: boolean;
    };

type UsdtCheckoutFormProps = {
  address: string;
  amount: string;
  automaticVerification: boolean;
  network: string;
};

export function UsdtCheckoutForm({
  address,
  amount,
  automaticVerification,
  network
}: UsdtCheckoutFormProps) {
  const [state, setState] = useState<CheckoutState>({ kind: "idle" });
  const [copied, setCopied] = useState(false);

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setState({ kind: "submitting" });

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.get("email"),
          txHash: formData.get("txHash"),
          senderAddress: formData.get("senderAddress"),
          note: formData.get("note"),
          networkConfirmed: formData.get("networkConfirmed") === "yes",
          company: formData.get("company")
        })
      });
      const result = (await response.json()) as {
        accessUrl?: string;
        error?: string;
        fallbackEmail?: string;
        orderId?: string;
        receiptSent?: boolean;
        verified?: boolean;
      };

      if (!response.ok || !result.orderId) {
        if (result.fallbackEmail) {
          const email = String(formData.get("email") || "");
          const txHash = String(formData.get("txHash") || "");
          const senderAddress = String(formData.get("senderAddress") || "");
          const note = String(formData.get("note") || "");
          const subject = `搞着玩 Pro USDT 核验：${txHash.slice(0, 12)}`;
          const body = [
            "请核验以下搞着玩 Pro USDT 付款：",
            "",
            `客户邮箱：${email}`,
            `金额：${amount} USDT`,
            `网络：${network}`,
            `收款地址：${address}`,
            `交易哈希：${txHash}`,
            `付款地址：${senderAddress || "未提供"}`,
            `备注：${note || "无"}`
          ].join("\n");

          setState({
            kind: "error",
            message: result.error || "请改用邮件登记。",
            mailto: `mailto:${result.fallbackEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
          });
          return;
        }

        throw new Error(result.error || "订单提交失败，请稍后重试。");
      }

      setState({
        accessUrl: result.accessUrl,
        kind: "success",
        orderId: result.orderId,
        receiptSent: Boolean(result.receiptSent),
        verified: Boolean(result.verified)
      });
      form.reset();
    } catch (error) {
      setState({
        kind: "error",
        message: error instanceof Error ? error.message : "订单提交失败，请稍后重试。"
      });
    }
  }

  return (
    <div className="checkout-panel">
      <div className="payment-summary">
        <div>
          <span>应付</span>
          <strong>{amount} USDT</strong>
        </div>
        <div>
          <span>唯一支持网络</span>
          <strong>{network}</strong>
        </div>
      </div>

      <div className="payment-method">
        <div className="payment-qr">
          <QRCodeSVG
            aria-label={`TRON 收款地址二维码：${address}`}
            bgColor="#ffffff"
            fgColor="#111111"
            level="M"
            marginSize={2}
            role="img"
            size={220}
            title="扫描二维码填写 TRON 收款地址"
            value={address}
          />
          <strong>扫码填写收款地址</strong>
          <span>电脑端可直接用钱包扫描</span>
        </div>

        <div className="wallet-address">
          <span>USDT 收款地址</span>
          <code>{address}</code>
          <button className="text-button" type="button" onClick={copyAddress}>
            {copied ? "已复制" : "复制地址"}
          </button>
          <p>
            二维码只包含收款地址，不会自动替你确认币种或金额。扫码后仍须选择
            USDT，并核对网络为 {network}、金额为 {amount} USDT。
          </p>
        </div>
      </div>

      <div className="payment-warning" role="note">
        只发送 USDT，并严格使用 <strong>{network}</strong>。转错网络、币种或地址可能无法找回。
      </div>

      {state.kind === "success" ? (
        <div className="order-success" role="status">
          <p className="eyebrow">订单已登记</p>
          <h2>{state.orderId}</h2>
          {state.verified && state.accessUrl ? (
            <>
              <p>链上核验已通过，该 TxID 已登记并锁定，不能重复开通。</p>
              <a className="button" href={state.accessUrl}>
                立即解锁 365 天 Pro
              </a>
            </>
          ) : (
            <>
              <p>
                我们会人工核对链上到账情况，通常在 12 小时内把一年期 Pro 访问链接发送到你的邮箱。
              </p>
              <p>
                {state.receiptSent
                  ? "订单回执已发送，请同时检查垃圾邮件。"
                  : "回执邮件暂未送达，但订单通知已登记；请保存本页订单号。"}
              </p>
            </>
          )}
        </div>
      ) : (
        <form className="checkout-form" onSubmit={onSubmit}>
          <label>
            接收访问链接的邮箱
            <input
              autoComplete="email"
              name="email"
              placeholder="you@example.com"
              required
              type="email"
            />
          </label>
          <label>
            交易哈希（TxID）
            <input
              autoCapitalize="none"
              autoComplete="off"
              name="txHash"
              placeholder="粘贴链上交易哈希"
              required
              spellCheck={false}
              type="text"
            />
          </label>
          <label>
            付款钱包地址（可选，便于核对）
            <input
              autoCapitalize="none"
              autoComplete="off"
              name="senderAddress"
              placeholder="你的发送地址"
              spellCheck={false}
              type="text"
            />
          </label>
          <label>
            备注（可选）
            <textarea
              maxLength={500}
              name="note"
              placeholder="需要说明的付款情况"
              rows={3}
            />
          </label>
          <label className="checkout-confirm">
            <input name="networkConfirmed" required type="checkbox" value="yes" />
            <span>
              我已确认：付款币种为 USDT，网络为 {network}，金额为 {amount} USDT。
            </span>
          </label>
          <label className="checkout-honeypot" aria-hidden="true">
            Company
            <input autoComplete="off" name="company" tabIndex={-1} type="text" />
          </label>
          <button
            className="button"
            disabled={state.kind === "submitting"}
            type="submit"
          >
            {state.kind === "submitting"
              ? "正在核验链上交易…"
              : automaticVerification
                ? "我已付款，核验并开通"
                : "我已付款，提交核验"}
          </button>
          {state.kind === "error" ? (
            <div className="form-message form-error" role="alert">
              <p>{state.message}</p>
              {state.mailto ? (
                <a href={state.mailto}>打开邮件草稿并发送订单资料</a>
              ) : null}
            </div>
          ) : null}
        </form>
      )}
    </div>
  );
}
