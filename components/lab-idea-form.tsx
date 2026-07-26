"use client";

import { useState, type FormEvent } from "react";
import {
  LAB_FREE_SUBMISSION_ID,
  labServicePackages
} from "@/lib/lab";

type SubmissionState =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "error"; message: string }
  | {
      checkoutUrl: string | null;
      ideaId: string;
      kind: "success";
      message: string;
    };

export function LabIdeaForm() {
  const [state, setState] = useState<SubmissionState>({ kind: "idle" });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setState({ kind: "submitting" });

    try {
      const response = await fetch("/api/lab/ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          audience: formData.get("audience"),
          budget: formData.get("budget"),
          company: formData.get("company"),
          contactEmail: formData.get("contactEmail"),
          contactHandle: formData.get("contactHandle"),
          outcome: formData.get("outcome"),
          problem: formData.get("problem"),
          publicConsent: formData.get("publicConsent") === "yes",
          selectedPackageId: formData.get("selectedPackageId"),
          stage: formData.get("stage"),
          termsAccepted: formData.get("termsAccepted") === "yes",
          title: formData.get("title")
        })
      });
      const result = (await response.json()) as {
        checkoutUrl?: string | null;
        error?: string;
        ideaId?: string;
        message?: string;
      };

      if (!response.ok || !result.ideaId) {
        throw new Error(result.error || "创意提交失败，请稍后重试。");
      }

      setState({
        checkoutUrl: result.checkoutUrl || null,
        ideaId: result.ideaId,
        kind: "success",
        message: result.message || "创意已保存。"
      });
      form.reset();
    } catch (error) {
      setState({
        kind: "error",
        message: error instanceof Error ? error.message : "创意提交失败，请稍后重试。"
      });
    }
  }

  if (state.kind === "success") {
    return (
      <div className="lab-submit-success" role="status">
        <p className="eyebrow">提交成功</p>
        <h2>{state.ideaId}</h2>
        <p>{state.message}</p>
        <p>请保存这个编号。付款、范围确认和后续沟通都会以它为准。</p>
        <div className="hero-actions">
          {state.checkoutUrl ? (
            <a className="button" href={state.checkoutUrl}>
              继续使用 USDT 启动服务
            </a>
          ) : null}
          <button
            className="text-button"
            type="button"
            onClick={() => setState({ kind: "idle" })}
          >
            再提交一个创意
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="lab-idea-form" onSubmit={onSubmit}>
      <div className="lab-form-grid">
        <label className="lab-field-wide">
          一句话说清你的创意
          <input
            maxLength={120}
            name="title"
            placeholder="例如：帮独立咖啡店自动把每日新品做成小红书图文"
            required
            type="text"
          />
        </label>

        <label className="lab-field-wide">
          你观察到的真实问题是什么？
          <textarea
            maxLength={2000}
            minLength={30}
            name="problem"
            placeholder="谁在什么场景遇到问题？现在如何解决？为什么现有方式不够好？"
            required
            rows={6}
          />
        </label>

        <label>
          谁会使用它？
          <textarea
            maxLength={500}
            name="audience"
            placeholder="尽量具体到一类人和使用场景"
            required
            rows={4}
          />
        </label>

        <label>
          第一版做到什么才算成功？
          <textarea
            maxLength={800}
            name="outcome"
            placeholder="写出一个可以验收的结果"
            required
            rows={4}
          />
        </label>

        <label>
          当前阶段
          <select defaultValue="只有想法" name="stage" required>
            <option>只有想法</option>
            <option>做过用户访谈</option>
            <option>已有设计或原型</option>
            <option>已有代码或产品</option>
            <option>已有付费用户</option>
          </select>
        </label>

        <label>
          可接受的验证预算
          <select defaultValue="先免费提交" name="budget" required>
            <option>先免费提交</option>
            <option>29–298 USDT</option>
            <option>299–998 USDT</option>
            <option>999 USDT 以上</option>
            <option>暂不确定</option>
          </select>
        </label>

        <label className="lab-field-wide">
          你希望怎样开始？
          <select
            defaultValue={LAB_FREE_SUBMISSION_ID}
            name="selectedPackageId"
            required
          >
            <option value={LAB_FREE_SUBMISSION_ID}>
              免费提交，等待实验室甄选
            </option>
            {labServicePackages.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name} · {item.amount} USDT · {item.delivery}
              </option>
            ))}
          </select>
        </label>

        <label>
          联系邮箱
          <input
            autoComplete="email"
            name="contactEmail"
            placeholder="you@example.com"
            required
            type="email"
          />
        </label>

        <label>
          Telegram / 微信（可选）
          <input
            maxLength={160}
            name="contactHandle"
            placeholder="@username 或其他联系方式"
            type="text"
          />
        </label>
      </div>

      <label className="checkout-confirm">
        <input name="publicConsent" type="checkbox" value="yes" />
        <span>
          如果项目入选，我允许实验室在再次确认后公开项目名称、问题和进展。未勾选也不影响甄选。
        </span>
      </label>

      <label className="checkout-confirm">
        <input name="termsAccepted" required type="checkbox" value="yes" />
        <span>
          我确认提交内容不包含私钥、密码或他人敏感数据；理解免费提交不保证入选，付费服务只覆盖页面列出的固定范围。
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
        {state.kind === "submitting" ? "正在私密保存…" : "提交创意"}
      </button>

      {state.kind === "error" ? (
        <p className="form-message form-error" role="alert">
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
