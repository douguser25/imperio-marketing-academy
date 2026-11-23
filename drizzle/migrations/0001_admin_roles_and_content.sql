CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

-- Private list of owner e-mails; only reachable by the service role and the trigger below.
CREATE TABLE public.owner_emails (
  email text PRIMARY KEY
);
GRANT ALL ON public.owner_emails TO service_role;
ALTER TABLE public.owner_emails ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.grant_owner_role()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.email_confirmed_at IS NOT NULL
     AND EXISTS (SELECT 1 FROM public.owner_emails WHERE lower(email) = lower(NEW.email)) THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_owner_check
AFTER INSERT OR UPDATE OF email_confirmed_at ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.grant_owner_role();

-- Content overrides. The app ships built-in lessons; these rows replace or add to them.
CREATE TABLE public.content_drafts (
  kind text NOT NULL CHECK (kind IN ('module', 'glossary', 'tips', 'settings')),
  slug text NOT NULL,
  position integer NOT NULL DEFAULT 0,
  data jsonb NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by uuid,
  PRIMARY KEY (kind, slug)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.content_drafts TO authenticated;
GRANT ALL ON public.content_drafts TO service_role;
ALTER TABLE public.content_drafts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Owners read drafts" ON public.content_drafts FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Owners insert drafts" ON public.content_drafts FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Owners update drafts" ON public.content_drafts FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Owners delete drafts" ON public.content_drafts FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.content_published (
  kind text NOT NULL CHECK (kind IN ('module', 'glossary', 'tips', 'settings')),
  slug text NOT NULL,
  position integer NOT NULL DEFAULT 0,
  data jsonb NOT NULL,
  published_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (kind, slug)
);
GRANT SELECT ON public.content_published TO anon, authenticated;
GRANT ALL ON public.content_published TO service_role;
ALTER TABLE public.content_published ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Everyone reads published content" ON public.content_published FOR SELECT TO anon, authenticated USING (true);

-- Publishing: owner-only, verified inside the database.
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
  DELETE FROM public.content_drafts;
  RETURN n;
END;
$$;
REVOKE EXECUTE ON FUNCTION public.publish_content() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.publish_content() TO authenticated;