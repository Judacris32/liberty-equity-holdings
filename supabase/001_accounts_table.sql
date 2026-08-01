-- Run this in your Supabase project's SQL Editor (Database -> SQL Editor)
-- Creates a per-user "accounts" table holding portfolio metrics.
--
-- These are DEMO/PORTFOLIO values only. Deposit/withdrawal buttons (added
-- in a later section) will only ever update rows in this table — no real
-- payment processor is connected, so no real money moves.

create table if not exists public.accounts (
  user_id uuid primary key references auth.users(id) on delete cascade,
  available_balance numeric(14, 2) not null default 0,
  total_profit numeric(14, 2) not null default 0,
  total_deposits numeric(14, 2) not null default 0,
  total_withdrawals numeric(14, 2) not null default 0,
  kyc_status text not null default 'unverified' check (kyc_status in ('unverified', 'pending', 'verified')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.accounts enable row level security;

-- Users can only ever read/update their own account row.
create policy "Users can view their own account"
  on public.accounts for select
  using (auth.uid() = user_id);

create policy "Users can update their own account"
  on public.accounts for update
  using (auth.uid() = user_id);

-- Auto-create an account row (with starter demo balances) whenever a new
-- user signs up, so the dashboard always has data to display.
create or replace function public.handle_new_user_account()
returns trigger as $$
begin
  insert into public.accounts (user_id, available_balance, total_profit, total_deposits, total_withdrawals)
  values (new.id, 12480.32, 2140.18, 15000.00, 4659.86);
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created_account on auth.users;
create trigger on_auth_user_created_account
  after insert on auth.users
  for each row execute procedure public.handle_new_user_account();
