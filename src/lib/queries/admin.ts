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

export type PendingDepositRequest = {
  id: string;
  user_id: string;
  amount: string;
  method: "crypto" | "bank";
  proof_storage_path: string;
  created_at: string;
  signedUrl: string | null;
  userEmail: string;
};

/**
 * Fetches all pending deposit requests for the admin review queue, along
 * with a short-lived signed URL for each proof-of-payment file.
 */
export async function getPendingDepositRequests(): Promise<PendingDepositRequest[]> {
  const supabase = await createClient();

  const { data: requests } = await supabase
    .from("deposit_requests")
    .select("id, user_id, amount, method, proof_storage_path, created_at")
    .eq("status", "pending")
    .order("created_at", { ascending: true });

  if (!requests || requests.length === 0) return [];

  const userIds = requests.map((r) => r.user_id);
  const { data: accounts } = await supabase
    .from("accounts")
    .select("user_id, email")
    .in("user_id", userIds);

  const emailByUserId = new Map(accounts?.map((a) => [a.user_id, a.email]) ?? []);

  const results: PendingDepositRequest[] = [];

  for (const request of requests) {
    const { data: signed } = await supabase.storage
      .from("deposit-proofs")
      .createSignedUrl(request.proof_storage_path, 60 * 5); // 5 minute link

    results.push({
      ...request,
      signedUrl: signed?.signedUrl ?? null,
      userEmail: emailByUserId.get(request.user_id) ?? request.user_id,
    });
  }

  return results;
}

export type PendingWithdrawalRequest = {
  id: string;
  user_id: string;
  amount: string;
  method: "bank" | "crypto";
  bank_account_name: string | null;
  bank_account_number: string | null;
  bank_name: string | null;
  bank_swift: string | null;
  crypto_address: string | null;
  crypto_network: string | null;
  created_at: string;
  userEmail: string;
};

/**
 * Fetches all pending withdrawal requests for the admin review queue,
 * with the destination details attached (bank details or crypto address)
 * so the admin can actually see where funds need to go.
 */
export async function getPendingWithdrawalRequests(): Promise<PendingWithdrawalRequest[]> {
  const supabase = await createClient();

  const { data: requests } = await supabase
    .from("withdrawal_requests")
    .select(
      "id, user_id, amount, method, bank_account_name, bank_account_number, bank_name, bank_swift, crypto_address, crypto_network, created_at"
    )
    .eq("status", "pending")
    .order("created_at", { ascending: true });

  if (!requests || requests.length === 0) return [];

  const userIds = requests.map((r) => r.user_id);
  const { data: accounts } = await supabase
    .from("accounts")
    .select("user_id, email")
    .in("user_id", userIds);

  const emailByUserId = new Map(accounts?.map((a) => [a.user_id, a.email]) ?? []);

  return requests.map((request) => ({
    ...request,
    userEmail: emailByUserId.get(request.user_id) ?? request.user_id,
  }));
}
