-- Enable INSERT, UPDATE, and DELETE policies for artists table
CREATE POLICY "Anyone can insert artists"
ON public.artists
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Anyone can update artists"
ON public.artists
FOR UPDATE
TO public
USING (true);

CREATE POLICY "Anyone can delete artists"
ON public.artists
FOR DELETE
TO public
USING (true);