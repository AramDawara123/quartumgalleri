import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Eye, ShoppingBag, Star, Quote, Palette, Award } from "lucide-react";
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

  const testimonials = [
    {
      id: 1,
      name: "Sarah Mitchell",
      role: "Art Collector",
      content: "Artisan Gallery has an incredible eye for contemporary art. Every piece I've purchased has become a conversation starter in my home.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Interior Designer",
      content: "The quality and curation at Artisan Gallery is unmatched. Their team helped me find the perfect pieces for my client's penthouse.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      role: "Art Enthusiast",
      content: "From emerging artists to established masters, this gallery showcases the very best. Their exhibitions are always thought-provoking.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const featuredArtists = [
    {
      id: 1,
      name: "Elena Marchetti",
      specialty: "Contemporary Abstract",
      bio: "Master of bold colors and emotional depth",
      artworks: 24,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      featured: true
    },
    {
      id: 2,
      name: "David Chen",
      specialty: "Geometric Art",
      bio: "Precision meets creativity in stunning compositions",
      artworks: 18,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      featured: true
    },
    {
      id: 3,
      name: "Maria Rodriguez",
      specialty: "Landscape Painting",
      bio: "Capturing nature's essence through vivid brushstrokes",
      artworks: 32,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      featured: true
    }
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen h-[110vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${galleryHero})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60" />
        </div>
        
        <div className="relative z-10 text-center text-white fade-in-up max-w-5xl px-4">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold mb-8 tracking-tight">
            Where Art
            <span className="block text-gallery-gold">Comes Alive</span>
          </h1>
          <p className="text-2xl md:text-3xl lg:text-4xl mb-12 font-light max-w-3xl mx-auto leading-relaxed opacity-90">
            Discover extraordinary contemporary art and timeless masterpieces in our curated collection
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
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
                className="group magnetic-hover card-glow overflow-hidden border-0 shadow-lg stagger-animation"
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
                        <Button variant="hero" size="sm" className="glass-effect">
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Button>
                      </div>
                    </div>
                    {/* Floating accent */}
                    <div className="absolute top-4 right-4 w-2 h-2 bg-gallery-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-card via-card to-muted/10">
                    <h3 className="font-serif text-xl font-semibold mb-2 text-primary">
                      {artwork.title}
                    </h3>
                    <p className="text-muted-foreground mb-3">by {artwork.artist}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-accent gold-shimmer bg-clip-text text-transparent">
                        {artwork.price}
                      </span>
                      <Button variant="luxury" size="sm" className="magnetic-hover">
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

      {/* Featured Artists */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-primary">
              Featured Artists
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Meet the talented creators behind our extraordinary collection
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredArtists.map((artist, index) => (
              <Card
                key={artist.id}
                className="group magnetic-hover card-glow overflow-hidden border-0 shadow-lg bg-gradient-to-br from-card via-card to-muted/20 stagger-animation"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-0">
                  <div className="relative">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={artist.image}
                        alt={artist.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Decorative overlay pattern */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-gallery-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    <div className="artwork-overlay group-hover:opacity-100 flex items-center justify-center">
                      <Button variant="hero" size="sm" className="glass-effect" asChild>
                        <Link to={`/artists/${artist.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Profile
                        </Link>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-6 relative">
                    {/* Subtle gradient accent */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gallery-gold/30 to-transparent"></div>
                    
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-serif text-xl font-semibold text-primary">
                        {artist.name}
                      </h3>
                      <Award className="h-5 w-5 text-gallery-gold pulse-glow" />
                    </div>
                    
                    <div className="flex items-center mb-3">
                      <Palette className="h-4 w-4 text-accent mr-2" />
                      <span className="text-sm font-medium text-accent">
                        {artist.specialty}
                      </span>
                    </div>
                    
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {artist.bio}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-border/30">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary gold-shimmer bg-clip-text text-transparent">{artist.artworks}</div>
                        <div className="text-xs text-muted-foreground">Artworks</div>
                      </div>
                      <Button variant="elegant" size="sm" className="magnetic-hover" asChild>
                        <Link to={`/artists/${artist.id}`}>
                          View Works
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="default" size="lg" asChild>
              <Link to="/artists">
                Meet All Artists
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

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-primary">
              What Our Collectors Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover why art enthusiasts and collectors trust us to curate their perfect pieces
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={testimonial.id}
                className="gallery-hover border border-border/50 hover:border-accent/50 bg-card/80 backdrop-blur-sm"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-gallery-gold text-gallery-gold" />
                    ))}
                  </div>
                  
                  <Quote className="h-8 w-8 text-accent/30 mb-4" />
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed italic">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="flex items-center">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4 ring-2 ring-accent/20"
                    />
                    <div>
                      <h4 className="font-semibold text-primary">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-16">
            <div className="inline-flex items-center space-x-6 p-6 bg-card rounded-lg border border-border/50">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Happy Collectors</div>
              </div>
              <div className="h-12 w-px bg-border"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">1200+</div>
                <div className="text-sm text-muted-foreground">Artworks Sold</div>
              </div>
              <div className="h-12 w-px bg-border"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">15+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
            </div>
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