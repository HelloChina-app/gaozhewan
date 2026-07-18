import { getSortedPosts, getSortedTopicCards } from "@/lib/content";
import { site } from "@/lib/site";
import { truncateText } from "@/lib/utils";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export const dynamic = "force-static";

export function GET() {
  const posts = getSortedPosts();
  const cards = getSortedTopicCards();
  const entries = [
    ...posts.map((post) => ({
      category: post.category || "文章",
      description: post.excerpt,
      publishedAt: post.publishedAt,
      title: post.title,
      url: `${site.url}/post/${post.slug}`
    })),
    ...cards.map((card) => ({
      category: "选题卡",
      description: truncateText(card.heat, 240),
      publishedAt: card.publishedAt,
      title: card.title,
      url: `${site.url}/topic/${card.id}`
    }))
  ]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 50);
  const items = entries
    .map((entry) => {
      return `    <item>
      <title>${escapeXml(entry.title)}</title>
      <link>${entry.url}</link>
      <guid isPermaLink="true">${entry.url}</guid>
      <pubDate>${new Date(entry.publishedAt).toUTCString()}</pubDate>
      <category>${escapeXml(entry.category)}</category>
      <description>${escapeXml(entry.description)}</description>
    </item>`;
    })
    .join("\n");
  const lastBuildDate = entries[0]
    ? new Date(entries[0].publishedAt).toUTCString()
    : new Date(0).toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(site.name)}</title>
    <link>${site.url}</link>
    <description>${escapeXml(site.description)}</description>
    <language>zh-CN</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${site.url}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8"
    }
  });
}
