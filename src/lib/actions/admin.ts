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
