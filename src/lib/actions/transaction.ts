"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { transactionSchema } from "@/lib/validations/transaction";
import { addCurrency, toCents } from "@/lib/money";

export type TransactionState = { error: string | null; success?: boolean };

/**
 * Simulated deposit — demo/portfolio only. No real payment processor is
 * connected; this only updates `accounts.available_balance` and
 * `accounts.total_deposits`, and logs a row to `transactions`.
 */
export async function depositAction(
  _prevState: TransactionState,
  formData: FormData
): Promise<TransactionState> {
  const parsed = transactionSchema.safeParse({ amount: formData.get("amount") });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid amount." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "You must be logged in." };

  const { data: account, error: accountError } = await supabase
    .from("accounts")
    .select("available_balance, total_deposits, kyc_status")
    .eq("user_id", user.id)
    .single();

  if (accountError || !account) return { error: "Could not load your account." };
  if (account.kyc_status !== "verified") {
    return { error: "Complete KYC verification before making a deposit." };
  }

  const { amount } = parsed.data;
  const newBalance = addCurrency(account.available_balance, amount);
  const newDeposits = addCurrency(account.total_deposits, amount);

  const { error: updateError } = await supabase
    .from("accounts")
    .update({
      available_balance: newBalance,
      total_deposits: newDeposits,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", user.id);

  if (updateError) return { error: "Failed to process deposit. Please try again." };

  await supabase.from("transactions").insert({
    user_id: user.id,
    type: "deposit",
    amount,
    method: "demo",
    status: "completed",
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/deposit");
  return { error: null, success: true };
}

/**
 * Simulated withdrawal — demo/portfolio only. No real payout is sent; this
 * only updates `accounts.available_balance` and `accounts.total_withdrawals`,
 * and logs a row to `transactions`.
 */
export async function withdrawAction(
  _prevState: TransactionState,
  formData: FormData
): Promise<TransactionState> {
  const parsed = transactionSchema.safeParse({ amount: formData.get("amount") });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid amount." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "You must be logged in." };

  const { data: account, error: accountError } = await supabase
    .from("accounts")
    .select("available_balance, total_withdrawals, kyc_status")
    .eq("user_id", user.id)
    .single();

  if (accountError || !account) return { error: "Could not load your account." };
  if (account.kyc_status !== "verified") {
    return { error: "Complete KYC verification before making a withdrawal." };
  }

  const { amount } = parsed.data;
  if (toCents(amount) > toCents(account.available_balance)) {
    return { error: "Withdrawal amount exceeds your available balance." };
  }

  const newBalance = addCurrency(account.available_balance, -amount);
  const newWithdrawals = addCurrency(account.total_withdrawals, amount);

  const { error: updateError } = await supabase
    .from("accounts")
    .update({
      available_balance: newBalance,
      total_withdrawals: newWithdrawals,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", user.id);

  if (updateError) return { error: "Failed to process withdrawal. Please try again." };

  await supabase.from("transactions").insert({
    user_id: user.id,
    type: "withdrawal",
    amount,
    method: "demo",
    status: "completed",
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/withdraw");
  return { error: null, success: true };
}
