import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Heart, Share2, Ruler, Calendar, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface Artwork {
  id: string;
  title: string;
  artist_id: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  available: boolean;
  medium: string;
  dimensions: string;
  year_created: number;
  artists?: { 
    name: string;
    bio: string;
    image_url: string;
  };
}

const ArtworkDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedArtworks, setRelatedArtworks] = useState<Artwork[]>([]);
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    loadArtwork();
  }, [id]);

  const loadArtwork = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('artworks')
      .select(`
        *,
        artists (
          name,
          bio,
          image_url
        )
      `)
      .eq('id', id)
      .single();

    if (error || !data) {
      toast({
        title: "Error",
        description: "Could not load artwork details",
        variant: "destructive",
      });
      navigate('/artworks');
      return;
    }

    setArtwork(data);
    loadRelatedArtworks(data.artist_id, data.category);
    setLoading(false);
  };

  const loadRelatedArtworks = async (artistId: string, category: string) => {
    const { data } = await supabase
      .from('artworks')
      .select(`
        *,
        artists (
          name,
          bio,
          image_url
        )
      `)
      .neq('id', id)
      .or(`artist_id.eq.${artistId},category.eq.${category}`)
      .eq('available', true)
      .limit(4);

    if (data) {
      setRelatedArtworks(data);
    }
  };

  const handleAddToCart = () => {
    if (artwork) {
      addToCart(artwork.id, artwork, 'artwork');
      toast({
        title: "Added to cart",
        description: `${artwork.title} has been added to your cart`,
      });
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-32 mb-8" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <div className="aspect-[4/5] bg-muted rounded-lg" />
              <div className="space-y-6">
                <div className="h-12 bg-muted rounded w-3/4" />
                <div className="h-6 bg-muted rounded w-1/2" />
                <div className="h-32 bg-muted rounded" />
                <div className="h-16 bg-muted rounded" />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!artwork) return null;

  return (
    <main className="min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          className="mb-6 md:mb-8"
          onClick={() => navigate('/artworks')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Collection
        </Button>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Image */}
          <div className="space-y-4">
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg shadow-2xl">
              <img
                src={artwork.image_url || '/placeholder.svg'}
                alt={artwork.title}
                className="w-full h-full object-cover"
              />
              {!artwork.available && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <Badge variant="destructive" className="text-lg px-4 py-2">
                    Sold Out
                  </Badge>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button variant="outline" size="icon" className="flex-1">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="flex-1">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            {/* Category Badge */}
            <Badge variant="secondary" className="text-sm">
              {artwork.category}
            </Badge>

            {/* Title & Artist */}
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-3 text-primary">
                {artwork.title}
              </h1>
              <Link 
                to={`/artists/${artwork.artist_id}`}
                className="text-lg md:text-xl text-accent hover:underline font-medium"
              >
                by {artwork.artists?.name || 'Unknown Artist'}
              </Link>
            </div>

            {/* Price */}
            <div className="py-6 border-y border-border">
              <div className="text-4xl md:text-5xl font-bold text-accent">
                €{artwork.price.toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                VAT included • Free worldwide shipping
              </p>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-primary">About This Artwork</h3>
              <p className="text-muted-foreground leading-relaxed">
                {artwork.description || 'A beautiful piece of contemporary art.'}
              </p>
            </div>

            {/* Specifications */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-semibold text-primary">Specifications</h3>
                <Separator />
                
                {artwork.dimensions && (
                  <div className="flex items-start gap-3">
                    <Ruler className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-sm text-muted-foreground">Dimensions</div>
                      <div className="font-semibold">{artwork.dimensions}</div>
                    </div>
                  </div>
                )}

                {artwork.medium && (
                  <div className="flex items-start gap-3">
                    <Package className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-sm text-muted-foreground">Medium</div>
                      <div className="font-semibold">{artwork.medium}</div>
                    </div>
                  </div>
                )}

                {artwork.year_created && (
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-sm text-muted-foreground">Year Created</div>
                      <div className="font-semibold">{artwork.year_created}</div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Add to Cart Button */}
            <div className="space-y-3 pt-4">
              <Button 
                variant="luxury" 
                size="lg" 
                className="w-full"
                onClick={handleAddToCart}
                disabled={!artwork.available}
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                {artwork.available ? 'Add to Cart' : 'Sold Out'}
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Secure checkout • 14-day return policy • Certificate of authenticity included
              </p>
            </div>
          </div>
        </div>

        {/* Artist Info */}
        {artwork.artists && (
          <Card className="mb-16">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-6">
                <img
                  src={artwork.artists.image_url || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop'}
                  alt={artwork.artists.name}
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <h3 className="text-2xl font-serif font-bold mb-2 text-primary">
                    About the Artist
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {artwork.artists.bio || `${artwork.artists.name} is a talented contemporary artist.`}
                  </p>
                  <Button variant="elegant" asChild>
                    <Link to={`/artists/${artwork.artist_id}`}>
                      View Artist Profile
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Related Artworks */}
        {relatedArtworks.length > 0 && (
          <div>
            <h2 className="text-3xl font-serif font-bold mb-8 text-primary">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedArtworks.map((related) => (
                <Link key={related.id} to={`/artworks/${related.id}`}>
                  <Card className="group gallery-hover overflow-hidden border-0 shadow-lg">
                    <CardContent className="p-0">
                      <div className="relative aspect-[4/5] overflow-hidden">
                        <img
                          src={related.image_url || '/placeholder.svg'}
                          alt={related.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-serif text-lg font-semibold mb-1 text-primary line-clamp-1">
                          {related.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          by {related.artists?.name}
                        </p>
                        <div className="text-xl font-bold text-accent">
                          €{related.price.toLocaleString()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default ArtworkDetail;
