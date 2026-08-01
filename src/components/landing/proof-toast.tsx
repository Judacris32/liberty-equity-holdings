"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { MOCK_PROOF_EVENTS, type ProofEvent } from "@/lib/mock-proof-events";

const DISPLAY_MS = 4500;
const GAP_MS = 3500;

export function ProofToast() {
  const [index, setIndex] = React.useState(0);
  const [visible, setVisible] = React.useState(false);
  const [inHeroView, setInHeroView] = React.useState(true);

  // Only cycle/show the toast while the hero section is actually in view.
  // Without this, the fixed-position toast collides with content further
  // down the page (table rows, cards, etc. that also sit near the
  // bottom-left of the viewport).
  React.useEffect(() => {
    const heroEl = document.getElementById("hero-section");
    if (!heroEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInHeroView(entry.isIntersecting),
      { threshold: 0.15 }
    );
    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    if (!inHeroView) {
      setVisible(false);
      return;
    }

    let showTimer: ReturnType<typeof setTimeout>;
    let hideTimer: ReturnType<typeof setTimeout>;

    const cycle = () => {
      setVisible(true);
      hideTimer = setTimeout(() => {
        setVisible(false);
        showTimer = setTimeout(() => {
          setIndex((i) => (i + 1) % MOCK_PROOF_EVENTS.length);
          cycle();
        }, GAP_MS);
      }, DISPLAY_MS);
    };

    // Initial delay before first toast appears
    const initialDelay = setTimeout(cycle, 1500);

    return () => {
      clearTimeout(initialDelay);
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [inHeroView]);

  const event: ProofEvent = MOCK_PROOF_EVENTS[index];

  return (
    <div className="pointer-events-none fixed bottom-6 left-6 z-40 hidden sm:block">
      <AnimatePresence>
        {visible && inHeroView && (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -24, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -16, scale: 0.96 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="pointer-events-auto flex items-center gap-3 rounded-2xl glass-surface glass-border px-4 py-3 shadow-lg"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-bull/10">
              <CheckCircle2 className="h-4 w-4 text-bull" />
            </div>
            <div className="text-xs leading-snug">
              <p className="font-medium text-[rgb(var(--foreground))]">
                {event.name} <span className="text-[rgb(var(--muted))]">({event.location})</span>{" "}
                {event.action}{" "}
                <span className="font-semibold text-bull">{event.amount}</span>
                {event.asset ? (
                  <>
                    {" "}
                    <span className="text-[rgb(var(--muted))]">{event.asset}</span>
                  </>
                ) : null}
              </p>
              <p className="mt-0.5 text-[10px] text-[rgb(var(--muted))]">
                Simulated activity &middot; just now
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
