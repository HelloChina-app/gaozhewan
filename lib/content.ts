import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { parseBody, parseFrontmatter, parsePairs } from "@/lib/markdown";

export type GzwScore = {
  novelty: number;
  viral: number;
  accessible: number;
};

export type Source = {
  label: string;
  url: string;
};

export type PostType = "daily" | "deep" | "weekly";

export type BodyBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "callout"; title: string; text: string };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  oneLiner: string;
  publishedAt: string;
  type: PostType;
  category: string;
  readTime: string;
  tags: string[];
  scores: GzwScore;
  sources: Source[];
  body: BodyBlock[];
  proAngles: string[];
  headlineTemplates: string[];
  relatedTools: string[];
};

export type Tool = {
  slug: string;
  name: string;
  description: string;
  url: string;
  category: string;
  tags: string[];
  scores: GzwScore;
  affiliateUrl?: string;
  affiliateProvider?: string;
  featured?: boolean;
};

export type TopicCard = {
  id: string;
  title: string;
  heat: string;
  window: string;
  competition: "低" | "中" | "高";
  scores: GzwScore;
  angles: string[];
  headlines: string[];
  materials: Source[];
  publishedAt: string;
};

const contentRoot = join(process.cwd(), "content");

function str(value: string | string[] | undefined, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function list(value: string | string[] | undefined): string[] {
  return Array.isArray(value) ? value : [];
}

function num(value: string | string[] | undefined): number {
  const parsed = Number(typeof value === "string" ? value : "");
  return Number.isFinite(parsed) ? parsed : 0;
}

function readMarkdownDir(dir: string) {
  let files: string[] = [];
  try {
    files = readdirSync(dir).filter((name) => name.endsWith(".md"));
  } catch {
    return [];
  }
  return files.map((fileName) => {
    const raw = readFileSync(join(dir, fileName), "utf8");
    const { data, body } = parseFrontmatter(raw);
    return { slug: fileName.replace(/\.md$/, ""), data, body };
  });
}

function loadPosts(): Post[] {
  return readMarkdownDir(join(contentRoot, "posts")).map(({ slug, data, body }) => ({
    slug,
    title: str(data.title),
    excerpt: str(data.excerpt),
    oneLiner: str(data.oneLiner),
    publishedAt: str(data.publishedAt),
    type: str(data.type, "daily") as PostType,
    category: str(data.category),
    readTime: str(data.readTime),
    tags: list(data.tags),
    scores: {
      novelty: num(data.novelty),
      viral: num(data.viral),
      accessible: num(data.accessible)
    },
    sources: parsePairs(list(data.sources)),
    body: parseBody(body),
    proAngles: list(data.proAngles),
    headlineTemplates: list(data.headlineTemplates),
    relatedTools: list(data.relatedTools)
  }));
}

function loadTopicCards(): TopicCard[] {
  return readMarkdownDir(join(contentRoot, "topic-cards")).map(
    ({ slug, data }) => ({
      id: str(data.id) || slug,
      title: str(data.title),
      heat: str(data.heat),
      window: str(data.window),
      competition: (str(data.competition, "中") as TopicCard["competition"]),
      scores: {
        novelty: num(data.novelty),
        viral: num(data.viral),
        accessible: num(data.accessible)
      },
      angles: list(data.angles),
      headlines: list(data.headlines),
      materials: parsePairs(list(data.materials)),
      publishedAt: str(data.publishedAt)
    })
  );
}

export const posts: Post[] = loadPosts();

export const topicCards: TopicCard[] = loadTopicCards();

export const tools: Tool[] = [
  {
    slug: "perplexity",
    name: "Perplexity",
    description: "带来源引用的 AI 搜索工具，适合快速做选题事实核对和竞品搜集。",
    url: "https://www.perplexity.ai/",
    category: "AI 搜索",
    tags: ["搜索", "资料核对", "引用"],
    scores: { novelty: 6.8, viral: 8.5, accessible: 7.7 },
    featured: true
  },
  {
    slug: "arc",
    name: "Arc",
    description: "强调 AI 辅助浏览和空间管理的浏览器，适合观察搜索入口变化。",
    url: "https://arc.net/",
    category: "浏览器",
    tags: ["浏览器", "AI", "效率"],
    scores: { novelty: 8.2, viral: 8.0, accessible: 6.5 },
    featured: true
  },
  {
    slug: "cursor",
    name: "Cursor",
    description: "AI 原生代码编辑器，适合开发者内容、效率工具对比和案例拆解。",
    url: "https://www.cursor.com/",
    category: "AI 编程",
    tags: ["编程", "Agent", "IDE"],
    scores: { novelty: 7.2, viral: 8.9, accessible: 7.4 },
    featured: true
  },
  {
    slug: "github-copilot",
    name: "GitHub Copilot",
    description: "主流 AI 编程助手，可作为所有 AI 编程工具实测里的基准样本。",
    url: "https://github.com/features/copilot",
    category: "AI 编程",
    tags: ["编程", "补全", "GitHub"],
    scores: { novelty: 5.9, viral: 8.2, accessible: 7.1 }
  },
  {
    slug: "continue",
    name: "Continue",
    description: "开源 AI 编程助手，适合写本地模型、私有化和开源替代方向。",
    url: "https://www.continue.dev/",
    category: "AI 编程",
    tags: ["开源", "编程", "本地模型"],
    scores: { novelty: 7.7, viral: 7.5, accessible: 6.8 }
  },
  {
    slug: "make",
    name: "Make",
    description: "可视化自动化平台，适合做“非程序员自动化工作流”的教程内容。",
    url: "https://www.make.com/",
    category: "自动化",
    tags: ["工作流", "自动化", "SaaS"],
    scores: { novelty: 6.1, viral: 7.3, accessible: 7.6 },
    affiliateProvider: "direct"
  },
  {
    slug: "notion",
    name: "Notion",
    description: "内容创作者常用知识库，可作为 AI 笔记和个人工作台话题的对照组。",
    url: "https://www.notion.so/",
    category: "知识库",
    tags: ["笔记", "知识库", "协作"],
    scores: { novelty: 5.7, viral: 7.6, accessible: 8.4 }
  },
  {
    slug: "raycast",
    name: "Raycast",
    description: "Mac 启动器和效率工作台，适合写高阶效率工具链。",
    url: "https://www.raycast.com/",
    category: "效率",
    tags: ["Mac", "效率", "启动器"],
    scores: { novelty: 6.9, viral: 7.2, accessible: 6.9 }
  },
  {
    slug: "chatgpt",
    name: "ChatGPT",
    description: "OpenAI 的对话式 AI，几乎所有 AI 内容评测都绕不开的基准样本。",
    url: "https://chat.openai.com/",
    category: "AI 助手",
    tags: ["对话", "写作", "通用"],
    scores: { novelty: 5.5, viral: 9.2, accessible: 7.0 },
    featured: true
  },
  {
    slug: "claude",
    name: "Claude",
    description: "Anthropic 的 AI 助手，长文档处理和写作能力强，适合做对照评测。",
    url: "https://claude.ai/",
    category: "AI 助手",
    tags: ["对话", "长文本", "写作"],
    scores: { novelty: 6.4, viral: 8.3, accessible: 6.6 }
  },
  {
    slug: "midjourney",
    name: "Midjourney",
    description: "高质量 AI 绘图工具，适合写 AI 设计、封面图和视觉风格类选题。",
    url: "https://www.midjourney.com/",
    category: "AI 设计",
    tags: ["图像", "设计", "绘画"],
    scores: { novelty: 7.0, viral: 8.7, accessible: 6.2 }
  },
  {
    slug: "elevenlabs",
    name: "ElevenLabs",
    description: "AI 语音合成与配音工具，适合写口播、有声内容和多语种配音选题。",
    url: "https://elevenlabs.io/",
    category: "AI 音视频",
    tags: ["配音", "语音", "音频"],
    scores: { novelty: 7.6, viral: 8.0, accessible: 6.4 }
  },
  {
    slug: "descript",
    name: "Descript",
    description: "用文字稿驱动的音视频剪辑工具，适合写播客、视频和效率工作流。",
    url: "https://www.descript.com/",
    category: "AI 音视频",
    tags: ["剪辑", "播客", "视频"],
    scores: { novelty: 7.1, viral: 7.4, accessible: 6.5 }
  },
  {
    slug: "gamma",
    name: "Gamma",
    description: "AI 生成演示和网页的工具，适合写“一句话出 PPT”类效率选题。",
    url: "https://gamma.app/",
    category: "AI 设计",
    tags: ["演示", "PPT", "AI"],
    scores: { novelty: 7.3, viral: 7.8, accessible: 7.5 }
  },
  {
    slug: "obsidian",
    name: "Obsidian",
    description: "本地优先的双链笔记工具，适合写个人知识库和“可对话笔记”方向。",
    url: "https://obsidian.md/",
    category: "知识库",
    tags: ["笔记", "知识库", "本地"],
    scores: { novelty: 6.6, viral: 7.0, accessible: 7.2 }
  },
  {
    slug: "n8n",
    name: "n8n",
    description: "开源可视化自动化平台，适合写自托管、私有化的工作流自动化选题。",
    url: "https://n8n.io/",
    category: "自动化",
    tags: ["开源", "自动化", "工作流"],
    scores: { novelty: 7.4, viral: 7.1, accessible: 6.7 }
  },
  {
    slug: "framer",
    name: "Framer",
    description: "AI 辅助的无代码建站工具，适合写落地页、个人站和出海建站选题。",
    url: "https://www.framer.com/",
    category: "建站",
    tags: ["建站", "设计", "无代码"],
    scores: { novelty: 6.8, viral: 7.3, accessible: 7.0 }
  }
];

export const categories = Array.from(new Set(tools.map((tool) => tool.category)));

export function getSortedPosts() {
  return [...posts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function getToolBySlug(slug: string) {
  return tools.find((tool) => tool.slug === slug);
}

export function getAverageScore(scores: GzwScore) {
  return Number(
    ((scores.novelty + scores.viral + scores.accessible) / 3).toFixed(1)
  );
}

export function getPostsByType(type: PostType) {
  return getSortedPosts().filter((post) => post.type === type);
}

export function getPostsByTool(toolSlug: string) {
  return getSortedPosts().filter((post) =>
    post.relatedTools.includes(toolSlug)
  );
}

export function getAllTags() {
  const counts = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) || 0) + 1);
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([tag]) => tag);
}

export function getPostsByTag(tag: string) {
  return getSortedPosts().filter((post) => post.tags.includes(tag));
}

export function getSortedTopicCards() {
  return [...topicCards].sort((a, b) =>
    (b.publishedAt || "").localeCompare(a.publishedAt || "")
  );
}

export function getTopicCardById(id: string) {
  return topicCards.find((card) => card.id === id);
}
