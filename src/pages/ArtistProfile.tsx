import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, MapPin, Award, Eye, ShoppingBag, Calendar, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
interface Artist {
  id: string;
  name: string;
  bio: string | null;
  image_url: string | null;
  website: string | null;
  email: string | null;
  created_at: string;
}
interface Artwork {
  id: string;
  title: string;
  description: string | null;
  price: number;
  image_url: string | null;
  category: string | null;
  medium: string | null;
  dimensions: string | null;
  year_created: number | null;
  available: boolean | null;
  artist_id: string | null;
}
const ArtistProfile = () => {
  const {
    id
  } = useParams();
  const {
    toast
  } = useToast();
  const {
    addToCart
  } = useCart();
  const [artist, setArtist] = useState<Artist | null>(null);
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const loadArtist = async () => {
    if (!id) return;
    try {
      setLoading(true);

      // Fetch artist data
      const {
        data: artistData,
        error: artistError
      } = await supabase.from('artists').select('*').eq('id', id).maybeSingle();
      if (artistError) throw artistError;
      if (!artistData) {
        setArtist(null);
        setLoading(false);
        return;
      }
      setArtist(artistData);

      // Fetch artworks by this artist
      const {
        data: artworksData,
        error: artworksError
      } = await supabase.from('artworks').select('*').eq('artist_id', id);
      if (artworksError) throw artworksError;
      setArtworks(artworksData || []);
    } catch (error) {
      console.error('Error loading artist:', error);
      toast({
        title: "Error",
        description: "Failed to load artist data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  const handleAddToCart = async (artwork: Artwork) => {
    try {
      await addToCart(artwork.id, artwork, 'artwork');
      toast({
        title: "Added to Cart",
        description: `${artwork.title} has been added to your cart.`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive"
      });
    }
  };
  useEffect(() => {
    loadArtist();
  }, [id]);
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading artist profile...</p>
        </div>
      </div>;
  }
  if (!artist) {
    return <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Artist Not Found</h1>
          <Button asChild>
            <Link to="/artists">Back to Artists</Link>
          </Button>
        </div>
      </div>;
  }
  return <main className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Button variant="ghost" className="mb-8" asChild>
          <Link to="/artists">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Artists
          </Link>
        </Button>

        {/* Artist Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-0">
          <div className="lg:col-span-1">
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <img src={artist.image_url || 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=600&h=600&fit=crop&crop=face'} alt={artist.name} className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold mb-3 text-primary">
                  {artist.name}
                </h1>
                {artist.email && <p className="text-lg text-accent font-medium mb-2">
                    {artist.email}
                  </p>}
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6">
              {artist.bio}
            </p>

            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-4">
                {artist.website && <Button variant="default" asChild>
                    <a href={artist.website.startsWith('http') ? artist.website : `https://${artist.website}`} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Visit Website
                    </a>
                  </Button>}
                <Button variant="outline" asChild>
                  
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-0" />

        {/* Artworks Section */}
        <section>
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-serif font-bold text-primary">
              Available Artworks
            </h2>
            <p className="text-muted-foreground">
              {artworks.filter(art => art.available).length} of {artworks.length} available
            </p>
          </div>

          {artworks.length === 0 ? <div className="text-center py-12">
              <p className="text-muted-foreground">No artworks available for this artist yet.</p>
            </div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {artworks.map((artwork, index) => <Card key={artwork.id} className={`group gallery-hover overflow-hidden border-0 shadow-lg ${!artwork.available ? 'opacity-75' : ''}`} style={{
            animationDelay: `${index * 0.1}s`
          }}>
                <CardContent className="p-0">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img src={artwork.image_url || 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=500&fit=crop'} alt={artwork.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    {!artwork.available && <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Badge variant="secondary" className="bg-red-500 text-white">
                          Sold
                        </Badge>
                      </div>}
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-serif text-lg font-semibold text-primary">
                        {artwork.title}
                      </h3>
                      {artwork.year_created && <Badge variant="outline" className="text-xs">
                          {artwork.year_created}
                        </Badge>}
                    </div>
                    {(artwork.medium || artwork.dimensions) && <p className="text-muted-foreground text-sm mb-2">
                        {artwork.medium}{artwork.medium && artwork.dimensions ? ' • ' : ''}{artwork.dimensions}
                      </p>}
                    {artwork.description && <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {artwork.description}
                      </p>}
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-accent">
                        €{artwork.price}
                      </span>
                      {artwork.available ? <Button variant="default" size="sm" onClick={() => handleAddToCart(artwork)}>
                          <ShoppingBag className="mr-2 h-4 w-4" />
                          Add to Cart
                        </Button> : <Button variant="outline" size="sm" disabled>
                          Sold Out
                        </Button>}
                    </div>
                  </div>
                </CardContent>
              </Card>)}
            </div>}
        </section>

        {/* Contact Artist */}
        <section className="mt-20">
          <Card className="p-12 bg-muted/20 border-border/50 text-center">
            <h3 className="text-2xl font-serif font-bold mb-4 text-primary">
              Interested in {artist.name}'s Work?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Contact us to learn more about available pieces, commission custom work, 
              or inquire about upcoming exhibitions featuring {artist.name}.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="default" size="lg" asChild>
                <Link to="/contact">
                  Contact Gallery
                </Link>
              </Button>
              {artist.website && <Button variant="outline" size="lg" asChild>
                  <a href={artist.website.startsWith('http') ? artist.website : `https://${artist.website}`} target="_blank" rel="noopener noreferrer">
                    Visit Artist Website
                  </a>
                </Button>}
            </div>
          </Card>
        </section>
      </div>
    </main>;
};
export default ArtistProfile;