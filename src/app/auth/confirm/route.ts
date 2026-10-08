import { NextResponse, type NextRequest } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";

// Password reset links land here. Supabase's default email (used on the free
// plan, where templates can't be edited) arrives with ?code=, which is
// exchanged for a session; a custom template can send ?token_hash= instead.
// Either way the user is signed in and sent on to ?next= (/reset-password).
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  // The only email links this app sends are password resets, so that's the
  // default destination when ?next= isn't present.
  const nextParam = searchParams.get("next") ?? "/reset-password";
  const next = nextParam.startsWith("/") && !nextParam.startsWith("//") ? nextParam : "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
    console.error("[auth/confirm] exchangeCodeForSession:", error.message);
    return NextResponse.redirect(`${origin}/forgot-password?error=link_expired`);
  }

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
