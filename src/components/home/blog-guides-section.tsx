import Image from "next/image";
import Link from "next/link";

import { getAllBlogPosts } from "@/lib/blog";
import { FadeIn } from "@/components/shared/fade-in";

export function BlogGuidesSection() {
  const posts = getAllBlogPosts();

  const featuredPosts = posts.slice(0, 3);
  const guideLinks = posts.slice(3, 10);

  return (
    <FadeIn>
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 md:px-10">
        {/* BACKGROUND */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(77,127,255,0.16),transparent_34%),radial-gradient(circle_at_90%_70%,rgba(143,174,255,0.12),transparent_30%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

        <div className="relative mx-auto w-full max-w-[1500px]">
          {/* HEADER */}
          <div className="mb-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_460px] lg:items-end">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-blue-200 shadow-[0_0_30px_rgba(77,127,255,0.12)] backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-300 shadow-[0_0_12px_rgba(147,197,253,0.9)]" />
                Anime Guides
              </div>

              <h2 className="max-w-4xl text-4xl font-black tracking-tight text-white md:text-6xl">
                Watch Guides Built for Anime Fans
              </h2>
            </div>

            <div className="rounded-[28px] border border-blue-500/15 bg-white/[0.03] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl">
              <p className="text-sm leading-7 text-blue-100/65 md:text-base md:leading-8">
                Explore evergreen anime recommendations, streaming guides,
                filler lists, genre picks, and anime news explainers made to
                help fans decide what to watch next.
              </p>
            </div>
          </div>

          {/* CONTENT */}
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_420px]">
            {/* FEATURED CARDS */}
            <div className="grid gap-6 md:grid-cols-3">
              {featuredPosts.map((post, index) => {
                const isMainCard = index === 0;

                return (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className={`
                      group relative overflow-hidden rounded-[30px] border border-blue-500/15 bg-[#050711]/80 shadow-[0_28px_90px_rgba(0,0,0,0.35)] transition duration-300 hover:-translate-y-1 hover:border-blue-400/60 hover:shadow-[0_32px_110px_rgba(77,127,255,0.18)]
                      ${isMainCard ? "md:col-span-2" : ""}
                    `}
                  >
                    <div
                      className={`
                        relative overflow-hidden bg-[#02040b]
                        ${isMainCard ? "h-[420px]" : "h-[420px] md:h-[260px]"}
                      `}
                    >
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes={
                          isMainCard
                            ? "(max-width: 768px) 100vw, 66vw"
                            : "(max-width: 768px) 100vw, 33vw"
                        }
                        className="object-cover object-center opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-[#050711] via-[#050711]/35 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-blue-950/20" />

                      <div className="absolute left-5 top-5 rounded-full border border-blue-400/25 bg-black/60 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-blue-100 backdrop-blur">
                        {post.category}
                      </div>

                      {isMainCard && (
                        <div className="absolute right-5 top-5 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-white/80 backdrop-blur">
                          Featured
                        </div>
                      )}
                    </div>

                    <div
                      className={`
                        relative p-6
                        ${isMainCard ? "md:p-8" : ""}
                      `}
                    >
                      <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-400">
                        {post.contentType}
                      </p>

                      <h3
                        className={`
                          mt-3 font-black leading-tight tracking-tight text-white transition group-hover:text-blue-300
                          ${isMainCard ? "text-3xl md:text-4xl" : "text-2xl"}
                        `}
                      >
                        {post.title}
                      </h3>

                      <p
                        className={`
                          mt-4 text-sm leading-7 text-blue-100/60
                          ${isMainCard ? "line-clamp-3 max-w-2xl" : "line-clamp-3"}
                        `}
                      >
                        {post.description}
                      </p>

                      <div className="mt-6 inline-flex items-center rounded-full border border-blue-400/25 bg-blue-500/10 px-4 py-2 text-sm font-black text-blue-200 transition group-hover:border-blue-300/60 group-hover:bg-blue-500/20 group-hover:text-white">
                        Read guide
                        <span className="ml-2 transition group-hover:translate-x-1">
                          →
                        </span>
                      </div>
                    </div>

                    <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
                      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/70 to-transparent" />
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* SIDEBAR */}
            <aside className="relative overflow-hidden rounded-[30px] border border-blue-500/15 bg-[#050711]/80 p-6 shadow-[0_28px_90px_rgba(0,0,0,0.38)] backdrop-blur-xl xl:sticky xl:top-28 xl:self-start">
              <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-500/15 blur-[80px]" />

              <div className="relative mb-6">
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-blue-400">
                  SEO Library
                </p>

                <h3 className="mt-3 text-3xl font-black tracking-tight text-white">
                  Popular Anime Topics
                </h3>

                <p className="mt-3 text-sm leading-7 text-blue-100/60">
                  Quick links to anime guides that help users discover what to
                  watch next.
                </p>
              </div>

              <div className="relative space-y-3">
                {guideLinks.map((post, index) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group flex items-center gap-4 rounded-2xl border border-blue-500/10 bg-white/[0.025] p-4 transition hover:border-blue-400/45 hover:bg-blue-500/10"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10 text-sm font-black text-blue-300 transition group-hover:border-blue-300/60 group-hover:bg-blue-500/20 group-hover:text-white">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className="line-clamp-1 text-sm font-black text-white transition group-hover:text-blue-300">
                        {post.title}
                      </h4>

                      <p className="mt-1 line-clamp-1 text-xs font-medium text-blue-100/50">
                        {post.mainKeyword}
                      </p>
                    </div>

                    <div className="text-blue-400 opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100">
                      →
                    </div>
                  </Link>
                ))}
              </div>

              <Link
                href="/blog"
                className="relative mt-6 inline-flex w-full items-center justify-center rounded-full border border-blue-400/25 bg-blue-500/10 px-5 py-3 text-sm font-black text-blue-100 transition hover:border-blue-300/70 hover:bg-blue-500/20 hover:text-white"
              >
                View all anime guides →
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </FadeIn>
  );
}