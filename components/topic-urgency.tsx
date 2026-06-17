"use client";

import { useEffect, useState } from "react";
import { getDeadline, getWindowStatus } from "@/lib/window";

type TopicUrgencyProps = {
  publishedAt: string;
  window: string;
};

// 客户端小岛：挂载后才根据当前时间计算紧迫度，避免服务端/客户端水合不一致。
// 在挂载前（含服务端渲染）返回 null，保证首屏一致。
export function TopicUrgency({ publishedAt, window: topicWindow }: TopicUrgencyProps) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
  }, []);

  if (now == null) return null;

  const deadline = getDeadline(publishedAt, topicWindow);
  if (deadline == null) return null;

  const status = getWindowStatus(deadline, now);

  return (
    <span className={`topic-urgency topic-urgency-${status.state}`}>
      {status.label}
    </span>
  );
}
