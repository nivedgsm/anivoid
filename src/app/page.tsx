import type { Metadata } from "next";

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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://anivoid-kappa.vercel.app";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Anivoid News Network | Latest Anime News & Release Dates",
  description:
    "Anivoid News Network covers the latest anime news, manga updates, anime release dates, trailers, announcements, seasonal anime, reviews, anime guides, and anime recommendations for anime fans.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Anivoid News Network | Latest Anime News & Release Dates",
    description:
      "Latest anime news, manga updates, anime release dates, trailers, announcements, seasonal anime, reviews, guides, and anime recommendations from Anivoid News Network.",
    url: "/",
    siteName: "Anivoid News Network",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Anivoid News Network - Latest Anime News and Release Dates",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anivoid News Network | Latest Anime News & Release Dates",
    description:
      "Latest anime news, manga updates, anime release dates, trailers, announcements, reviews, guides, and anime recommendations from Anivoid News Network.",
    images: ["/og-image.jpg"],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "NewsMediaOrganization",
  name: "Anivoid News Network",
  alternateName: ["Anivoid", "Anivoid Anime News Network"],
  url: siteUrl,
  logo: `${siteUrl}/icon-512.png`,
  description:
    "Anivoid News Network is an anime news platform covering the latest anime news, manga updates, release dates, trailers, announcements, seasonal anime, reviews, guides, and anime recommendations.",
  sameAs: [],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Anivoid News Network",
  alternateName: ["Anivoid", "Anivoid Anime News Network"],
  url: siteUrl,
  description:
    "Latest anime news, manga updates, anime release dates, trailers, announcements, seasonal anime, reviews, guides, and anime recommendations.",
};

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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteJsonLd),
        }}
      />

      <main className="min-h-screen bg-background text-foreground">
        <BackgroundGlow />

        <CategoryPills />

        <HeroSection anime={trendingAnime} />

        <EditorialSection news={latestNews} trendingAnime={trendingAnime} />

        <BlogGuidesSection />

        <TrendingAnimeSection anime={trendingAnime} />

        <UpcomingReleasesSection anime={upcomingAnime} />
      </main>
    </>
  );
}