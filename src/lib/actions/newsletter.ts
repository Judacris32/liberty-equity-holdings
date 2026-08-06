"use server";

import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

const emailSchema = z.string().email("Enter a valid email address");

export type NewsletterState = { error: string | null; success?: boolean };

export async function subscribeToNewsletter(
  _prevState: NewsletterState,
  formData: FormData
): Promise<NewsletterState> {
  const parsed = emailSchema.safeParse(formData.get("email"));

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid email." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("newsletter_subscribers")
    .insert({ email: parsed.data.toLowerCase().trim() });

  if (error) {
    // Unique constraint violation — already subscribed. Treat as success
    // rather than showing an error for what the user experiences as a
    // non-problem.
    if (error.code === "23505") {
      return { error: null, success: true };
    }
    return { error: "Something went wrong. Please try again." };
  }

  return { error: null, success: true };
}
