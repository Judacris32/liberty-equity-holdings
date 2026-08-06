-- Run this in your Supabase project's SQL Editor, after 001-009.
--
-- Adds an account_type field, chosen at signup, that reflects who the
-- account is for (individual vs. business), not a return-tier or
-- investment package. Updates the signup trigger to read the selection
-- from auth metadata so it's captured automatically.

alter table public.accounts
  add column if not exists account_type text not null default 'basic'
  check (account_type in ('basic', 'standard', 'business'));

create or replace function public.handle_new_user_account()
returns trigger as $$
begin
  insert into public.accounts (
    user_id, email, account_type,
    available_balance, total_profit, total_deposits, total_withdrawals
  )
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'account_type', 'basic'),
    12480.32, 2140.18, 15000.00, 4659.86
  );
  return new;
end;
$$ language plpgsql security definer;
