-- Remove permissive public INSERT policies. Inserts happen server-side via service role (bypasses RLS).
DROP POLICY IF EXISTS "anyone can insert leads" ON public.country_leads;
DROP POLICY IF EXISTS "anyone can create blogs" ON public.blogs;

-- Revoke direct write privileges from anon/authenticated; reads on blogs remain public via existing SELECT policy.
REVOKE INSERT, UPDATE, DELETE ON public.country_leads FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.blogs FROM anon, authenticated;