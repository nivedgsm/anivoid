import type { MetadataRoute } from "next";

import { getAllBlogPosts } from "@/lib/blog";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://anivoid-kappa.vercel.app"
).replace(/\/$/, "");

function absoluteUrl(path: string) {
  if (path === "/") {
    return SITE_URL;
  }

  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: absoluteUrl("/news"),
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: absoluteUrl("/blog"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/trending"),
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/anime"),
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/reviews"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.65,
    },
  ];

  const blogRoutes: MetadataRoute.Sitemap = getAllBlogPosts().map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.updatedAt || post.publishedAt || now),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  return [...staticRoutes, ...blogRoutes];
}