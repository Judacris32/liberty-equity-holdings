-- Run this in your Supabase project's SQL Editor, after 001-014.
--
-- Replaces instant simulated withdrawals with a review-based flow,
-- mirroring deposit_requests: a user submits an amount plus where they
-- want it sent (bank account or crypto wallet), an admin reviews it, and
-- the balance only changes on approval.

create table if not exists public.withdrawal_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  amount numeric(14, 2) not null check (amount > 0),
  method text not null check (method in ('bank', 'crypto')),

  -- Populated when method = 'bank'
  bank_account_name text,
  bank_account_number text,
  bank_name text,
  bank_swift text,

  -- Populated when method = 'crypto'
  crypto_address text,
  crypto_network text,

  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  admin_note text,
  created_at timestamptz not null default now(),
  reviewed_at timestamptz
);

alter table public.withdrawal_requests enable row level security;

create policy "Users can view their own withdrawal requests"
  on public.withdrawal_requests for select
  using (auth.uid() = user_id);

create policy "Users can insert their own withdrawal requests"
  on public.withdrawal_requests for insert
  with check (auth.uid() = user_id);

create policy "Admins can view all withdrawal requests"
  on public.withdrawal_requests for select
  using (public.is_admin());

create policy "Admins can update withdrawal requests"
  on public.withdrawal_requests for update
  using (public.is_admin());
