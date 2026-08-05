-- Run this in your Supabase project's SQL Editor, after 001-006.
--
-- Fixes "infinite recursion detected in policy for relation accounts".
-- The admin policies added in 005_admin_role.sql check `is_admin` by
-- querying `public.accounts` from inside a policy defined ON
-- `public.accounts` — Postgres has to re-evaluate that same policy to
-- resolve the subquery, which triggers the subquery again, recursively.
--
-- The fix: move the admin check into a SECURITY DEFINER function, which
-- runs with elevated privileges and bypasses RLS for this one internal
-- lookup, breaking the recursive loop. This is the standard fix for this
-- exact pattern.

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select coalesce(
    (select is_admin from public.accounts where user_id = auth.uid()),
    false
  );
$$;

drop policy if exists "Admins can view all accounts" on public.accounts;
create policy "Admins can view all accounts"
  on public.accounts for select
  using (public.is_admin());

drop policy if exists "Admins can update any account" on public.accounts;
create policy "Admins can update any account"
  on public.accounts for update
  using (public.is_admin());

drop policy if exists "Admins can view all KYC submissions" on public.kyc_submissions;
create policy "Admins can view all KYC submissions"
  on public.kyc_submissions for select
  using (public.is_admin());

drop policy if exists "Admins can update KYC submissions" on public.kyc_submissions;
create policy "Admins can update KYC submissions"
  on public.kyc_submissions for update
  using (public.is_admin());

drop policy if exists "Admins can view all KYC documents" on storage.objects;
create policy "Admins can view all KYC documents"
  on storage.objects for select
  using (
    bucket_id = 'kyc-documents' and public.is_admin()
  );