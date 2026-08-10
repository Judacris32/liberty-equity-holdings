"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { depositRequestSchema } from "@/lib/validations/deposit-request";

export type DepositRequestState = { error: string | null; success?: boolean };

/**
 * Submits a deposit request for admin review — mirrors the KYC upload
 * flow. This does NOT touch the account balance; that only happens when
 * an admin approves the request via approveDepositAction.
 */
export async function submitDepositRequest(
  _prevState: DepositRequestState,
  formData: FormData
): Promise<DepositRequestState> {
  const parsed = depositRequestSchema.safeParse({
    amount: formData.get("amount"),
    method: formData.get("method"),
    proof: formData.get("proof"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid submission." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to submit a deposit request." };
  }

  const { amount, method, proof } = parsed.data;
  const fileExt = proof.name.split(".").pop();
  const storagePath = `${user.id}/${Date.now()}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from("deposit-proofs")
    .upload(storagePath, proof, { upsert: false });

  if (uploadError) {
    return { error: "Upload failed. Please try again." };
  }

  const { error: insertError } = await supabase.from("deposit_requests").insert({
    user_id: user.id,
    amount,
    method,
    proof_storage_path: storagePath,
    status: "pending",
  });

  if (insertError) {
    return { error: "Could not submit your deposit request. Please try again." };
  }

  revalidatePath("/dashboard/deposit");

  return { error: null, success: true };
}
