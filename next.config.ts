import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // AniList anime covers and banners
      {
        protocol: "https",
        hostname: "s4.anilist.co",
        pathname: "/file/anilistcdn/**",
      },

      // Anime News Network images
      {
        protocol: "https",
        hostname: "www.animenewsnetwork.com",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "cdn.animenewsnetwork.com",
        pathname: "/images/**",
      },

      // Placeholder images
      {
        protocol: "https",
        hostname: "placehold.co",
      },

      // Unsplash fallback / old mock images
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },

      // Optional fallback for any HTTPS image
      // Keep this only while developing.
      // Remove later for stricter production security.
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;