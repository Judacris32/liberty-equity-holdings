import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Logo } from "@/components/logo";

export type AuthPanelPoint = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
  panelHeadline,
  panelSubcopy,
  panelPoints,
  image,
  imageAlt,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
  panelHeadline: string;
  panelSubcopy: string;
  panelPoints: AuthPanelPoint[];
  image: string;
  imageAlt: string;
}) {
  return (
    <main className="min-h-screen lg:grid lg:grid-cols-[1fr_1.1fr]">
      {/* Brand panel — desktop only. Full-bleed photo with the value
          proposition layered over it, so the auth screen still sells the
          product instead of being a bare form on an empty page. */}
      <aside className="relative hidden overflow-hidden lg:flex lg:flex-col lg:justify-between">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="45vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07090e]/85 via-[#07090e]/80 to-[#07090e]/95" />

        <div className="relative p-10">
          <Logo forceLight />
        </div>

        <div className="relative p-10">
          <h2 className="text-balance text-3xl font-semibold leading-[1.15] tracking-tight text-white">
            {panelHeadline}
          </h2>
          <p className="mt-4 max-w-sm text-balance leading-relaxed text-white/70">
            {panelSubcopy}
          </p>

          <div className="mt-10 flex flex-col gap-6">
            {panelPoints.map((point) => (
              <div key={point.title} className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-bull/15 backdrop-blur-sm">
                  <point.icon className="h-4 w-4 text-bull" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    {point.title}
                  </p>
                  <p className="mt-0.5 max-w-xs text-xs leading-relaxed text-white/60">
                    {point.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative px-10 pb-10">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Liberty Equity Holdings
          </p>
        </div>
      </aside>

      {/* Form panel */}
      <div className="relative flex min-h-screen flex-col px-6 py-10 sm:px-10 lg:py-14">
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 h-[400px] w-[500px] rounded-full bg-bull/[0.06] blur-[150px] lg:hidden"
        />

        <div className="relative flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm font-medium text-[rgb(var(--muted))] transition-colors hover:text-[rgb(var(--foreground))]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to site
          </Link>
          <div className="lg:hidden">
            <Logo />
          </div>
        </div>

        <div className="relative flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <h1 className="text-balance text-3xl font-semibold tracking-tight text-[rgb(var(--foreground))]">
                {title}
              </h1>
              <p className="mt-2 text-[rgb(var(--muted))]">{subtitle}</p>
            </div>

            {children}

            <div className="mt-8 text-sm text-[rgb(var(--muted))]">{footer}</div>

            <div className="mt-8 flex items-center gap-2 border-t glass-border pt-6 text-xs text-[rgb(var(--muted))]">
              <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-bull" />
              Secured with HTTP-only session cookies — your credentials never
              touch browser storage.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
