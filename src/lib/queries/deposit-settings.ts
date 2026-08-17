import { createClient } from "@/lib/supabase/server";

export type CryptoDepositOption = {
  id: string;
  symbol: string;
  network: string;
  address: string;
  display_order: number;
  is_active: boolean;
};

export type BankTransferDetails = {
  id: string;
  account_name: string;
  account_number: string;
  bank_name: string;
  swift_bic: string;
  routing_number: string | null;
  iban: string | null;
};

export async function getCryptoDepositOptions(): Promise<CryptoDepositOption[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("crypto_deposit_options")
    .select("id, symbol, network, address, display_order, is_active")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  return (data as CryptoDepositOption[]) ?? [];
}

export async function getBankTransferDetails(): Promise<BankTransferDetails | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("bank_transfer_details")
    .select("id, account_name, account_number, bank_name, swift_bic, routing_number, iban")
    .eq("is_active", true)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  return data as BankTransferDetails | null;
}

// Admin-facing: fetches everything (including inactive) for management.
export async function getAllCryptoDepositOptions(): Promise<CryptoDepositOption[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("crypto_deposit_options")
    .select("id, symbol, network, address, display_order, is_active")
    .order("display_order", { ascending: true });

  return (data as CryptoDepositOption[]) ?? [];
}
