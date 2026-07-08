// 纯函数模块：把一张选题卡组装成可直接粘贴进编辑器的 Markdown 写作包。
// 不依赖 node:fs，可安全用于客户端组件。

import type { TopicCard } from "@/lib/content";

/**
 * 生成写作包 Markdown：标题、信号事实、写作角度、标题模板、素材来源。
 * 粘进任何支持 Markdown 的编辑器（Obsidian、Notion、语雀、Typora）即可开写。
 */
export function buildTopicBrief(card: TopicCard, url: string): string {
  const meta = [
    `时效窗口 ${card.window}`,
    `竞争度 ${card.competition}`,
    card.publishedAt ? `发布于 ${card.publishedAt}` : ""
  ]
    .filter(Boolean)
    .join(" · ");

  const lines: string[] = [
    `# ${card.title}`,
    "",
    `> 选题卡：${url}`,
    `> ${meta}`,
    "",
    "## 信号事实",
    "",
    card.heat,
    "",
    "## 推荐写作角度（选一个）",
    ""
  ];

  card.angles.forEach((angle, index) => {
    lines.push(`${index + 1}. ${angle}`);
  });

  lines.push("", "## 标题模板", "");
  card.headlines.forEach((headline) => {
    lines.push(`- ${headline}`);
  });

  lines.push("", "## 素材来源", "");
  card.materials.forEach((material) => {
    lines.push(`- ${material.label}：${material.url}`);
  });

  lines.push("");
  return lines.join("\n");
}
