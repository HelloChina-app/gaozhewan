// 纯函数模块：解析选题卡的时效窗口，计算热度截止点与紧迫度。
// 不依赖 node:fs，可安全用于客户端组件。

const HOUR = 3600_000;

/**
 * 把时效窗口字符串解析成小时数。
 * 支持：48h / 24 小时 / 3天 / 3 d / 1周 / 1 周 / 2w；纯数字按小时计。
 * 无法解析时返回 null。
 */
export function windowToHours(window: string | undefined): number | null {
  if (!window) return null;
  const text = window.trim();
  let m = text.match(/(\d+(?:\.\d+)?)\s*(?:h|小时)/i);
  if (m) return parseFloat(m[1]);
  m = text.match(/(\d+(?:\.\d+)?)\s*(?:天|d)/i);
  if (m) return parseFloat(m[1]) * 24;
  m = text.match(/(\d+(?:\.\d+)?)\s*(?:周|w)/i);
  if (m) return parseFloat(m[1]) * 24 * 7;
  m = text.match(/^(\d+(?:\.\d+)?)$/);
  if (m) return parseFloat(m[1]);
  return null;
}

/**
 * 计算热度截止时间（epoch 毫秒）= 发布日 + 窗口时长。
 * 该值不依赖「当前时间」，因此在服务端与客户端渲染结果一致，可安全用于排序。
 */
export function getDeadline(
  publishedAt: string | undefined,
  window: string | undefined
): number | null {
  const hours = windowToHours(window);
  if (hours == null) return null;
  if (!publishedAt) return null;
  const base = Date.parse(`${publishedAt}T00:00:00Z`);
  if (!Number.isFinite(base)) return null;
  return base + hours * HOUR;
}

export type UrgencyState = "open" | "soon" | "closed";

export type WindowStatus = {
  state: UrgencyState;
  label: string;
  hoursLeft: number;
};

/**
 * 截止时间是否已过（热度窗口关闭）。依赖「当前时间」，仅客户端挂载后调用。
 * deadline 为 null（窗口无法解析）时视为「未关闭」，不因解析失败而被隐藏。
 */
export function isClosed(deadline: number | null, now: number): boolean {
  if (deadline == null) return false;
  return deadline - now <= 0;
}

/**
 * 给定截止时间与当前时间，返回面向创作者的紧迫度状态与文案。
 * 依赖「当前时间」，应仅在客户端挂载后调用，避免水合不一致。
 */
export function getWindowStatus(deadline: number, now: number): WindowStatus {
  const hoursLeft = (deadline - now) / HOUR;
  if (hoursLeft <= 0) {
    return { state: "closed", label: "热度已过", hoursLeft };
  }
  if (hoursLeft <= 24) {
    const h = Math.max(1, Math.round(hoursLeft));
    return { state: "soon", label: `约 ${h} 小时内最热`, hoursLeft };
  }
  const days = Math.round(hoursLeft / 24);
  return { state: "open", label: `还有约 ${days} 天`, hoursLeft };
}
