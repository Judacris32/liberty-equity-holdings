-- Run this in your Supabase project's SQL Editor, after 001-004.
-- Adds an admin role flag and RLS policies allowing admins to review and
-- act on every user's KYC submissions and account status.

alter table public.accounts
  add column if not exists is_admin boolean not null default false;

-- Store the user's email directly on the account row so admin screens can
-- display it without needing Supabase's service-role admin API.
alter table public.accounts
  add column if not exists email text;

update public.accounts a
set email = u.email
from auth.users u
where a.user_id = u.id and a.email is null;

create or replace function public.handle_new_user_account()
returns trigger as $$
begin
  insert into public.accounts (user_id, email, available_balance, total_profit, total_deposits, total_withdrawals)
  values (new.id, new.email, 12480.32, 2140.18, 15000.00, 4659.86);
  return new;
end;
$$ language plpgsql security definer;


-- Admins can view every account (needed to check KYC status platform-wide).
create policy "Admins can view all accounts"
  on public.accounts for select
  using (
    exists (
      select 1 from public.accounts a
      where a.user_id = auth.uid() and a.is_admin = true
    )
  );

-- Admins can update any account's kyc_status (approve/reject KYC).
create policy "Admins can update any account"
  on public.accounts for update
  using (
    exists (
      select 1 from public.accounts a
      where a.user_id = auth.uid() and a.is_admin = true
    )
  );

-- Admins can view every KYC submission, not just their own.
create policy "Admins can view all KYC submissions"
  on public.kyc_submissions for select
  using (
    exists (
      select 1 from public.accounts a
      where a.user_id = auth.uid() and a.is_admin = true
    )
  );

-- Admins can update submission status (approve/reject).
create policy "Admins can update KYC submissions"
  on public.kyc_submissions for update
  using (
    exists (
      select 1 from public.accounts a
      where a.user_id = auth.uid() and a.is_admin = true
    )
  );

-- Admins can read any user's uploaded KYC document to review it.
create policy "Admins can view all KYC documents"
  on storage.objects for select
  using (
    bucket_id = 'kyc-documents'
    and exists (
      select 1 from public.accounts a
      where a.user_id = auth.uid() and a.is_admin = true
    )
  );

-- ---------------------------------------------------------------------
-- To make yourself an admin for testing, run this after creating your
-- account (replace with your own user_id from the auth.users table):
--
--   update public.accounts set is_admin = true where user_id = '<your-uuid>';
-- ---------------------------------------------------------------------
