import { TrendingUp, TrendingDown, ArrowDownToLine, ArrowUpFromLine, Wallet, CalendarX } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type FeeRow = {
  id: string;
  icon: LucideIcon;
  label: string;
  value: string;
  note?: string;
};

export const FEE_ROWS: FeeRow[] = [
  {
    id: "maker",
    icon: TrendingUp,
    label: "Trading Fee (Maker)",
    value: "0.10%",
    note: "Orders that add liquidity",
  },
  {
    id: "taker",
    icon: TrendingDown,
    label: "Trading Fee (Taker)",
    value: "0.15%",
    note: "Orders that fill immediately",
  },
  {
    id: "deposits",
    icon: ArrowDownToLine,
    label: "Deposits",
    value: "Free",
  },
  {
    id: "withdrawals",
    icon: ArrowUpFromLine,
    label: "Withdrawals",
    value: "Free",
  },
  {
    id: "minimum",
    icon: Wallet,
    label: "Account Minimum",
    value: "$0",
  },
  {
    id: "inactivity",
    icon: CalendarX,
    label: "Inactivity Fee",
    value: "None",
  },
];

export const NEVER_PAY = [
  "No hidden spreads baked into the price",
  "No subscription just to access the terminal",
  "No surprise charge when you withdraw",
];
