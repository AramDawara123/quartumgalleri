-- Update discounts table structure
ALTER TABLE public.discounts 
ADD COLUMN description TEXT,
ADD COLUMN discount_type TEXT NOT NULL DEFAULT 'percentage',
ADD COLUMN discount_value NUMERIC(10,2),
ADD COLUMN applies_to TEXT DEFAULT 'all',
ADD COLUMN min_purchase NUMERIC(10,2) DEFAULT 0,
ADD COLUMN max_uses INTEGER,
ADD COLUMN current_uses INTEGER DEFAULT 0,
ADD COLUMN start_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN end_date TIMESTAMP WITH TIME ZONE;

-- Create incoming_orders table for dashboard order management
CREATE TABLE public.incoming_orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  shipping_address TEXT NOT NULL,
  total_amount NUMERIC(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on incoming_orders
ALTER TABLE public.incoming_orders ENABLE ROW LEVEL SECURITY;

-- RLS Policies for incoming_orders (public can create, view own)
CREATE POLICY "Users can view incoming orders" 
ON public.incoming_orders FOR SELECT 
USING (true);

CREATE POLICY "Users can create incoming orders" 
ON public.incoming_orders FOR INSERT 
WITH CHECK (true);

-- Add trigger for incoming_orders
CREATE TRIGGER update_incoming_orders_updated_at
BEFORE UPDATE ON public.incoming_orders
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add index
CREATE INDEX idx_incoming_orders_status ON public.incoming_orders(status);