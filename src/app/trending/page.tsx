import Link from "next/link";
import Image from "next/image";

import { fetchTrendingAnime } from "@/lib/api";

type AnimeTitle = {
  english?: string | null;
  romaji?: string | null;
  native?: string | null;
};

type AnimeCoverImage = {
  extraLarge?: string | null;
  large?: string | null;
  medium?: string | null;
};

type AnimeItem = {
  id?: number | string;
  title?: AnimeTitle | null;
  coverImage?: AnimeCoverImage | null;
  bannerImage?: string | null;
  averageScore?: number | null;
  episodes?: number | null;
  status?: string | null;
};

function ensureArray<T = AnimeItem>(value: unknown): T[] {
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

  if (
    typeof value === "object" &&
    value !== null &&
    "Page" in value &&
    typeof (value as { Page?: unknown }).Page === "object" &&
    (value as { Page?: unknown }).Page !== null &&
    "media" in ((value as { Page: { media?: unknown } }).Page) &&
    Array.isArray((value as { Page: { media?: unknown } }).Page.media)
  ) {
    return (value as { Page: { media: T[] } }).Page.media;
  }

  return [];
}

export default async function TrendingPage() {
  const animeResponse = await fetchTrendingAnime();
  const animeList = ensureArray<AnimeItem>(animeResponse);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* HERO */}
      <section className="border-b border-border">
        <div className="container mx-auto px-4 py-16">
          <p className="text-sm font-medium uppercase tracking-widest text-violet-500">
            Trending Now
          </p>

          <h1 className="mt-4 text-5xl font-black tracking-tight md:text-7xl">
            Most Popular Anime
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            Discover the hottest anime currently dominating the community,
            rankings, and fan discussions.
          </p>
        </div>
      </section>

      {/* GRID */}
      <section className="container mx-auto px-4 py-14">
        {animeList.length === 0 ? (
          <div className="rounded-3xl border border-border bg-card p-8 text-center">
            <p className="text-muted-foreground">
              No trending anime found right now. Please check again later.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {animeList.slice(0, 24).map((anime, index) => {
              const imageUrl =
                anime.coverImage?.extraLarge ||
                anime.coverImage?.large ||
                anime.bannerImage ||
                "/placeholder-anime.jpg";

              const title =
                anime.title?.english ||
                anime.title?.romaji ||
                anime.title?.native ||
                "Anime Cover";

              const animeId = anime.id || index;

              return (
                <Link
                  key={animeId}
                  href={`/anime/${animeId}`}
                  className="group"
                >
                  <div className="overflow-hidden rounded-3xl border border-border bg-card transition hover:border-violet-500">
                    {/* IMAGE */}
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* CONTENT */}
                    <div className="p-5">
                      <div className="mb-3 flex items-center justify-between">
                        <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-500">
                          Trending
                        </span>

                        <span className="text-sm text-muted-foreground">
                          ⭐ {anime.averageScore ?? "N/A"}
                        </span>
                      </div>

                      <h2 className="line-clamp-2 text-lg font-bold leading-snug transition group-hover:text-violet-500">
                        {title}
                      </h2>

                      <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                        <span>{anime.episodes ?? "?"} Episodes</span>

                        <span>{anime.status || "TBA"}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}