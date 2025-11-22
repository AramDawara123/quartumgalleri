import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
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
  const heroRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    loadHomeData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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
      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat parallax-hero"
          style={{ 
            backgroundImage: `url(${galleryHero})`,
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-nordic-sunset-start/20 via-nordic-glacier/30 to-nordic-sunset-end/20" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 tracking-tight text-reveal">
            Where Art
            <span className="block text-nordic-gold mt-2 drop-shadow-[0_2px_10px_rgba(255,215,0,0.3)]">Comes Alive</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-10 font-light max-w-3xl mx-auto leading-relaxed text-nordic-white/90 text-reveal" style={{ animationDelay: '0.3s' }}>
            Discover extraordinary contemporary art and timeless masterpieces in our curated collection
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-reveal" style={{ animationDelay: '0.6s' }}>
            <Button variant="hero" size="lg" asChild className="w-full sm:w-auto button-float" style={{ animationDelay: '0s' }}>
              <Link to="/artworks" className="inline-flex items-center">
                Explore Collection
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="elegant" size="lg" asChild className="w-full sm:w-auto button-float" style={{ animationDelay: '0.3s' }}>
              <Link to="/events" className="inline-flex items-center">
                View Exhibitions
                <Calendar className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Artworks */}
      <section className="py-16 md:py-24 px-4 bg-nordic-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12 md:mb-16 slide-up-on-scroll">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4 text-nordic-charcoal">
              Featured Collection
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Handpicked masterpieces from renowned contemporary artists
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="overflow-hidden nordic-border nordic-shadow bg-white">
                  <CardContent className="p-0">
                    <div className="aspect-[3/4] bg-nordic-grey animate-pulse" />
                    <div className="p-6 space-y-3">
                      <div className="h-6 bg-nordic-grey animate-pulse rounded" />
                      <div className="h-4 bg-nordic-grey animate-pulse rounded w-2/3" />
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
                  className="group overflow-hidden nordic-border nordic-shadow-hover bg-white"
                  style={{ 
                    animation: 'slide-up 0.6s ease-out',
                    animationDelay: `${index * 0.15}s`,
                    animationFillMode: 'both'
                  }}
                >
                  <Link to={`/artworks/${artwork.id}`}>
                    <CardContent className="p-0">
                      <div className="relative aspect-[3/4] overflow-hidden">
                        <img
                          src={artwork.image_url || '/placeholder.svg'}
                          alt={artwork.title}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-nordic-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                          <Button variant="hero" size="sm" className="backdrop-blur-sm">
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </Button>
                        </div>
                      </div>
                      <div className="p-4 md:p-6 bg-white">
                        <h3 className="font-serif text-lg md:text-xl font-semibold mb-1 text-nordic-charcoal line-clamp-1">
                          {artwork.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">by {artwork.artists?.name || 'Unknown'}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xl md:text-2xl font-bold text-nordic-gold">
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
      <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-nordic-grey/30 to-nordic-white/50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12 md:mb-16 slide-up-on-scroll">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4 text-nordic-charcoal">
              Featured Artists
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Meet the talented creators behind our extraordinary collection
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="overflow-hidden nordic-border nordic-shadow bg-white">
                  <CardContent className="p-0">
                    <div className="aspect-square bg-nordic-grey animate-pulse" />
                    <div className="p-6 space-y-3">
                      <div className="h-6 bg-nordic-grey animate-pulse rounded" />
                      <div className="h-4 bg-nordic-grey animate-pulse rounded w-2/3" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
              {featuredArtists.map((artist, index) => (
                <Card
                  key={artist.id}
                  className="group overflow-hidden nordic-border nordic-shadow-hover bg-white"
                  style={{ 
                    animation: 'slide-up 0.6s ease-out',
                    animationDelay: `${index * 0.15}s`,
                    animationFillMode: 'both'
                  }}
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={artist.image_url || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop'}
                          alt={artist.name}
                          className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-nordic-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                        <Button variant="hero" size="sm" className="backdrop-blur-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500" asChild>
                          <Link to={`/artists/${artist.id}`} className="inline-flex items-center">
                            <Eye className="mr-2 h-4 w-4" />
                            View Profile
                          </Link>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-6 md:p-8">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-serif text-lg md:text-xl font-semibold text-nordic-charcoal line-clamp-1">
                          {artist.name}
                        </h3>
                        <Award className="h-5 w-5 text-nordic-gold flex-shrink-0" />
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-5 leading-relaxed line-clamp-3">
                        {artist.bio || 'Talented contemporary artist'}
                      </p>
                      
                      <Button variant="elegant" size="sm" asChild className="w-full group-hover:bg-nordic-gold group-hover:text-white transition-colors duration-300">
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
      <section className="py-16 md:py-24 px-4 bg-nordic-white relative">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4/5 max-w-3xl nordic-divider"></div>
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12 md:mb-16 slide-up-on-scroll">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4 text-nordic-charcoal">
              Upcoming Events
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Join us for exclusive exhibitions, workshops, and art experiences
            </p>
          </div>

          {loading ? (
            <div className="space-y-6 max-w-3xl mx-auto">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="nordic-border nordic-shadow bg-white">
                  <CardContent className="p-6 md:p-8 space-y-3">
                    <div className="h-4 bg-nordic-grey animate-pulse rounded w-1/3" />
                    <div className="h-6 bg-nordic-grey animate-pulse rounded w-3/4" />
                    <div className="h-16 bg-nordic-grey animate-pulse rounded" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : upcomingEvents.length > 0 ? (
            <div className="space-y-6 max-w-3xl mx-auto relative">
              <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-nordic-glacier via-nordic-ice to-transparent hidden md:block"></div>
              {upcomingEvents.map((event, index) => (
                <Card
                  key={event.id}
                  className="relative nordic-border nordic-shadow-hover bg-white ml-0 md:ml-16"
                  style={{ 
                    animation: 'slide-up 0.6s ease-out',
                    animationDelay: `${index * 0.15}s`,
                    animationFillMode: 'both'
                  }}
                >
                  <div className="absolute -left-16 top-8 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-nordic-glacier border-4 border-white shadow-lg">
                    <Calendar className="h-5 w-5 text-nordic-charcoal" />
                  </div>
                  <CardContent className="p-6 md:p-8">
                    <div className="text-sm font-semibold text-nordic-gold mb-3 tracking-wide uppercase">
                      {format(new Date(event.event_date), 'MMMM dd, yyyy')}
                    </div>
                    <h3 className="font-serif text-xl md:text-2xl font-semibold mb-3 text-nordic-charcoal line-clamp-2">
                      {event.title}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground mb-6 leading-relaxed line-clamp-3">
                      {event.description}
                    </p>
                    <Button variant="elegant" className="w-full md:w-auto" asChild>
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
      <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-nordic-grey/20 to-nordic-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 md:mb-16 slide-up-on-scroll">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4 text-nordic-charcoal">
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
                className="nordic-border rounded-lg px-6 bg-white nordic-shadow-hover overflow-hidden"
                style={{ 
                  animation: 'slide-up 0.5s ease-out',
                  animationDelay: `${index * 0.08}s`,
                  animationFillMode: 'both'
                }}
              >
                <AccordionTrigger className="text-left text-base md:text-lg font-semibold hover:text-nordic-gold transition-colors duration-300">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm md:text-base text-muted-foreground leading-relaxed pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Call to Action - Norwegian Aurora */}
      <section className="py-20 md:py-32 px-4 aurora-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-96 h-96 bg-nordic-gold rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-nordic-glacier rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-nordic-ice rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }} />
        </div>
        
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-bold mb-6 text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.3)] slide-up-on-scroll">
            Start Your Art Journey Today
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl mb-12 text-white/95 max-w-2xl mx-auto leading-relaxed font-light drop-shadow-[0_1px_10px_rgba(0,0,0,0.2)] slide-up-on-scroll" style={{ animationDelay: '0.2s' }}>
            Join thousands of art lovers who have discovered their perfect piece in our curated collection
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center slide-up-on-scroll" style={{ animationDelay: '0.4s' }}>
            <Button variant="hero" size="lg" asChild className="w-full sm:w-auto bg-white text-nordic-charcoal hover:bg-nordic-white hover:scale-105 transition-all duration-300 shadow-xl">
              <Link to="/artworks" className="inline-flex items-center">
                Browse Artworks
                <Palette className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="elegant" size="lg" asChild className="w-full sm:w-auto bg-nordic-charcoal/20 backdrop-blur-sm text-white border-2 border-white/30 hover:bg-nordic-charcoal/30 hover:scale-105 transition-all duration-300 shadow-xl">
              <Link to="/contact" className="inline-flex items-center">
                Contact Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;