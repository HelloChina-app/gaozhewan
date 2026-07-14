import { NextResponse } from "next/server";
import {
  PRO_COOKIE_NAME,
  verifyProAccessToken
} from "@/lib/pro-access";

export const runtime = "nodejs";

export function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const token = requestUrl.searchParams.get("token") || "";
  const access = verifyProAccessToken(token);

  if (!access) {
    return NextResponse.redirect(new URL("/checkout?access=invalid", requestUrl), 303);
  }

  const response = NextResponse.redirect(
    new URL("/topics?access=granted", requestUrl),
    303
  );
  response.cookies.set(PRO_COOKIE_NAME, token, {
    httpOnly: true,
    maxAge: Math.max(1, access.exp - Math.floor(Date.now() / 1000)),
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production"
  });
  response.headers.set("Referrer-Policy", "no-referrer");
  response.headers.set("Cache-Control", "no-store");
  return response;
}

