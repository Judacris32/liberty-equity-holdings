import { Layers, ShieldCheck, LineChart } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type PricingPlan = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  points: string[];
  cta: { label: string; href: string };
  image: string;
  imageAlt: string;
};

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "basic",
    icon: ShieldCheck,
    title: "Basic Plan",
    description: "$3,000 - $29,999",
    points: [
      "Secure Asset Custody",
      "Instant Interest Accrual",
      "Auto-Compound Options",
    ],
    cta: { label: "Select Plan", href: "/register" },
    image:
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Accessible wealth building and savings concept",
  },
  {
    id: "standard",
    icon: Layers,
    title: "Standard Plan",
    description: "$25,000 - $100,000",
    points: [
      "Secure Asset Custody",
      "Instant Interest Accrual",
      "Auto-Compound Options",
    ],
    cta: { label: "Select Plan", href: "/register" },
    image:
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Balanced investment portfolio performance view",
  },
  {
    id: "business",
    icon: LineChart,
    title: "Business Plan",
    description: "$100,000 - $1,000,000",
    points: [
      "Secure Asset Custody",
      "Instant Interest Accrual",
      "Auto-Compound Options",
    ],
    cta: { label: "Select Plan", href: "/register" },
    image:
      "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Advanced trading terminal and deep market analytics",
  },
];