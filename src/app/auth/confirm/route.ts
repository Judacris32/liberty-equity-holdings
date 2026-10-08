import { NextResponse, type NextRequest } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";

// The password reset email links straight here with a one-time token_hash.
// verifyOtp signs the user in on whatever browser or device opens the link
// (unlike the ?code= flow, which only works in the browser that asked for it),
// then we send them on to ?next=, i.e. /reset-password.
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const nextParam = searchParams.get("next") ?? (type === "recovery" ? "/reset-password" : "/dashboard");
  const next = nextParam.startsWith("/") && !nextParam.startsWith("//") ? nextParam : "/dashboard";

  if (tokenHash && type) {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash });
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
    console.error("[auth/confirm] verifyOtp:", error.message);
  }

  const fallback = type === "recovery" || next === "/reset-password" ? "/forgot-password" : "/login";
  return NextResponse.redirect(`${origin}${fallback}?error=link_expired`);
}
