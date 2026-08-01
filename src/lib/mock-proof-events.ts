// Simulated activity feed for portfolio/demo purposes only.
// This is a static array, not a live connection to real users or
// real financial transactions.

export type ProofEvent = {
  id: string;
  name: string;
  location: string;
  action: "withdrew" | "deposited" | "opened a position on";
  amount: string;
  asset?: string;
};

export const MOCK_PROOF_EVENTS: ProofEvent[] = [
  { id: "p1", name: "Yuki T.", location: "JP", action: "withdrew", amount: "$800" },
  { id: "p2", name: "Marco R.", location: "IT", action: "deposited", amount: "$1,250" },
  { id: "p3", name: "Amara O.", location: "NG", action: "opened a position on", amount: "$500", asset: "BTC/USD" },
  { id: "p4", name: "Liam C.", location: "IE", action: "withdrew", amount: "$2,100" },
  { id: "p5", name: "Sofia M.", location: "BR", action: "deposited", amount: "$640" },
  { id: "p6", name: "Daniel K.", location: "ZA", action: "opened a position on", amount: "$300", asset: "ETH/USD" },
  { id: "p7", name: "Elena P.", location: "GR", action: "withdrew", amount: "$975" },
  { id: "p8", name: "Ravi S.", location: "IN", action: "deposited", amount: "$1,800" },
];
