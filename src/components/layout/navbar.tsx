"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

import { SearchModal } from "./search-modal";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";

const navItems = [
  {
    label: "News",
    href: "/news",
  },
  {
    label: "Guides",
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
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-blue-500/15 bg-[#000105]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-[1500px] items-center justify-between px-6 md:px-10">
        {/* LEFT */}
        <div className="flex items-center gap-10">
          {/* LOGO */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-2xl border border-blue-500/25 bg-blue-500/10 shadow-[0_0_30px_rgba(79,125,254,0.16)]">
              <div className="absolute h-4 w-4 rounded-full border border-blue-300/70 shadow-[0_0_18px_rgba(96,165,250,0.55)]" />
              <div className="h-1.5 w-1.5 rounded-full bg-blue-300 shadow-[0_0_18px_rgba(96,165,250,0.8)]" />
            </div>

            <div className="leading-none">
              <span className="block text-xl font-black tracking-tight text-white transition group-hover:text-blue-300">
                Anivoid
              </span>
              <span className="hidden text-[9px] font-black uppercase tracking-[0.28em] text-blue-300/70 sm:block">
                News Network
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-bold text-blue-100/60 transition hover:bg-blue-500/10 hover:text-blue-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2">
          <SearchModal />

          {/* MOBILE MENU */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full border border-blue-500/15 text-blue-100 hover:bg-blue-500/10 hover:text-white md:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="border-blue-500/15 bg-[#000105] text-white"
            >
              <div className="mt-10">
                <Link href="/" className="group flex items-center gap-3">
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-blue-500/25 bg-blue-500/10">
                    <div className="absolute h-4 w-4 rounded-full border border-blue-300/70 shadow-[0_0_18px_rgba(96,165,250,0.55)]" />
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-300 shadow-[0_0_18px_rgba(96,165,250,0.8)]" />
                  </div>

                  <div className="leading-none">
                    <span className="block text-xl font-black tracking-tight text-white">
                      Anivoid
                    </span>
                    <span className="text-[9px] font-black uppercase tracking-[0.28em] text-blue-300/70">
                      News Network
                    </span>
                  </div>
                </Link>

                <div className="mt-10 flex flex-col gap-3">
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="rounded-2xl border border-blue-500/10 bg-blue-500/[0.03] px-4 py-4 text-lg font-black text-blue-100 transition hover:border-blue-400/40 hover:bg-blue-500/10 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>

                <div className="mt-8 rounded-3xl border border-blue-500/15 bg-blue-500/10 p-5">
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-300">
                    Anivoid
                  </p>

                  <p className="mt-3 text-sm leading-6 text-blue-100/65">
                    Anime news, manga updates, streaming guides, release dates,
                    trailers, and rankings.
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}