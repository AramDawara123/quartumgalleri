-- Enable INSERT, UPDATE, and DELETE policies for events table
CREATE POLICY "Anyone can insert events"
ON public.events
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Anyone can update events"
ON public.events
FOR UPDATE
TO public
USING (true);

CREATE POLICY "Anyone can delete events"
ON public.events
FOR DELETE
TO public
USING (true);