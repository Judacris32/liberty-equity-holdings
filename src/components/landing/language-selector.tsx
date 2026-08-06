"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Globe, Check, ChevronDown } from "lucide-react";

const LANGUAGES = [
  { code: "EN", label: "English", available: true },
  { code: "ES", label: "Español", available: false },
  { code: "FR", label: "Français", available: false },
  { code: "PT", label: "Português", available: false },
];

export function LanguageSelector() {
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex items-center gap-1.5 rounded-full glass-surface glass-border border px-3 py-1.5 text-xs font-medium text-[rgb(var(--muted))] transition-colors hover:text-[rgb(var(--foreground))]"
      >
        <Globe className="h-3.5 w-3.5" />
        EN
        <ChevronDown className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full right-0 z-50 mb-2 w-44 overflow-hidden rounded-xl glass-surface glass-border shadow-xl"
          >
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                disabled={!lang.available}
                onClick={() => lang.available && setOpen(false)}
                className={`flex w-full items-center justify-between px-3.5 py-2.5 text-left text-sm transition-colors ${
                  lang.available
                    ? "text-[rgb(var(--foreground))] hover:bg-white/[0.04]"
                    : "cursor-not-allowed text-[rgb(var(--muted))]/50"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="font-mono text-xs">{lang.code}</span>
                  {lang.label}
                </span>
                {lang.available ? (
                  <Check className="h-3.5 w-3.5 text-bull" />
                ) : (
                  <span className="text-[9px] uppercase tracking-wide">Soon</span>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
