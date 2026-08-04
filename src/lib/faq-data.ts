export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "security",
    question: "How secure is my personal data and financial investment?",
    answer:
      "We treat your security as our top priority. All sensitive information and financial allocations are protected by advanced encryption protocols, secure server-side session handling, and multi-layered verification layers to keep your assets completely safe.",
  },
  {
    id: "minimum-amount",
    question: "What is the minimum amount required to start trading?",
    answer:
      "You can get started right away with our accessible entry tier starting at $3,000, allowing you to test the platform and grow your portfolio at a pace that fits your financial goals.",
  },
  {
    id: "withdrawals",
    question: "How quickly can I withdraw my earnings?",
    answer:
      "Withdrawals are processed smoothly and efficiently once your identity verification is complete. There are no arbitrary holding locks, giving you prompt access to your returns whenever you need them.",
  },
  {
    id: "support",
    question: "Do you offer 24/7 technical support?",
    answer:
      "Yes, our dedicated support team is available around the clock to assist you with any questions, account setups, or technical navigation you might need along the way.",
  },
  {
    id: "hidden-fees",
    question: "Are there any hidden fees on trades?",
    answer:
      "Never. We believe in complete financial transparency. All costs, staking plans, and tier terms are laid out clearly so you will never encounter surprise charges or unexpected deductions.",
  },
];