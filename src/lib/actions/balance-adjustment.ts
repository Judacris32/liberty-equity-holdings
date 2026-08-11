"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { isCurrentUserAdmin } from "@/lib/queries/admin";
import { findAccountSchema, adjustBalanceSchema } from "@/lib/validations/balance-adjustment";

async function requireAdmin() {
  const isAdmin = await isCurrentUserAdmin();
  if (!isAdmin) {
    throw new Error("Not authorized.");
  }
  return createClient();
}

export type FindAccountState = {
  error: string | null;
  account?: {
    user_id: string;
    email: string;
    available_balance: string;
  };
};

export async function findAccountByEmailAction(
  _prevState: FindAccountState,
  formData: FormData
): Promise<FindAccountState> {
  const parsed = findAccountSchema.safeParse({ email: formData.get("email") });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid email." };
  }

  try {
    const supabase = await requireAdmin();

    const { data, error } = await supabase
      .from("accounts")
      .select("user_id, email, available_balance")
      .eq("email", parsed.data.email.toLowerCase().trim())
      .single();

    if (error || !data) {
      return { error: "No account found with that email." };
    }

    return { error: null, account: data };
  } catch {
    return { error: "You are not authorized to perform this action." };
  }
}

export type AdjustBalanceState = { error: string | null; success?: boolean };

export async function adjustBalanceAction(
  _prevState: AdjustBalanceState,
  formData: FormData
): Promise<AdjustBalanceState> {
  const parsed = adjustBalanceSchema.safeParse({
    userId: formData.get("userId"),
    direction: formData.get("direction"),
    amount: formData.get("amount"),
    reason: formData.get("reason"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid submission." };
  }

  try {
    const supabase = await requireAdmin();
    const {
      data: { user: adminUser },
    } = await supabase.auth.getUser();

    if (!adminUser) return { error: "Not authorized." };

    const { userId, direction, amount, reason } = parsed.data;
    const signedAmount = direction === "credit" ? amount : -amount;

    const { data: account, error: fetchError } = await supabase
      .from("accounts")
      .select("available_balance, total_profit")
      .eq("user_id", userId)
      .single();

    if (fetchError || !account) return { error: "Could not load that account." };

    if (direction === "debit" && parseFloat(account.available_balance) < amount) {
      return { error: "Debit exceeds the user's available balance." };
    }

    const newBalance =
      Math.round((parseFloat(account.available_balance) + signedAmount) * 100) / 100;
    const newProfit =
      Math.round((parseFloat(account.total_profit) + signedAmount) * 100) / 100;

    const { error: updateError } = await supabase
      .from("accounts")
      .update({
        available_balance: newBalance,
        total_profit: newProfit,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userId);

    if (updateError) return { error: "Failed to update the account balance." };

    await supabase.from("balance_adjustments").insert({
      admin_id: adminUser.id,
      user_id: userId,
      amount: signedAmount,
      reason,
    });

    await supabase.from("transactions").insert({
      user_id: userId,
      type: direction === "credit" ? "deposit" : "withdrawal",
      amount,
      method: "admin_adjustment",
      status: "completed",
      note: reason,
    });

    revalidatePath("/admin/balance");
    return { error: null, success: true };
  } catch {
    return { error: "You are not authorized to perform this action." };
  }
}
