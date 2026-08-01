import { createClient } from "@/lib/supabase/server";

export type PendingKycSubmission = {
  id: string;
  user_id: string;
  document_type: "passport" | "national_id" | "drivers_license";
  storage_path: string;
  submitted_at: string;
  signedUrl: string | null;
  userEmail: string;
};

/** Returns true if the currently logged-in user has admin privileges. */
export async function isCurrentUserAdmin(): Promise<boolean> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return false;

  const { data } = await supabase
    .from("accounts")
    .select("is_admin")
    .eq("user_id", user.id)
    .single();

  return data?.is_admin === true;
}

/**
 * Fetches all pending KYC submissions for the admin review queue, along
 * with a short-lived signed URL for each document so admins can view it
 * without the file ever becoming public.
 */
export async function getPendingKycSubmissions(): Promise<PendingKycSubmission[]> {
  const supabase = await createClient();

  const { data: submissions } = await supabase
    .from("kyc_submissions")
    .select("id, user_id, document_type, storage_path, submitted_at")
    .eq("status", "pending")
    .order("submitted_at", { ascending: true });

  if (!submissions || submissions.length === 0) return [];

  const userIds = submissions.map((s) => s.user_id);
  const { data: accounts } = await supabase
    .from("accounts")
    .select("user_id, email")
    .in("user_id", userIds);

  const emailByUserId = new Map(accounts?.map((a) => [a.user_id, a.email]) ?? []);

  const results: PendingKycSubmission[] = [];

  for (const submission of submissions) {
    const { data: signed } = await supabase.storage
      .from("kyc-documents")
      .createSignedUrl(submission.storage_path, 60 * 5); // 5 minute link

    results.push({
      ...submission,
      signedUrl: signed?.signedUrl ?? null,
      userEmail: emailByUserId.get(submission.user_id) ?? submission.user_id,
    });
  }

  return results;
}
