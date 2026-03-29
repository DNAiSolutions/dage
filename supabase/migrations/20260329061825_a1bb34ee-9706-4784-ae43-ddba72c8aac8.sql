
-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'super_admin');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT,
  email TEXT,
  role app_role NOT NULL DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Profiles RLS
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "System can insert profiles" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.raw_user_meta_data ->> 'name', '')
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Waiver forms table
CREATE TABLE public.waiver_forms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL DEFAULT 'Participant Waiver & Release Form',
  description TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.waiver_forms ENABLE ROW LEVEL SECURITY;

-- Admins can manage waiver forms
CREATE POLICY "Authenticated users can view active waiver forms" ON public.waiver_forms
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Anyone can view active waiver forms" ON public.waiver_forms
  FOR SELECT TO anon USING (is_active = true);
CREATE POLICY "Admins can insert waiver forms" ON public.waiver_forms
  FOR INSERT TO authenticated WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Admins can update waiver forms" ON public.waiver_forms
  FOR UPDATE TO authenticated USING (auth.uid() IS NOT NULL);

-- Waiver submissions table (public can submit)
CREATE TABLE public.waiver_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  form_id UUID REFERENCES public.waiver_forms(id) ON DELETE CASCADE NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  participant_name TEXT NOT NULL,
  emergency_contact_name TEXT NOT NULL,
  emergency_contact_phone TEXT NOT NULL,
  signature_data TEXT NOT NULL,
  signed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.waiver_submissions ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a waiver (public form)
CREATE POLICY "Anyone can submit waivers" ON public.waiver_submissions
  FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Authenticated can submit waivers" ON public.waiver_submissions
  FOR INSERT TO authenticated WITH CHECK (true);
-- Only authenticated admins can view submissions
CREATE POLICY "Admins can view submissions" ON public.waiver_submissions
  FOR SELECT TO authenticated USING (auth.uid() IS NOT NULL);

-- Expected participants table
CREATE TABLE public.expected_participants (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  form_id UUID REFERENCES public.waiver_forms(id) ON DELETE CASCADE NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.expected_participants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view participants" ON public.expected_participants
  FOR SELECT TO authenticated USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admins can insert participants" ON public.expected_participants
  FOR INSERT TO authenticated WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Admins can update participants" ON public.expected_participants
  FOR UPDATE TO authenticated USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admins can delete participants" ON public.expected_participants
  FOR DELETE TO authenticated USING (auth.uid() IS NOT NULL);

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_waiver_forms_updated_at
  BEFORE UPDATE ON public.waiver_forms
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default waiver form
INSERT INTO public.waiver_forms (title, description, is_active)
VALUES (
  'Participant Waiver & Release Form',
  'Standard liability waiver for all parade participants and riders.',
  true
);
