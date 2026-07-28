import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import {
  getLabServicePackage,
  isLabSelectionId,
  LAB_FREE_SUBMISSION_ID
} from "@/lib/lab";
import {
  labIdeaStoreEnabled,
  saveLabIdea,
  type StoredLabIdea
} from "@/lib/lab-ideas";
import { notifyLabIdeaSubmitted } from "@/lib/notifications";
import { getRequestKey, takeRateLimit } from "@/lib/request-guard";

export const runtime = "nodejs";

type IdeaInput = {
  audience?: unknown;
  budget?: unknown;
  company?: unknown;
  contactEmail?: unknown;
  contactHandle?: unknown;
  outcome?: unknown;
  problem?: unknown;
  publicConsent?: unknown;
  selectedPackageId?: unknown;
  stage?: unknown;
  termsAccepted?: unknown;
  title?: unknown;
};

function text(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

function createIdeaId() {
  const day = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  return `GZL-${day}-${randomBytes(4).toString("hex").toUpperCase()}`;
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || "0");
  if (contentLength > 24_000) {
    return NextResponse.json({ error: "提交内容过大。" }, { status: 413 });
  }

  const rateLimit = takeRateLimit(getRequestKey(request, "lab-idea"), {
    limit: 5,
    windowMs: 30 * 60 * 1000
  });
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "提交过于频繁，请稍后再试。" },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfterSeconds) }
      }
    );
  }

  let input: IdeaInput;
  try {
    input = (await request.json()) as IdeaInput;
  } catch {
    return NextResponse.json({ error: "创意数据格式无效。" }, { status: 400 });
  }

  if (text(input.company, 200)) {
    return NextResponse.json(
      { ideaId: "GZL-RECEIVED", ok: true },
      { status: 202 }
    );
  }

  const title = text(input.title, 120);
  const problem = text(input.problem, 2_000);
  const audience = text(input.audience, 500);
  const outcome = text(input.outcome, 800);
  const stage = text(input.stage, 80);
  const budget = text(input.budget, 80);
  const contactEmail = text(input.contactEmail, 254).toLowerCase();
  const contactHandle = text(input.contactHandle, 160);
  const selectedPackageId = input.selectedPackageId;

  if (title.length < 6) {
    return NextResponse.json(
      { error: "请用至少 6 个字说清楚你的创意。" },
      { status: 400 }
    );
  }

  if (problem.length < 30) {
    return NextResponse.json(
      { error: "请用至少 30 个字描述真实问题和目前的解决方式。" },
      { status: 400 }
    );
  }

  if (!audience || !outcome || !stage || !budget) {
    return NextResponse.json(
      { error: "请完整填写目标用户、期望成果、当前阶段和预算。" },
      { status: 400 }
    );
  }

  if (!isEmail(contactEmail)) {
    return NextResponse.json({ error: "请输入有效邮箱。" }, { status: 400 });
  }

  if (!isLabSelectionId(selectedPackageId)) {
    return NextResponse.json(
      { error: "请选择有效的共建方式。" },
      { status: 400 }
    );
  }

  if (input.termsAccepted !== true) {
    return NextResponse.json(
      { error: "请先确认提交与共建边界。" },
      { status: 400 }
    );
  }

  if (!labIdeaStoreEnabled()) {
    return NextResponse.json(
      { error: "实验室私有存储暂未开放，请稍后再试。" },
      { status: 503 }
    );
  }

  const idea: StoredLabIdea = {
    audience,
    budget,
    contactEmail,
    contactHandle,
    createdAt: new Date().toISOString(),
    ideaId: createIdeaId(),
    outcome,
    problem,
    publicConsent: input.publicConsent === true,
    selectedPackageId,
    stage,
    title,
    v: 1
  };

  try {
    await saveLabIdea(idea);
  } catch (error) {
    console.error(
      "Lab idea intake failed:",
      error instanceof Error ? error.name : "unknown"
    );
    return NextResponse.json(
      { error: "创意暂时无法保存，请稍后重试。" },
      { status: 502 }
    );
  }

  let receiptDelivered = false;
  try {
    const notifications = await notifyLabIdeaSubmitted(idea);
    receiptDelivered = notifications.customerDelivered;
  } catch (error) {
    console.error(
      "Lab idea notification failed:",
      error instanceof Error ? error.name : "unknown"
    );
  }

  const selectedPackage = getLabServicePackage(selectedPackageId);
  const checkoutUrl = selectedPackage
    ? `/lab/checkout?product=${encodeURIComponent(selectedPackage.id)}&idea=${encodeURIComponent(idea.ideaId)}`
    : null;

  return NextResponse.json(
    {
      checkoutUrl,
      ideaId: idea.ideaId,
      message:
        selectedPackageId === LAB_FREE_SUBMISSION_ID
          ? receiptDelivered
            ? "创意已私密保存，确认邮件已发送。入选后我们会通过邮箱联系你。"
            : "创意已私密保存。请保存编号；邮件通知暂未送达。"
          : receiptDelivered
            ? "创意已私密保存，确认邮件已发送。你可以继续使用 USDT 启动所选服务。"
            : "创意已私密保存。请保存编号并继续使用 USDT 启动所选服务。",
      ok: true
    },
    {
      status: 201,
      headers: { "Cache-Control": "no-store" }
    }
  );
}
