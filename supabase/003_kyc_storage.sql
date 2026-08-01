-- Run this in your Supabase project's SQL Editor, after 001 and 002.
-- Sets up a private Storage bucket for KYC identity document uploads,
-- with strict per-user access policies.
--
-- Files are stored under a path of `${user_id}/${filename}` so RLS can
-- scope access to only the folder matching the uploader's own user id.
-- Nothing here performs real identity verification — it's a demo/portfolio
-- flow that stores the file and flips the account's kyc_status to
-- "pending" for review.

insert into storage.buckets (id, name, public)
values ('kyc-documents', 'kyc-documents', false)
on conflict (id) do nothing;

create policy "Users can upload their own KYC documents"
  on storage.objects for insert
  with check (
    bucket_id = 'kyc-documents'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Users can view their own KYC documents"
  on storage.objects for select
  using (
    bucket_id = 'kyc-documents'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Users can delete their own KYC documents"
  on storage.objects for delete
  using (
    bucket_id = 'kyc-documents'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
