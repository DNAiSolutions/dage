
-- Drop overly permissive policies and replace with tighter ones
DROP POLICY IF EXISTS "Anyone can submit waivers" ON public.waiver_submissions;
DROP POLICY IF EXISTS "Authenticated can submit waivers" ON public.waiver_submissions;

-- Public submissions still allowed but require form_id to reference an active form
CREATE POLICY "Public can submit to active waivers" ON public.waiver_submissions
  FOR INSERT TO anon WITH CHECK (
    EXISTS (SELECT 1 FROM public.waiver_forms WHERE id = form_id AND is_active = true)
  );
CREATE POLICY "Auth can submit to active waivers" ON public.waiver_submissions
  FOR INSERT TO authenticated WITH CHECK (
    EXISTS (SELECT 1 FROM public.waiver_forms WHERE id = form_id AND is_active = true)
  );
