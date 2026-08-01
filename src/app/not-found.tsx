import Link from "next/link";
import { Compass } from "lucide-react";
import { Logo } from "@/components/logo";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-bull/[0.06] blur-[160px]"
      />

      <div className="relative mb-8">
        <Logo />
      </div>

      <div className="relative flex h-16 w-16 items-center justify-center rounded-full glass-surface glass-border">
        <Compass className="h-7 w-7 text-bull" />
      </div>

      <h1 className="relative mt-6 text-3xl font-semibold text-[rgb(var(--foreground))]">
        Page not found
      </h1>
      <p className="relative mt-2 max-w-sm text-sm text-[rgb(var(--muted))]">
        The page you&apos;re looking for doesn&apos;t exist or may have been
        moved.
      </p>

      <Link
        href="/"
        className="relative mt-8 rounded-full bg-bull px-6 py-3 text-sm font-semibold text-[#07090e] shadow-glow transition-transform hover:scale-[1.03]"
      >
        Back to Home
      </Link>
    </main>
  );
}
