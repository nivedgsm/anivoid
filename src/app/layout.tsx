import type { Metadata } from "next";
import "./globals.css";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://anivoid-kappa.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Anivoid News Network | Anime News, Release Dates & Guides",
    template: "%s | Anivoid News Network",
  },

  description:
    "Anivoid News Network is an anime news platform covering the latest anime news, manga updates, anime release dates, trailers, announcements, seasonal anime, reviews, watch guides, and anime recommendations.",

  applicationName: "Anivoid News Network",

  keywords: [
    "Anivoid",
    "Anivoid News Network",
    "Anivoid Anime News Network",
    "Anivoid anime news",
    "Anivoid news",
    "anime news",
    "latest anime news",
    "anime news network",
    "anime release dates",
    "anime trailers",
    "anime announcements",
    "anime reviews",
    "anime guides",
    "anime recommendations",
    "best anime",
    "seasonal anime",
    "manga updates",
    "manga news",
    "anime watch order",
    "anime filler list",
    "anime industry news",
  ],

  authors: [
    {
      name: "Anivoid News Network",
      url: siteUrl,
    },
  ],

  creator: "Anivoid News Network",
  publisher: "Anivoid News Network",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Anivoid News Network",
    title: "Anivoid News Network | Anime News, Release Dates & Guides",
    description:
      "Follow Anivoid News Network for the latest anime news, manga updates, anime release dates, trailers, announcements, seasonal anime, reviews, watch guides, and anime recommendations.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Anivoid News Network - Anime News, Release Dates and Guides",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Anivoid News Network | Anime News, Release Dates & Guides",
    description:
      "Latest anime news, manga updates, anime release dates, trailers, announcements, seasonal anime, reviews, guides, and recommendations from Anivoid News Network.",
    images: ["/og-image.jpg"],
    creator: "@anivoid",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  category: "Anime News",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="dark"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <div className="relative flex min-h-screen flex-col overflow-hidden">
          <div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(79,125,254,0.12),transparent_34rem)]" />

          <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_18%_0%,rgba(47,67,206,0.18),transparent_34rem),radial-gradient(circle_at_88%_8%,rgba(79,125,254,0.12),transparent_30rem)]" />

          <Navbar />

          <main className="relative z-10 flex-1">{children}</main>

          <Footer />
        </div>
      </body>
    </html>
  );
}