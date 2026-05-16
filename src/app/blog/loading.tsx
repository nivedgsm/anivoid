function SkeletonBlock({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-2xl bg-blue-500/10 ${className}`}
    />
  );
}

export default function BlogLoading() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden border-b border-blue-500/15 bg-[#000105]/70">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="pointer-events-none absolute right-0 top-20 h-[320px] w-[320px] rounded-full bg-blue-500/15 blur-[100px]" />

        <div className="relative mx-auto w-full max-w-[1500px] px-6 py-12 md:px-10 md:py-16">
          <SkeletonBlock className="h-9 w-40 rounded-full" />

          <SkeletonBlock className="mt-6 h-16 w-full max-w-3xl md:h-24" />
          <SkeletonBlock className="mt-5 h-6 w-full max-w-2xl" />
          <SkeletonBlock className="mt-3 h-6 w-full max-w-xl" />

          <div className="mt-10 grid overflow-hidden rounded-[32px] border border-blue-500/15 bg-[#05030a]/70 shadow-[0_30px_100px_rgba(0,0,0,0.45)] lg:grid-cols-[1.15fr_0.85fr]">
            <SkeletonBlock className="min-h-[420px] rounded-none" />

            <div className="p-7 md:p-10">
              <div className="flex gap-3">
                <SkeletonBlock className="h-9 w-32 rounded-full" />
                <SkeletonBlock className="h-9 w-36 rounded-full" />
              </div>

              <SkeletonBlock className="mt-7 h-12 w-full" />
              <SkeletonBlock className="mt-3 h-12 w-5/6" />

              <SkeletonBlock className="mt-6 h-5 w-full" />
              <SkeletonBlock className="mt-3 h-5 w-4/5" />
              <SkeletonBlock className="mt-3 h-5 w-3/5" />

              <SkeletonBlock className="mt-8 h-5 w-32" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1500px] px-6 py-12 md:px-10 md:py-16">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <SkeletonBlock className="h-5 w-40" />
            <SkeletonBlock className="mt-4 h-12 w-72" />
          </div>

          <div className="w-full max-w-xl">
            <SkeletonBlock className="h-5 w-full" />
            <SkeletonBlock className="mt-3 h-5 w-4/5" />
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-[28px] border border-blue-500/15 bg-[#05030a]/70 shadow-[0_24px_80px_rgba(0,0,0,0.32)]"
            >
              <SkeletonBlock className="h-[240px] rounded-none" />

              <div className="p-6">
                <SkeletonBlock className="h-4 w-44" />
                <SkeletonBlock className="mt-5 h-8 w-full" />
                <SkeletonBlock className="mt-3 h-8 w-5/6" />
                <SkeletonBlock className="mt-5 h-5 w-full" />
                <SkeletonBlock className="mt-3 h-5 w-4/5" />
                <SkeletonBlock className="mt-6 h-5 w-28" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}