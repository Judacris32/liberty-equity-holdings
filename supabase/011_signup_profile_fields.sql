-- Run this in your Supabase project's SQL Editor, after 001-010.
--
-- Adds phone, date_of_birth, and country, captured at signup. date_of_birth
-- is used to enforce a minimum trading age (validated client + server
-- side at signup — 18+), consistent with standard brokerage onboarding.

alter table public.accounts
  add column if not exists phone text,
  add column if not exists date_of_birth date,
  add column if not exists country text;

create or replace function public.handle_new_user_account()
returns trigger as $$
begin
  insert into public.accounts (
    user_id, email, account_type, phone, date_of_birth, country,
    available_balance, total_profit, total_deposits, total_withdrawals
  )
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'account_type', 'basic'),
    new.raw_user_meta_data->>'phone',
    nullif(new.raw_user_meta_data->>'date_of_birth', '')::date,
    new.raw_user_meta_data->>'country',
    12480.32, 2140.18, 15000.00, 4659.86
  );
  return new;
end;
$$ language plpgsql security definer;
