import { Link } from "react-router-dom";
import { MapPin, Award, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Artists = () => {
  const artists = [
    {
      id: 1,
      name: "Elena Marchetti",
      specialization: "Contemporary Abstract",
      location: "Milan, Italy",
      bio: "Elena is known for her bold use of burgundy and gold tones, creating deeply emotional abstract pieces that explore themes of passion and tranquility.",
      achievements: ["Venice Biennale 2022", "Guggenheim Fellowship", "MoMA Collection"],
      yearsActive: "15+ years",
      artworkCount: 47,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      featured: true,
    },
    {
      id: 2,
      name: "David Chen",
      specialization: "Geometric Minimalism",
      location: "Tokyo, Japan",
      bio: "David's work focuses on the intersection of technology and art, using precise geometric forms to create meditative spaces that challenge perception.",
      achievements: ["Ars Electronica Prize", "Digital Art Museum Tokyo", "Tech Art Festival Winner"],
      yearsActive: "12+ years",
      artworkCount: 32,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      featured: true,
    },
    {
      id: 3,
      name: "Maria Rodriguez",
      specialization: "Landscape & Nature",
      location: "Barcelona, Spain",
      bio: "Maria captures the raw beauty of landscapes with vibrant colors and dynamic brushstrokes, bringing the energy of nature into contemporary spaces.",
      achievements: ["European Art Prize", "National Gallery Madrid", "Landscape Artist of the Year"],
      yearsActive: "18+ years",
      artworkCount: 63,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      featured: false,
    },
    {
      id: 4,
      name: "James Thompson",
      specialization: "Portrait & Figurative",
      location: "London, UK",
      bio: "James brings a modern twist to classical portraiture, capturing the essence of human emotion through innovative techniques and compelling compositions.",
      achievements: ["Royal Academy Summer Exhibition", "National Portrait Gallery", "BP Portrait Award"],
      yearsActive: "20+ years",
      artworkCount: 89,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      featured: true,
    },
    {
      id: 5,
      name: "Sophie Laurent",
      specialization: "Mixed Media & Sculpture",
      location: "Paris, France",
      bio: "Sophie's innovative approach combines traditional sculpture with digital elements, creating immersive installations that blur the lines between physical and virtual art.",
      achievements: ["Centre Pompidou Collection", "Digital Art Biennale", "Innovation in Art Award"],
      yearsActive: "10+ years",
      artworkCount: 28,
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
      featured: false,
    },
    {
      id: 6,
      name: "Roberto Silva",
      specialization: "Street Art & Urban",
      location: "São Paulo, Brazil",
      bio: "Roberto transforms urban environments through powerful murals and gallery pieces that address social themes with vibrant colors and bold statements.",
      achievements: ["São Paulo Art Festival", "Urban Art Museum", "Social Impact Artist Award"],
      yearsActive: "8+ years",
      artworkCount: 41,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      featured: false,
    }
  ];

  const featuredArtists = artists.filter(artist => artist.featured);
  const allArtists = artists;

  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-primary">
            Our Artists
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Meet the talented artists whose creativity and vision bring our gallery to life. 
            Each artist brings their unique perspective and mastery to create extraordinary works of art.
          </p>
        </div>

        {/* Featured Artists */}
        <section className="mb-20">
          <div className="flex items-center mb-12">
            <Award className="h-6 w-6 text-gallery-gold mr-3" />
            <h2 className="text-3xl font-serif font-bold text-primary">
              Featured Artists
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredArtists.map((artist, index) => (
              <Card
                key={artist.id}
                className="group gallery-hover overflow-hidden border-0 shadow-lg bg-card/80 backdrop-blur-sm"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-0">
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={artist.image}
                      alt={artist.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-gallery-gold/90 text-black">
                        Featured
                      </Badge>
                    </div>
                    <div className="artwork-overlay group-hover:opacity-100 flex items-end">
                      <div className="p-6 text-white w-full">
                        <Button variant="hero" className="w-full" asChild>
                          <Link to={`/artists/${artist.id}`}>
                            View Portfolio
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl font-semibold mb-2 text-primary">
                      {artist.name}
                    </h3>
                    <p className="text-accent font-medium mb-2">{artist.specialization}</p>
                    <div className="flex items-center text-muted-foreground text-sm mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      {artist.location}
                    </div>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {artist.bio}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {artist.artworkCount} artworks
                      </span>
                      <span className="text-muted-foreground">
                        {artist.yearsActive}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* All Artists */}
        <section>
          <div className="flex items-center mb-12">
            <Palette className="h-6 w-6 text-primary mr-3" />
            <h2 className="text-3xl font-serif font-bold text-primary">
              All Artists
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allArtists.map((artist, index) => (
              <Card
                key={artist.id}
                className="group gallery-hover border border-border/50 hover:border-accent/50"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <img
                      src={artist.image}
                      alt={artist.name}
                      className="w-16 h-16 rounded-full object-cover ring-2 ring-accent/20"
                    />
                    <div className="flex-1">
                      <h3 className="font-serif text-lg font-semibold text-primary mb-1">
                        {artist.name}
                      </h3>
                      <p className="text-accent text-sm font-medium mb-1">
                        {artist.specialization}
                      </p>
                      <div className="flex items-center text-muted-foreground text-xs">
                        <MapPin className="h-3 w-3 mr-1" />
                        {artist.location}
                      </div>
                    </div>
                    {artist.featured && (
                      <Badge variant="secondary" className="bg-gallery-gold/20 text-gallery-gold border-gallery-gold/30">
                        Featured
                      </Badge>
                    )}
                  </div>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {artist.bio}
                  </p>

                  <div className="mb-4">
                    <p className="text-xs text-muted-foreground mb-2">Recent Achievements:</p>
                    <div className="flex flex-wrap gap-1">
                      {artist.achievements.slice(0, 2).map((achievement, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {achievement}
                        </Badge>
                      ))}
                      {artist.achievements.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{artist.achievements.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">
                      <span>{artist.artworkCount} works • </span>
                      <span>{artist.yearsActive}</span>
                    </div>
                    <Button variant="elegant" size="sm" asChild>
                      <Link to={`/artists/${artist.id}`}>
                        View Portfolio
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-20 text-center">
          <Card className="p-12 bg-muted/20 border-border/50">
            <h3 className="text-2xl font-serif font-bold mb-4 text-primary">
              Interested in Commissioning a Piece?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our artists are available for custom commissions. Contact us to discuss 
              your vision and create something truly unique for your space.
            </p>
            <Button variant="default" size="lg" asChild>
              <Link to="/contact">
                Inquire About Commissions
              </Link>
            </Button>
          </Card>
        </section>
      </div>
    </main>
  );
};

export default Artists;