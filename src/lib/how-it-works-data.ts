import { Zap, TrendingUp, Landmark, Bitcoin, Globe2, PiggyBank } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type TradingStyle = {
  id: string;
  icon: LucideIcon;
  label: string;
  horizon: string;
  description: string;
  image: string;
  imageAlt: string;
};

// Photography sourced from Unsplash (free license, commercial use
// permitted, no attribution required). Chosen for a "money/growth" feel
// rather than trading-screen photography.
export const TRADING_STYLES: TradingStyle[] = [
  {
    id: "day",
    icon: Zap,
    label: "Day Trade",
    horizon: "Minutes to hours",
    description: "In and out within the day. Built for people who want to watch the market move in real time.",
    image:
      "https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "A person stacking coins on top of a table",
  },
  {
    id: "swing",
    icon: TrendingUp,
    label: "Swing",
    horizon: "Days to weeks",
    description: "Ride a short-term trend without needing to stare at a screen all day.",
    image:
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "A small green plant growing on top of stacked coins",
  },
  {
    id: "position",
    icon: Landmark,
    label: "Position",
    horizon: "Weeks to months",
    description: "Set a thesis, size it sensibly, and let it play out over time.",
    image:
      "https://images.unsplash.com/photo-1741682740026-4147b4197806?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Modern office overlooking a city skyline",
  },
];

export type PositionSize = {
  id: string;
  label: string;
};

export const POSITION_SIZES: PositionSize[] = [
  { id: "250", label: "$250" },
  { id: "1000", label: "$1,000" },
  { id: "5000", label: "$5,000" },
  { id: "10000", label: "$10,000+" },
];

export type MarketOption = {
  id: string;
  icon: LucideIcon;
  label: string;
  description: string;
  image: string;
  imageAlt: string;
};

export const MARKET_OPTIONS: MarketOption[] = [
  {
    id: "crypto",
    icon: Bitcoin,
    label: "Starter Plan",
    description: "BTC, ETH, SOL, and more — live pricing from the terminal.",
    image:
      "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "A fan of one hundred dollar banknotes",
  },
  {
    id: "forex",
    icon: Globe2,
    label: "Growth Plan",
    description: "Major pairs like EUR/USD and GBP/USD.",
    image:
      "https://images.unsplash.com/photo-1698584200770-3838c3690a27?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "A stack of money sitting on top of a table",
  },
  {
    id: "stocks",
    icon: PiggyBank,
    label: "Momentum Plan",
    description: "Steadier, dividend-oriented positions for a longer horizon.",
    image:
      "https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "A person counting dollar banknotes",
  },
];
