-- Run this in your Supabase project's SQL Editor, after 001-005.
-- Ledger table for deposit/withdrawal history. Demo/portfolio only —
-- no real payment processor is connected; deposits and withdrawals only
-- ever update rows in `accounts` and `transactions`.

create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  type text not null check (type in ('deposit', 'withdrawal')),
  amount numeric(14, 2) not null check (amount > 0),
  method text not null default 'demo',
  status text not null default 'completed' check (status in ('completed', 'pending', 'failed')),
  created_at timestamptz not null default now()
);

alter table public.transactions enable row level security;

create policy "Users can view their own transactions"
  on public.transactions for select
  using (auth.uid() = user_id);

create policy "Users can insert their own transactions"
  on public.transactions for insert
  with check (auth.uid() = user_id);
