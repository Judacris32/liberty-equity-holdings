import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Supabase sends users here from the email link with a one-time ?code=.
// Exchanging it signs them in, then we forward them to ?next= (for a
// password reset, that's /reset-password).
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  const nextParam = searchParams.get("next") ?? "/dashboard";
  // Only allow internal paths, never an external redirect.
  const next = nextParam.startsWith("/") && !nextParam.startsWith("//") ? nextParam : "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
    console.error("[auth/callback] exchangeCodeForSession:", error.message);
  }

  // Supabase reports bad or expired email links as ?error_code=otp_expired
  // (or similar); those are almost always password resets.
  const errorCode = searchParams.get("error_code");
  const fallback =
    next === "/reset-password" || errorCode?.startsWith("otp") ? "/forgot-password" : "/login";
  return NextResponse.redirect(`${origin}${fallback}?error=link_expired`);
}
