import { createClient } from "@/lib/supabase/server";

export type DepositRequest = {
  id: string;
  amount: string;
  method: "crypto" | "bank";
  status: "pending" | "approved" | "rejected";
  created_at: string;
};

export async function getMyDepositRequests(limit = 10): Promise<DepositRequest[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data } = await supabase
    .from("deposit_requests")
    .select("id, amount, method, status, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(limit);

  return (data as DepositRequest[]) ?? [];
}
