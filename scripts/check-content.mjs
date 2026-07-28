import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const contentRoot = join(process.cwd(), "content");
const allowedCompetition = new Set(["低", "中", "高"]);
const allowedType = new Set(["daily", "deep", "weekly"]);

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function parseFrontmatter(raw) {
  const text = raw.replace(/^﻿/, "");
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: text };
  const [, fm, body] = match;
  const data = {};
  let currentKey = null;
  for (const line of fm.split(/\r?\n/)) {
    if (/^\s*$/.test(line)) { currentKey = null; continue; }
    const listItem = line.match(/^\s*-\s+(.*)$/);
    if (listItem && currentKey) { data[currentKey].push(listItem[1].trim()); continue; }
    const listStart = line.match(/^([A-Za-z0-9_]+):\s*$/);
    if (listStart) { currentKey = listStart[1]; data[currentKey] = []; continue; }
    const scalar = line.match(/^([A-Za-z0-9_]+):\s*(.+)$/);
    if (scalar) { data[scalar[1]] = scalar[2].trim(); currentKey = null; }
  }
  return { data, body: body || "" };
}

function assertScore(data, field, fileName) {
  const value = Number(data[field]);
  assert(
    Number.isFinite(value) && value >= 0 && value <= 10,
    `${fileName}: ${field} must be a number between 0 and 10`
  );
}

function assertUrl(value, field, fileName) {
  try {
    const url = new URL(value);
    assert(
      url.protocol === "https:" || url.protocol === "http:",
      `${fileName}: ${field} must use http or https`
    );
  } catch {
    throw new Error(`${fileName}: ${field} must be a valid URL`);
  }
}

function assertPairs(items, field, fileName, min) {
  assert(
    Array.isArray(items) && items.length >= min,
    `${fileName}: at least ${min} ${field} required`
  );
  const urls = new Set();
  for (const [index, item] of items.entries()) {
    const idx = item.indexOf("::");
    assert(idx !== -1, `${fileName}: ${field}[${index}] must be "Label :: https://..."`);
    const label = item.slice(0, idx).trim();
    const url = item.slice(idx + 2).trim();
    assert(label, `${fileName}: ${field}[${index}].label is required`);
    assertUrl(url, `${field}[${index}].url`, fileName);
    const normalizedUrl = url.replace(/\/+$/, "").toLowerCase();
    assert(
      !urls.has(normalizedUrl),
      `${fileName}: ${field} must not contain duplicate URLs`
    );
    urls.add(normalizedUrl);
  }
}

function assertDate(value, field, fileName) {
  assert(
    typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value),
    `${fileName}: ${field} must be YYYY-MM-DD`
  );
  const date = new Date(`${value}T00:00:00Z`);
  assert(
    !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value,
    `${fileName}: ${field} must be a real calendar date`
  );
  const tomorrow = new Date();
  tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
  assert(
    value <= tomorrow.toISOString().slice(0, 10),
    `${fileName}: ${field} must not be in the future`
  );
}

function assertUnique(set, value, label, fileName) {
  const normalized = value.trim().toLowerCase();
  assert(!set.has(normalized), `${fileName}: duplicate ${label} "${value}"`);
  set.add(normalized);
}

function listLen(value) {
  return Array.isArray(value) ? value.length : 0;
}

function readDir(dir) {
  try {
    return readdirSync(dir).filter((name) => name.endsWith(".md"));
  } catch {
    return [];
  }
}

let postCount = 0;
const postTitles = new Set();
const postSlugs = new Set();
const weeklyDates = [];
for (const fileName of readDir(join(contentRoot, "posts"))) {
  const { data, body } = parseFrontmatter(
    readFileSync(join(contentRoot, "posts", fileName), "utf8")
  );
  for (const key of ["title", "excerpt", "oneLiner", "publishedAt", "category", "readTime"]) {
    assert(typeof data[key] === "string" && data[key], `${fileName}: ${key} is required`);
  }
  const postSlug = fileName.replace(/\.md$/, "");
  assertUnique(postSlugs, postSlug, "post slug", fileName);
  assertUnique(postTitles, data.title, "post title", fileName);
  assertDate(data.publishedAt, "publishedAt", fileName);
  assert(allowedType.has(data.type), `${fileName}: type must be daily, deep, or weekly`);
  if (data.type === "weekly") weeklyDates.push(data.publishedAt);
  for (const field of ["novelty", "viral", "accessible"]) assertScore(data, field, fileName);
  assert(listLen(data.tags) >= 1, `${fileName}: at least 1 tag required`);
  assert(listLen(data.proAngles) >= 3, `${fileName}: at least 3 proAngles required`);
  assert(listLen(data.headlineTemplates) >= 3, `${fileName}: at least 3 headlineTemplates required`);
  assert(listLen(data.relatedTools) >= 1, `${fileName}: at least 1 relatedTool required`);
  assertPairs(data.sources, "sources", fileName, 1);
  assert(body.trim().length > 0, `${fileName}: body must not be empty`);
  console.log(`posts/${fileName} ok`);
  postCount++;
}
assert(postCount > 0, "No posts found in content/posts");

