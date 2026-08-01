export type InsightSection = {
  heading?: string;
  paragraphs: string[];
};

export type Insight = {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  author: string;
  image: string;
  imageAlt: string;
  sections: InsightSection[];
};


export const INSIGHTS: Insight[] = [
  {
    id: "time-in-market",
    category: "Fundamentals",
    title: "Why Time in the Market Beats Timing It",
    excerpt:
      "Compounding rewards patience more than precision. A modest return, left alone long enough, tends to outgrow a spectacular one that keeps getting interrupted. Here's why the boring approach usually wins.",
    readTime: "4 min read",
    author: "Kramer",
    image:
      "https://images.unsplash.com/photo-1616261167032-b16d2df8333b?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "A steadily rising green trend line on paper",
    sections: [
      {
        heading: "The math nobody wants to sit with",
        paragraphs: [
          "Compounding is quiet. It doesn't announce itself with a big move or a headline, it just keeps adding a little to what was already there, over and over, until the shape of the curve changes without anyone noticing exactly when.",
          "That's precisely why it's so easy to underestimate. A position that grows steadily for years looks unremarkable for most of that time. It only looks impressive in hindsight, which means it rarely feels rewarding enough in the moment to leave alone.",
        ],
      },
      {
        heading: "Why interruptions cost more than they look like",
        paragraphs: [
          "Every time a position gets closed and reopened, the clock on compounding effectively resets. This is the part that's easy to miss: it's not just that you lose the gains you exit — you lose the growth those gains would have generated if they'd stayed invested.",
          "Missing even a handful of the market's strongest days over a multi-year period tends to have an outsized effect on total return, precisely because those days are usually clustered right around the volatile periods that make people want to step away in the first place.",
        ],
      },
      {
        heading: "What this actually means for how you trade",
        paragraphs: [
          "None of this is an argument for never trading, or for treating every position as untouchable. It's an argument for being honest about which of your trades are actually long-term theses in disguise, and giving those room to compound instead of managing them like day trades.",
          "The boring approach, deciding your holding period in advance and mostly sticking to it — isn't exciting. It's also, over long enough timeframes, usually the difference between a portfolio that grows and one that just moves.",
        ],
      },
    ],
  },
  {
    id: "diversification",
    category: "Strategy",
    title: "Diversification Isn't Just a Buzzword",
    excerpt:
      "Spreading risk across assets sounds obvious until you actually try to do it well. The real skill isn't owning more things, it's owning things that don't move together.",
    readTime: "5 min read",
    author: "Kramer",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Laptop displaying financial charts on a glass desk",
    sections: [
      {
        heading: "Owning more things isn't the same as diversifying",
        paragraphs: [
          "A portfolio with fifteen positions can be less diversified than one with five, if those fifteen all tend to move in the same direction at the same time. Counting the number of assets you hold tells you almost nothing about how much real risk-spreading you've actually done.",
          "What matters is correlation — how much two assets tend to rise and fall together. Two crypto assets, or two forex pairs tied to similar economic conditions, can behave almost like one position wearing two names.",
        ],
      },
      {
        heading: "The uncomfortable trade-off",
        paragraphs: [
          "Real diversification usually means holding something that's currently doing worse than your best performer. That's the part people don't like to hear, because it feels like deliberately reducing your upside.",
          "But that's also exactly the point. The assets that smooth out a portfolio's swings are, by definition, the ones not moving in lockstep with whatever is currently working. If everything you own is having a great month at the same time, you're probably concentrated, not diversified.",
        ],
      },
      {
        heading: "A simpler way to think about it",
        paragraphs: [
          "Instead of asking 'how many things do I own,' a more useful question is 'if this one position went to zero tomorrow, how much would the rest of my portfolio actually be affected?' If the honest answer is 'a lot,' the number of line items you're holding was never the issue.",
        ],
      },
    ],
  },
  {
    id: "reading-the-market",
    category: "Markets",
    title: "Reading the Market Without the Noise",
    excerpt:
      "Headlines move fast; fundamentals don't. Learning to tell the difference between a signal and a distraction is most of what separates a calm trader from a reactive one.",
    readTime: "3 min read",
    author: "Kramer",
    image:
      "https://images.unsplash.com/photo-1560221328-12fe60f83ab8?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Close-up of a monitor displaying a market chart",
    sections: [
      {
        heading: "Most price movement is noise, not information",
        paragraphs: [
          "On any given day, a large share of what moves a price has nothing to do with a genuine change in the underlying asset's prospects. it's positioning, liquidity, or a headline that will be forgotten in a week. Reacting to all of it is exhausting, and usually counterproductive.",
        ],
      },
      {
        heading: "A quick way to separate the two",
        paragraphs: [
          "Signal tends to be something that changes the answer to a real question: does this affect earnings, adoption, regulation, or supply and demand in a lasting way? Noise tends to be something that changes how people feel for a few hours without changing any of that.",
          "It's not a perfect test, but asking it consistently does more to filter out reactive trading than almost any indicator.",
        ],
      },
      {
        heading: "Why this matters more as markets move faster",
        paragraphs: [
          "Real-time data is genuinely useful, it's a large part of why we built the terminal the way we did. But fast information isn't the same as important information, and the traders who do well with real-time data are usually the ones who've already decided what they're watching for, rather than reacting to everything that scrolls past.",
        ],
      },
    ],
  },
  {
    id: "retirement-plans",
    category: "Planning",
    title: "How Employer Retirement Plans Actually Work",
    excerpt:
      "Employer-sponsored retirement accounts are common, tax-advantaged, and widely misunderstood. Here's the general mechanics, how contributions work, why the tax treatment matters, and why the match is worth paying attention to.",
    readTime: "6 min read",
    author: "Kramer",
    image:
      "https://images.unsplash.com/photo-1607863680198-23d4b2565df0?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "A small piggy bank on a wooden table",
    sections: [
      {
        heading: "The basic idea",
        paragraphs: [
          "An employer-sponsored retirement plan lets you set aside part of each paycheck into an investment account before it ever reaches your regular bank account. The money is typically invested in a mix of funds you choose from a menu your employer offers, and it's meant to stay invested for years or decades, not withdrawn casually.",
          "The core appeal is automation. Because the contribution happens before you see the money, it removes the decision-making step where saving usually loses to spending.",
        ],
      },
      {
        heading: "Why the tax treatment matters",
        paragraphs: [
          "Most of these plans offer at least one of two tax structures. In the more traditional version, contributions reduce your taxable income now, and you pay tax later when you withdraw in retirement. In the other, you contribute money that's already been taxed, and qualifying withdrawals later are tax-free.",
          "Which one makes more sense generally comes down to a bet on your own future: do you expect to be in a higher or lower tax bracket by the time you retire? Neither choice is universally correct — it depends on your specific situation, which is worth discussing with a tax professional rather than guessing.",
        ],
      },
      {
        heading: "The employer match, explained",
        paragraphs: [
          "Many employers add money to your account based on how much you personally contribute, commonly called a match. A typical structure might add fifty cents for every dollar you contribute, up to some percentage of your salary.",
          "Leaving a match on the table is, functionally, declining part of your own compensation. It's usually one of the first things worth checking if you have access to one of these plans and aren't sure whether you're contributing enough to capture it in full.",
        ],
      },
      {
        heading: "Why starting early changes the outcome",
        paragraphs: [
          "Because these accounts are built for long holding periods, the earlier money goes in, the more time it has to compound. Two people contributing the same total amount over their careers can end up with meaningfully different balances depending on when those contributions happened, not because one invested better, but because one gave the money more time.",
        ],
      },
    ],
  },
  {
    id: "convertible-bonds",
    category: "Fundamentals",
    title: "What Are Convertible Bonds, Really?",
    excerpt:
      "A convertible bond is part loan, part option. it pays interest like a bond, but can convert into company stock under the right conditions. Here's the general shape of how they work, and where they tend to fit in a portfolio.",
    readTime: "5 min read",
    author: "Kramer",
    image:
      "https://images.unsplash.com/photo-1633158829875-e5316a358c6f?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "A glass jar filled with coins next to a small plant",
    sections: [
      {
        heading: "A bond that can turn into a stock",
        paragraphs: [
          "A convertible bond starts out behaving like an ordinary bond: a company borrows money, agrees to pay interest on a schedule, and promises to repay the principal at maturity. The difference is a built-in option — the bondholder has the right to convert the bond into a set number of the company's shares instead of taking the cash repayment.",
          "That conversion right is usually only worth exercising if the stock price has risen enough to make the shares more valuable than the cash repayment would have been.",
        ],
      },
      {
        heading: "Why investors are drawn to them",
        paragraphs: [
          "The appeal is the shape of the risk. If the stock does poorly, a convertible bond still behaves mostly like a regular bond, you're still owed interest payments and principal back, assuming the company can pay. If the stock does very well, the conversion option lets you participate in a meaningful part of that upside instead of being capped at a fixed interest rate.",
          "That combination, bond-like downside, stock-like upside potential, is the entire reason this hybrid structure exists.",
        ],
      },
      {
        heading: "The trade-off that comes with it",
        paragraphs: [
          "Nothing about this is free. Convertible bonds typically pay a lower interest rate than an ordinary bond from the same company, because the conversion option itself has value that the company is effectively selling you in exchange for a smaller coupon.",
          "They're also more complex to value than a plain bond or a plain stock, since their price depends on both the company's creditworthiness and its stock price at the same time.",
        ],
      },
      {
        heading: "Where they tend to fit",
        paragraphs: [
          "Convertible bonds are generally considered a middle-of-the-risk-spectrum holding, more volatile than investment-grade bonds, generally less volatile than the underlying stock outright. They're not a shortcut to avoiding the trade-off between risk and return; they're a different way of packaging that trade-off.",
        ],
      },
    ],
  },
];
