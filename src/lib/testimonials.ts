export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  image: string;
  imageAlt: string;
  role: string;
  location: string;
  rating: number;
};

/**
 * PLACEHOLDER CONTENT — these are illustrative sample testimonials for a
 * portfolio demonstration, not reviews from real users. The section that
 * renders them labels them as such in the UI. Do not present these as
 * genuine customer feedback.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Moving into the business tier was seamless. The instant interest accrual and auto-compound options do all the heavy lifting in the background without me having to micromanage it.",
    name: "Julian Martinez",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    imageAlt: "Portrait of Julian Martinez",
    role: "Private Investor",
    location: "Spain",
    rating: 5,
  },
  {
    id: "t2",
    quote:
      "Asset security and custody were my biggest worries when looking for a yield platform. Seeing everything transparently handled gave me the confidence to scale up my portfolio.",
    name: "Sarah Holloway",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    imageAlt: "Portrait of Sarah Holloway",
    role: "Asset Manager",
    location: "United Kingdom",
    rating: 5,
  },
  {
    id: "t3",
    quote:
      "The returns speak for themselves. It is rare to find a platform that balances high-yield staking plans with absolute clarity on how your capital is managed.",
    name: "Lucas Vance",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    imageAlt: "Portrait of Lucas Vance",
    role: "Portfolio Analyst",
    location: "Switzerland",
    rating: 5,
  },
  {
    id: "t4",
    quote:
      "I started on the basic plan to test the waters, and the compounding returns have been completely consistent. The whole experience feels built for long-term growth.",
    name: "Kenji Tanaka",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    imageAlt: "Portrait of Kenji Tanaka",
    role: "Independent Investor",
    location: "Japan",
    rating: 5,
  },
  {
    id: "t5",
    quote:
      "At this stage in my life, I'm less interested in high-risk hype and more focused on protecting capital while keeping it productive. This platform delivers steady, predictable yields without any unnecessary stress.",
    name: "Elena Rostova",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    imageAlt: "Portrait of Elena Rostova",
    role: "Private Wealth Saver",
    location: "Austria",
    rating: 5,
  },
  {
    id: "t6",
    quote:
      "What impressed me most is how straightforward the dashboard is. You don't need a degree in finance to track your staking plans and see exactly how your funds are performing day-to-day.",
    name: "Catherine Du Pont",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    imageAlt: "Portrait of Catherine Du Pont",
    role: "Long-term Investor",
    location: "France",
    rating: 5,
  },
];