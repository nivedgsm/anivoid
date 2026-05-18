import Parser from "rss-parser";
import * as cheerio from "cheerio";
import { unstable_cache } from "next/cache";

import { supabaseAdmin } from "@/lib/supabase/server";

export type NewsArticle = {
  id: string;
  slug: string;
  title: string;
  originalLink: string;
  pubDate: string;
  content: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  source: string;
  readingTime: string;
};

type NewsArticleRow = {
  id: string;
  slug: string;
  title: string;
  original_link: string;
  pub_date: string;
  content: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  source: string;
  reading_time: string;
};

type NewsArticleInsertRow = {
  slug: string;
  title: string;
  original_link: string;
  pub_date: string;
  content: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  source: string;
  reading_time: string;
};

type RssItem = {
  title?: string;
  link?: string;
  pubDate?: string;
  content?: string;
  contentSnippet?: string;
  isoDate?: string;
};

const parser = new Parser();

const ANN_RSS_URL = "https://www.animenewsnetwork.com/all/rss.xml";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1600&auto=format&fit=crop";

const NEWS_CACHE_SECONDS = 60 * 10;
const RSS_ITEM_LIMIT = 30;
const ARTICLE_DETAIL_LIMIT = 12;
const ARTICLE_FETCH_TIMEOUT_MS = 7000;

function createSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .trim();
}

function cleanText(value?: string) {
  if (!value) return "";

  return value
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

function getCategoryFromTitle(title: string) {
  const normalizedTitle = title.toLowerCase();

  if (
    normalizedTitle.includes("manga") ||
    normalizedTitle.includes("comic")
  ) {
    return "Manga";
  }

  if (
    normalizedTitle.includes("game") ||
    normalizedTitle.includes("switch") ||
    normalizedTitle.includes("playstation") ||
    normalizedTitle.includes("xbox") ||
    normalizedTitle.includes("steam")
  ) {
    return "Games";
  }

  if (
    normalizedTitle.includes("movie") ||
    normalizedTitle.includes("film") ||
    normalizedTitle.includes("theater")
  ) {
    return "Movies";
  }

  if (
    normalizedTitle.includes("music") ||
    normalizedTitle.includes("song") ||
    normalizedTitle.includes("opening") ||
    normalizedTitle.includes("ending")
  ) {
    return "Music";
  }

  if (
    normalizedTitle.includes("industry") ||
    normalizedTitle.includes("studio") ||
    normalizedTitle.includes("staff") ||
    normalizedTitle.includes("director") ||
    normalizedTitle.includes("producer")
  ) {
    return "Industry";
  }

  return "Anime";
}

function getReadingTime(text: string) {
  const words = cleanText(text).split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 220));

  return `${minutes} min read`;
}

function normalizeDate(date?: string) {
  if (!date) return new Date().toISOString();

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return new Date().toISOString();
  }

  return parsedDate.toISOString();
}

function normalizeImageUrl(image?: string) {
  if (!image) return "";

  if (image.startsWith("//")) {
    return `https:${image}`;
  }

  if (image.startsWith("http://")) {
    return image.replace("http://", "https://");
  }

  return image;
}

async function fetchWithTimeout(
  url: string,
  timeoutMs = ARTICLE_FETCH_TIMEOUT_MS
) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      signal: controller.signal,
      next: {
        revalidate: NEWS_CACHE_SECONDS,
      },
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; AnivoidBot/1.0; +https://anivoid.com)",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
    });
  } finally {
    clearTimeout(timeout);
  }
}

async function extractArticleData(url: string) {
  try {
    if (!url) {
      return {
        image: "",
        description: "",
      };
    }

    const response = await fetchWithTimeout(url);

    if (!response.ok) {
      return {
        image: "",
        description: "",
      };
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const image = normalizeImageUrl(
      $('meta[property="og:image"]').attr("content") ||
        $('meta[name="twitter:image"]').attr("content") ||
        ""
    );

    const description =
      $('meta[property="og:description"]').attr("content") ||
      $('meta[name="description"]').attr("content") ||
      "";

    return {
      image,
      description: cleanText(description),
    };
  } catch {
    return {
      image: "",
      description: "",
    };
  }
}

function getImageFromRssItem(item: RssItem) {
  const content = item.content || item.contentSnippet || "";

  const imageMatch =
    content.match(/<img[^>]+src=["']([^"']+)["']/i) ||
    content.match(/src=["']([^"']+\.(jpg|jpeg|png|webp|gif))["']/i);

  return normalizeImageUrl(imageMatch?.[1] || "");
}

function normalizeNewsItem(
  item: RssItem,
  articleData: {
    image: string;
    description: string;
  }
): NewsArticleInsertRow {
  const title = cleanText(item.title || "Untitled Anime News");
  const slug = createSlug(title || "anime-news");
  const originalLink = item.link || "";

  const rawContent =
    articleData.description ||
    item.contentSnippet ||
    item.content ||
    "Read the full story from the original source.";

  const content = cleanText(rawContent);

  const excerpt =
    content.length > 180 ? `${content.slice(0, 180).trim()}...` : content;

  const rssImage = getImageFromRssItem(item);

  return {
    slug,
    title,
    original_link: originalLink,
    pub_date: normalizeDate(item.pubDate || item.isoDate),
    content,
    excerpt,
    image: articleData.image || rssImage || FALLBACK_IMAGE,
    category: getCategoryFromTitle(title),
    author: "Anime News Network",
    source: "Anime News Network",
    reading_time: getReadingTime(content),
  };
}

function mapNewsRow(row: NewsArticleRow): NewsArticle {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    originalLink: row.original_link,
    pubDate: row.pub_date,
    content: row.content,
    excerpt: row.excerpt,
    image: row.image,
    category: row.category,
    author: row.author,
    source: row.source,
    readingTime: row.reading_time,
  };
}

