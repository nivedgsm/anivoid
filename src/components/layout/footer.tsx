import Link from "next/link";

const footerLinks = {
  Explore: [
    {
      label: "News",
      href: "/news",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "Trending",
      href: "/trending",
    },
    {
      label: "Anime",
      href: "/anime",
    },
    {
      label: "Reviews",
      href: "/reviews",
    },
  ],

  Guides: [
    {
      label: "Best Anime to Watch",
      href: "/blog/best-anime-to-watch",
    },
    {
      label: "Best Anime Movies",
      href: "/blog/best-anime-movies",
    },
    {
      label: "Anime Filler List",
      href: "/blog/anime-filler-list-guide",
    },
    {
      label: "Anime on Crunchyroll",
      href: "/blog/best-anime-on-crunchyroll",
    },
    {
      label: "Anime on Netflix",
      href: "/blog/best-anime-on-netflix",
    },
  ],

  Categories: [
    {
      label: "Action Anime",
      href: "/blog/best-action-anime",
    },
    {
      label: "Romance Anime",
      href: "/blog/best-romance-anime",
    },
    {
      label: "Isekai Anime",
      href: "/blog/best-isekai-anime",
    },
    {
      label: "Horror Anime",
      href: "/blog/best-horror-anime",
    },
    {
      label: "Latest Anime News",
      href: "/blog/latest-anime-news-release-dates",
    },
  ],

  Company: [
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Contact",
      href: "/contact",
    },
    {
      label: "Privacy Policy",
      href: "/privacy-policy",
    },
    {
      label: "Terms",
      href: "/terms",
    },
  ],
};

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-blue-500/15 bg-[#000105]">
      <div className="pointer-events-none absolute left-0 top-0 h-[320px] w-[320px] rounded-full bg-blue-600/10 blur-[110px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[360px] w-[360px] rounded-full bg-blue-500/10 blur-[120px]" />

      <div className="relative mx-auto w-full max-w-[1500px] px-6 py-16 md:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr_0.8fr]">
          {/* BRAND */}
          <div>
            <Link href="/" className="group inline-flex items-center gap-3">
              <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-500/25 bg-blue-500/10 shadow-[0_0_30px_rgba(79,125,254,0.16)]">
                <div className="absolute h-5 w-5 rounded-full border border-blue-300/70 shadow-[0_0_18px_rgba(96,165,250,0.55)]" />
                <div className="h-2 w-2 rounded-full bg-blue-300 shadow-[0_0_18px_rgba(96,165,250,0.8)]" />
              </div>

              <div className="leading-none">
                <span className="block text-3xl font-black tracking-tight text-white transition group-hover:text-blue-300">
                  Anivoid
                </span>
                <span className="mt-1 block text-[10px] font-black uppercase tracking-[0.3em] text-blue-300/70">
                  News Network
                </span>
              </div>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-blue-100/60">
              Anime news, manga updates, release dates, trailers, streaming
              guides, filler guides, and anime rankings built for modern anime
              fans.
            </p>

            <div className="mt-6 inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-blue-300">
              Follow the void
            </div>
          </div>

          {/* LINKS */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-5 text-sm font-black uppercase tracking-[0.18em] text-white">
                {title}
              </h3>

              <div className="space-y-3">
                {links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="block text-sm leading-6 text-blue-100/55 transition-colors hover:text-blue-300"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* SEO INTERNAL LINKS */}
        <div className="mt-14 rounded-[28px] border border-blue-500/15 bg-blue-500/[0.04] p-6">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-400">
            Popular Anime Guides
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            {[
              {
                label: "Best Anime",
                href: "/blog/best-anime-to-watch",
              },
              {
                label: "Best Anime Movies",
                href: "/blog/best-anime-movies",
              },
              {
                label: "Romance Anime",
                href: "/blog/best-romance-anime",
              },
              {
                label: "Action Anime",
                href: "/blog/best-action-anime",
              },
              {
                label: "Isekai Anime",
                href: "/blog/best-isekai-anime",
              },
              {
                label: "Horror Anime",
                href: "/blog/best-horror-anime",
              },
              {
                label: "Anime on Crunchyroll",
                href: "/blog/best-anime-on-crunchyroll",
              },
              {
                label: "Anime on Netflix",
                href: "/blog/best-anime-on-netflix",
              },
              {
                label: "Anime Filler List",
                href: "/blog/anime-filler-list-guide",
              },
              {
                label: "Anime News",
                href: "/blog/latest-anime-news-release-dates",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-blue-500/15 bg-black/30 px-4 py-2 text-xs font-bold text-blue-100/65 transition hover:border-blue-400/50 hover:bg-blue-500/10 hover:text-blue-200"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-12 flex flex-col gap-4 border-t border-blue-500/15 pt-6 text-sm text-blue-100/45 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Anivoid. All rights reserved.</p>

          <p>Built for anime news, guides, and Gen Z anime culture.</p>
        </div>
      </div>
    </footer>
  );
}