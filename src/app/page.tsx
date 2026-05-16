import { BlogGuidesSection } from "@/components/home/blog-guides-section";
import { CategoryPills } from "@/components/home/category-pills";
import { EditorialSection } from "@/components/home/editorial-section";
import { HeroSection } from "@/components/home/hero-section";
import { TrendingAnimeSection } from "@/components/home/trending-anime-section";
import { UpcomingReleasesSection } from "@/components/home/upcoming-releases-section";
import { BackgroundGlow } from "@/components/layout/background-glow";

import {
  fetchTrendingAnime,
  fetchLatestNews,
  fetchUpcomingAnime,
} from "@/lib/api";

export const revalidate = 1800;

function ensureArray<T = any>(value: unknown): T[] {
  if (Array.isArray(value)) {
    return value as T[];
  }

  if (
    typeof value === "object" &&
    value !== null &&
    "data" in value &&
    Array.isArray((value as { data?: unknown }).data)
  ) {
    return (value as { data: T[] }).data;
  }

  return [];
}

export default async function HomePage() {
  const [trendingAnimeResponse, latestNewsResponse, upcomingAnimeResponse] =
    await Promise.all([
      fetchTrendingAnime(),
      fetchLatestNews(),
      fetchUpcomingAnime(),
    ]);

  const trendingAnime = ensureArray(trendingAnimeResponse);
  const latestNews = ensureArray(latestNewsResponse);
  const upcomingAnime = ensureArray(upcomingAnimeResponse);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <BackgroundGlow />
<CategoryPills />
      <HeroSection anime={trendingAnime} />

      

      <EditorialSection news={latestNews} trendingAnime={trendingAnime} />

      <BlogGuidesSection />

      <TrendingAnimeSection anime={trendingAnime} />

      <UpcomingReleasesSection anime={upcomingAnime} />
    </main>
  );
}