"use client";

import { useState, type FormEvent } from "react";
import {
  interestOptions,
  normalizeInterest,
  type Interest
} from "@/lib/interests";

type SubscribeFormProps = {
  source: string;
  defaultInterest?: Interest;
};

export function SubscribeForm({
  source,
  defaultInterest = "搞选题"
}: SubscribeFormProps) {
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState(defaultInterest);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const response = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source, interest })
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
      <label htmlFor={`interest-${source}`}>你想搞什么？</label>
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
      {message ? (
        <p className={status === "error" ? "form-message form-error" : "form-message"}>
          {message}
        </p>
      ) : null}
    </form>
  );
}
