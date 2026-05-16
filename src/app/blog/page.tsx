import Link from "next/link";

import { getBlogPosts, formatBlogDate } from "@/lib/blog";
import { SafeImage } from "@/components/shared/safe-image";

export const metadata = {
  title: "Anime Guides and Blog",
  description:
    "Anime guides, recommendations, watch lists, filler guides, streaming picks, and anime news explainers.",
};

export default function BlogPage() {
  const posts = getBlogPosts();

  const featured = posts[0];
  const remainingPosts = posts.slice(1);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="mb-12 max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.35em] text-[#4D7FFF]">
            Anivoid Blog
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-tight text-white md:text-6xl">
            Anime Guides, Watchlists and SEO Hubs
          </h1>

          <p className="mt-5 text-base leading-8 text-slate-400 md:text-lg">
            Curated anime recommendations, streaming guides, genre lists,
            filler guides, and anime news explainers built for discovery.
          </p>
        </div>

        {featured && (
          <Link
            href={`/blog/${featured.slug}`}
            className="group relative mb-14 grid overflow-hidden rounded-[2rem] border border-[#4D7FFF]/25 bg-[#050711] shadow-[0_0_50px_rgba(77,127,255,0.08)] transition duration-300 hover:border-[#4D7FFF]/70 lg:grid-cols-[1.1fr_0.9fr]"
          >
            <div className="relative min-h-[360px] overflow-hidden bg-black lg:min-h-[520px]">
              <SafeImage
                src={featured.image}
                alt={featured.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover object-center transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-black/25 lg:to-[#050711]" />

              <div className="absolute left-6 top-6 rounded-full border border-[#4D7FFF]/40 bg-black/60 px-4 py-2 text-xs font-black uppercase tracking-[0.25em] text-[#8FAEFF] backdrop-blur">
                Featured Guide
              </div>
            </div>

            <div className="flex flex-col justify-center p-7 md:p-10 lg:p-12">
              <div className="mb-5 flex flex-wrap items-center gap-3 text-xs font-black uppercase tracking-[0.22em] text-slate-400">
                <span>{formatBlogDate(featured.publishedAt)}</span>
                <span className="text-[#4D7FFF]">•</span>
                <span>{featured.readingTime}</span>
                <span className="text-[#4D7FFF]">•</span>
                <span>{featured.category}</span>
              </div>

              <h2 className="text-3xl font-black leading-tight text-white md:text-5xl">
                {featured.title}
              </h2>

              <p className="mt-5 line-clamp-4 text-base leading-8 text-slate-400">
                {featured.description}
              </p>

              <div className="mt-8">
                <span className="inline-flex items-center rounded-full bg-[#4D7FFF] px-5 py-3 text-sm font-black text-white transition group-hover:bg-[#8FAEFF] group-hover:text-black">
                  Read guide →
                </span>
              </div>
            </div>
          </Link>
        )}

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {remainingPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group overflow-hidden rounded-[1.75rem] border border-[#1d2a4d] bg-[#050711] transition duration-300 hover:-translate-y-1 hover:border-[#4D7FFF]/80 hover:shadow-[0_0_45px_rgba(77,127,255,0.16)]"
            >
              <div className="relative h-[270px] overflow-hidden bg-black">
                <SafeImage
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#050711] via-black/20 to-transparent" />

                <div className="absolute left-5 top-5 rounded-full border border-[#4D7FFF]/30 bg-black/65 px-4 py-2 text-[11px] font-black uppercase tracking-[0.25em] text-slate-200 backdrop-blur">
                  {post.category}
                </div>
              </div>

              <div className="p-7">
                <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-slate-500">
                  <span>{formatBlogDate(post.publishedAt)}</span>
                  <span className="text-[#4D7FFF]">•</span>
                  <span>{post.readingTime}</span>
                </div>

                <h2 className="line-clamp-2 text-2xl font-black leading-tight text-white transition group-hover:text-[#4D7FFF]">
                  {post.title}
                </h2>

                <p className="mt-4 line-clamp-3 text-sm leading-7 text-slate-400">
                  {post.description}
                </p>

                <div className="mt-7 text-sm font-black text-[#4D7FFF]">
                  Read guide →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}