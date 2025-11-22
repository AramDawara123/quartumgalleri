-- Create a separate table for artist contact information with authentication required
CREATE TABLE public.artist_contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  artist_id uuid NOT NULL REFERENCES public.artists(id) ON DELETE CASCADE,
  email text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(artist_id)
);

-- Enable RLS on artist_contacts
ALTER TABLE public.artist_contacts ENABLE ROW LEVEL SECURITY;

-- Only authenticated users can view contact information
CREATE POLICY "Only authenticated users can view artist contacts"
ON public.artist_contacts
FOR SELECT
TO authenticated
USING (true);

-- Only authenticated users can insert contacts
CREATE POLICY "Only authenticated users can insert artist contacts"
ON public.artist_contacts
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Only authenticated users can update contacts
CREATE POLICY "Only authenticated users can update artist contacts"
ON public.artist_contacts
FOR UPDATE
TO authenticated
USING (true);

-- Only authenticated users can delete contacts
CREATE POLICY "Only authenticated users can delete artist contacts"
ON public.artist_contacts
FOR DELETE
TO authenticated
USING (true);

-- Migrate existing emails to the new table
INSERT INTO public.artist_contacts (artist_id, email)
SELECT id, email FROM public.artists WHERE email IS NOT NULL;

-- Remove email column from artists table
ALTER TABLE public.artists DROP COLUMN email;

-- Add trigger for updated_at
CREATE TRIGGER update_artist_contacts_updated_at
  BEFORE UPDATE ON public.artist_contacts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();