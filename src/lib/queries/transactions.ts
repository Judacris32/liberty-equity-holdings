import { createClient } from "@/lib/supabase/server";

export type Transaction = {
  id: string;
  type: "deposit" | "withdrawal";
  amount: string;
  status: "completed" | "pending" | "failed";
  created_at: string;
};

export async function getRecentTransactions(limit = 10): Promise<Transaction[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data } = await supabase
    .from("transactions")
    .select("id, type, amount, status, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(limit);

  return (data as Transaction[]) ?? [];
}
