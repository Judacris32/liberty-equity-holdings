import { createBrowserClient } from "@supabase/ssr";

/**
 * Supabase client for use in Client Components ("use client").
 * Session is persisted via cookies (handled by @supabase/ssr), never
 * localStorage, so it's protected against XSS token theft.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
