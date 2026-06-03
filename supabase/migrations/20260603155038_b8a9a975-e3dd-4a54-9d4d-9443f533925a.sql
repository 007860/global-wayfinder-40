GRANT INSERT ON public.country_leads TO anon, authenticated;
GRANT ALL ON public.country_leads TO service_role;
CREATE POLICY "anyone can insert leads" ON public.country_leads FOR INSERT TO anon, authenticated WITH CHECK (true);