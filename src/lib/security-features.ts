import {
  Lock,
  Server,
  FileCheck2,
  Fingerprint,
  Eye,
  ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type SecurityFeature = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

// Photography sourced from Unsplash (free license, commercial use
// permitted, no attribution required).
export const SECURITY_FEATURES: SecurityFeature[] = [
  {
    id: "http-only-cookies",
    icon: Lock,
    title: "HTTP-Only Session Cookies",
    description:
      "Authentication tokens never touch localStorage — sessions are secured server-side to guard against XSS attacks.",
    image:
      "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "A padlock resting on a computer keyboard",
  },
  {
    id: "route-guarding",
    icon: Server,
    title: "Server-Side Route Guarding",
    description:
      "Every protected route is verified by middleware before a single byte of the page renders.",
    image:
      "https://images.unsplash.com/photo-1695668548342-c0c1ad479aee?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "A rack of servers in a server room",
  },
  {
    id: "kyc-gated",
    icon: FileCheck2,
    title: "KYC-Gated Deposits",
    description:
      "Identity verification is required before deposit or withdrawal actions unlock on any account.",
    image:
      "https://images.unsplash.com/photo-1725656469709-4d0bcb828bcf?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "A passport resting on a wooden table",
  },
  {
    id: "segregated-accounts",
    icon: Fingerprint,
    title: "Segregated Account Structure",
    description:
      "Client balances are tracked independently, with precise decimal handling to avoid floating-point drift.",
    image:
      "https://images.unsplash.com/photo-1462045504115-6c1d931f07d1?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Rows of numbered metal deposit boxes in a bank",
  },
  {
    id: "activity-transparency",
    icon: Eye,
    title: "Full Activity Transparency",
    description:
      "Every deposit, trade, and withdrawal is logged and viewable in your dashboard history.",
    image:
      "https://images.unsplash.com/photo-1663596990274-3fc2f5a4ce27?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "A hallway lined with glass doors",
  },
  {
    id: "encrypted",
    icon: ShieldCheck,
    title: "Encrypted at Rest & in Transit",
    description:
      "All client data is encrypted end-to-end, from database storage to network transport.",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "A tangle of network cables",
  },
];
