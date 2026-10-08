export type MechanicsPoint = {
  id: string;
  heading: string;
  /** One-line answer, shown in bold. */
  takeaway: string;
  /** Short supporting paragraph. */
  body: string;
  /** Key figure shown beside the point. */
  stat: { value: string; label: string };
};

export const MECHANICS_POINTS: MechanicsPoint[] = [
  {
    id: "intro",
    heading: "Understanding 401(k)s",
    takeaway: "The most popular retirement savings plan for millions of Americans.",
    body: "Approximately 70 million Americans use a 401(k) to invest for their future. Whether you're a veteran saver or just getting started, understanding how they work is vital for long-term retirement planning.",
    stat: { value: "43%", label: "of working population" },
  },
  {
    id: "what-is-a-401k",
    heading: "What is a 401(k)?",
    takeaway: "An employer-sponsored retirement savings plan with unique tax benefits.",
    body: "Named after the tax code section that created it, employers offer 401(k)s as part of their benefits package. Alternative plans like 403(b)s, 457(b)s, or self-employed options exist depending on your industry.",
    stat: { value: "Employer", label: "sponsored plan" },
  },
  {
    id: "how-does-it-work",
    heading: "How does a 401(k) work?",
    takeaway: "Part of each paycheck is automatically invested with tax advantages.",
    body: "Pre-tax contributions grow tax-deferred until retirement, benefiting from compounding over time. Early distributions before age 59½ may incur a 10% penalty plus federal and state income taxes.",
    stat: { value: "59½", label: "penalty-free age" },
  },
  {
    id: "advantages",
    heading: "401(k) advantages",
    takeaway: "Automation, employer matching, and compounding drive growth.",
    body: "Paycheck deductions remove the temptation to spend retirement money elsewhere. Employer matches and long-term compounding further supercharge your savings potential.",
    stat: { value: "3", label: "key benefits" },
  },
  {
    id: "contribution-limits",
    heading: "401(k) contribution limits",
    takeaway: "Annual IRS limits dictate how much you can contribute.",
    body: "In 2026, you can contribute up to $24,500 pre-tax or Roth to your 401(k). Catch-up contributions are available for older workers, with high earners subject to specific SECURE 2.0 Roth rules.",
    stat: { value: "$24,500", label: "2026 contribution limit" },
  },
];