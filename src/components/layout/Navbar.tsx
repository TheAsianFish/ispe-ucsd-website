'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

import { navItems, siteMetadata } from "@/content/mock";
import { Container } from "@/components/ui/Container";

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="text-sm font-semibold tracking-tight text-slate-900 sm:text-base">
            {siteMetadata.name}
          </span>
          <span className="hidden text-xs text-slate-500 sm:inline">
            {siteMetadata.tagline}
          </span>
        </Link>
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-4 text-sm text-slate-600 md:flex"
        >
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`border-b-2 border-transparent pb-1 transition-colors ${
                  isActive
                    ? "border-sky-600 text-slate-900"
                    : "hover:border-slate-300 hover:text-slate-900"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </Container>
    </header>
  );
}

