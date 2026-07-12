
ALTER TABLE public.blogs ADD COLUMN IF NOT EXISTS is_published boolean NOT NULL DEFAULT false;

DROP POLICY IF EXISTS "anyone can read blogs" ON public.blogs;
CREATE POLICY "anyone can read published blogs" ON public.blogs
  FOR SELECT
  TO public
  USING (is_published = true);

CREATE TABLE IF NOT EXISTS public.ai_gen_events (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ip text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS ai_gen_events_ip_created_idx ON public.ai_gen_events (ip, created_at DESC);
CREATE INDEX IF NOT EXISTS ai_gen_events_created_idx ON public.ai_gen_events (created_at DESC);

GRANT ALL ON public.ai_gen_events TO service_role;
ALTER TABLE public.ai_gen_events ENABLE ROW LEVEL SECURITY;
-- no policies: only service_role (server-side) may read/write
