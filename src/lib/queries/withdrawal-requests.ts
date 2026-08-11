import { createClient } from "@/lib/supabase/server";

export type WithdrawalRequest = {
  id: string;
  amount: string;
  method: "bank" | "crypto";
  status: "pending" | "approved" | "rejected";
  created_at: string;
};

export async function getMyWithdrawalRequests(limit = 10): Promise<WithdrawalRequest[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data } = await supabase
    .from("withdrawal_requests")
    .select("id, amount, method, status, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(limit);

  return (data as WithdrawalRequest[]) ?? [];
}
