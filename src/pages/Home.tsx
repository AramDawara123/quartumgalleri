import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowRight, Calendar, Eye, ShoppingBag, Palette, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import galleryHero from "@/assets/gallery-hero.jpg";

const Home = () => {
  const { toast } = useToast();
  const [featuredArtworks, setFeaturedArtworks] = useState<any[]>([]);
  const [featuredArtists, setFeaturedArtists] = useState<any[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHomeData();
  }, []);

  const loadHomeData = async () => {
    setLoading(true);

    // Load featured artworks
    const { data: artworks } = await supabase
      .from('artworks')
      .select(`
        *,
        artists (name)
      `)
      .eq('available', true)
      .order('created_at', { ascending: false })
      .limit(4);

    if (artworks) {
      setFeaturedArtworks(artworks);
    }

    // Load featured artists
    const { data: artists } = await supabase
      .from('artists')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(3);

    if (artists) {
      setFeaturedArtists(artists);
    }

    // Load upcoming events
    const { data: events } = await supabase
      .from('events')
      .select('*')
      .gte('event_date', new Date().toISOString())
      .order('event_date')
      .limit(3);

    if (events) {
      setUpcomingEvents(events);
    }

    setLoading(false);
  };

  const faqs = [
    {
      question: "What are your shipping options?",
      answer: "We offer worldwide shipping for all artworks. Standard shipping takes 5-7 business days, while express shipping delivers within 2-3 business days. All artworks are professionally packaged and fully insured during transit."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship to over 100 countries worldwide. International shipping typically takes 7-14 business days depending on your location. All customs fees and import duties are the responsibility of the buyer."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 14-day return policy for all artworks. If you're not completely satisfied with your purchase, you can return it for a full refund. The artwork must be in its original condition and packaging. Return shipping costs are covered by the buyer."
    },
    {
      question: "Are the artworks authentic and original?",
      answer: "Absolutely. All artworks in our gallery are 100% original pieces created by the listed artists. Each artwork comes with a certificate of authenticity signed by the artist and our gallery director."
    },
    {
      question: "Can I view the artwork before purchasing?",
      answer: "Yes! We encourage you to visit our gallery in person to view artworks. You can also request additional high-resolution images or schedule a virtual viewing appointment with one of our art consultants."
    },
    {
      question: "Do you offer framing services?",
      answer: "We offer professional framing services for all artworks. Our expert framers can help you select the perfect frame to complement your piece. Custom framing typically adds 5-7 business days to your delivery time."
    }
  ];


  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${galleryHero})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto animate-fade-in">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 tracking-tight">
            Where Art
            <span className="block text-gallery-gold mt-2">Comes Alive</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-10 font-light max-w-3xl mx-auto leading-relaxed opacity-90">
            Discover extraordinary contemporary art and timeless masterpieces in our curated collection
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="hero" size="lg" asChild className="w-full sm:w-auto">
              <Link to="/artworks" className="inline-flex items-center">
                Explore Collection
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="elegant" size="lg" asChild className="w-full sm:w-auto">
              <Link to="/events" className="inline-flex items-center">
                View Exhibitions
                <Calendar className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Artworks */}
      <section className="py-16 md:py-24 px-4 bg-background">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12 md:mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4 text-primary">
              Featured Collection
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Handpicked masterpieces from renowned contemporary artists
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="overflow-hidden border-0 shadow-md">
                  <CardContent className="p-0">
                    <div className="aspect-[3/4] bg-muted animate-pulse" />
                    <div className="p-6 space-y-3">
                      <div className="h-6 bg-muted animate-pulse rounded" />
                      <div className="h-4 bg-muted animate-pulse rounded w-2/3" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {featuredArtworks.map((artwork, index) => (
                <Card
                  key={artwork.id}
                  className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300"
                  style={{ 
                    animation: 'fade-in 0.5s ease-out',
                    animationDelay: `${index * 0.1}s`,
                    animationFillMode: 'both'
                  }}
                >
                  <Link to={`/artworks/${artwork.id}`}>
                    <CardContent className="p-0">
                      <div className="relative aspect-[3/4] overflow-hidden">
                        <img
                          src={artwork.image_url || '/placeholder.svg'}
                          alt={artwork.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                          <Button variant="hero" size="sm" className="backdrop-blur-sm">
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </Button>
                        </div>
                      </div>
                      <div className="p-4 md:p-6 bg-card">
                        <h3 className="font-serif text-lg md:text-xl font-semibold mb-1 text-primary line-clamp-1">
                          {artwork.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">by {artwork.artists?.name || 'Unknown'}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xl md:text-2xl font-bold text-accent">
                            €{artwork.price.toLocaleString()}
                          </span>
                          <Button variant="luxury" size="sm">
                            <ShoppingBag className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          )}

          <div className="text-center mt-10 md:mt-12">
            <Button variant="default" size="lg" asChild>
              <Link to="/artworks" className="inline-flex items-center">
                View Full Collection
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Artists */}
      <section className="py-16 md:py-24 px-4 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12 md:mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4 text-primary">
              Featured Artists
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Meet the talented creators behind our extraordinary collection
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="overflow-hidden border-0 shadow-md">
                  <CardContent className="p-0">
                    <div className="aspect-square bg-muted animate-pulse" />
                    <div className="p-6 space-y-3">
                      <div className="h-6 bg-muted animate-pulse rounded" />
                      <div className="h-4 bg-muted animate-pulse rounded w-2/3" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {featuredArtists.map((artist, index) => (
                <Card
                  key={artist.id}
                  className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-card"
                  style={{ 
                    animation: 'fade-in 0.5s ease-out',
                    animationDelay: `${index * 0.1}s`,
                    animationFillMode: 'both'
                  }}
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={artist.image_url || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop'}
                          alt={artist.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Button variant="hero" size="sm" className="backdrop-blur-sm" asChild>
                          <Link to={`/artists/${artist.id}`} className="inline-flex items-center">
                            <Eye className="mr-2 h-4 w-4" />
                            View Profile
                          </Link>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-4 md:p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-serif text-lg md:text-xl font-semibold text-primary line-clamp-1">
                          {artist.name}
                        </h3>
                        <Award className="h-5 w-5 text-gallery-gold flex-shrink-0" />
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                        {artist.bio || 'Talented contemporary artist'}
                      </p>
                      
                      <Button variant="elegant" size="sm" asChild className="w-full">
                        <Link to={`/artists/${artist.id}`} className="inline-flex items-center justify-center">
                          View Profile
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="text-center mt-10 md:mt-12">
            <Button variant="default" size="lg" asChild>
              <Link to="/artists" className="inline-flex items-center">
                Meet All Artists
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 md:py-24 px-4 bg-background">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12 md:mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4 text-primary">
              Upcoming Events
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Join us for exclusive exhibitions, workshops, and art experiences
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="border border-border/50">
                  <CardContent className="p-6 md:p-8 space-y-3">
                    <div className="h-4 bg-muted animate-pulse rounded w-1/3" />
                    <div className="h-6 bg-muted animate-pulse rounded w-3/4" />
                    <div className="h-16 bg-muted animate-pulse rounded" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {upcomingEvents.map((event, index) => (
                <Card
                  key={event.id}
                  className="border border-border/50 hover:border-accent/50 hover:shadow-lg transition-all duration-300"
                  style={{ 
                    animation: 'fade-in 0.5s ease-out',
                    animationDelay: `${index * 0.1}s`,
                    animationFillMode: 'both'
                  }}
                >
                  <CardContent className="p-6 md:p-8">
                    <div className="text-sm font-medium text-accent mb-3">
                      {format(new Date(event.event_date), 'MMMM dd, yyyy')}
                    </div>
                    <h3 className="font-serif text-lg md:text-xl font-semibold mb-3 text-primary line-clamp-2">
                      {event.title}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground mb-6 leading-relaxed line-clamp-3">
                      {event.description}
                    </p>
                    <Button variant="elegant" className="w-full" asChild>
                      <Link to="/events">Learn More</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No upcoming events at the moment</p>
            </div>
          )}

          <div className="text-center mt-10 md:mt-12">
            <Button variant="default" size="lg" asChild>
              <Link to="/events" className="inline-flex items-center">
                View All Events
                <Calendar className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 md:mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4 text-primary">
              Frequently Asked Questions
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about purchasing and shipping artworks
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border/50 rounded-lg px-6 bg-card hover:border-accent/50 transition-colors"
              >
                <AccordionTrigger className="text-left hover:no-underline py-4">
                  <span className="font-semibold text-base md:text-lg text-primary pr-4">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-br from-primary via-primary/95 to-accent text-white">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4 md:mb-6">
            Start Your Art Journey
          </h2>
          <p className="text-base md:text-lg lg:text-xl mb-8 md:mb-10 max-w-2xl mx-auto opacity-90 leading-relaxed">
            Discover pieces that speak to your soul and transform your space with extraordinary art
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="hero" size="lg" asChild className="w-full sm:w-auto">
              <Link to="/artworks">
                Browse Collection
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto bg-white text-primary border-white hover:bg-white/90 hover:text-primary"
              asChild
            >
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