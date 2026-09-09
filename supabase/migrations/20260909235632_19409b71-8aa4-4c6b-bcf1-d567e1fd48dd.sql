ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS category text NOT NULL DEFAULT 'General',
  ADD COLUMN IF NOT EXISTS compare_at_cents integer,
  ADD COLUMN IF NOT EXISTS featured boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS sku text;

CREATE TABLE IF NOT EXISTS public.store_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  customer_name text NOT NULL,
  customer_phone text NOT NULL,
  customer_email text,
  address text,
  note text,
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  total_cents integer NOT NULL DEFAULT 0,
  currency text NOT NULL DEFAULT 'MRU',
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.store_orders TO authenticated;
GRANT INSERT ON public.store_orders TO anon;
GRANT ALL ON public.store_orders TO service_role;

ALTER TABLE public.store_orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone can order from a published store"
ON public.store_orders FOR INSERT TO anon, authenticated
WITH CHECK (EXISTS (SELECT 1 FROM public.projects p WHERE p.id = project_id AND p.is_published = true));

CREATE POLICY "owner reads orders"
ON public.store_orders FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM public.projects p WHERE p.id = store_orders.project_id
  AND ((p.owner_id IS NOT NULL AND p.owner_id = auth.uid())
    OR (p.owner_email IS NOT NULL AND lower(p.owner_email) = lower(COALESCE(auth.jwt() ->> 'email', ''))))));

CREATE POLICY "owner updates orders"
ON public.store_orders FOR UPDATE TO authenticated
USING (EXISTS (SELECT 1 FROM public.projects p WHERE p.id = store_orders.project_id
  AND ((p.owner_id IS NOT NULL AND p.owner_id = auth.uid())
    OR (p.owner_email IS NOT NULL AND lower(p.owner_email) = lower(COALESCE(auth.jwt() ->> 'email', ''))))));

CREATE POLICY "owner deletes orders"
ON public.store_orders FOR DELETE TO authenticated
USING (EXISTS (SELECT 1 FROM public.projects p WHERE p.id = store_orders.project_id
  AND ((p.owner_id IS NOT NULL AND p.owner_id = auth.uid())
    OR (p.owner_email IS NOT NULL AND lower(p.owner_email) = lower(COALESCE(auth.jwt() ->> 'email', ''))))));

CREATE TRIGGER trg_store_orders_updated BEFORE UPDATE ON public.store_orders
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();