-- Run this in your Supabase project's SQL Editor, after 001-008.
--
-- Stores messages submitted through the chat widget. This is a message
-- drop-box, not a live chat — there's no real-time agent on the other
-- end, so the widget is worded honestly ("we'll get back to you") rather
-- than implying an instant live response that doesn't exist.

create table if not exists public.support_messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  name text,
  email text not null,
  message text not null,
  status text not null default 'open' check (status in ('open', 'resolved')),
  created_at timestamptz not null default now()
);

alter table public.support_messages enable row level security;

-- Anyone can submit a message (logged in or not), but only the sender
-- (if logged in) can read their own — nobody can browse the full inbox
-- through the client.
create policy "Anyone can submit a support message"
  on public.support_messages for insert
  with check (true);

create policy "Users can view their own support messages"
  on public.support_messages for select
  using (auth.uid() = user_id);
