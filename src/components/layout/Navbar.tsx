'use client';

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { nav, siteMetadata } from "@/content/mock";
import { Container } from "@/components/ui/Container";

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [openMobileMenu, setOpenMobileMenu] = useState<string | null>(null);

  const toggleMobile = () => {
    setMobileOpen((prev) => !prev);
    setOpenMobileMenu(null);
  };

  const handleMenuEnter = (label: string) => {
    setOpenMenu(label);
  };

  const handleMenuLeave = () => {
    setOpenMenu(null);
  };

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

        {/* Desktop nav */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-4 text-sm text-slate-600 md:flex"
        >
          {nav.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : item.href && pathname.startsWith(item.href);
            const hasChildren = item.children && item.children.length > 0;
            const isOpen = openMenu === item.label;

            if (!hasChildren || !item.href) {
              return (
                <Link
                  key={item.label}
                  href={item.href ?? "#"}
                  className={`border-b-2 border-transparent pb-1 transition-colors ${
                    isActive
                      ? "border-sky-600 text-slate-900"
                      : "hover:border-slate-300 hover:text-slate-900"
                  }`}
                >
                  {item.label}
                </Link>
              );
            }

            return (
              <div key={item.label} className="relative">
                <Link
                  href={item.href ?? "#"}
                  className={`flex items-center gap-1 border-b-2 border-transparent pb-1 text-sm transition-colors ${
                    isActive || isOpen
                      ? "border-sky-600 text-slate-900"
                      : "hover:border-slate-300 hover:text-slate-900"
                  }`}
                  aria-haspopup="true"
                  aria-expanded={isOpen}
                  onFocus={() => handleMenuEnter(item.label)}
                  onMouseEnter={() => handleMenuEnter(item.label)}
                >
                  {item.label}
                  <span aria-hidden="true" className="text-xs">
                    ▾
                  </span>
                </Link>

                {isOpen ? (
                  <div
                    className="absolute left-0 top-full mt-2 w-56 rounded-xl border border-slate-200 bg-white p-3 shadow-lg"
                    onMouseEnter={() => handleMenuEnter(item.label)}
                    onMouseLeave={handleMenuLeave}
                  >
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      About
                    </p>
                    <ul className="space-y-1 text-sm">
                      {item.children?.map((child) => {
                        const childActive = pathname.startsWith(child.href);

                        return (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className={`flex rounded-md px-2 py-1.5 transition-colors ${
                                childActive
                                  ? "bg-sky-50 text-sky-800"
                                  : "text-slate-700 hover:bg-slate-50"
                              }`}
                            >
                              {child.label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ) : null}
              </div>
            );
          })}
        </nav>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100 md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
          onClick={toggleMobile}
        >
          <span className="h-0.5 w-5 bg-slate-900" />
          <span className="mx-1 h-0.5 w-5 bg-slate-900" />
          <span className="h-0.5 w-5 bg-slate-900" />
        </button>
      </Container>

      {/* Mobile nav panel */}
      {mobileOpen ? (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <Container className="space-y-2 py-3 text-sm">
            {nav.map((item) => {
              const hasChildren = item.children && item.children.length > 0;
              const isSectionOpen = openMobileMenu === item.label;

              if (!hasChildren || !item.href) {
                return (
                  <Link
                    key={item.label}
                    href={item.href ?? "#"}
                    className="block rounded-md px-2 py-2 text-slate-700 hover:bg-slate-100"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <div key={item.label} className="space-y-1">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between rounded-md px-2 py-2 text-left text-slate-700 hover:bg-slate-100"
                    aria-haspopup="true"
                    aria-expanded={isSectionOpen}
                    onClick={() =>
                      setOpenMobileMenu((prev) =>
                        prev === item.label ? null : item.label,
                      )
                    }
                  >
                    <span>{item.label}</span>
                    <span aria-hidden="true" className="text-xs">
                      {isSectionOpen ? "▴" : "▾"}
                    </span>
                  </button>
                  {isSectionOpen ? (
                    <div className="space-y-1 border-l border-slate-200 pl-4">
                      {item.children?.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block rounded-md px-2 py-1.5 text-slate-700 hover:bg-slate-100"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </Container>
        </div>
      ) : null}
    </header>
  );
}

