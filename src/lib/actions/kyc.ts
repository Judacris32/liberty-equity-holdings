"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { kycUploadSchema } from "@/lib/validations/kyc";

export type KycUploadState = {
  error: string | null;
  success?: boolean;
};

/**
 * Handles a KYC document upload for demo/portfolio purposes.
 *
 * Uploads the file to the private `kyc-documents` Storage bucket (scoped
 * to the user's own folder via RLS), logs a row in `kyc_submissions`, and
 * flips `accounts.kyc_status` to "pending". No real identity verification
 * provider is connected — a real deployment would hand this off to a KYC
 * vendor (e.g. Persona, Onfido) for actual review.
 */
export async function submitKycAction(
  _prevState: KycUploadState,
  formData: FormData
): Promise<KycUploadState> {
  const parsed = kycUploadSchema.safeParse({
    documentType: formData.get("documentType"),
    file: formData.get("file"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid submission." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to submit KYC documents." };
  }

  const { documentType, file } = parsed.data;
  const fileExt = file.name.split(".").pop();
  const storagePath = `${user.id}/${documentType}-${Date.now()}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from("kyc-documents")
    .upload(storagePath, file, { upsert: false });

  if (uploadError) {
    return { error: "Upload failed. Please try again." };
  }

  const { error: submissionError } = await supabase.from("kyc_submissions").insert({
    user_id: user.id,
    document_type: documentType,
    storage_path: storagePath,
    status: "pending",
  });

  if (submissionError) {
    return { error: "Could not record your submission. Please try again." };
  }

  const { error: accountError } = await supabase
    .from("accounts")
    .update({ kyc_status: "pending", updated_at: new Date().toISOString() })
    .eq("user_id", user.id);

  if (accountError) {
    return { error: "Uploaded, but couldn't update your status. Contact support." };
  }

  revalidatePath("/dashboard/kyc");
  revalidatePath("/dashboard");

  return { error: null, success: true };
}
