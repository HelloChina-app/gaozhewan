import { NextResponse } from "next/server";

import { normalizeInterest } from "@/lib/interests";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const requestHost = new URL(request.url).hostname;
  const isLocalRequest = ["localhost", "127.0.0.1", "::1"].includes(
    requestHost
  );
  const body = (await request.json().catch(() => null)) as
    | { email?: string; source?: string; interest?: string }
    | null;
  const email = body?.email?.trim().toLowerCase();
  const source = body?.source?.trim().slice(0, 80) || "website";
  const interest = normalizeInterest(body?.interest);

  if (!email || !emailPattern.test(email)) {
    return NextResponse.json(
      { message: "请输入有效邮箱。" },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  if (!apiKey || !audienceId) {
    if (isLocalRequest) {
      return NextResponse.json({
        message: `已记录${interest}意向。本地演示模式未写入 Resend。`
      });
    }

    return NextResponse.json(
      {
        message:
          "订阅接口已接通，但还没有配置 RESEND_API_KEY 和 RESEND_AUDIENCE_ID。"
      },
      { status: 503 }
    );
  }

  let response: Response;

  try {
    response = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        unsubscribed: false,
        firstName: interest,
        lastName: source
      }),
      signal: AbortSignal.timeout(8000)
    });
  } catch {
    return NextResponse.json(
      { message: "订阅服务暂时不可用，请稍后再试。" },
      { status: 502 }
    );
  }

  if (response.status === 409) {
    return NextResponse.json({
      message: `你已经在名单里，下一封${interest}线索见。`
    });
  }

  if (!response.ok) {
    const detail = await response.text();

    return NextResponse.json(
      { message: detail || "订阅失败，请稍后再试。" },
      { status: response.status }
    );
  }

  return NextResponse.json({ message: `订阅成功，下一封${interest}线索见。` });
}

