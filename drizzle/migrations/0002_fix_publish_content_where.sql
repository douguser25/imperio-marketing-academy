CREATE OR REPLACE FUNCTION public.publish_content()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  n integer;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'not authorized' USING ERRCODE = '42501';
  END IF;
  INSERT INTO public.content_published (kind, slug, position, data, published_at)
  SELECT kind, slug, position, data, now() FROM public.content_drafts
  ON CONFLICT (kind, slug) DO UPDATE
    SET position = EXCLUDED.position, data = EXCLUDED.data, published_at = now();
  GET DIAGNOSTICS n = ROW_COUNT;
  DELETE FROM public.content_drafts WHERE kind IS NOT NULL;
  RETURN n;
END;
$$;
REVOKE EXECUTE ON FUNCTION public.publish_content() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.publish_content() TO authenticated;