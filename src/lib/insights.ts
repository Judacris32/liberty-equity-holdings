export type InsightSection = {
  heading?: string;
  paragraphs: string[];
};

export type Insight = {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  readTime: string;
  image: string;
  imageAlt: string;
  sections: InsightSection[];
};

export const INSIGHTS: Insight[] = [
  {
    id: "3-big-income-investing-ideas-now",
    category: "Market Strategy",
    title: "3 big income investing ideas now",
    excerpt:
      "Still, Kramer and his team have been able to identify potential opportunities in the recent environment, using their bottom-up process to navigate the complex market backdrop...",
    author: "Kramer & Co.",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Financial charts and market overview",
    sections: [
      {
        paragraphs: [
          "Still, Kramer and his team have been able to identify potential opportunities in the recent environment, using their bottom-up process to navigate the complex market backdrop and identify potential mispricings. That process has recently led them to the following 3 areas, in particular.",
        ],
      },
      {
        heading: "1. Convertible bonds: A unique asset class that's been shining",
        paragraphs: [
          "Kramer, a convertible bond maven who is also co-manager of Fidelity Convertible Securities (FCVSX), has been finding value in convertible bonds, which unlike corporate bonds haven't been trading at historically high valuations. As a hybrid security, convertibles can provide bond-like downside protection but offer the same potential for uncapped upside as traditional common stock. \"Convertibles are the only fixed income market in the world where it's possible to double, triple, or even quintuple an initial investment,\" he says.",
          "Like a bond, convertibles pay interest quarterly and promise to repay bondholders at par at maturity. But the bonds can be converted to the issuing company's stock at a predetermined ratio. Thus, if the stock rises significantly in price, the bond may trade more like a stock and potentially be converted into the company's common shares.",
          "Dynamics in the convertibles market have been so favorable in recent years, that Kramer has taken to calling it the \"golden age\" for convertible bonds. Around one-third of the market will leave the asset class in the next 2 years, Kramer estimates. Some of these may mature as a traditional bond would, but many may exit the market because they convert into stock. These may be replaced by a stream of new issues with lower sensitivity to the issuer's stock price and lower valuations, many of them technology companies that are raising capital to finance their AI infrastructure build-out.",
          "Alphabet (GOOGL), for example, just issued a jumbo convertible that may soon become the largest constituent in major convertible bond indexes. \"I believe there may be a lot of really interesting companies coming to market with new issues,\" Kramer says.",
        ],
      },
      {
        heading: "2. Preferred stock backed by cryptocurrency",
        paragraphs: [
          "Preferred shares typically pay a fixed quarterly dividend and are senior to common stock but junior to bonds in a company's capital structure. Plain vanilla preferred shares, on average, aren't a screaming value today, in Kramer's mind. But digging deeply, he believes he's found unique potential opportunity in the form of crypto-linked perpetual preferred stocks, issued by bitcoin and ethereum treasury companies. With just a year of history, he calls them \"probably the biggest innovation I've seen in my 26 years in fixed income markets.\"",
          "Also called \"digital credits,\" these preferred shares have paid yields as high as 12% to 16%, which may be distributed as frequently as monthly, biweekly, or even daily. Some of these preferred shares pay floating-rate interest, which essentially eliminates interest-rate risk. And the issuers' significant holdings in bitcoin and/or ethereum have created a collateral buffer that has remained substantial even after large swings in crypto prices. Finally, distributions paid on the preferreds may be treated as a return of capital rather than as ordinary or qualified dividends, which can offer more favorable tax treatment.",
          "Kramer believes the combination of distressed-asset type high yields, solid financial capacity to pay dividends, and strong balance sheet protection reflect the novelty of crypto-backed preferred stock. \"I'm seeking areas that are misunderstood, mispriced, and where investors can get paid to wait,\" he says.",
        ],
      },
      {
        heading: "3. Stocks for dividends and rare resources",
        paragraphs: [
          "The disruption in the Middle East has hampered supply chains but also created some new potential opportunities. Kramer reckons that the oil tanker industry, a sector he's analyzed since 2002, could be one of these. Even prior to 2026 developments in the Hormuz Strait, an industry once known for its dramatic boom-bust cycles had been cleaning up its financial act. Certain tanker companies had paid down debts, cut costs, increased free cash flow, and boosted dividend distributions.",
          "Now, the drawdowns of global oil inventories could be setting up a profound opportunity. \"Once there is peace in the Middle East, many countries may need to rebuild their oil inventories,\" says Kramer. Some countries may even want to increase inventories above where they were pre-2026, to guard against future supply disruptions. \"I believe the world may undergo the biggest oil inventory rebuilding cycle ever seen,\" he says. Recent portfolio holdings that have illustrated this thesis include oil tanker companies International Seaways (INSW) and DHT Holdings (DHT).",
          "Rare and critical metals are another area in which Kramer has been hunting. He thinks he's found compelling supply-demand dynamics in the market for tungsten. Prized for its unusually high melting point, tungsten is widely used in defense, high-temperature industrial applications, and specialized semiconductor manufacturing processes. Due to its unique properties, Kramer believe the metal could eventually find broader applications in emerging fields such as space exploration and nuclear fusion. Worldwide supply has been dominated by China, Russia, and North Korea, a setup that has made it difficult for much of the world to access tungsten supply. Kramer thinks the imbalance of supply and demand could benefit companies that are able to bring tungsten supply to the global market. For example, Almony Industries (ALM) is a Canadian-based mining company that has been expanding tungsten production in South Korea.",
        ],
      },
    ],
  },
];