import Link from "next/link";
import { Logo } from "@/components/logo";
import { FOOTER_COLUMNS } from "@/lib/footer-data";
import { NewsletterSignup } from "./newsletter-signup";
import { LanguageSelector } from "./language-selector";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t glass-border">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-14">
          <NewsletterSignup />
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[rgb(var(--muted))]">
              A trading platform built around clarity — real data, honest
              pricing, and no promises we can&apos;t keep.
            </p>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <p className="text-xs font-semibold uppercase tracking-wider text-[rgb(var(--muted))]">
                {column.title}
              </p>
              <ul className="mt-4 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[rgb(var(--muted))] transition-colors hover:text-[rgb(var(--foreground))]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t glass-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[rgb(var(--muted))]">
            &copy; {year} Liberty Equity Holdings. All rights reserved.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <p className="max-w-lg text-xs leading-relaxed text-[rgb(var(--muted))]">
              Trading involves risk, including the possible loss of principal.
              No return is guaranteed or implied anywhere on this site.
            </p>
            <LanguageSelector />
          </div>
        </div>
      </div>
    </footer>
  );
}
