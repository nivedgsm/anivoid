import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

import { syncLatestAnimeNewsToDatabase } from "@/lib/news";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      {
        success: false,
        error: "This route is disabled in production.",
      },
      {
        status: 403,
      }
    );
  }

  const result = await syncLatestAnimeNewsToDatabase();

  revalidateTag("anime-news", "default");

  return NextResponse.json(result);
}