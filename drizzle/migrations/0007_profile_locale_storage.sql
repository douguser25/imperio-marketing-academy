ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS locale text NOT NULL DEFAULT 'pt-BR';

ALTER TABLE public.profiles
  DROP CONSTRAINT IF EXISTS profiles_locale_check;
ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_locale_check CHECK (locale IN ('pt-BR', 'en'));

-- Keep user avatars private and enforce the existing UID-scoped object-path model.
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('avatars', 'avatars', false, 2097152, ARRAY['image/jpeg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO NOTHING;

-- The profile and avatar policies are already established by migration 0004:
-- profiles are readable/writable only when id = auth.uid(), and avatar objects
-- are scoped to the first folder matching auth.uid(). This additive migration
-- intentionally preserves existing rows, buckets, policies, and user data.
