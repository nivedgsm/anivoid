function SkeletonBlock({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-2xl bg-blue-500/10 ${className}`}
    />
  );
}

export default function BlogPostLoading() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden border-b border-blue-500/15 bg-[#000105]/70">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(79,125,254,0.18),transparent_32rem)]" />

        <div className="relative mx-auto w-full max-w-[1500px] px-6 py-8 md:px-10 md:py-12">
          <SkeletonBlock className="h-5 w-32" />

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_420px] xl:grid-cols-[minmax(0,1fr)_460px]">
            <div>
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <SkeletonBlock className="h-9 w-32 rounded-full" />
                <SkeletonBlock className="h-5 w-40" />
              </div>

              <SkeletonBlock className="h-16 w-full max-w-5xl md:h-24" />
              <SkeletonBlock className="mt-4 h-16 w-full max-w-4xl md:h-24" />

              <SkeletonBlock className="mt-6 h-7 w-full max-w-3xl" />
              <SkeletonBlock className="mt-3 h-7 w-full max-w-2xl" />

              <div className="mt-7 flex flex-wrap gap-3">
                <SkeletonBlock className="h-5 w-32" />
                <SkeletonBlock className="h-5 w-24" />
                <SkeletonBlock className="h-5 w-48" />
              </div>
            </div>

            <aside className="hidden lg:block">
              <div className="rounded-[28px] border border-blue-500/15 bg-[#05030a]/75 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
                <SkeletonBlock className="h-4 w-28" />
                <SkeletonBlock className="mt-4 h-8 w-full" />
                <SkeletonBlock className="mt-4 h-5 w-full" />
                <SkeletonBlock className="mt-3 h-5 w-4/5" />
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-b border-blue-500/15 bg-[#05030a]/60">
        <div className="mx-auto w-full max-w-[1500px] px-6 py-6 md:px-10 md:py-8">
          <SkeletonBlock className="aspect-[16/9] rounded-[32px] border border-blue-500/20" />
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1500px] gap-10 px-6 py-10 md:px-10 md:py-14 lg:grid-cols-[minmax(0,1fr)_420px] xl:grid-cols-[minmax(0,1fr)_460px]">
        <article className="min-w-0">
          <div className="mb-10 rounded-[28px] border border-blue-500/20 bg-blue-500/10 p-6 md:p-8">
            <SkeletonBlock className="h-4 w-32" />
            <SkeletonBlock className="mt-5 h-8 w-full" />
            <SkeletonBlock className="mt-3 h-8 w-5/6" />
            <SkeletonBlock className="mt-3 h-8 w-4/5" />
          </div>

          <div className="space-y-12">
            {Array.from({ length: 4 }).map((_, index) => (
              <section
                key={index}
                className="border-b border-blue-500/15 pb-10 last:border-b-0 last:pb-0"
              >
                <SkeletonBlock className="h-4 w-12" />
                <SkeletonBlock className="mt-4 h-10 w-full max-w-xl" />

                <div className="mt-6 space-y-4">
                  <SkeletonBlock className="h-6 w-full" />
                  <SkeletonBlock className="h-6 w-11/12" />
                  <SkeletonBlock className="h-6 w-10/12" />
                  <SkeletonBlock className="h-6 w-full" />
                </div>
              </section>
            ))}
          </div>
        </article>

        <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-[28px] border border-blue-500/15 bg-[#05030a]/75 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
            <SkeletonBlock className="h-5 w-40" />

            <div className="mt-5 space-y-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[96px_1fr] gap-4 rounded-2xl p-2"
                >
                  <SkeletonBlock className="h-20 rounded-xl" />

                  <div>
                    <SkeletonBlock className="h-3 w-20" />
                    <SkeletonBlock className="mt-3 h-5 w-full" />
                    <SkeletonBlock className="mt-2 h-5 w-4/5" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-blue-500/20 bg-blue-500/10 p-6">
            <SkeletonBlock className="h-4 w-24" />
            <SkeletonBlock className="mt-4 h-7 w-full" />
            <SkeletonBlock className="mt-3 h-7 w-4/5" />
            <SkeletonBlock className="mt-5 h-5 w-full" />
            <SkeletonBlock className="mt-3 h-5 w-5/6" />
            <SkeletonBlock className="mt-6 h-10 w-40 rounded-full" />
          </div>
        </aside>
      </section>
    </main>
  );
}