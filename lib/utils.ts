export function formatDate(date: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date(date));
}

export function truncateText(value: string, maxLength: number) {
  const text = value.trim();
  const characters = Array.from(text);

  if (characters.length <= maxLength) return text;

  return `${characters
    .slice(0, Math.max(1, maxLength - 1))
    .join("")
    .replace(/[，,；;：:\s]+$/u, "")}…`;
}

export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

