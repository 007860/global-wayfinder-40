-- country_leads is written only by the server (service role bypasses RLS).
-- Add explicit deny-all policies for anon and authenticated to satisfy the
-- "RLS enabled, no policy" lint and make intent unambiguous.
REVOKE ALL ON public.country_leads FROM anon, authenticated;
GRANT ALL ON public.country_leads TO service_role;

CREATE POLICY "Deny all access to anon"
  ON public.country_leads
  AS RESTRICTIVE
  FOR ALL
  TO anon
  USING (false)
  WITH CHECK (false);

CREATE POLICY "Deny all access to authenticated"
  ON public.country_leads
  AS RESTRICTIVE
  FOR ALL
  TO authenticated
  USING (false)
  WITH CHECK (false);
