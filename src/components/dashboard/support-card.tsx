import Link from "next/link";
import { Headphones, ArrowRight, BookOpen } from "lucide-react";

export function SupportCard() {
  return (
    <div className="flex flex-col gap-3">
      <Link
        href="/#faq"
        className="group flex items-center justify-between gap-3 rounded-2xl glass-surface glass-border p-5 transition-colors hover:bg-white/[0.03]"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-400/10">
            <Headphones className="h-5 w-5 text-sky-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[rgb(var(--foreground))]">
              Need help?
            </p>
            <p className="mt-0.5 text-xs text-[rgb(var(--muted))]">
              Answers to common questions
            </p>
          </div>
        </div>
        <ArrowRight className="h-4 w-4 shrink-0 text-[rgb(var(--muted))] transition-transform group-hover:translate-x-0.5" />
      </Link>

      <Link
        href="/#insights"
        className="group flex items-center justify-between gap-3 rounded-2xl glass-surface glass-border p-5 transition-colors hover:bg-white/[0.03]"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-400/10">
            <BookOpen className="h-5 w-5 text-violet-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[rgb(var(--foreground))]">
              Market insights
            </p>
            <p className="mt-0.5 text-xs text-[rgb(var(--muted))]">
              Plain-language guides on how markets work
            </p>
          </div>
        </div>
        <ArrowRight className="h-4 w-4 shrink-0 text-[rgb(var(--muted))] transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
