import { HeroSection } from "@/components/home/hero-section";
import { TrendingAnimeSection } from "@/components/home/trending-anime-section";
import { CategoryPills } from "@/components/home/category-pills";
import { UpcomingReleasesSection } from "@/components/home/upcoming-releases-section";
import { EditorialSection } from "@/components/home/editorial-section";
import { BackgroundGlow } from "@/components/layout/background-glow";

import {
  fetchTrendingAnime,
  fetchLatestNews,
  fetchUpcomingAnime,
} from "@/lib/api";

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
  const trendingAnimeResponse = await fetchTrendingAnime();
  const latestNewsResponse = await fetchLatestNews();
  const upcomingAnimeResponse = await fetchUpcomingAnime();

  const trendingAnime = ensureArray(trendingAnimeResponse);
  const latestNews = ensureArray(latestNewsResponse);
  const upcomingAnime = ensureArray(upcomingAnimeResponse);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <BackgroundGlow />

      <CategoryPills />

      <HeroSection anime={trendingAnime} />

      <TrendingAnimeSection anime={trendingAnime} />

      <UpcomingReleasesSection anime={upcomingAnime} />

      <EditorialSection news={latestNews} trendingAnime={trendingAnime} />
    </main>
  );
}