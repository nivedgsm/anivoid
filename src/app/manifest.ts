import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Anivoid News Network",
    short_name: "Anivoid",
    description:
      "Anivoid News Network covers the latest anime news, release dates, trailers, announcements, reviews, guides, and anime recommendations.",
    start_url: "/",
    display: "standalone",
    background_color: "#050510",
    theme_color: "#7c3aed",
    categories: ["news", "entertainment", "anime"],
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}