import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Eye, ShoppingBag } from "lucide-react";
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
      title: "Burgundy Dreams",
      artist: "Elena Marchetti",
      price: "$3,200",
      image: artwork1,
    },
    {
      id: 2,
      title: "Geometric Serenity",
      artist: "David Chen",
      price: "$2,800",
      image: artwork2,
    },
    {
      id: 3,
      title: "Vivid Landscapes",
      artist: "Maria Rodriguez",
      price: "$4,100",
      image: artwork3,
    },
    {
      id: 4,
      title: "Portrait in Motion",
      artist: "James Thompson",
      price: "$3,500",
      image: artwork4,
    },
  ];

  const upcomingEvents = [
    {
      date: "March 15, 2024",
      title: "Contemporary Visions Exhibition",
      description: "Featuring works by emerging contemporary artists",
    },
    {
      date: "March 22, 2024",
      title: "Artist Workshop: Abstract Techniques",
      description: "Learn advanced abstract painting methods",
    },
    {
      date: "April 5, 2024",
      title: "Gallery Night Opening",
      description: "Exclusive preview of new acquisitions",
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${galleryHero})` }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 text-center text-white fade-in-up max-w-4xl px-4">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 tracking-tight">
            Where Art
            <span className="block text-gallery-gold">Comes Alive</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light max-w-2xl mx-auto leading-relaxed">
            Discover extraordinary contemporary art and timeless masterpieces in our curated collection
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <Link to="/artworks">
                Explore Collection
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="elegant" size="lg" asChild>
              <Link to="/events">
                View Exhibitions
                <Calendar className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Artworks */}
      <section className="py-20 px-4 elegant-gradient">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-primary">
              Featured Collection
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Handpicked masterpieces from renowned contemporary artists
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredArtworks.map((artwork, index) => (
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
                    <div className="artwork-overlay group-hover:opacity-100 flex items-end">
                      <div className="p-6 text-white">
                        <Button variant="hero" size="sm">
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl font-semibold mb-2 text-primary">
                      {artwork.title}
                    </h3>
                    <p className="text-muted-foreground mb-3">by {artwork.artist}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-accent">
                        {artwork.price}
                      </span>
                      <Button variant="luxury" size="sm">
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="default" size="lg" asChild>
              <Link to="/artworks">
                View Full Collection
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-primary">
              Upcoming Events
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join us for exclusive exhibitions, workshops, and art experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <Card
                key={index}
                className="gallery-hover border border-border/50 hover:border-accent/50"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <CardContent className="p-8">
                  <div className="text-sm font-medium text-accent mb-3">
                    {event.date}
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-4 text-primary">
                    {event.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {event.description}
                  </p>
                  <Button variant="elegant" className="w-full">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="default" size="lg" asChild>
              <Link to="/events">
                View All Events
                <Calendar className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 luxury-gradient text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Start Your Art Journey
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Discover pieces that speak to your soul and transform your space with extraordinary art
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <Link to="/artworks">
                Browse Collection
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-luxury">
              <Link to="/contact">
                Get in Touch
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;