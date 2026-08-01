-- Run this in your Supabase project's SQL Editor, after 003.
-- Tracks KYC document submissions (audit trail), separate from the
-- current status flag on `accounts.kyc_status`.

create table if not exists public.kyc_submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  document_type text not null check (document_type in ('passport', 'national_id', 'drivers_license')),
  storage_path text not null,
  status text not null default 'pending' check (status in ('pending', 'verified', 'rejected')),
  submitted_at timestamptz not null default now()
);

alter table public.kyc_submissions enable row level security;

create policy "Users can view their own KYC submissions"
  on public.kyc_submissions for select
  using (auth.uid() = user_id);

create policy "Users can insert their own KYC submissions"
  on public.kyc_submissions for insert
  with check (auth.uid() = user_id);
