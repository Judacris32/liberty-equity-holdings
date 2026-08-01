import { createClient } from "@/lib/supabase/server";

export type Account = {
  user_id: string;
  email: string | null;
  available_balance: string;
  total_profit: string;
  total_deposits: string;
  total_withdrawals: string;
  kyc_status: "unverified" | "pending" | "verified";
  is_admin: boolean;
};

/**
 * Fetches the current user's account row (created automatically on sign-up
 * by the `handle_new_user_account` trigger — see supabase/001_accounts_table.sql).
 * Returns null if there's no authenticated user.
 */
export async function getAccount(): Promise<Account | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("accounts")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (error || !data) return null;

  return data as Account;
}
