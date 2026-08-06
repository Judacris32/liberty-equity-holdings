"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const messageSchema = z.object({
  name: z.string().max(100).optional(),
  email: z.string().email("Enter a valid email address"),
  message: z.string().min(5, "Say a bit more so we can help").max(2000),
});

export type SupportMessageState = { error: string | null; success?: boolean };

export async function submitSupportMessage(
  _prevState: SupportMessageState,
  formData: FormData
): Promise<SupportMessageState> {
  const parsed = messageSchema.safeParse({
    name: formData.get("name") || undefined,
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Please check your message." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase.from("support_messages").insert({
    user_id: user?.id ?? null,
    name: parsed.data.name,
    email: parsed.data.email,
    message: parsed.data.message,
  });

  if (error) {
    return { error: "Couldn't send your message. Please try again." };
  }

  return { error: null, success: true };
}
