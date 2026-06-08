REVOKE EXECUTE ON FUNCTION public.increment_counter(text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.increment_counter(text) TO service_role;
