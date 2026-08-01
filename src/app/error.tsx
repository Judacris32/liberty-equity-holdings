"use client";

import * as React from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Logo } from "@/components/logo";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    // In production this is where you'd forward to an error-tracking
    // service (Sentry, etc). Logged to console for this demo.
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="mb-8">
        <Logo />
      </div>

      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-bear/10">
        <AlertTriangle className="h-7 w-7 text-bear" />
      </div>

      <h1 className="mt-6 text-2xl font-semibold text-[rgb(var(--foreground))]">
        Something went wrong
      </h1>
      <p className="mt-2 max-w-sm text-sm text-[rgb(var(--muted))]">
        An unexpected error occurred. You can try again, or head back to your
        dashboard.
      </p>

      <div className="mt-8 flex items-center gap-3">
        <button
          onClick={reset}
          className="flex items-center gap-2 rounded-full bg-bull px-6 py-3 text-sm font-semibold text-[#07090e] shadow-glow transition-transform hover:scale-[1.03]"
        >
          <RotateCcw className="h-4 w-4" />
          Try Again
        </button>
        <a
          href="/dashboard"
          className="rounded-full glass-surface glass-border px-6 py-3 text-sm font-semibold text-[rgb(var(--foreground))] transition-colors hover:bg-white/[0.04]"
        >
          Go to Dashboard
        </a>
      </div>
    </main>
  );
}
