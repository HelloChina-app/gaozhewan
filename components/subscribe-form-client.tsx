"use client";

import { useState, type FormEvent } from "react";
import {
  interestOptions,
  normalizeInterest,
  type Interest
} from "@/lib/interests";

type SubscribeFormClientProps = {
  defaultInterest?: Interest;
  source: string;
};

export function SubscribeFormClient({
  source,
  defaultInterest = "搞选题"
}: SubscribeFormClientProps) {
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState(defaultInterest);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setStatus("loading");
    setMessage("");

    const response = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        company: formData.get("company"),
        email,
        source,
        interest
      })
    });
    const data = (await response.json()) as { message?: string };

    if (response.ok) {
      setStatus("success");
      setEmail("");
      setMessage(data.message || "订阅成功。");
      return;
    }

    setStatus("error");
    setMessage(data.message || "订阅失败，请稍后再试。");
  }

  return (
    <form className="subscribe-form" onSubmit={onSubmit}>
      <label htmlFor={`interest-${source}`}>想搞哪个方向？</label>
      <select
        id={`interest-${source}`}
        name="interest"
        value={interest}
        onChange={(event) => setInterest(normalizeInterest(event.target.value))}
      >
        {interestOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <label htmlFor={`email-${source}`}>邮箱</label>
      <div className="subscribe-row">
        <input
          id={`email-${source}`}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <button className="button" disabled={status === "loading"} type="submit">
          {status === "loading" ? "提交中" : "订阅"}
        </button>
      </div>
      <label className="checkout-honeypot" aria-hidden="true">
        Company
        <input autoComplete="off" name="company" tabIndex={-1} type="text" />
      </label>
      {message ? (
        <p className={status === "error" ? "form-message form-error" : "form-message"}>
          {message}
        </p>
      ) : null}
    </form>
  );
}
