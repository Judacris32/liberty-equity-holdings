import { Zap, LineChart, History, Layers } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type TradingFeature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const TRADING_FEATURES: TradingFeature[] = [
  {
    icon: LineChart,
    title: "Real-Time Execution",
    description:
      "Orders fill against live market data — no simulated delays, no stale quotes sitting between you and the price you actually see.",
  },
  {
    icon: Layers,
    title: "Multiple Markets, One Terminal",
    description:
      "Crypto, forex, and preferred stock — switch between them without leaving the same interface.",
  },
  {
    icon: Zap,
    title: "Choose Your Speed",
    description:
      "Standard or instant execution, depending on how much precision timing matters for the trade you're placing.",
  },
  {
    icon: History,
    title: "Full Order History",
    description:
      "Every order — filled or rejected — is logged and reviewable from your dashboard, with nothing hidden after the fact.",
  },
];
