import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Eye, ShoppingBag, Star, Quote, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import galleryHero from "@/assets/gallery-hero.jpg";
import artwork1 from "@/assets/artwork-1.jpg";
import artwork2 from "@/assets/artwork-2.jpg";
import artwork3 from "@/assets/artwork-3.jpg";
import artwork4 from "@/assets/artwork-4.jpg";

const Home = () => {
  const featuredArtworks = [
    {
      id: 1,
      title: "Ocean Dreams",
      artist: "Sarah Chen",
      price: "$2,800",
      image: artwork1,
      category: "Abstract"
    },
    {
      id: 2,
      title: "Urban Symphony",
      artist: "Marcus Rodriguez",
      price: "$3,400",
      image: artwork2,
      category: "Contemporary"
    },
  ];

  const paintingCollection = [
    {
      id: 1,
      title: "Eternal Sunset",
      artist: "Elena Marchetti",
      price: "$3,200",
      image: artwork1,
    },
    {
      id: 2,
      title: "Midnight Blues",
      artist: "David Chen",
      price: "$2,800",
      image: artwork2,
    },
    {
      id: 3,
      title: "Golden Hour",
      artist: "Maria Rodriguez",
      price: "$4,100",
      image: artwork3,
    },
    {
      id: 4,
      title: "Forest Whispers",
      artist: "James Thompson",
      price: "$3,500",
      image: artwork4,
    },
  ];

  const curatorsChoice = [
    {
      id: 1,
      title: "Digital Renaissance",
      artist: "Alex Kim",
      price: "$5,200",
      image: artwork3,
    },
    {
      id: 2,
      title: "Neon Dreams",
      artist: "Sofia Martinez",
      price: "$4,800",
      image: artwork4,
    },
    {
      id: 3,
      title: "Abstract Reality",
      artist: "Michael Brown",
      price: "$3,900",
      image: artwork1,
    },
    {
      id: 4,
      title: "Color Symphony",
      artist: "Anna Wilson",
      price: "$4,500",
      image: artwork2,
    },
  ];

  const latestArtworks = [
    {
      id: 1,
      title: "Modern Landscape",
      artist: "Robert Davis",
      price: "$2,400",
      image: artwork2,
    },
    {
      id: 2,
      title: "City Lights",
      artist: "Jennifer Lee",
      price: "$3,100",
      image: artwork3,
    },
    {
      id: 3,
      title: "Ocean Depths",
      artist: "Thomas Garcia",
      price: "$2,900",
      image: artwork4,
    },
    {
      id: 4,
      title: "Spring Awakening",
      artist: "Lisa Chen",
      price: "$3,600",
      image: artwork1,
    },
  ];

  const featuredArtists = [
    {
      id: 1,
      name: "Elena Marchetti",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      artworks: 24
    },
    {
      id: 2,
      name: "David Chen", 
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      artworks: 18
    },
    {
      id: 3,
      name: "Maria Rodriguez",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      artworks: 32
    },
    {
      id: 4,
      name: "James Thompson",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      artworks: 15
    },
    {
      id: 5,
      name: "Sarah Wilson",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=face",
      artworks: 28
    }
  ];

  const ArtworkCard = ({ artwork, size = "normal" }) => (
    <Card className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300">
      <CardContent className="p-0">
        <div className={`relative overflow-hidden ${size === "large" ? "aspect-[4/3]" : "aspect-square"}`}>
          <img
            src={artwork.image}
            alt={artwork.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button variant="secondary" size="sm" className="bg-white/90 text-black hover:bg-white">
              <Eye className="mr-2 h-4 w-4" />
              View
            </Button>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1">{artwork.title}</h3>
          <p className="text-muted-foreground text-sm mb-2">by {artwork.artist}</p>
          <div className="flex items-center justify-between">
            <span className="font-bold text-lg">{artwork.price}</span>
            <Button variant="outline" size="sm">
              <ShoppingBag className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${galleryHero})` }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl px-4">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
            Art That Speaks To
            <span className="block text-gallery-gold">Your Soul</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto">
            Discover extraordinary contemporary art and timeless masterpieces
          </p>
          <Button variant="default" size="lg" asChild>
            <Link to="/artworks">
              Explore Collection
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Featured Artworks Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-serif font-bold">Featured Artworks</h2>
            <Button variant="outline" asChild>
              <Link to="/artworks">View All</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredArtworks.map((artwork) => (
              <ArtworkCard key={artwork.id} artwork={artwork} size="large" />
            ))}
          </div>
        </div>
      </section>

      {/* Painting Collection */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-serif font-bold">Painting Collection</h2>
            <Button variant="outline" asChild>
              <Link to="/artworks">View All</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {paintingCollection.map((artwork) => (
              <ArtworkCard key={artwork.id} artwork={artwork} />
            ))}
          </div>
        </div>
      </section>

      {/* Artist Profiles */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-serif font-bold">Artist Profiles</h2>
            <Button variant="outline" asChild>
              <Link to="/artists">View All</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {featuredArtists.map((artist) => (
              <Card key={artist.id} className="text-center overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={artist.image}
                      alt={artist.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-1">{artist.name}</h3>
                    <p className="text-sm text-muted-foreground">{artist.artworks} artworks</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Curator's Choice */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-serif font-bold">Curator's Choice</h2>
            <Button variant="outline" asChild>
              <Link to="/artworks">View All</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {curatorsChoice.map((artwork) => (
              <ArtworkCard key={artwork.id} artwork={artwork} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Artworks */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-serif font-bold">Latest Artworks</h2>
            <Button variant="outline" asChild>
              <Link to="/artworks">View All</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {latestArtworks.map((artwork) => (
              <ArtworkCard key={artwork.id} artwork={artwork} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-lg opacity-90">Artists</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">2.5K+</div>
              <div className="text-lg opacity-90">Artworks</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1K+</div>
              <div className="text-lg opacity-90">Collectors</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-lg opacity-90">Countries</div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Stay Updated</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get the latest updates on new artworks, exhibitions, and exclusive events
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Button variant="default" size="lg" className="flex-1">
              Subscribe to Newsletter
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;