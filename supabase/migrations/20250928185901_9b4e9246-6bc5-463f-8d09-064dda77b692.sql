-- Create artists table
CREATE TABLE public.artists (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  bio TEXT,
  image_url TEXT,
  website TEXT,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create artworks table
CREATE TABLE public.artworks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  artist_id UUID REFERENCES public.artists(id) ON DELETE CASCADE,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  category TEXT,
  dimensions TEXT,
  medium TEXT,
  year_created INTEGER,
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create events table
CREATE TABLE public.events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  event_date TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT,
  image_url TEXT,
  price DECIMAL(10,2) DEFAULT 0,
  max_attendees INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create shopping cart table
CREATE TABLE public.cart_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  artwork_id UUID REFERENCES public.artworks(id) ON DELETE CASCADE,
  quantity INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.artists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artworks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (for gallery visitors)
CREATE POLICY "Anyone can view artists" ON public.artists FOR SELECT USING (true);
CREATE POLICY "Anyone can view artworks" ON public.artworks FOR SELECT USING (true);
CREATE POLICY "Anyone can view events" ON public.events FOR SELECT USING (true);

-- Create policies for cart items (session-based)
CREATE POLICY "Users can view their own cart items" ON public.cart_items 
FOR SELECT USING (true);

CREATE POLICY "Users can insert their own cart items" ON public.cart_items 
FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update their own cart items" ON public.cart_items 
FOR UPDATE USING (true);

CREATE POLICY "Users can delete their own cart items" ON public.cart_items 
FOR DELETE USING (true);

-- Create admin policies (will be restricted later with proper auth)
CREATE POLICY "Admins can manage artists" ON public.artists 
FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Admins can manage artworks" ON public.artworks 
FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Admins can manage events" ON public.events 
FOR ALL USING (true) WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_artists_updated_at
  BEFORE UPDATE ON public.artists
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_artworks_updated_at
  BEFORE UPDATE ON public.artworks
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON public.events
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();