import {
  getAnimeById,
  getTrendingAnime,
  getUpcomingAnime,
} from "@/lib/anilist";

import { getLatestAnimeNews } from "@/lib/news";

export async function fetchTrendingAnime() {
  try {
    const anime = await getTrendingAnime();

    if (!Array.isArray(anime)) {
      return [];
    }

    return anime;
  } catch (error) {
    console.warn("fetchTrendingAnime error:", error);

    return [];
  }
}

export async function fetchLatestNews() {
  try {
    const news = await getLatestAnimeNews();

    if (!Array.isArray(news)) {
      return [];
    }

    return news;
  } catch (error) {
    console.warn("fetchLatestNews error:", error);

    return [];
  }
}

export async function fetchUpcomingAnime() {
  try {
    const anime = await getUpcomingAnime();

    if (!Array.isArray(anime)) {
      return [];
    }

    return anime;
  } catch (error) {
    console.warn("fetchUpcomingAnime error:", error);

    return [];
  }
}

export async function fetchAnimeById(id: string) {
  try {
    if (!id) {
      return null;
    }

    const anime = await getAnimeById(id);

    return anime || null;
  } catch (error) {
    console.warn("fetchAnimeById error:", error);

    return null;
  }
}