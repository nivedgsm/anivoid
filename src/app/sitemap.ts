import type { MetadataRoute } from "next";

import { getAllBlogPosts } from "@/lib/blog";
import { getLatestAnimeNews } from "@/lib/news";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://anivoid.com"
).replace(/\/$/, "");

function absoluteUrl(path: string) {
  if (path === "/") {
    return SITE_URL;
  }

  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: absoluteUrl("/news"),
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.95,
    },
    {
      url: absoluteUrl("/blog"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/trending"),
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/anime"),
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/reviews"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.65,
    },
  ];

  const blogRoutes: MetadataRoute.Sitemap = getAllBlogPosts().map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.updatedAt || post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  let newsRoutes: MetadataRoute.Sitemap = [];

  try {
    const news = await getLatestAnimeNews();

    newsRoutes = news
      .filter((article) => article.slug)
      .slice(0, 80)
      .map((article) => ({
        url: absoluteUrl(`/news/${article.slug}`),
        lastModified: article.pubDate ? new Date(article.pubDate) : new Date(),
        changeFrequency: "weekly",
        priority: 0.75,
      }));
  } catch {
    newsRoutes = [];
  }

  return [...staticRoutes, ...blogRoutes, ...newsRoutes];
}