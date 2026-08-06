-- Run this in your Supabase project's SQL Editor, after 001-007.
--
-- Stores newsletter signups from the footer form. Public-facing (no
-- login required to subscribe), so this allows anonymous inserts —
-- scoped strictly to insert-only, no read/update/delete from the client.

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  subscribed_at timestamptz not null default now()
);

alter table public.newsletter_subscribers enable row level security;

-- Anyone can subscribe (insert), but nobody can read the list back
-- through the client — that would leak every subscriber's email to
-- whoever inspects network requests.
create policy "Anyone can subscribe"
  on public.newsletter_subscribers for insert
  with check (true);
