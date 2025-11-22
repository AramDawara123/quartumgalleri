-- Enable INSERT, UPDATE, and DELETE policies for artworks table
CREATE POLICY "Anyone can insert artworks"
ON public.artworks
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Anyone can update artworks"
ON public.artworks
FOR UPDATE
TO public
USING (true);

CREATE POLICY "Anyone can delete artworks"
ON public.artworks
FOR DELETE
TO public
USING (true);