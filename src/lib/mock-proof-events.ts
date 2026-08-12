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
  { id: "p1", name: "Yuki T.", location: "JP", action: "withdrew", amount: "$12,450" },
  { id: "p2", name: "Marco R.", location: "IT", action: "deposited", amount: "$35,800" },
  { id: "p3", name: "Chloe D.", location: "FR", action: "opened a position on", amount: "$8,900", asset: "BTC/USD" },
  { id: "p4", name: "Liam C.", location: "IE", action: "withdrew", amount: "$42,100" },
  { id: "p5", name: "Sofia M.", location: "BR", action: "deposited", amount: "$6,500" },
  { id: "p6", name: "Daniel K.", location: "DE", action: "opened a position on", amount: "$15,300", asset: "ETH/USD" },
  { id: "p7", name: "Elena P.", location: "GR", action: "withdrew", amount: "$28,750" },
  { id: "p8", name: "Ravi S.", location: "IN", action: "deposited", amount: "$19,400" },
  { id: "p9", name: "Emma W.", location: "GB", action: "opened a position on", amount: "$7,200", asset: "SOL/USD" },
  { id: "p10", name: "Lucas B.", location: "CA", action: "withdrew", amount: "$49,500" },
  { id: "p11", name: "Hana K.", location: "KR", action: "deposited", amount: "$11,200" },
  { id: "p12", name: "Mateo G.", location: "ES", action: "opened a position on", amount: "$22,600", asset: "XRP/USD" },
  { id: "p13", name: "Astrid L.", location: "SE", action: "withdrew", amount: "$14,800" },
  { id: "p14", name: "Kenji N.", location: "JP", action: "deposited", amount: "$38,900" },
  { id: "p15", name: "Olivia H.", location: "AU", action: "opened a position on", amount: "$9,150", asset: "ADA/USD" },
  { id: "p16", name: "Gabriel S.", location: "AR", action: "withdrew", amount: "$27,300" },
  { id: "p17", name: "Mia V.", location: "NL", action: "deposited", amount: "$44,000" },
  { id: "p18", name: "Noah F.", location: "CH", action: "opened a position on", amount: "$16,750", asset: "BTC/USD" },
  { id: "p19", name: "Zara J.", location: "NZ", action: "withdrew", amount: "$31,200" },
  { id: "p20", name: "Finn O.", location: "NO", action: "deposited", amount: "$6,800" },
];
