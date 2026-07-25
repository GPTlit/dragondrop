
ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS template_id integer,
  ADD COLUMN IF NOT EXISTS owner_email text,
  ADD COLUMN IF NOT EXISTS store_meta jsonb NOT NULL DEFAULT '{}'::jsonb,
  ALTER COLUMN owner_id DROP NOT NULL;

DROP POLICY IF EXISTS "owner full access" ON public.projects;
CREATE POLICY "owner full access" ON public.projects
  FOR ALL
  USING (
    (owner_id IS NOT NULL AND owner_id = auth.uid())
    OR (owner_email IS NOT NULL AND lower(owner_email) = lower(coalesce(auth.jwt() ->> 'email','')))
  )
  WITH CHECK (
    (owner_id IS NOT NULL AND owner_id = auth.uid())
    OR (owner_email IS NOT NULL AND lower(owner_email) = lower(coalesce(auth.jwt() ->> 'email','')))
  );

DROP POLICY IF EXISTS "owner products" ON public.products;
CREATE POLICY "owner products" ON public.products
  FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.projects p
    WHERE p.id = products.project_id
      AND (
        (p.owner_id IS NOT NULL AND p.owner_id = auth.uid())
        OR (p.owner_email IS NOT NULL AND lower(p.owner_email) = lower(coalesce(auth.jwt() ->> 'email','')))
      )
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.projects p
    WHERE p.id = products.project_id
      AND (
        (p.owner_id IS NOT NULL AND p.owner_id = auth.uid())
        OR (p.owner_email IS NOT NULL AND lower(p.owner_email) = lower(coalesce(auth.jwt() ->> 'email','')))
      )
  ));

DROP POLICY IF EXISTS "owner pages" ON public.pages;
CREATE POLICY "owner pages" ON public.pages
  FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.projects p
    WHERE p.id = pages.project_id
      AND (
        (p.owner_id IS NOT NULL AND p.owner_id = auth.uid())
        OR (p.owner_email IS NOT NULL AND lower(p.owner_email) = lower(coalesce(auth.jwt() ->> 'email','')))
      )
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.projects p
    WHERE p.id = pages.project_id
      AND (
        (p.owner_id IS NOT NULL AND p.owner_id = auth.uid())
        OR (p.owner_email IS NOT NULL AND lower(p.owner_email) = lower(coalesce(auth.jwt() ->> 'email','')))
      )
  ));

CREATE TABLE IF NOT EXISTS public.purchases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id integer NOT NULL,
  project_id uuid REFERENCES public.projects(id) ON DELETE SET NULL,
  buyer_name text NOT NULL,
  buyer_email text NOT NULL,
  buyer_code text,
  buyer_phone text,
  buyer_whatsapp text,
  comments text,
  store_name text NOT NULL,
  payment_method text NOT NULL,
  receipt_url text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.purchases TO anon, authenticated;
GRANT ALL ON public.purchases TO service_role;

ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anyone can insert purchases" ON public.purchases;
CREATE POLICY "anyone can insert purchases" ON public.purchases
  FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "buyer can read own purchases" ON public.purchases;
CREATE POLICY "buyer can read own purchases" ON public.purchases
  FOR SELECT TO authenticated
  USING (lower(buyer_email) = lower(coalesce(auth.jwt() ->> 'email','')));

CREATE OR REPLACE FUNCTION public.submit_purchase(
  p_template_id integer,
  p_store_name text,
  p_buyer_name text,
  p_buyer_email text,
  p_buyer_code text,
  p_buyer_phone text,
  p_buyer_whatsapp text,
  p_comments text,
  p_payment_method text,
  p_receipt_url text
) RETURNS TABLE(purchase_id uuid, project_id uuid)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_project_id uuid;
  v_purchase_id uuid;
  v_slug text;
BEGIN
  IF p_buyer_email IS NULL OR length(trim(p_buyer_email)) = 0 THEN
    RAISE EXCEPTION 'email required';
  END IF;
  IF p_store_name IS NULL OR length(trim(p_store_name)) = 0 THEN
    RAISE EXCEPTION 'store name required';
  END IF;

  v_slug := lower(regexp_replace(p_store_name, '[^a-zA-Z0-9]+', '-', 'g'))
            || '-' || substr(md5(random()::text), 1, 6);

  INSERT INTO public.projects (owner_id, owner_email, name, slug, type, template_id, store_meta, is_published, status)
  VALUES (NULL, lower(trim(p_buyer_email)), p_store_name, v_slug, 'store', p_template_id,
          jsonb_build_object('site_name', p_store_name, 'logo_url', null, 'template_id', p_template_id),
          false, 'draft')
  RETURNING id INTO v_project_id;

  INSERT INTO public.purchases (
    template_id, project_id, buyer_name, buyer_email, buyer_code,
    buyer_phone, buyer_whatsapp, comments, store_name, payment_method, receipt_url, status
  ) VALUES (
    p_template_id, v_project_id, p_buyer_name, lower(trim(p_buyer_email)), p_buyer_code,
    p_buyer_phone, p_buyer_whatsapp, p_comments, p_store_name, p_payment_method, p_receipt_url, 'pending'
  ) RETURNING id INTO v_purchase_id;

  RETURN QUERY SELECT v_purchase_id, v_project_id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.submit_purchase(integer, text, text, text, text, text, text, text, text, text) TO anon, authenticated;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email));
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user');
  UPDATE public.projects
    SET owner_id = NEW.id
    WHERE owner_id IS NULL
      AND owner_email IS NOT NULL
      AND lower(owner_email) = lower(NEW.email);
  RETURN NEW;
END;
$$;
