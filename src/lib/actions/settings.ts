"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { profileSchema, passwordSchema } from "@/lib/validations/settings";

export type SettingsActionState = { error: string | null; success?: boolean };

export async function updateProfileAction(
  _prevState: SettingsActionState,
  formData: FormData
): Promise<SettingsActionState> {
  const parsed = profileSchema.safeParse({ fullName: formData.get("fullName") });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid name." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({
    data: { full_name: parsed.data.fullName },
  });

  if (error) return { error: "Failed to update profile. Please try again." };

  revalidatePath("/dashboard/settings");
  return { error: null, success: true };
}

export async function updatePasswordAction(
  _prevState: SettingsActionState,
  formData: FormData
): Promise<SettingsActionState> {
  const parsed = passwordSchema.safeParse({
    newPassword: formData.get("newPassword"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid password." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({
    password: parsed.data.newPassword,
  });

  if (error) return { error: "Failed to update password. Please try again." };

  return { error: null, success: true };
}
