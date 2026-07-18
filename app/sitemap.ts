import type { MetadataRoute } from "next";
import {
  getAllTags,
  getPostsByTag,
  posts,
  tools,
  topicCards
} from "@/lib/content";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const latestContentDate = [...posts, ...topicCards]
    .map((item) => item.publishedAt)
    .filter(Boolean)
    .sort()
    .at(-1);
  const contentHubs = new Set(["", "/post", "/weekly", "/topics"]);
  const routes = [
    "",
    "/post",
    "/tools",
    "/projects",
    "/side-hustles",
    "/weekly",
    "/topics",
    "/pricing",
    "/subscribe",
    "/about",
    "/privacy"
  ];

  return [
    ...routes.map((route) => ({
      url: `${site.url}${route}`,
      ...(latestContentDate && contentHubs.has(route)
        ? { lastModified: new Date(latestContentDate) }
        : {}),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.7
    })),
    ...posts.map((post) => ({
      url: `${site.url}/post/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.8
    })),
    ...tools.map((tool) => ({
      url: `${site.url}/tools/${tool.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6
    })),
    ...topicCards.map((card) => ({
      url: `${site.url}/topic/${card.id}`,
      lastModified: card.publishedAt ? new Date(card.publishedAt) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6
    })),
    ...getAllTags().map((tag) => {
      const lastModified = getPostsByTag(tag)[0]?.publishedAt;
      return {
        url: `${site.url}/tag/${encodeURIComponent(tag)}`,
        ...(lastModified ? { lastModified: new Date(lastModified) } : {}),
        changeFrequency: "weekly" as const,
        priority: 0.5
      };
    })
  ];
}
