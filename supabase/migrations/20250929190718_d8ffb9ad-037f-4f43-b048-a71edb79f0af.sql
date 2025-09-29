-- Create artwork images storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('artwork-images', 'artwork-images', true);

-- Allow anyone to view artwork images
CREATE POLICY "Anyone can view artwork images"
ON storage.objects FOR SELECT
USING (bucket_id = 'artwork-images');

-- Allow admins to upload artwork images
CREATE POLICY "Admins can upload artwork images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'artwork-images');

-- Allow admins to update artwork images
CREATE POLICY "Admins can update artwork images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'artwork-images');

-- Allow admins to delete artwork images
CREATE POLICY "Admins can delete artwork images"
ON storage.objects FOR DELETE
USING (bucket_id = 'artwork-images');