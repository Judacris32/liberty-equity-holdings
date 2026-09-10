import { createClient } from "@/lib/supabase/server";

export type AdminAccountSummary = {
  user_id: string;
  email: string;
  account_type: "basic" | "standard" | "business";
  kyc_status: "unverified" | "pending" | "verified";
  available_balance: string;
  is_admin: boolean;
  created_at: string;
};

/**
 * Fetches every registered account for the admin Users list. Checked
 * against the current user's own admin flag before querying broadly —
 * RLS also enforces this at the database level (the public.is_admin()
 * policy on `accounts`), but failing fast here with a clear empty result
 * is better than relying solely on RLS to silently filter everything out.
 */
export async function getAllAccounts(): Promise<AdminAccountSummary[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data: self } = await supabase
    .from("accounts")
    .select("is_admin")
    .eq("user_id", user.id)
    .single();

  if (!self?.is_admin) return [];

  const { data } = await supabase
    .from("accounts")
    .select(
      "user_id, email, account_type, kyc_status, available_balance, is_admin, created_at"
    )
    .order("created_at", { ascending: false });

  return (data as AdminAccountSummary[]) ?? [];
}
