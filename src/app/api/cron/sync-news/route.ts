import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

import { syncLatestAnimeNewsToDatabase } from "@/lib/news";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.NEWS_SYNC_SECRET;

  const isAuthorizedBySecret =
    cronSecret && authHeader === `Bearer ${cronSecret}`;

  const isAuthorizedByVercelCron =
    process.env.VERCEL === "1" &&
    request.headers.get("user-agent")?.includes("vercel-cron");

  if (!isAuthorizedBySecret && !isAuthorizedByVercelCron) {
    return NextResponse.json(
      {
        success: false,
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const result = await syncLatestAnimeNewsToDatabase();

  revalidateTag("anime-news", "default");

  return NextResponse.json(result);
}
