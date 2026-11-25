ALTER TABLE public.profiles DROP CONSTRAINT profiles_theme_check;
ALTER TABLE public.profiles ADD CONSTRAINT profiles_theme_check CHECK (theme IN ('dark', 'light', 'system'));