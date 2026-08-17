"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { isCurrentUserAdmin } from "@/lib/queries/admin";
import { cryptoOptionSchema, bankDetailsSchema } from "@/lib/validations/deposit-settings";

async function requireAdmin() {
  const isAdmin = await isCurrentUserAdmin();
  if (!isAdmin) {
    throw new Error("Not authorized.");
  }
  return createClient();
}

export type SettingsActionState = { error: string | null; success?: boolean };

export async function upsertCryptoOptionAction(
  _prevState: SettingsActionState,
  formData: FormData
): Promise<SettingsActionState> {
  const id = formData.get("id") as string | null;

  const parsed = cryptoOptionSchema.safeParse({
    symbol: formData.get("symbol"),
    network: formData.get("network"),
    address: formData.get("address"),
    displayOrder: formData.get("displayOrder"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid submission." };
  }

  try {
    const supabase = await requireAdmin();

    const payload = {
      symbol: parsed.data.symbol.toUpperCase(),
      network: parsed.data.network,
      address: parsed.data.address,
      display_order: parsed.data.displayOrder,
      updated_at: new Date().toISOString(),
    };

    const { error } = id
      ? await supabase.from("crypto_deposit_options").update(payload).eq("id", id)
      : await supabase.from("crypto_deposit_options").insert(payload);

    if (error) return { error: "Failed to save the crypto option." };

    revalidatePath("/admin/deposit-settings");
    revalidatePath("/dashboard/deposit");
    return { error: null, success: true };
  } catch {
    return { error: "You are not authorized to perform this action." };
  }
}

export async function toggleCryptoOptionActiveAction(
  _prevState: SettingsActionState,
  formData: FormData
): Promise<SettingsActionState> {
  const id = formData.get("id") as string;
  const isActive = formData.get("isActive") === "true";

  if (!id) return { error: "Missing option id." };

  try {
    const supabase = await requireAdmin();

    const { error } = await supabase
      .from("crypto_deposit_options")
      .update({ is_active: !isActive, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) return { error: "Failed to update the option." };

    revalidatePath("/admin/deposit-settings");
    revalidatePath("/dashboard/deposit");
    return { error: null, success: true };
  } catch {
    return { error: "You are not authorized to perform this action." };
  }
}

export async function deleteCryptoOptionAction(
  _prevState: SettingsActionState,
  formData: FormData
): Promise<SettingsActionState> {
  const id = formData.get("id") as string;

  if (!id) return { error: "Missing option id." };

  try {
    const supabase = await requireAdmin();

    const { error } = await supabase.from("crypto_deposit_options").delete().eq("id", id);

    if (error) return { error: "Failed to delete the option." };

    revalidatePath("/admin/deposit-settings");
    revalidatePath("/dashboard/deposit");
    return { error: null, success: true };
  } catch {
    return { error: "You are not authorized to perform this action." };
  }
}

export async function updateBankDetailsAction(
  _prevState: SettingsActionState,
  formData: FormData
): Promise<SettingsActionState> {
  const id = formData.get("id") as string | null;

  const parsed = bankDetailsSchema.safeParse({
    accountName: formData.get("accountName"),
    accountNumber: formData.get("accountNumber"),
    bankName: formData.get("bankName"),
    swiftBic: formData.get("swiftBic"),
    routingNumber: formData.get("routingNumber") || undefined,
    iban: formData.get("iban") || undefined,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid submission." };
  }

  try {
    const supabase = await requireAdmin();

    const payload = {
      account_name: parsed.data.accountName,
      account_number: parsed.data.accountNumber,
      bank_name: parsed.data.bankName,
      swift_bic: parsed.data.swiftBic,
      routing_number: parsed.data.routingNumber ?? null,
      iban: parsed.data.iban ?? null,
      is_active: true,
      updated_at: new Date().toISOString(),
    };

    const { error } = id
      ? await supabase.from("bank_transfer_details").update(payload).eq("id", id)
      : await supabase.from("bank_transfer_details").insert(payload);

    if (error) return { error: "Failed to save bank details." };

    revalidatePath("/admin/deposit-settings");
    revalidatePath("/dashboard/deposit");
    return { error: null, success: true };
  } catch {
    return { error: "You are not authorized to perform this action." };
  }
}
