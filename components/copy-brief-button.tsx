"use client";

import { useEffect, useRef, useState } from "react";
import { buildTopicBrief } from "@/lib/brief";
import { site } from "@/lib/site";
import type { TopicCard } from "@/lib/content";

type CopyState = "idle" | "copied" | "failed";

const labels: Record<CopyState, string> = {
  idle: "复制写作包",
  copied: "已复制，粘贴即可开写",
  failed: "复制失败，请手动全选"
};

// 剪贴板 API 不可用时（非 https、旧浏览器）的降级方案：隐藏 textarea + execCommand。
function fallbackCopy(text: string): boolean {
  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(textarea);
    return ok;
  } catch {
    return false;
  }
}

/**
 * 「复制写作包」按钮：一键把整张选题卡组装成 Markdown 写进剪贴板，
 * 省去逐段手动复制标题模板、角度、事实与来源的功夫。
 */
export function CopyBriefButton({ card }: { card: TopicCard }) {
  const [state, setState] = useState<CopyState>("idle");
  const timer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current != null) window.clearTimeout(timer.current);
    };
  }, []);

  async function copy() {
    const text = buildTopicBrief(card, `${site.url}/topic/${card.id}`);
    let ok = false;
    try {
      await navigator.clipboard.writeText(text);
      ok = true;
    } catch {
      ok = fallbackCopy(text);
    }
    setState(ok ? "copied" : "failed");
    if (timer.current != null) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState("idle"), 2500);
  }

  return (
    <div className="copy-brief">
      <button className="button" onClick={copy} type="button">
        {labels[state]}
      </button>
      <span aria-live="polite" className="copy-brief-hint">
        标题模板、写作角度、素材链接，一份 Markdown 直接粘进你的编辑器。
      </span>
    </div>
  );
}
