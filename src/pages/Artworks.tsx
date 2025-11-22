import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, ShoppingBag, Eye, Search, Filter } from 'lucide-react';
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
  artists?: { name: string };
}

const Artworks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArtist, setSelectedArtist] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const loadArtworks = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('artworks')
      .select(`
        *,
        artists (
          name
        )
      `)
      .eq('available', true)
      .order('title');

    if (error) {
      toast({
        title: "Error",
        description: "Could not load artworks",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    setArtworks(data || []);
    setLoading(false);
  };

  useEffect(() => {
    loadArtworks();
  }, []);

  // Extract unique artists and categories from artworks
  const uniqueArtists = [...new Set(artworks.map(artwork => artwork.artists?.name).filter(Boolean))];
  const uniqueCategories = [...new Set(artworks.map(artwork => artwork.category).filter(Boolean))];

  // Filter artworks based on search and filter criteria
  const filteredArtworks = artworks.filter(artwork => {
    const matchesSearch = artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (artwork.artists?.name || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesArtist = selectedArtist === '' || selectedArtist === 'all-artists' || artwork.artists?.name === selectedArtist;
    const matchesCategory = selectedCategory === '' || selectedCategory === 'all-categories' || artwork.category === selectedCategory;
    
    let matchesPrice = true;
    if (selectedPriceRange && selectedPriceRange !== 'all-prices') {
      switch (selectedPriceRange) {
        case 'under-1000':
          matchesPrice = artwork.price < 1000;
          break;
        case '1000-3000':
          matchesPrice = artwork.price >= 1000 && artwork.price <= 3000;
          break;
        case '3000-5000':
          matchesPrice = artwork.price >= 3000 && artwork.price <= 5000;
          break;
        case 'over-5000':
          matchesPrice = artwork.price > 5000;
          break;
        default:
          matchesPrice = true;
      }
    }
    
    return matchesSearch && matchesArtist && matchesCategory && matchesPrice;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedArtist('all-artists');
    setSelectedCategory('all-categories');
    setSelectedPriceRange('all-prices');
  };

  return (
    <main className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-primary">
            Our Collection
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover extraordinary artworks from talented contemporary artists
          </p>
        </div>

        {/* Filters */}
        <div className="mb-12 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search artworks or artists..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Select value={selectedArtist} onValueChange={setSelectedArtist}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Artists" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-artists">All Artists</SelectItem>
                  {uniqueArtists.map(artist => (
                    <SelectItem key={artist} value={artist}>{artist}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-categories">All Categories</SelectItem>
                  {uniqueCategories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Prices" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-prices">All Prices</SelectItem>
                  <SelectItem value="under-1000">Under €1,000</SelectItem>
                  <SelectItem value="1000-3000">€1,000 - €3,000</SelectItem>
                  <SelectItem value="3000-5000">€3,000 - €5,000</SelectItem>
                  <SelectItem value="over-5000">Over €5,000</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Showing {filteredArtworks.length} of {artworks.length} artworks</span>
            <Button variant="ghost" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Artworks Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="overflow-hidden border-0 shadow-lg">
                <CardContent className="p-0">
                  <div className="aspect-[4/5] bg-muted animate-pulse" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-muted animate-pulse rounded w-1/3" />
                    <div className="h-6 bg-muted animate-pulse rounded w-3/4" />
                    <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
                    <div className="h-4 bg-muted animate-pulse rounded w-full" />
                    <div className="h-8 bg-muted animate-pulse rounded w-1/3" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredArtworks.map((artwork, index) => (
              <Card
                key={artwork.id}
                className="group gallery-hover overflow-hidden border-0 shadow-lg"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-0">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={artwork.image_url || '/placeholder.svg'}
                      alt={artwork.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="artwork-overlay group-hover:opacity-100">
                      <div className="absolute top-4 right-4">
                        <Button variant="hero" size="icon" className="rounded-full">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                        <Button 
                          variant="hero" 
                          size="sm" 
                          className="flex-1"
                          asChild
                        >
                          <Link to={`/artworks/${artwork.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </Link>
                        </Button>
                        <Button 
                          variant="luxury" 
                          size="sm" 
                          className="flex-1"
                          onClick={(e) => {
                            e.preventDefault();
                            addToCart(artwork.id, artwork, 'artwork');
                          }}
                        >
                          <ShoppingBag className="mr-2 h-4 w-4" />
                          Add
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="mb-2">
                      <span className="text-xs font-medium text-accent uppercase tracking-wide">
                        {artwork.category}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl font-semibold mb-2 text-primary">
                      {artwork.title}
                    </h3>
                    <p className="text-muted-foreground mb-3">by {artwork.artists?.name || 'Unknown Artist'}</p>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {artwork.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-accent">
                        €{artwork.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!loading && filteredArtworks.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎨</div>
            <h3 className="text-2xl font-serif font-semibold mb-2 text-primary">
              No artworks found
            </h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search criteria or browse all artworks
            </p>
            <Button variant="default" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        )}

        {/* Load More */}
        {!loading && filteredArtworks.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="elegant" size="lg">
              Load More Artworks
            </Button>
          </div>
        )}
      </div>
    </main>
  );
};

export default Artworks;