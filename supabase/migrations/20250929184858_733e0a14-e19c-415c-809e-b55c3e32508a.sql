-- Create incoming_products table
CREATE TABLE IF NOT EXISTS public.incoming_products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  artist_id UUID REFERENCES public.artists(id) ON DELETE SET NULL,
  expected_date TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.incoming_products ENABLE ROW LEVEL SECURITY;

-- Create policies for incoming_products
CREATE POLICY "Admins can manage incoming products" 
ON public.incoming_products 
FOR ALL 
USING (true)
WITH CHECK (true);

CREATE POLICY "Anyone can view incoming products" 
ON public.incoming_products 
FOR SELECT 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_incoming_products_updated_at
BEFORE UPDATE ON public.incoming_products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();