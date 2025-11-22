-- Create page_content table for managing dynamic page content
CREATE TABLE public.page_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_name TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  subtitle TEXT,
  content TEXT NOT NULL,
  image_url TEXT,
  additional_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Everyone can view page content
CREATE POLICY "Page content is viewable by everyone" 
ON public.page_content FOR SELECT 
USING (true);

-- RLS Policy: Only authenticated users can update (later we'll add role-based access)
CREATE POLICY "Authenticated users can update page content" 
ON public.page_content FOR UPDATE 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can insert page content" 
ON public.page_content FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

-- Add trigger for automatic timestamp updates
CREATE TRIGGER update_page_content_updated_at
BEFORE UPDATE ON public.page_content
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index
CREATE INDEX idx_page_content_page_name ON public.page_content(page_name);

-- Insert default About Us content
INSERT INTO public.page_content (page_name, title, subtitle, content, image_url) 
VALUES (
  'about_us',
  'About Our Gallery',
  'Discover the story behind our passion for art',
  'Welcome to our contemporary art gallery, where creativity meets excellence. Founded in 2020, we have been dedicated to showcasing extraordinary works from both emerging and established artists from around the world.

Our Mission:
We believe that art has the power to transform spaces and inspire minds. Our mission is to make contemporary art accessible to everyone while supporting artists in their creative journey.

Our Collection:
Our carefully curated collection features a diverse range of styles and mediums, from paintings and sculptures to digital art and mixed media installations. Each piece is selected for its unique perspective and artistic merit.

Our Team:
Led by experienced art professionals with over 20 years of combined experience in the art world, our team is passionate about connecting art lovers with pieces that resonate with their personal style and vision.

Visit Us:
We invite you to visit our gallery and experience the art in person. Our knowledgeable staff is always available to discuss our collection and help you find the perfect piece for your space.',
  'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1200&h=600&fit=crop'
);