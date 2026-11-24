REVOKE EXECUTE ON FUNCTION public.grant_owner_role() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;
REVOKE EXECUTE ON FUNCTION public.publish_content() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.publish_content() TO authenticated;