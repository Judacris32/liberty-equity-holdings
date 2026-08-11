"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { withdrawalRequestSchema } from "@/lib/validations/withdrawal-request";
import { toCents } from "@/lib/money";

export type WithdrawalRequestState = { error: string | null; success?: boolean };

/**
 * Submits a withdrawal request for admin review. Does NOT deduct the
 * balance yet — that only happens when an admin approves it via
 * approveWithdrawalAction. We do check the balance is sufficient right
 * now so people can't request more than they have, but a fast sequence
 * of multiple pending requests could still, in principle, add up to more
 * than the balance covers by the time they're reviewed — the admin
 * approval step re-checks this as the actual safety net.
 */
export async function submitWithdrawalRequest(
  _prevState: WithdrawalRequestState,
  formData: FormData
): Promise<WithdrawalRequestState> {
  const method = formData.get("method");

  const raw =
    method === "bank"
      ? {
          method: "bank" as const,
          amount: formData.get("amount"),
          bankAccountName: formData.get("bankAccountName"),
          bankAccountNumber: formData.get("bankAccountNumber"),
          bankName: formData.get("bankName"),
          bankSwift: formData.get("bankSwift"),
        }
      : {
          method: "crypto" as const,
          amount: formData.get("amount"),
          cryptoAddress: formData.get("cryptoAddress"),
          cryptoNetwork: formData.get("cryptoNetwork"),
        };

  const parsed = withdrawalRequestSchema.safeParse(raw);

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid submission." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to request a withdrawal." };
  }

  const { data: account, error: accountError } = await supabase
    .from("accounts")
    .select("available_balance")
    .eq("user_id", user.id)
    .single();

  if (accountError || !account) {
    return { error: "Could not load your account. Please refresh and try again." };
  }

  if (toCents(parsed.data.amount) > toCents(account.available_balance)) {
    return { error: "Withdrawal amount exceeds your available balance." };
  }

  const insertData = {
    user_id: user.id,
    amount: parsed.data.amount,
    method: parsed.data.method,
    bank_account_name: parsed.data.method === "bank" ? parsed.data.bankAccountName : null,
    bank_account_number:
      parsed.data.method === "bank" ? parsed.data.bankAccountNumber : null,
    bank_name: parsed.data.method === "bank" ? parsed.data.bankName : null,
    bank_swift: parsed.data.method === "bank" ? parsed.data.bankSwift : null,
    crypto_address: parsed.data.method === "crypto" ? parsed.data.cryptoAddress : null,
    crypto_network: parsed.data.method === "crypto" ? parsed.data.cryptoNetwork : null,
  };

  const { error: insertError } = await supabase
    .from("withdrawal_requests")
    .insert(insertData);

  if (insertError) {
    return { error: "Could not submit your withdrawal request. Please try again." };
  }

  revalidatePath("/dashboard/withdraw");

  return { error: null, success: true };
}
