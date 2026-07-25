
DROP POLICY IF EXISTS "anyone upload receipts" ON storage.objects;
CREATE POLICY "anyone upload receipts" ON storage.objects
  FOR INSERT TO anon, authenticated
  WITH CHECK (bucket_id = 'receipts');

DROP POLICY IF EXISTS "auth read receipts" ON storage.objects;
CREATE POLICY "auth read receipts" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'receipts');

DROP POLICY IF EXISTS "auth upload logos" ON storage.objects;
CREATE POLICY "auth upload logos" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'store-logos');

DROP POLICY IF EXISTS "auth read logos" ON storage.objects;
CREATE POLICY "auth read logos" ON storage.objects
  FOR SELECT TO anon, authenticated USING (bucket_id = 'store-logos');

DROP POLICY IF EXISTS "auth update logos" ON storage.objects;
CREATE POLICY "auth update logos" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'store-logos');
