import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

// The "bouncer": runs server-side on every matched request, refreshes the
// Supabase session, and redirects unauthenticated users away from
// /dashboard/* before any protected page ever renders.
export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static, _next/image (static assets)
     * - favicon.ico
     * - public image/font files
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
