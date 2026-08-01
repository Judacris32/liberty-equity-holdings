import { createClient } from "@/lib/supabase/server";

export type OrderRecord = {
  id: string;
  symbol: string;
  side: "buy" | "sell";
  amount: string;
  speed: "standard" | "instant";
  pnl: string;
  status: "filled" | "rejected";
  created_at: string;
};

export async function getRecentOrders(limit = 10): Promise<OrderRecord[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data } = await supabase
    .from("orders")
    .select("id, symbol, side, amount, speed, pnl, status, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(limit);

  return (data as OrderRecord[]) ?? [];
}
