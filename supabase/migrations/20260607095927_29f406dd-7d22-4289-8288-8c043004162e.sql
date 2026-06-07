DROP POLICY IF EXISTS "anyone can insert leads" ON public.country_leads;
REVOKE INSERT ON public.country_leads FROM anon, authenticated;