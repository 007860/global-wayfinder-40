
-- country_leads
CREATE TABLE public.country_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  passport_number TEXT NOT NULL,
  target_country TEXT NOT NULL,
  source_type TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.country_leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can insert leads" ON public.country_leads FOR INSERT WITH CHECK (true);

-- blogs
CREATE TABLE public.blogs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  query TEXT NOT NULL,
  country TEXT,
  cover_image TEXT,
  sections JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can read blogs" ON public.blogs FOR SELECT USING (true);
CREATE POLICY "anyone can create blogs" ON public.blogs FOR INSERT WITH CHECK (true);

-- analytics_counters
CREATE TABLE public.analytics_counters (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  value BIGINT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.analytics_counters ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can read counters" ON public.analytics_counters FOR SELECT USING (true);

INSERT INTO public.analytics_counters (name, value) VALUES
  ('total_traffic', 1420),
  ('consultations_booked', 865);

CREATE OR REPLACE FUNCTION public.increment_counter(counter_name TEXT)
RETURNS BIGINT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_value BIGINT;
BEGIN
  UPDATE public.analytics_counters
    SET value = value + 1, updated_at = now()
    WHERE name = counter_name
    RETURNING value INTO new_value;
  RETURN new_value;
END;
$$;

GRANT EXECUTE ON FUNCTION public.increment_counter(TEXT) TO anon, authenticated;
