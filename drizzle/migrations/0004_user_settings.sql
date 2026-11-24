CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text CHECK (display_name IS NULL OR char_length(display_name) BETWEEN 1 AND 60),
  avatar_path text CHECK (avatar_path IS NULL OR char_length(avatar_path) <= 200),
  theme text NOT NULL DEFAULT 'dark' CHECK (theme IN ('dark', 'light')),
  primary_color text NOT NULL DEFAULT 'dourado' CHECK (char_length(primary_color) <= 30),
  accent_color text NOT NULL DEFAULT 'champanhe' CHECK (char_length(accent_color) <= 30),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own profile select" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Own profile insert" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "Own profile update" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE TABLE public.account_deletion_requests (
  user_id uuid PRIMARY KEY,
  email text,
  reason text CHECK (reason IS NULL OR char_length(reason) <= 500),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, DELETE ON public.account_deletion_requests TO authenticated;
GRANT ALL ON public.account_deletion_requests TO service_role;
ALTER TABLE public.account_deletion_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own deletion request select" ON public.account_deletion_requests FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Own deletion request insert" ON public.account_deletion_requests FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Own deletion request cancel" ON public.account_deletion_requests FOR DELETE TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

-- The stored e-mail always comes from the account, never from the request body.
CREATE OR REPLACE FUNCTION public.fill_deletion_request_email()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  NEW.email := (SELECT email FROM auth.users WHERE id = NEW.user_id);
  NEW.created_at := now();
  RETURN NEW;
END;
$$;
REVOKE EXECUTE ON FUNCTION public.fill_deletion_request_email() FROM PUBLIC, anon, authenticated;
CREATE TRIGGER fill_deletion_request_email BEFORE INSERT ON public.account_deletion_requests
  FOR EACH ROW EXECUTE FUNCTION public.fill_deletion_request_email();

-- Signed-in users can list their own active sessions (devices).
CREATE OR REPLACE FUNCTION public.list_my_sessions()
RETURNS TABLE (id uuid, created_at timestamptz, last_active timestamptz, user_agent text, ip text, is_current boolean)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public, auth AS $$
  SELECT s.id,
         s.created_at,
         coalesce(s.refreshed_at::timestamptz, s.updated_at, s.created_at) AS last_active,
         s.user_agent,
         host(s.ip) AS ip,
         s.id::text = (auth.jwt() ->> 'session_id') AS is_current
  FROM auth.sessions s
  WHERE s.user_id = auth.uid()
    AND (s.not_after IS NULL OR s.not_after > now())
  ORDER BY 3 DESC
  LIMIT 20;
$$;
REVOKE EXECUTE ON FUNCTION public.list_my_sessions() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.list_my_sessions() TO authenticated;

-- Profile photos: private bucket, each user only touches files in their own folder.
CREATE POLICY "Avatar read own" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "Avatar upload own" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "Avatar update own" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text)
  WITH CHECK (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "Avatar delete own" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);