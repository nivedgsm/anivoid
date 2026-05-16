import Link from "next/link";

const animeCategories = [
  {
    label: "All",
    href: "/anime",
  },
  {
    label: "Action",
    href: "/anime?genre=Action",
  },
  {
    label: "Adventure",
    href: "/anime?genre=Adventure",
  },
  {
    label: "Fantasy",
    href: "/anime?genre=Fantasy",
  },
  {
    label: "Romance",
    href: "/anime?genre=Romance",
  },
  {
    label: "Comedy",
    href: "/anime?genre=Comedy",
  },
  {
    label: "Drama",
    href: "/anime?genre=Drama",
  },
  {
    label: "Sci-Fi",
    href: "/anime?genre=Sci-Fi",
  },
  {
    label: "Isekai",
    href: "/anime?genre=Isekai",
  },
  {
    label: "Shounen",
    href: "/anime?genre=Shounen",
  },
  {
    label: "Slice of Life",
    href: "/anime?genre=Slice%20of%20Life",
  },
  {
    label: "Psychological",
    href: "/anime?genre=Psychological",
  },
  {
    label: "Sports",
    href: "/anime?genre=Sports",
  },
  {
    label: "Mystery",
    href: "/anime?genre=Mystery",
  },
];

export function CategoryPills() {
  return (
    <section className="sticky top-16 z-40 border-b border-blue-500/10 bg-[#030711]/85 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />

      <div className="container mx-auto px-4">
        <div className="relative">
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-10 bg-gradient-to-r from-[#030711] to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-10 bg-gradient-to-l from-[#030711] to-transparent" />

          <div className="scrollbar-hide flex gap-3 overflow-x-auto py-4">
            {animeCategories.map((category, index) => {
              const isActive = index === 0;

              return (
                <Link
                  key={category.label}
                  href={category.href}
                  className={`
                    group relative shrink-0 overflow-hidden rounded-full border px-5 py-2.5 text-sm font-black uppercase tracking-[0.14em] transition-all duration-300
                    ${
                      isActive
                        ? "border-blue-400/70 bg-blue-500 text-white shadow-[0_0_28px_rgba(77,127,255,0.35)]"
                        : "border-blue-500/15 bg-white/[0.03] text-blue-100/70 hover:border-blue-400/50 hover:bg-blue-500/10 hover:text-white"
                    }
                  `}
                >
                  <span className="relative z-10">{category.label}</span>

                  {!isActive && (
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-blue-400/15 to-transparent transition duration-700 group-hover:translate-x-full" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}