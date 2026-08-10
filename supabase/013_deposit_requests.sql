-- Run this in your Supabase project's SQL Editor, after 001-012.
--
-- Replaces instant simulated deposits with a review-based flow, mirroring
-- the KYC submission pattern: a user submits a claimed amount plus a
-- proof-of-payment screenshot, an admin reviews it, and the balance only
-- changes on approval. Uses the same private-bucket + per-user-folder
-- RLS pattern as kyc-documents.

create table if not exists public.deposit_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  amount numeric(14, 2) not null check (amount > 0),
  method text not null default 'crypto' check (method in ('crypto', 'bank')),
  proof_storage_path text not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  admin_note text,
  created_at timestamptz not null default now(),
  reviewed_at timestamptz
);

alter table public.deposit_requests enable row level security;

create policy "Users can view their own deposit requests"
  on public.deposit_requests for select
  using (auth.uid() = user_id);

create policy "Users can insert their own deposit requests"
  on public.deposit_requests for insert
  with check (auth.uid() = user_id);

-- Reuses the public.is_admin() helper from 007_fix_admin_rls_recursion.sql
-- to avoid the same recursive-policy trap.
create policy "Admins can view all deposit requests"
  on public.deposit_requests for select
  using (public.is_admin());

create policy "Admins can update deposit requests"
  on public.deposit_requests for update
  using (public.is_admin());

-- Private storage bucket for proof-of-payment screenshots.
insert into storage.buckets (id, name, public)
values ('deposit-proofs', 'deposit-proofs', false)
on conflict (id) do nothing;

create policy "Users can upload their own deposit proofs"
  on storage.objects for insert
  with check (
    bucket_id = 'deposit-proofs'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Users can view their own deposit proofs"
  on storage.objects for select
  using (
    bucket_id = 'deposit-proofs'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Admins can view all deposit proofs"
  on storage.objects for select
  using (
    bucket_id = 'deposit-proofs' and public.is_admin()
  );
