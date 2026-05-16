import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  formatBlogDate,
  getAllBlogPosts,
  getBlogPostBySlug,
  getRelatedBlogPosts,
} from "@/lib/blog";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const SITE_NAME = "Anivoid";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://anivoid.com";

export const revalidate = 3600;

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: `Blog Not Found | ${SITE_NAME}`,
      description: "The requested anime blog post could not be found.",
    };
  }

  return {
    title: `${post.title} | ${SITE_NAME}`,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      siteName: SITE_NAME,
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [SITE_NAME],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.image],
    },
    keywords: [
      post.mainKeyword,
      post.category,
      "anime",
      "anime guide",
      "anime recommendations",
      "anime watch guide",
      "Anivoid",
    ],
  };
}

function JsonLd({
  post,
}: {
  post: NonNullable<ReturnType<typeof getBlogPostBySlug>>;
}) {
  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: [post.image],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    keywords: [
      post.mainKeyword,
      post.category,
      "anime",
      "anime recommendations",
      "anime guide",
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const itemListJsonLd =
    post.recommendations && post.recommendations.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: post.title,
          description: post.description,
          itemListOrder: "https://schema.org/ItemListOrderAscending",
          numberOfItems: post.recommendations.length,
          itemListElement: post.recommendations.map(
            (recommendation, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: recommendation.title,
              description: recommendation.whyWatch,
            })
          ),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {itemListJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(itemListJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      ) : null}
    </>
  );
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedBlogPosts(post.slug, 3);
  const hasRecommendations =
    Array.isArray(post.recommendations) && post.recommendations.length > 0;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <JsonLd post={post} />

      <section className="relative overflow-hidden border-b border-blue-500/15 bg-[#000105]/70">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(79,125,254,0.18),transparent_32rem)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(168,85,247,0.14),transparent_30rem)]" />

        <div className="relative mx-auto w-full max-w-[1500px] px-6 py-8 md:px-10 md:py-12">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm font-black text-blue-200/80 transition hover:text-blue-300"
          >
            ← Back to Blog
          </Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_420px] xl:grid-cols-[minmax(0,1fr)_460px]">
            <div>
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-blue-600 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-white shadow-[0_0_30px_rgba(79,125,254,0.35)]">
                  {post.category}
                </span>

                <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-200/70">
                  {post.contentType}
                </span>
              </div>

              <h1 className="max-w-6xl text-4xl font-black leading-[1.04] tracking-tight text-white md:text-6xl lg:text-7xl">
                {post.title}
              </h1>

              <p className="mt-6 max-w-4xl text-lg leading-8 text-blue-100/70 md:text-xl md:leading-9">
                {post.description}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3 text-sm font-semibold text-blue-100/55">
                <span>{formatBlogDate(post.publishedAt)}</span>
                <span className="h-1 w-1 rounded-full bg-blue-300/60" />
                <span>{post.readingTime}</span>
                <span className="h-1 w-1 rounded-full bg-blue-300/60" />
                <span>Main keyword: {post.mainKeyword}</span>
              </div>
            </div>

            <aside className="hidden lg:block">
              <div className="rounded-[28px] border border-blue-500/15 bg-[#05030a]/75 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-blue-400">
                  SEO Focus
                </p>

                <h2 className="mt-3 text-2xl font-black text-white">
                  {post.mainKeyword}
                </h2>

                <p className="mt-4 text-sm leading-7 text-blue-100/65">
                  This guide is built as evergreen search content for anime
                  fans looking for recommendations, explainers, watch guides,
                  and anime discovery.
                </p>

                {hasRecommendations ? (
                  <div className="mt-6 rounded-2xl border border-blue-500/15 bg-blue-500/5 p-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-300">
                      Includes
                    </p>

                    <p className="mt-2 text-sm font-bold text-blue-100/80">
                      {post.recommendations?.length} ranked picks
                    </p>
                  </div>
                ) : null}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-b border-blue-500/15 bg-[#05030a]/60">
        <div className="mx-auto w-full max-w-[1500px] px-6 py-6 md:px-10 md:py-8">
          <div className="relative aspect-[16/9] overflow-hidden rounded-[32px] border border-blue-500/20 bg-muted shadow-[0_30px_100px_rgba(0,0,0,0.55)]">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1500px"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-5 md:p-8">
              <p className="max-w-3xl text-sm font-medium leading-6 text-white/75">
                Anivoid guide for {post.mainKeyword}.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1500px] gap-10 px-6 py-10 md:px-10 md:py-14 lg:grid-cols-[minmax(0,1fr)_420px] xl:grid-cols-[minmax(0,1fr)_460px]">
        <article className="min-w-0">
          <div className="mb-10 rounded-[28px] border border-blue-500/20 bg-blue-500/10 p-6 shadow-[0_18px_60px_rgba(47,67,206,0.12)] md:p-8">
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-blue-400">
              Quick Guide
            </p>

            <p className="mt-4 max-w-4xl text-xl font-semibold leading-9 text-white md:text-2xl md:leading-10">
              {post.intro}
            </p>
          </div>

          {hasRecommendations ? (
            <section className="mb-12 overflow-hidden rounded-[32px] border border-blue-500/20 bg-[#05030a]/80 shadow-[0_24px_90px_rgba(0,0,0,0.35)]">
              <div className="border-b border-blue-500/15 bg-blue-500/10 p-6 md:p-8">
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-blue-400">
                  Ranked Picks
                </p>

                <h2 className="mt-3 text-3xl font-black tracking-tight text-white md:text-4xl">
                  Recommended Anime List
                </h2>

                <p className="mt-4 max-w-3xl text-sm leading-7 text-blue-100/65 md:text-base md:leading-8">
                  Use this section as the fast watchlist. Each pick includes
                  the genre, who it is best for, why it is worth watching, and
                  a quick watch note.
                </p>
              </div>

              <div className="divide-y divide-blue-500/15">
                {post.recommendations?.map((recommendation, index) => (
                  <div
                    key={`${recommendation.title}-${index}`}
                    className="group relative overflow-hidden p-6 transition hover:bg-blue-500/[0.04] md:p-8"
                  >
                    <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl opacity-0 transition group-hover:opacity-100" />

                    <div className="relative grid gap-5 md:grid-cols-[84px_1fr]">
                      <div>
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-500/25 bg-blue-500/10 text-2xl font-black text-blue-200 shadow-[0_0_40px_rgba(79,125,254,0.12)]">
                          {String(index + 1).padStart(2, "0")}
                        </div>
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-2xl font-black tracking-tight text-white md:text-3xl">
                            {recommendation.title}
                          </h3>

                          {recommendation.episodes ? (
                            <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-blue-200/80">
                              {recommendation.episodes}
                            </span>
                          ) : null}
                        </div>

                        <p className="mt-2 text-xs font-black uppercase tracking-[0.2em] text-blue-400">
                          {recommendation.genre}
                        </p>

                        <div className="mt-5 grid gap-4 xl:grid-cols-2">
                          <div className="rounded-2xl border border-blue-500/15 bg-blue-500/5 p-5">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-300">
                              Best For
                            </p>

                            <p className="mt-3 text-sm font-semibold leading-7 text-blue-100/75">
                              {recommendation.bestFor}
                            </p>
                          </div>

                          <div className="rounded-2xl border border-blue-500/15 bg-blue-500/5 p-5">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-300">
                              Watch Note
                            </p>

                            <p className="mt-3 text-sm font-semibold leading-7 text-blue-100/75">
                              {recommendation.watchNote ||
                                "Add this to your watchlist if the genre matches your mood."}
                            </p>
                          </div>
                        </div>

                        <p className="mt-5 max-w-5xl text-base leading-8 text-blue-100/68 md:text-[17px] md:leading-9">
                          {recommendation.whyWatch}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          <div className="space-y-12">
            {post.sections.map((section, sectionIndex) => (
              <section
                key={section.heading}
                className="border-b border-blue-500/15 pb-10 last:border-b-0 last:pb-0"
              >
                <p className="mb-3 text-[10px] font-black uppercase tracking-[0.24em] text-blue-400">
                  0{sectionIndex + 1}
                </p>

                <h2 className="text-3xl font-black tracking-tight text-white md:text-4xl">
                  {section.heading}
                </h2>

                <div className="mt-6 space-y-6">
                  {section.body.map((paragraph, paragraphIndex) => (
                    <p
                      key={`${section.heading}-${paragraphIndex}`}
                      className="max-w-5xl text-base leading-8 text-blue-100/68 md:text-[17px] md:leading-9"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <section className="mt-12 rounded-[28px] border border-blue-500/15 bg-[#05030a]/70 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.28)] md:p-8">
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-blue-400">
              FAQ
            </p>

            <h2 className="mt-3 text-3xl font-black text-white">
              Frequently Asked Questions
            </h2>

            <div className="mt-8 space-y-5">
              {post.faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="rounded-2xl border border-blue-500/15 bg-blue-500/5 p-5"
                >
                  <h3 className="text-lg font-black text-white">
                    {faq.question}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-blue-100/65">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </article>

        <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
          {hasRecommendations ? (
            <div className="rounded-[28px] border border-blue-500/15 bg-[#05030a]/75 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-blue-100/80">
                In This Guide
              </h2>

              <div className="mt-5 space-y-2">
                {post.recommendations?.slice(0, 8).map((recommendation, index) => (
                  <div
                    key={`${recommendation.title}-toc`}
                    className="flex items-start gap-3 rounded-2xl border border-blue-500/10 bg-blue-500/5 p-3"
                  >
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-[11px] font-black text-blue-200">
                      {index + 1}
                    </span>

                    <div className="min-w-0">
                      <p className="line-clamp-1 text-sm font-black text-white">
                        {recommendation.title}
                      </p>

                      <p className="mt-1 line-clamp-1 text-xs font-semibold text-blue-100/50">
                        {recommendation.genre}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          <div className="rounded-[28px] border border-blue-500/15 bg-[#05030a]/75 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-blue-100/80">
              Related Guides
            </h2>

            <div className="mt-5 space-y-3">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group grid grid-cols-[96px_1fr] gap-4 rounded-2xl border border-transparent p-2 transition hover:border-blue-500/20 hover:bg-blue-500/10"
                >
                  <div className="relative h-20 overflow-hidden rounded-xl bg-muted">
                    <Image
                      src={related.image}
                      alt={related.title}
                      fill
                      sizes="96px"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-400">
                      {related.category}
                    </p>

                    <h3 className="mt-1.5 line-clamp-2 text-sm font-black leading-snug text-white transition group-hover:text-blue-300">
                      {related.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[28px] border border-blue-500/20 bg-gradient-to-br from-blue-600/15 via-blue-600/5 to-blue-950/40 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
            <div className="absolute -bottom-12 -right-12 h-36 w-36 rounded-full border border-blue-400/20" />
            <div className="absolute -bottom-6 -right-6 h-20 w-20 rounded-full bg-blue-500/15 blur-2xl" />

            <p className="relative text-[10px] font-black uppercase tracking-[0.22em] text-blue-400">
              Anivoid
            </p>

            <h2 className="relative mt-3 text-xl font-black leading-snug text-white">
              Follow the void of anime guides.
            </h2>

            <p className="relative mt-4 text-sm leading-7 text-blue-100/65">
              Discover anime recommendations, streaming guides, filler lists,
              release updates, and anime news coverage.
            </p>

            <Link
              href="/news"
              className="relative mt-6 inline-flex rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-2.5 text-sm font-black text-blue-100 transition hover:border-blue-400/60 hover:bg-blue-500/15 hover:text-white"
            >
              Read latest news →
            </Link>
          </div>
        </aside>
      </section>
    </main>
  );
}