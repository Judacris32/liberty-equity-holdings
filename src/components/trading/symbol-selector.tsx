"use client";

import { TRADABLE_SYMBOLS, type TradableSymbol } from "@/lib/tradable-symbols";

export function SymbolSelector({
  active,
  onChange,
}: {
  active: TradableSymbol;
  onChange: (symbol: TradableSymbol) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {TRADABLE_SYMBOLS.map((s) => (
        <button
          key={s.tvSymbol}
          onClick={() => onChange(s)}
          className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${
            active.tvSymbol === s.tvSymbol
              ? "border-bull/40 bg-bull/10 text-bull"
              : "glass-border glass-surface text-[rgb(var(--muted))] hover:text-[rgb(var(--foreground))]"
          }`}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}