export async function syncLatestAnimeNewsToDatabase() {
  try {
    const feed = await parser.parseURL(ANN_RSS_URL);
    const items = feed.items.slice(0, RSS_ITEM_LIMIT) as RssItem[];

    const rows = await Promise.all(
      items.map(async (item, index) => {
        const shouldExtractArticlePage = index < ARTICLE_DETAIL_LIMIT;

        const articleData = shouldExtractArticlePage
          ? await extractArticleData(item.link || "")
          : {
              image: "",
              description: "",
            };

        return normalizeNewsItem(item, articleData);
      })
    );

    const validRows = rows.filter(
      (row) => row.title && row.slug && row.original_link
    );

    if (!validRows.length) {
      return {
        success: true,
        inserted: 0,
        message: "No valid news rows found.",
      };
    }

    const { error } = await supabaseAdmin
      .from("news_articles")
      .upsert(validRows, {
        onConflict: "original_link",
        ignoreDuplicates: false,
      });

    if (error) {
      console.warn("News sync database error:", error);

      return {
        success: false,
        inserted: 0,
        error: error.message,
      };
    }

    return {
      success: true,
      inserted: validRows.length,
      message: `Synced ${validRows.length} articles.`,
    };
  } catch (error) {
    console.warn("syncLatestAnimeNewsToDatabase error:", error);

    return {
      success: false,
      inserted: 0,
      error: "Failed to sync latest anime news.",
    };
  }
}

async function getLatestAnimeNewsFromDatabaseUncached(
  limit = 24
): Promise<NewsArticle[]> {
  const { data, error } = await supabaseAdmin
    .from("news_articles")
    .select(
      "id, slug, title, original_link, pub_date, content, excerpt, image, category, author, source, reading_time"
    )
    .order("pub_date", {
      ascending: false,
    })
    .limit(limit);

  if (error) {
    console.warn("getLatestAnimeNews database error:", error);
    return [];
  }

  return ((data || []) as NewsArticleRow[]).map(mapNewsRow);
}

export const getLatestAnimeNews = unstable_cache(
  getLatestAnimeNewsFromDatabaseUncached,
  ["latest-anime-news-db"],
  {
    revalidate: NEWS_CACHE_SECONDS,
    tags: ["anime-news"],
  }
);

export async function getNewsBySlug(
  slug: string
): Promise<NewsArticle | null> {
  if (!slug) return null;

  const { data, error } = await supabaseAdmin
    .from("news_articles")
    .select(
      "id, slug, title, original_link, pub_date, content, excerpt, image, category, author, source, reading_time"
    )
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.warn("getNewsBySlug database error:", error);
    return null;
  }

  return data ? mapNewsRow(data as NewsArticleRow) : null;
}

export async function getRelatedNews(
  currentSlug: string,
  category?: string,
  limit = 3
): Promise<NewsArticle[]> {
  let query = supabaseAdmin
    .from("news_articles")
    .select(
      "id, slug, title, original_link, pub_date, content, excerpt, image, category, author, source, reading_time"
    )
    .neq("slug", currentSlug)
    .order("pub_date", {
      ascending: false,
    })
    .limit(limit);

  if (category) {
    query = query.eq("category", category);
  }

  const { data, error } = await query;

  if (error) {
    console.warn("getRelatedNews database error:", error);
    return [];
  }

  return ((data || []) as NewsArticleRow[]).map(mapNewsRow);
}

export async function getNewsPage({
  page = 1,
  limit = 24,
  category,
}: {
  page?: number;
  limit?: number;
  category?: string;
}): Promise<NewsArticle[]> {
  const safePage = Math.max(1, page);
  const safeLimit = Math.min(Math.max(1, limit), 48);
  const from = (safePage - 1) * safeLimit;
  const to = from + safeLimit - 1;

  let query = supabaseAdmin
    .from("news_articles")
    .select(
      "id, slug, title, original_link, pub_date, content, excerpt, image, category, author, source, reading_time"
    )
    .order("pub_date", {
      ascending: false,
    })
    .range(from, to);

  if (category) {
    query = query.eq("category", category);
  }

  const { data, error } = await query;

  if (error) {
    console.warn("getNewsPage database error:", error);
    return [];
  }

  return ((data || []) as NewsArticleRow[]).map(mapNewsRow);
}

export function formatNewsDate(date: string) {
  try {
    return new Intl.DateTimeFormat("en", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(date));
  } catch {
    return "Recently";
  }
}

export function formatNewsDateTime(date: string) {
  try {
    return new Intl.DateTimeFormat("en", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(date));
  } catch {
    return "Recently";
  }
}