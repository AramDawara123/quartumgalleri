import { useState } from "react";
import { Search, Filter, Eye, ShoppingBag, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import artwork1 from "@/assets/artwork-1.jpg";
import artwork2 from "@/assets/artwork-2.jpg";
import artwork3 from "@/assets/artwork-3.jpg";
import artwork4 from "@/assets/artwork-4.jpg";

const Artworks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArtist, setSelectedArtist] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const artworks = [
    {
      id: 1,
      title: "Burgundy Dreams",
      artist: "Elena Marchetti",
      category: "Abstract",
      price: 3200,
      image: artwork1,
      description: "A powerful abstract composition exploring themes of passion and tranquility",
    },
    {
      id: 2,
      title: "Geometric Serenity",
      artist: "David Chen",
      category: "Contemporary",
      price: 2800,
      image: artwork2,
      description: "Minimalist geometric forms creating a sense of peaceful harmony",
    },
    {
      id: 3,
      title: "Vivid Landscapes",
      artist: "Maria Rodriguez",
      category: "Landscape",
      price: 4100,
      image: artwork3,
      description: "Bold interpretation of natural landscapes with vibrant energy",
    },
    {
      id: 4,
      title: "Portrait in Motion",
      artist: "James Thompson",
      category: "Portrait",
      price: 3500,
      image: artwork4,
      description: "Contemporary portraiture capturing the essence of human emotion",
    },
    {
      id: 5,
      title: "Urban Reflections",
      artist: "Elena Marchetti",
      category: "Abstract",
      price: 2900,
      image: artwork1,
      description: "City life interpreted through abstract forms and textures",
    },
    {
      id: 6,
      title: "Minimalist Study",
      artist: "David Chen",
      category: "Contemporary",
      price: 2200,
      image: artwork2,
      description: "Clean lines and subtle color variations in perfect balance",
    },
    {
      id: 7,
      title: "Mountain Dreams",
      artist: "Maria Rodriguez",
      category: "Landscape",
      price: 3800,
      image: artwork3,
      description: "Majestic mountain vistas rendered with contemporary flair",
    },
    {
      id: 8,
      title: "Silent Stories",
      artist: "James Thompson",
      category: "Portrait",
      price: 4200,
      image: artwork4,
      description: "Intimate portraits that reveal hidden narratives",
    },
  ];

  const artists = [...new Set(artworks.map(art => art.artist))];
  const categories = [...new Set(artworks.map(art => art.category))];

  const filteredArtworks = artworks.filter(artwork => {
    const matchesSearch = artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artwork.artist.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesArtist = selectedArtist === "all-artists" || !selectedArtist || artwork.artist === selectedArtist;
    const matchesCategory = selectedCategory === "all-categories" || !selectedCategory || artwork.category === selectedCategory;
    const matchesPrice = priceRange === "all-prices" || !priceRange || 
      (priceRange === "under-3000" && artwork.price < 3000) ||
      (priceRange === "3000-4000" && artwork.price >= 3000 && artwork.price <= 4000) ||
      (priceRange === "over-4000" && artwork.price > 4000);

    return matchesSearch && matchesArtist && matchesCategory && matchesPrice;
  });

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
                  {artists.map(artist => (
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
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Prices" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-prices">All Prices</SelectItem>
                  <SelectItem value="under-3000">Under $3,000</SelectItem>
                  <SelectItem value="3000-4000">$3,000 - $4,000</SelectItem>
                  <SelectItem value="over-4000">Over $4,000</SelectItem>
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
                    src={artwork.image}
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
                      <Button variant="hero" size="sm" className="flex-1">
                        <Eye className="mr-2 h-4 w-4" />
                        Quick View
                      </Button>
                      <Button variant="luxury" size="sm" className="flex-1">
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        Add to Cart
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
                  <p className="text-muted-foreground mb-3">by {artwork.artist}</p>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {artwork.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-accent">
                      ${artwork.price.toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredArtworks.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎨</div>
            <h3 className="text-2xl font-serif font-semibold mb-2 text-primary">
              No artworks found
            </h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search criteria or browse all artworks
            </p>
            <Button variant="default" onClick={() => {
              setSearchTerm("");
              setSelectedArtist("all-artists");
              setSelectedCategory("all-categories");
              setPriceRange("all-prices");
            }}>
              Clear Filters
            </Button>
          </div>
        )}

        {/* Load More */}
        {filteredArtworks.length > 0 && (
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