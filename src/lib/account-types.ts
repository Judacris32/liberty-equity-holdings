import { User, TrendingUp, Building2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type AccountTypeOption = {
  value: "basic" | "standard" | "business";
  label: string;
  icon: LucideIcon;
  description: string;
};

// Describes who each account type is for — not a return tier or
// investment package. No fee, limit, or reward differences are implied
// beyond what's genuinely true right now.
export const ACCOUNT_TYPES: AccountTypeOption[] = [
  {
    value: "basic",
    label: "Basic",
    icon: User,
    description: "$3,000 - $29,999",
  },
  {
    value: "standard",
    label: "Standard",
    icon: TrendingUp,
    description: "$25,000 - $100,000",
  },
  {
    value: "business",
    label: "Business",
    icon: Building2,
    description: "$650,000 - $750,000",
  },
];
