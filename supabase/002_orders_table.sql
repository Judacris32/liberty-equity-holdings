-- Run this in your Supabase project's SQL Editor, after 001_accounts_table.sql.
-- Stores simulated trade orders for the demo trading terminal.
--
-- This is a DEMO/PORTFOLIO feature: orders are simulated with a randomized
-- outcome server-side (see placeOrderAction) and only ever affect the
-- `accounts` table's demo balances — no real exchange or broker is
-- connected, so no real trades are executed and no real money moves.

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  symbol text not null,
  side text not null check (side in ('buy', 'sell')),
  amount numeric(14, 2) not null check (amount > 0),
  speed text not null check (speed in ('standard', 'instant')),
  pnl numeric(14, 2) not null default 0,
  status text not null default 'filled' check (status in ('filled', 'rejected')),
  created_at timestamptz not null default now()
);

alter table public.orders enable row level security;

create policy "Users can view their own orders"
  on public.orders for select
  using (auth.uid() = user_id);

create policy "Users can insert their own orders"
  on public.orders for insert
  with check (auth.uid() = user_id);
