export type MechanicsSectionData = {
  id: string;
  heading: string;
  paragraphs: string[];
};

export const MECHANICS_SECTIONS: MechanicsSectionData[] = [
  {
    id: "intro",
    heading: "Understanding 401(k)s",
    paragraphs: [
      "401(k)s are the most popular retirement savings plan. Approximately 70 million Americans or about 43% of the working population, use one to invest money they'll live off in retirement.",
      "But just because they're common doesn't mean they're well understood. Whether you're a veteran retirement saver or are just getting started, here's what you need to know about 401(k)s and how they work.",
    ],
  },
  {
    id: "what-is-a-401k",
    heading: "What is a 401(k)?",
    paragraphs: [
      "Named for the tax code section that created it, a 401(k) is an employer-sponsored retirement savings plan with special tax benefits. (The exact tax advantages depend on which kind of 401(k) contributions you make, more on that later.) Employers typically offer 401(k)s as part of a benefits package to attract and retain workers.",
      "Not everyone has access to a 401(k). Depending on your industry, you may be able to contribute to a similar employer-sponsored retirement plan, like a 403(b) or 457(b), instead of a 401(k). Self-employed people can open a type of 401(k) on their own called a self-employed 401(k), and anyone who earns an income (or who is married to someone who does) can save for retirement, in addition to a 401(k) or in place of one, within an IRA.",
    ],
  },
  {
    id: "how-does-it-work",
    heading: "How does a 401(k) work?",
    paragraphs: [
      "401(k)s let you contribute part of each paycheck into a retirement account, where you can generally invest your assets in various types of mutual funds, such as index funds or target date funds. The IRS requires that contributions are made by employers through paycheck reductions, meaning you can't make contributions by personal check.",
      "The ability to invest for retirement is a major incentive to use a 401(k) investing your money gives it a chance to benefit from compounding and a potential to grow over time. But 401(k)s also offer tax advantages. Unlike contributions to regular brokerage accounts, pre-tax contributions to a 401(k) are not taxed until you begin withdrawals in retirement. Unless an exception applies, distributions prior to turning 59½ may be subject to a 10% tax as an early distribution penalty in addition to federal income taxes. Depending on where you live, you may also be taxed at the state and local levels.",
      "Some employers offer a second type of 401(k) called a Roth 401(k), in which you invest after-tax money today and don't pay income taxes on your withdrawals in retirement. Not sure which to pick? Find out whether contributing to a Roth or traditional 401(k) or even both, makes sense for you.",
    ],
  },
  {
    id: "advantages",
    heading: "401(k) advantages",
    paragraphs: [
      "401(k)s can be a helpful tool to fund a secure retirement. A few key benefits include automation, employer contributions, and compounding.",
      "Automation: The science is clear: We're more likely to save when we don't have to think about it. That's where 401(k)s shine. By automatically funneling money from your paycheck to your retirement savings, there's no opportunity to spend the money on anything else.",
      "Employer contributions: A key advantage of 401(k)s is that your employer may also contribute to help you save for retirement. This typically takes the form of a 401(k) match, where your company agrees to contribute a certain amount based on what you contribute, either dollar-for-dollar up to a certain percentage of your salary, or a partial match like 50%. Fidelity suggests aiming to contribute at least enough to get the full match amount.",
      "Compounding: The potential snowball effect of compounding makes early saving or investing, particularly in tax-advantaged retirement accounts like a 401(k), that much more enticing since the earlier you start investing, the more compounded returns you can hope to make.",
    ],
  },
  {
    id: "contribution-limits",
    heading: "401(k) contribution limits",
    paragraphs: [
      "In 2026, you can contribute up to $24,500 pre-tax or Roth to your 401(k). Some plans may allow after-tax contributions up to the combined employee and employer limit of $72,000. If you're at least age 50 at the end of the calendar year, you can add a pre-tax or Roth catch-up contribution of $8,000 (or $11,250 if age 60–63, if your plan allows).",
      "According to the SECURE 2.0 Act's higher earner rule, in 2026, catch-up contributions for earners whose FICA wages (typically Box 3 of Form W-2) exceed $150,000 in the previous tax year, must be designated as Roth after-tax contributions.",
      "If your employer's plan does not offer a Roth contribution feature and you fall under the high-earner rule, you won't be able to make catch-up contributions to that plan.",
    ],
  },
];