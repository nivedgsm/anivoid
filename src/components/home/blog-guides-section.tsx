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
      <section className="relative overflow-hidden px-6 py-20 md:px-10">
        <div className="pointer-events-none absolute left-0 top-20 h-[360px] w-[360px] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-blue-500/10 blur-[130px]" />

        <div className="relative mx-auto w-full max-w-[1500px]">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <div className="mb-4 inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-blue-300">
                Anime Guides
              </div>

              <h2 className="text-4xl font-black tracking-tight text-white md:text-5xl">
                Watch Guides Built for Anime Fans
              </h2>
            </div>

            <p className="max-w-xl text-sm leading-6 text-blue-100/60 md:text-base md:leading-7">
              Explore evergreen anime recommendations, streaming guides, filler
              lists, genre picks, and anime news explainers.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px]">
            <div className="grid gap-8 md:grid-cols-3">
              {featuredPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group overflow-hidden rounded-[28px] border border-blue-500/15 bg-[#05030a]/70 shadow-[0_24px_80px_rgba(0,0,0,0.32)] transition duration-300 hover:-translate-y-1 hover:border-blue-400/50 hover:bg-blue-500/10"
                >
                  <div className="relative h-[230px] overflow-hidden bg-muted">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                    <div className="absolute left-4 top-4 rounded-full border border-blue-400/25 bg-black/60 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-blue-100 backdrop-blur">
                      {post.category}
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-400">
                      {post.contentType}
                    </p>

                    <h3 className="mt-3 line-clamp-3 text-2xl font-black leading-tight tracking-tight text-white transition group-hover:text-blue-300">
                      {post.title}
                    </h3>

                    <p className="mt-4 line-clamp-3 text-sm leading-6 text-blue-100/60">
                      {post.description}
                    </p>

                    <div className="mt-6 inline-flex items-center text-sm font-black text-blue-400 transition group-hover:text-blue-300">
                      Read guide
                      <span className="ml-2 transition group-hover:translate-x-1">
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <aside className="rounded-[28px] border border-blue-500/15 bg-[#05030a]/75 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
              <div className="mb-6">
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-blue-400">
                  SEO Library
                </p>

                <h3 className="mt-3 text-2xl font-black tracking-tight text-white">
                  Popular Anime Topics
                </h3>

                <p className="mt-3 text-sm leading-7 text-blue-100/60">
                  Quick links to anime guides that help users discover what to
                  watch next.
                </p>
              </div>

              <div className="space-y-3">
                {guideLinks.map((post, index) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group flex items-center gap-4 rounded-2xl border border-blue-500/10 bg-blue-500/[0.03] p-4 transition hover:border-blue-400/40 hover:bg-blue-500/10"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-blue-400/20 bg-blue-500/10 text-sm font-black text-blue-300">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="min-w-0">
                      <h4 className="line-clamp-1 text-sm font-black text-white transition group-hover:text-blue-300">
                        {post.title}
                      </h4>

                      <p className="mt-1 line-clamp-1 text-xs font-medium text-blue-100/50">
                        {post.mainKeyword}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              <Link
                href="/blog"
                className="mt-6 inline-flex w-full items-center justify-center rounded-full border border-blue-500/25 bg-blue-500/10 px-5 py-3 text-sm font-black text-blue-100 transition hover:border-blue-400/60 hover:bg-blue-500/15 hover:text-white"
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