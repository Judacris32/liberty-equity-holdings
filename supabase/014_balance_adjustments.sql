-- Run this in your Supabase project's SQL Editor, after 001-013.
--
-- Lets an admin manually credit or debit a user's balance outside the
-- normal deposit/withdrawal request flow — for corrections, goodwill
-- credits, etc. Every adjustment requires a reason and is logged in its
-- own audit table (who did it, to whom, how much, why), plus mirrored
-- into `transactions` so the user can see it in their own history too.
--
-- Adjustments flow through total_profit (not total_deposits or
-- total_withdrawals), the same bucket trading P&L already uses — this
-- keeps "Total Deposit" and "Total Withdraw" meaning exactly what they
-- say: money the user actually deposited or withdrew through the real
-- request flow, nothing else.

create table if not exists public.balance_adjustments (
  id uuid primary key default gen_random_uuid(),
  admin_id uuid not null references auth.users(id) on delete set null,
  user_id uuid not null references auth.users(id) on delete cascade,
  amount numeric(14, 2) not null, -- signed: positive = credit, negative = debit
  reason text not null,
  created_at timestamptz not null default now()
);

alter table public.balance_adjustments enable row level security;

create policy "Users can view their own balance adjustments"
  on public.balance_adjustments for select
  using (auth.uid() = user_id);

create policy "Admins can view all balance adjustments"
  on public.balance_adjustments for select
  using (public.is_admin());

create policy "Admins can insert balance adjustments"
  on public.balance_adjustments for insert
  with check (public.is_admin());

-- A reason column on transactions so adjustments (and anything else that
-- needs one) can carry a human-readable note, visible to the user.
alter table public.transactions
  add column if not exists note text;
