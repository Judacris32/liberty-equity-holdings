-- Run this in your Supabase project's SQL Editor, after 001-011.
--
-- Changes the sign-up trigger so new accounts start at genuine $0.00
-- across the board, instead of pre-seeded demo balances. Showing a brand
-- new user money they never deposited is exactly the kind of "phantom
-- balance" pattern used to make scam platforms look enticing — even
-- though nothing dishonest was happening mechanically here, it's the
-- wrong signal for a real user's first impression.
--
-- This only affects future signups. Existing accounts keep their current
-- balances unless you explicitly zero them out too (see the commented
-- block at the bottom).

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
    0, 0, 0, 0
  );
  return new;
end;
$$ language plpgsql security definer;

-- ---------------------------------------------------------------------
-- Optional: to reset your own existing test accounts to $0 too, run:
--
--   update public.accounts
--   set available_balance = 0, total_profit = 0,
--       total_deposits = 0, total_withdrawals = 0
--   where email in ('judacrisjudedev@gmail.com', 'rajodele6@gmail.com');
-- ---------------------------------------------------------------------