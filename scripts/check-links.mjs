import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const contentRoot = join(process.cwd(), "content");
const urls = new Map();
const queue = [];
const failures = [];
const indeterminate = [];
const concurrency = 8;

function collectMarkdownFiles(dir) {
  let entries = [];
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return [];
  }

  return entries.flatMap((entry) => {
    if (entry.isDirectory() && entry.name.startsWith("_")) return [];
    if (entry.isFile() && entry.name.toLowerCase() === "readme.md") return [];
    const path = join(dir, entry.name);
    return entry.isDirectory()
      ? collectMarkdownFiles(path)
      : entry.name.endsWith(".md")
        ? [path]
        : [];
  });
}

for (const filePath of collectMarkdownFiles(contentRoot)) {
  const raw = readFileSync(filePath, "utf8");
  for (const match of raw.matchAll(/https?:\/\/[^\s<>)\]`"'，。；：！？]+/g)) {
    const url = match[0].replace(/[.,;:!?，。；：！？]+$/, "");
    const refs = urls.get(url) || [];
    refs.push(filePath.slice(process.cwd().length + 1));
    urls.set(url, refs);
  }
}

queue.push(...urls.keys());

async function checkUrl(url) {
  let response;
  try {
    response = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      signal: AbortSignal.timeout(10_000),
      headers: { "User-Agent": "gaozhewan-content-link-check/1.0" }
    });
    if ([400, 405, 501].includes(response.status)) {
      response = await fetch(url, {
        method: "GET",
        redirect: "follow",
        signal: AbortSignal.timeout(10_000),
        headers: {
          Range: "bytes=0-1024",
          "User-Agent": "gaozhewan-content-link-check/1.0"
        }
      });
    }
  } catch (error) {
    indeterminate.push({
      reason: error instanceof Error ? error.name : "network error",
      url
    });
    return;
  }

  if (response.status === 404 || response.status === 410) {
    failures.push({ status: response.status, url });
  } else if (!response.ok) {
    indeterminate.push({ reason: `HTTP ${response.status}`, url });
  }
}

async function worker() {
  while (queue.length > 0) {
    const url = queue.shift();
    if (url) await checkUrl(url);
  }
}

await Promise.all(Array.from({ length: concurrency }, () => worker()));

for (const item of failures) {
  console.error(
    `BROKEN ${item.status} ${item.url}\n  ${urls.get(item.url).join("\n  ")}`
  );
}
for (const item of indeterminate) {
  console.warn(`SKIP ${item.reason} ${item.url}`);
}

console.log(
  `Link check complete. ${urls.size} unique URLs, ${failures.length} broken, ${indeterminate.length} indeterminate.`
);
if (failures.length > 0) process.exitCode = 1;
