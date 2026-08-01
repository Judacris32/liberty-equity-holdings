export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "safety",
    question: "Is my money actually safe here?",
    answer:
      "Your session never touches localStorage — authentication runs through HTTP-only cookies verified server-side on every request. Deposits and withdrawals stay locked until identity verification clears, and every action gets logged to your account history.",
  },
  {
    id: "kyc-time",
    question: "How long does identity verification take?",
    answer:
      "Once you submit a document, it moves into a review queue. In a live deployment this is typically same-day; nothing about your account is limited beyond deposits and withdrawals while it's pending — you can still explore the terminal and markets.",
  },
  {
    id: "assets",
    question: "What can I actually trade?",
    answer:
      "Crypto (BTC, ETH, SOL, and more), major forex pairs like EUR/USD and GBP/USD, and preferred stock for steadier, longer-horizon positions. Pricing for crypto and forex streams live from the terminal.",
  },
  {
    id: "fees",
    question: "Are there fees you're not telling me about?",
    answer:
      "No. Everything we charge is listed on this page in the Transparency section — a maker/taker trading fee, and that's it. No account minimums, no inactivity fees, no surprise charge when you withdraw.",
  },
  {
    id: "withdraw",
    question: "Can I withdraw whenever I want?",
    answer:
      "Yes, once your identity is verified. There's no lock-up period and no minimum holding time on your balance.",
  },
  {
    id: "returns",
    question: "Do you guarantee any kind of return?",
    answer:
      "No — and we'd be skeptical of any platform that does. Nobody can honestly promise you'll make money trading. What we can promise is a secure, transparent way to act on your own decisions, with real data and no hidden mechanics behind it.",
  },
];
