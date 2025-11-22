-- Create storage bucket for page content images
INSERT INTO storage.buckets (id, name, public)
VALUES ('page-content', 'page-content', true)
ON CONFLICT (id) DO NOTHING;

-- Allow anyone to view images
CREATE POLICY "Page content images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'page-content');

-- Allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload page content images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'page-content' 
  AND auth.uid() IS NOT NULL
);

-- Allow authenticated users to update images
CREATE POLICY "Authenticated users can update page content images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'page-content' 
  AND auth.uid() IS NOT NULL
);

-- Allow authenticated users to delete images
CREATE POLICY "Authenticated users can delete page content images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'page-content' 
  AND auth.uid() IS NOT NULL
);