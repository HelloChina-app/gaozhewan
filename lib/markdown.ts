import type { BodyBlock, Source } from "@/lib/content";

export type Frontmatter = Record<string, string | string[]>;

export function parseFrontmatter(raw: string): {
  data: Frontmatter;
  body: string;
} {
  const text = raw.replace(/^﻿/, "");
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    return { data: {}, body: text };
  }
  const [, fm, body] = match;
  const data: Frontmatter = {};
  let currentKey: string | null = null;
  for (const line of fm.split(/\r?\n/)) {
    if (/^\s*$/.test(line)) {
      currentKey = null;
      continue;
    }
    const listItem = line.match(/^\s*-\s+(.*)$/);
    if (listItem && currentKey) {
      (data[currentKey] as string[]).push(listItem[1].trim());
      continue;
    }
    const listStart = line.match(/^([A-Za-z0-9_]+):\s*$/);
    if (listStart) {
      currentKey = listStart[1];
      data[currentKey] = [];
      continue;
    }
    const scalar = line.match(/^([A-Za-z0-9_]+):\s*(.+)$/);
    if (scalar) {
      data[scalar[1]] = scalar[2].trim();
      currentKey = null;
    }
  }
  return { data, body: body || "" };
}

export function parsePairs(items: string[] | undefined): Source[] {
  return (items || []).map((item) => {
    const idx = item.indexOf("::");
    if (idx === -1) {
      return { label: item.trim(), url: "" };
    }
    return { label: item.slice(0, idx).trim(), url: item.slice(idx + 2).trim() };
  });
}

export function parseBody(body: string): BodyBlock[] {
  const lines = body.replace(/^﻿/, "").split(/\r?\n/);
  const blocks: BodyBlock[] = [];
  let para: string[] = [];
  let i = 0;
  const flushPara = () => {
    if (para.length) {
      blocks.push({ type: "paragraph", text: para.join("").trim() });
      para = [];
    }
  };
  while (i < lines.length) {
    const line = lines[i];
    if (/^\s*$/.test(line)) {
      flushPara();
      i++;
      continue;
    }
    const heading = line.match(/^##\s+(.*)$/);
    if (heading) {
      flushPara();
      blocks.push({ type: "heading", text: heading[1].trim() });
      i++;
      continue;
    }
    const calloutStart = line.match(/^:::\s*callout\s+(.*)$/);
    if (calloutStart) {
      flushPara();
      const title = calloutStart[1].trim();
      const buf: string[] = [];
      i++;
      while (i < lines.length && !/^:::\s*$/.test(lines[i])) {
        buf.push(lines[i]);
        i++;
      }
      i++;
      blocks.push({ type: "callout", title, text: buf.join("\n").trim() });
      continue;
    }
    if (/^\s*-\s+/.test(line)) {
      flushPara();
      const items: string[] = [];
      while (i < lines.length && /^\s*-\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*-\s+/, "").trim());
        i++;
      }
      blocks.push({ type: "list", items });
      continue;
    }
    para.push(line.trim());
    i++;
  }
  flushPara();
  return blocks;
}
