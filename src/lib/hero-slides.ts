export type HeroSlide = {
  id: string;
  image: string;
  imageAlt: string;
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  subcopy: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

// Photography sourced from Unsplash (free license, commercial use permitted,
// no attribution required). Chosen to match the trading/finance theme —
// real photos rather than gradients/illustrations, for a more editorial,
// less "generated" feel.
export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "precision",
    image:
      "https://images.unsplash.com/photo-1566866856854-a0b3d69a62c0?auto=format&fit=crop&w=2400&q=80",
    imageAlt: "City skyline of illuminated buildings at night",
    eyebrow: "Built for real trading",
    headline: "Execute with",
    headlineAccent: "precision and confidence.",
    subcopy:
      "Live pricing, clean execution, and a dashboard that gives you a clear view of your portfolio at every moment.",
    primaryCta: { label: "Open an Account", href: "/register" },
    secondaryCta: { label: "View Live Markets", href: "#markets" },
  },
  {
    id: "always-on",
    image:
      "https://images.unsplash.com/photo-1768055105681-7d2096c5165f?auto=format&fit=crop&w=2400&q=80",
    imageAlt: "Trader analyzing charts across multiple monitors",
    eyebrow: "Live market intelligence",
    headline: "Markets move constantly.",
    headlineAccent: "Your data should too.",
    subcopy:
      "Crypto and forex prices stream directly into the terminal in real time, no refreshing, no delays.",
    primaryCta: { label: "Explore the Terminal", href: "/register" },
    secondaryCta: { label: "See How It Works", href: "#trading" },
  },
  {
    id: "desk",
    image:
      "https://images.unsplash.com/photo-1606191104230-eb69171eaf15?auto=format&fit=crop&w=2400&q=80",
    imageAlt: "Person checking trading activity on a phone",
    eyebrow: "For larger positions",
    headline: "A dedicated desk",
    headlineAccent: "for serious volume.",
    subcopy:
      "Larger trades are handled with the speed, discretion, and precise pricing they require.",
    primaryCta: { label: "Talk to Our Desk", href: "/register" },
  },
  {
    id: "security",
    image:
      "https://images.unsplash.com/photo-1613871758600-fb390c5d3fbb?auto=format&fit=crop&w=2400&q=80",
    imageAlt: "Institutional building facade against a cloudy sky",
    eyebrow: "Security by design",
    headline: "Security isn't an afterthought.",
    headlineAccent: "It's the architecture.",
    subcopy:
      "HTTP-only session cookies, server-side verification, and identity checks before any funds move.",
    primaryCta: { label: "See How We Protect You", href: "#security" },
  },
  {
    id: "clarity",
    image:
      "https://images.unsplash.com/photo-1723380726942-2d5945a45b23?auto=format&fit=crop&w=2400&q=80",
    imageAlt: "Black and white view of tall city buildings",
    eyebrow: "Start in minutes",
    headline: "Less clutter.",
    headlineAccent: "More clarity.",
    subcopy:
      "Create an account and see the full platform for yourself, no unnecessary steps.",
    primaryCta: { label: "Get Started", href: "/register" },
  },
];
