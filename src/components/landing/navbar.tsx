"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";

const NAV_LINKS = [
  { label: "Markets", href: "/markets" },
  { label: "Trading", href: "/trading" },
  { label: "Security", href: "/security" },
  { label: "About", href: "/about" },
];

export function Navbar({
  transparentOnTop = true,
}: {
  /**
   * When true (default, used on the homepage), the navbar starts
   * transparent with light/white text — correct only because the Hero
   * section behind it is always a dark photo. Pages without a dark hero
   * (Markets, Security, About, Trading, etc.) should pass false so the
   * navbar renders theme-aware and solid from the very top, avoiding
   * white-on-light-background invisibility in light mode.
   */
  transparentOnTop?: boolean;
}) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [scrolledPastTop, setScrolledPastTop] = React.useState(false);

  React.useEffect(() => {
    if (!transparentOnTop) return;
    const onScroll = () => setScrolledPastTop(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [transparentOnTop]);

  // "Solid" state: theme-aware text + glass background. True immediately
  // on pages without a hero, or once scrolled past the top on the homepage.
  const solid = !transparentOnTop || scrolledPastTop;

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <div
          className={`flex w-full items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300 ${
            solid ? "glass-surface glass-border shadow-lg" : ""
          }`}
        >
          <Logo forceLight={!solid} />

          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[rgb(var(--muted))] transition-colors hover:text-[rgb(var(--foreground))]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle />
            <Link
              href="/login"
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-white/[0.04] ${
                solid ? "text-[rgb(var(--foreground))]" : "text-white"
              }`}
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="rounded-full bg-bull px-5 py-2 text-sm font-semibold text-[#07090e] shadow-glow transition-transform hover:scale-[1.03]"
            >
              Get Started
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            className="flex h-9 w-9 items-center justify-center rounded-full glass-surface glass-border md:hidden"
          >
            {mobileOpen ? (
              <X className="h-4 w-4 text-[rgb(var(--foreground))]" />
            ) : (
              <Menu className="h-4 w-4 text-[rgb(var(--foreground))]" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25 }}
          className="mx-6 mt-2 overflow-hidden rounded-2xl glass-surface glass-border md:hidden"
        >
          <div className="flex flex-col gap-1 p-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-[rgb(var(--muted))] transition-colors hover:bg-white/[0.04] hover:text-[rgb(var(--foreground))]"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex items-center justify-between gap-3 border-t glass-border pt-4">
              <ThemeToggle />
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="rounded-full px-4 py-2 text-sm font-medium text-[rgb(var(--foreground))]"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  className="rounded-full bg-bull px-4 py-2 text-sm font-semibold text-[#07090e]"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