let toolGuideCount = 0;
for (const fileName of readDir(join(contentRoot, "tool-guides"))) {
  const { data, body } = parseFrontmatter(
    readFileSync(join(contentRoot, "tool-guides", fileName), "utf8")
  );
  for (const key of ["title", "description", "publishedAt", "updatedAt"]) {
    assert(typeof data[key] === "string" && data[key], `${fileName}: ${key} is required`);
  }
  for (const field of ["publishedAt", "updatedAt"]) {
    assert(/^\d{4}-\d{2}-\d{2}$/.test(data[field]), `${fileName}: ${field} must be YYYY-MM-DD`);
  }
  assertPairs(data.sources, "sources", fileName, 2);
  assert(body.trim().length >= 1200, `${fileName}: body must be at least 1200 characters`);
  console.log(`tool-guides/${fileName} ok`);
  toolGuideCount++;
}

const topicIds = new Set();
const topicTitles = new Set();
const topicRelations = [];
const topicDateCounts = new Map();
let cardCount = 0;
for (const fileName of readDir(join(contentRoot, "topic-cards"))) {
  const { data, body } = parseFrontmatter(
    readFileSync(join(contentRoot, "topic-cards", fileName), "utf8")
  );
  for (const key of ["title", "heat", "window"]) {
    assert(typeof data[key] === "string" && data[key], `${fileName}: ${key} is required`);
  }
  const topicId = data.id || fileName.replace(/\.md$/, "");
  assertUnique(topicIds, topicId, "topic id", fileName);
  assertUnique(topicTitles, data.title, "topic title", fileName);
  assert(allowedCompetition.has(data.competition), `${fileName}: competition must be 低, 中, or 高`);
  if (data.publishedAt) {
    assertDate(data.publishedAt, "publishedAt", fileName);
    topicDateCounts.set(
      data.publishedAt,
      (topicDateCounts.get(data.publishedAt) || 0) + 1
    );
  }
  if (data.updatedAt) {
    assertDate(data.updatedAt, "updatedAt", fileName);
    if (data.publishedAt) {
      assert(
        data.updatedAt >= data.publishedAt,
        `${fileName}: updatedAt must not precede publishedAt`
      );
    }
  }
  for (const field of ["novelty", "viral", "accessible"]) assertScore(data, field, fileName);
  assert(listLen(data.angles) >= 3, `${fileName}: at least 3 angles required`);
  assert(listLen(data.headlines) >= 3, `${fileName}: at least 3 headlines required`);
  assertPairs(data.materials, "materials", fileName, 1);
  if (data.relatedTopicIds) {
    assert(listLen(data.relatedTopicIds) >= 1 && listLen(data.relatedTopicIds) <= 6, `${fileName}: relatedTopicIds must contain 1 to 6 ids`);
    assert(new Set(data.relatedTopicIds).size === data.relatedTopicIds.length, `${fileName}: relatedTopicIds must not contain duplicates`);
    topicRelations.push({ fileName, id: data.id || fileName.replace(/\.md$/, ""), relatedTopicIds: data.relatedTopicIds });
  }
  if (data.updatedAt) {
    assert(body.trim().length >= 900, `${fileName}: deep-read body must be at least 900 characters`);
  }
  console.log(`topic-cards/${fileName} ok`);
  cardCount++;
}
assert(cardCount > 0, "No topic cards found in content/topic-cards");
for (const relation of topicRelations) {
  for (const topicId of relation.relatedTopicIds) {
    assert(topicId !== relation.id, `${relation.fileName}: relatedTopicIds must not reference itself`);
    assert(topicIds.has(topicId), `${relation.fileName}: unknown relatedTopicId ${topicId}`);
  }
}
const latestTopicDate = [...topicDateCounts.keys()].sort().at(-1);
if (latestTopicDate) {
  assert(
    topicDateCounts.get(latestTopicDate) === 3,
    `Latest topic date ${latestTopicDate} must contain exactly 3 cards`
  );
}

let clusterCount = 0;
for (const fileName of readDir(join(contentRoot, "topic-clusters"))) {
  const { data, body } = parseFrontmatter(
    readFileSync(join(contentRoot, "topic-clusters", fileName), "utf8")
  );
  for (const key of ["title", "description", "eyebrow", "publishedAt"]) {
    assert(typeof data[key] === "string" && data[key], `${fileName}: ${key} is required`);
  }
  for (const field of ["publishedAt", "updatedAt"]) {
    if (data[field]) {
      assertDate(data[field], field, fileName);
    }
  }
  assert(listLen(data.topicIds) >= 4, `${fileName}: at least 4 topicIds required`);
  for (const topicId of data.topicIds) {
    assert(topicIds.has(topicId), `${fileName}: unknown topicId ${topicId}`);
  }
  assert(body.trim().length >= 500, `${fileName}: body must be at least 500 characters`);
  console.log(`topic-clusters/${fileName} ok`);
  clusterCount++;
}
assert(clusterCount > 0, "No topic clusters found in content/topic-clusters");

const latestWeeklyDate = weeklyDates.sort().at(-1);
if (latestWeeklyDate) {
  const ageDays = Math.floor(
    (Date.now() - new Date(`${latestWeeklyDate}T00:00:00Z`).valueOf()) /
      (24 * 60 * 60 * 1000)
  );
  if (ageDays > 10) {
    console.warn(
      `Warning: latest weekly post is ${ageDays} days old (${latestWeeklyDate}).`
    );
  }
}

console.log(`Content check passed. ${postCount} posts, ${cardCount} topic cards, ${clusterCount} topic clusters, ${toolGuideCount} tool guides.`);
