-- Run this in your Supabase project's SQL Editor, after 001-015.
--
-- Moves crypto deposit addresses and bank transfer details out of
-- hardcoded source files into database tables an admin can manage from
-- /admin/deposit-settings — no code changes or redeploys required to
-- update a wallet address or bank account.

create table if not exists public.crypto_deposit_options (
  id uuid primary key default gen_random_uuid(),
  symbol text not null,
  network text not null,
  address text not null,
  display_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.bank_transfer_details (
  id uuid primary key default gen_random_uuid(),
  account_name text not null,
  account_number text not null,
  bank_name text not null,
  swift_bic text not null,
  routing_number text,
  iban text,
  is_active boolean not null default true,
  updated_at timestamptz not null default now()
);

alter table public.crypto_deposit_options enable row level security;
alter table public.bank_transfer_details enable row level security;

-- Any logged-in user can view active options (the deposit page is
-- already behind auth + KYC gating at the app level).
create policy "Authenticated users can view active crypto options"
  on public.crypto_deposit_options for select
  using (auth.role() = 'authenticated');

create policy "Authenticated users can view active bank details"
  on public.bank_transfer_details for select
  using (auth.role() = 'authenticated');

-- Only admins can manage them.
create policy "Admins can insert crypto options"
  on public.crypto_deposit_options for insert
  with check (public.is_admin());

create policy "Admins can update crypto options"
  on public.crypto_deposit_options for update
  using (public.is_admin());

create policy "Admins can delete crypto options"
  on public.crypto_deposit_options for delete
  using (public.is_admin());

create policy "Admins can insert bank details"
  on public.bank_transfer_details for insert
  with check (public.is_admin());

create policy "Admins can update bank details"
  on public.bank_transfer_details for update
  using (public.is_admin());

-- Seed with the same values that were previously hardcoded, so the
-- deposit page doesn't go blank the moment this migration runs. Edit or
-- delete these from /admin/deposit-settings whenever you're ready.
insert into public.crypto_deposit_options (symbol, network, address, display_order)
values
  ('BTC', 'Bitcoin', 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', 1),
  ('ETH', 'Ethereum (ERC-20)', '0x71C7656EC7ab88b098defB751B7401B5f6d8976', 2),
  ('USDT', 'Tron (TRC-20)', 'TXYZopYRdj2D9XRtbG411XZZ3kM5VkAeBf', 3)
on conflict do nothing;

insert into public.bank_transfer_details (account_name, account_number, bank_name, swift_bic, routing_number)
values ('Liberty Equity Holdings Ltd', '0123456789', 'First Atlantic Bank', 'FABKUS33XXX', '021000021')
on conflict do nothing;
