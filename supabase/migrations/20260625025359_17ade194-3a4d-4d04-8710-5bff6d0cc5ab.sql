
-- Public read for product images (so unauthenticated visitors can view them)
CREATE POLICY "product-images public read"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

-- Authenticated users can upload to their own folder: <uid>/...
CREATE POLICY "product-images owner insert"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'product-images'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "product-images owner update"
ON storage.objects FOR UPDATE TO authenticated
USING (
  bucket_id = 'product-images'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "product-images owner delete"
ON storage.objects FOR DELETE TO authenticated
USING (
  bucket_id = 'product-images'
  AND auth.uid()::text = (storage.foldername(name))[1]
);
