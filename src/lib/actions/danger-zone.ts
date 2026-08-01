"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type DeleteAccountState = { error: string | null };

/**
 * Deletes the current user's application data (accounts, orders,
 * transactions, kyc_submissions rows and their uploaded KYC documents)
 * and signs them out.
 *
 * Note: this does NOT delete the underlying Supabase Auth user record.
 * Doing that requires the `supabase.auth.admin.deleteUser` API, which
 * needs a service-role key that must never be exposed to the client or
 * used from a browser-reachable server action in a portfolio deployment.
 * In a real production app, this would call a secured backend endpoint
 * (e.g. a Supabase Edge Function using the service role key) to fully
 * remove the auth account as well.
 */
export async function deleteAccountDataAction(
  _prevState: DeleteAccountState,
  formData: FormData
): Promise<DeleteAccountState> {
  const confirmation = formData.get("confirmation");
  if (confirmation !== "DELETE") {
    return { error: 'Type "DELETE" to confirm.' };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in." };
  }

  // Remove uploaded KYC documents from Storage first.
  const { data: submissions } = await supabase
    .from("kyc_submissions")
    .select("storage_path")
    .eq("user_id", user.id);

  if (submissions && submissions.length > 0) {
    await supabase.storage
      .from("kyc-documents")
      .remove(submissions.map((s) => s.storage_path));
  }

  await supabase.from("kyc_submissions").delete().eq("user_id", user.id);
  await supabase.from("orders").delete().eq("user_id", user.id);
  await supabase.from("transactions").delete().eq("user_id", user.id);
  await supabase.from("accounts").delete().eq("user_id", user.id);

  await supabase.auth.signOut();
  redirect("/");
}
