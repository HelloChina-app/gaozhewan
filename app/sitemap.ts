import type { MetadataRoute } from "next";
import {
  getAllTags,
  getPostsByTag,
  posts,
  tools,
  topicCards,
  topicClusters
} from "@/lib/content";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const latestContentDate = [
    ...posts.map((post) => post.publishedAt),
    ...topicCards.map((card) => card.updatedAt || card.publishedAt),
    ...topicClusters.map((cluster) => cluster.updatedAt || cluster.publishedAt),
    ...tools.map((tool) => tool.guide?.updatedAt || tool.guide?.publishedAt)
  ]
    .filter(Boolean)
    .sort()
    .at(-1);
  const contentHubs = new Set(["", "/post", "/tools", "/weekly", "/topics"]);
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
      ...(tool.guide?.updatedAt || tool.guide?.publishedAt
        ? { lastModified: new Date(tool.guide.updatedAt || tool.guide.publishedAt) }
        : {}),
      changeFrequency: "monthly" as const,
      priority: tool.guide ? 0.75 : 0.6
    })),
    ...topicCards.map((card) => ({
      url: `${site.url}/topic/${card.id}`,
      lastModified: card.updatedAt || card.publishedAt ? new Date(card.updatedAt || card.publishedAt) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6
    })),
    ...topicClusters.map((cluster) => ({
      url: `${site.url}/topics/${cluster.slug}`,
      lastModified: new Date(cluster.updatedAt || cluster.publishedAt),
      changeFrequency: "weekly" as const,
      priority: 0.75
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
