// 选题信号抓取脚本：从 Hacker News / GitHub 拉候选信号，生成「选题卡草稿」。
// 重要：脚本只产出草稿到 content/_drafts/，绝不自动发布。
// 按 seed-backlog 的原则，每条信号都需要你人工核验来源、补全角度后再上线。
//
// 用法：
//   node scripts/fetch-signals.mjs            # 默认抓取并写草稿
//   node scripts/fetch-signals.mjs --limit 8  # 控制草稿数量
//   node scripts/fetch-signals.mjs --dry      # 只打印，不写文件

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const args = process.argv.slice(2);
const getArg = (name, fallback) => {
  const i = args.indexOf(name);
  return i !== -1 && args[i + 1] ? args[i + 1] : fallback;
};
const limit = Number(getArg("--limit", "10"));
const dryRun = args.includes("--dry");

const UA = { "User-Agent": "gaozhewan-signal-bot (+https://gaozhewan.com)" };

async function getJson(url) {
  const res = await fetch(url, { signal: AbortSignal.timeout(10000), headers: UA });
  if (!res.ok) throw new Error(`${url} -> ${res.status}`);
  return res.json();
}

async function fetchHackerNews(max = 12) {
  const ids = await getJson("https://hacker-news.firebaseio.com/v0/topstories.json");
  const out = [];
  for (const id of ids.slice(0, 40)) {
    if (out.length >= max) break;
    try {
      const item = await getJson(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
      if (item && item.type === "story" && item.url && (item.score || 0) >= 100) {
        out.push({
          source: "Hacker News",
          title: item.title,
          url: item.url,
          metric: `${item.score} points`,
          discuss: `https://news.ycombinator.com/item?id=${id}`
        });
      }
    } catch {
      /* skip single item failures */
    }
  }
  return out;
}

async function fetchGitHub(max = 12) {
  const since = new Date(Date.now() - 14 * 86400000).toISOString().slice(0, 10);
  const url =
    `https://api.github.com/search/repositories?q=created:>${since}` +
    `&sort=stars&order=desc&per_page=${max}`;
  const data = await getJson(url);
  return (data.items || []).map((repo) => ({
    source: "GitHub Trending",
    title: `${repo.full_name}${repo.description ? " — " + repo.description : ""}`,
    url: repo.html_url,
    metric: `${repo.stargazers_count} stars (近两周新建)`,
    discuss: repo.html_url
  }));
}

export function slugify(text, fallback) {
  const base = String(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
  return base || fallback;
}

export function buildDraft(signal, today) {
  return `---
title: ${signal.title.replace(/\n/g, " ").slice(0, 120)}
heat: ${signal.source} ${signal.metric}，抓取于 ${today}（待人工核验与改写）
window: TODO 48h / 72h / 1 周
competition: TODO 低/中/高
novelty: 0
viral: 0
accessible: 0
angles:
  - TODO 角度 1（写给谁、解决什么）
  - TODO 角度 2
  - TODO 角度 3
headlines:
  - TODO 标题 1
  - TODO 标题 2
  - TODO 标题 3
materials:
  - 原始来源 :: ${signal.url}
  - 讨论区 :: ${signal.discuss}
---

<!--
来源：${signal.source}
原始标题：${signal.title}
核验清单（来自 seed-backlog）：
  [ ] 找到至少 1 个原始来源 + 1 个交叉来源
  [ ] 能用一句话说清「它改变了什么」
  [ ] 48h–1 周内仍有跟进价值
  [ ] 中文区尚未被写烂
  [ ] 已用搞着玩指数给三个维度打分
确认无误后，把本文件移动到 content/topic-cards/ 并去掉 TODO。
-->
`;
}

function rank(signals, n) {
  // 按来源轮流取，保证多样性
  const bySource = {};
  for (const s of signals) (bySource[s.source] ||= []).push(s);
  const queues = Object.values(bySource);
  const result = [];
  let i = 0;
  while (result.length < n && queues.some((q) => q.length)) {
    const q = queues[i % queues.length];
    if (q.length) result.push(q.shift());
    i++;
  }
  return result;
}

async function main() {
  const today = new Date().toISOString().slice(0, 10);
  const sources = [
    ["Hacker News", fetchHackerNews],
    ["GitHub Trending", fetchGitHub]
  ];
  let signals = [];
  for (const [name, fn] of sources) {
    try {
      const items = await fn();
      console.log(`✓ ${name}: ${items.length} 条`);
      signals = signals.concat(items);
    } catch (err) {
      console.warn(`✗ ${name} 抓取失败：${err.message}`);
    }
  }

  if (signals.length === 0) {
    console.error("没有抓到任何信号（可能是网络问题）。请检查网络后重试。");
    process.exit(1);
  }

  const picked = rank(signals, limit);
  console.log(`\n选中 ${picked.length} 条候选信号：`);
  for (const s of picked) console.log(`  · [${s.source}] ${s.title.slice(0, 60)}`);

  if (dryRun) {
    console.log("\n--dry：未写入文件。");
    return;
  }

  const outDir = join(process.cwd(), "content", "_drafts", today);
  mkdirSync(outDir, { recursive: true });
  picked.forEach((s, idx) => {
    const slug = `${slugify(s.source, "src")}-${slugify(s.title, String(idx + 1))}`;
    writeFileSync(join(outDir, `${slug}.md`), buildDraft(s, today), "utf8");
  });
  console.log(`\n已写入 ${picked.length} 份草稿到 content/_drafts/${today}/`);
  console.log("请人工核验、补全 TODO，再移动到 content/topic-cards/ 发布。");
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
