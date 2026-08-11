"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { isCurrentUserAdmin } from "@/lib/queries/admin";

export type AdminActionState = { error: string | null; success?: boolean };

async function requireAdmin() {
  const isAdmin = await isCurrentUserAdmin();
  if (!isAdmin) {
    throw new Error("Not authorized.");
  }
  return createClient();
}

export async function approveKycAction(
  _prevState: AdminActionState,
  formData: FormData
): Promise<AdminActionState> {
  const submissionId = formData.get("submissionId") as string;
  const targetUserId = formData.get("userId") as string;

  if (!submissionId || !targetUserId) {
    return { error: "Missing submission details." };
  }

  try {
    const supabase = await requireAdmin();

    const { error: submissionError } = await supabase
      .from("kyc_submissions")
      .update({ status: "verified" })
      .eq("id", submissionId);

    if (submissionError) return { error: "Failed to update submission." };

    const { error: accountError } = await supabase
      .from("accounts")
      .update({ kyc_status: "verified", updated_at: new Date().toISOString() })
      .eq("user_id", targetUserId);

    if (accountError) return { error: "Failed to update account status." };

    revalidatePath("/admin/kyc");
    return { error: null, success: true };
  } catch {
    return { error: "You are not authorized to perform this action." };
  }
}

export async function rejectKycAction(
  _prevState: AdminActionState,
  formData: FormData
): Promise<AdminActionState> {
  const submissionId = formData.get("submissionId") as string;
  const targetUserId = formData.get("userId") as string;

  if (!submissionId || !targetUserId) {
    return { error: "Missing submission details." };
  }

  try {
    const supabase = await requireAdmin();

    const { error: submissionError } = await supabase
      .from("kyc_submissions")
      .update({ status: "rejected" })
      .eq("id", submissionId);

    if (submissionError) return { error: "Failed to update submission." };

    const { error: accountError } = await supabase
      .from("accounts")
      .update({ kyc_status: "unverified", updated_at: new Date().toISOString() })
      .eq("user_id", targetUserId);

    if (accountError) return { error: "Failed to update account status." };

    revalidatePath("/admin/kyc");
    return { error: null, success: true };
  } catch {
    return { error: "You are not authorized to perform this action." };
  }
}

export async function approveDepositAction(
  _prevState: AdminActionState,
  formData: FormData
): Promise<AdminActionState> {
  const requestId = formData.get("requestId") as string;
  const targetUserId = formData.get("userId") as string;
  const amount = parseFloat(formData.get("amount") as string);

  if (!requestId || !targetUserId || !amount) {
    return { error: "Missing request details." };
  }

  try {
    const supabase = await requireAdmin();

    const { data: account, error: fetchError } = await supabase
      .from("accounts")
      .select("available_balance, total_deposits")
      .eq("user_id", targetUserId)
      .single();

    if (fetchError || !account) return { error: "Could not load that user's account." };

    // Cent-precise addition, same approach used everywhere else money is
    // calculated on this platform.
    const newBalance =
      Math.round((parseFloat(account.available_balance) + amount) * 100) / 100;
    const newDeposits =
      Math.round((parseFloat(account.total_deposits) + amount) * 100) / 100;

    const { error: accountError } = await supabase
      .from("accounts")
      .update({
        available_balance: newBalance,
        total_deposits: newDeposits,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", targetUserId);

    if (accountError) return { error: "Failed to update account balance." };

    const { error: requestError } = await supabase
      .from("deposit_requests")
      .update({ status: "approved", reviewed_at: new Date().toISOString() })
      .eq("id", requestId);

    if (requestError) return { error: "Failed to update the deposit request." };

    await supabase.from("transactions").insert({
      user_id: targetUserId,
      type: "deposit",
      amount,
      method: "manual_review",
      status: "completed",
    });

    revalidatePath("/admin/deposits");
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/deposit");
    return { error: null, success: true };
  } catch {
    return { error: "You are not authorized to perform this action." };
  }
}

export async function rejectDepositAction(
  _prevState: AdminActionState,
  formData: FormData
): Promise<AdminActionState> {
  const requestId = formData.get("requestId") as string;

  if (!requestId) {
    return { error: "Missing request details." };
  }

  try {
    const supabase = await requireAdmin();

    const { error } = await supabase
      .from("deposit_requests")
      .update({ status: "rejected", reviewed_at: new Date().toISOString() })
      .eq("id", requestId);

    if (error) return { error: "Failed to update the deposit request." };

    revalidatePath("/admin/deposits");
    return { error: null, success: true };
  } catch {
    return { error: "You are not authorized to perform this action." };
  }
}

export async function approveWithdrawalAction(
  _prevState: AdminActionState,
  formData: FormData
): Promise<AdminActionState> {
  const requestId = formData.get("requestId") as string;
  const targetUserId = formData.get("userId") as string;
  const amount = parseFloat(formData.get("amount") as string);

  if (!requestId || !targetUserId || !amount) {
    return { error: "Missing request details." };
  }

  try {
    const supabase = await requireAdmin();

    const { data: account, error: fetchError } = await supabase
      .from("accounts")
      .select("available_balance, total_withdrawals")
      .eq("user_id", targetUserId)
      .single();

    if (fetchError || !account) return { error: "Could not load that user's account." };

    // Re-check sufficiency at approval time — the real safety net, since
    // the balance may have moved since the request was submitted.
    if (parseFloat(account.available_balance) < amount) {
      return { error: "This user's balance is no longer sufficient for this withdrawal." };
    }

    const newBalance =
      Math.round((parseFloat(account.available_balance) - amount) * 100) / 100;
    const newWithdrawals =
      Math.round((parseFloat(account.total_withdrawals) + amount) * 100) / 100;

    const { error: accountError } = await supabase
      .from("accounts")
      .update({
        available_balance: newBalance,
        total_withdrawals: newWithdrawals,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", targetUserId);

    if (accountError) return { error: "Failed to update account balance." };

    const { error: requestError } = await supabase
      .from("withdrawal_requests")
      .update({ status: "approved", reviewed_at: new Date().toISOString() })
      .eq("id", requestId);

    if (requestError) return { error: "Failed to update the withdrawal request." };

    await supabase.from("transactions").insert({
      user_id: targetUserId,
      type: "withdrawal",
      amount,
      method: "manual_review",
      status: "completed",
    });

    revalidatePath("/admin/withdrawals");
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/withdraw");
    return { error: null, success: true };
  } catch {
    return { error: "You are not authorized to perform this action." };
  }
}

export async function rejectWithdrawalAction(
  _prevState: AdminActionState,
  formData: FormData
): Promise<AdminActionState> {
  const requestId = formData.get("requestId") as string;

  if (!requestId) {
    return { error: "Missing request details." };
  }

  try {
    const supabase = await requireAdmin();

    const { error } = await supabase
      .from("withdrawal_requests")
      .update({ status: "rejected", reviewed_at: new Date().toISOString() })
      .eq("id", requestId);

    if (error) return { error: "Failed to update the withdrawal request." };

    revalidatePath("/admin/withdrawals");
    return { error: null, success: true };
  } catch {
    return { error: "You are not authorized to perform this action." };
  }
}
