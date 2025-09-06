import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Award, Eye, ShoppingBag, Calendar, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import artwork1 from "@/assets/artwork-1.jpg";
import artwork2 from "@/assets/artwork-2.jpg";
import artwork3 from "@/assets/artwork-3.jpg";
import artwork4 from "@/assets/artwork-4.jpg";

const ArtistProfile = () => {
  const { id } = useParams();

  // Artist data (in a real app, this would come from an API)
  const artists = {
    "1": {
      id: 1,
      name: "Elena Marchetti",
      specialization: "Contemporary Abstract",
      location: "Milan, Italy",
      bio: "Elena Marchetti is a contemporary abstract artist whose work explores the depths of human emotion through bold color palettes and dynamic compositions. Born in Milan, she has spent over fifteen years developing her unique style that combines traditional painting techniques with modern conceptual frameworks. Her signature use of burgundy and gold tones creates deeply emotional pieces that resonate with viewers on a visceral level.",
      fullBio: "Elena's artistic journey began at the Brera Academy in Milan, where she studied under renowned abstract expressionist Marco Fontana. Her early work was heavily influenced by the Italian masters, but she gradually developed her own voice through experimentation with color theory and emotional expression. Her breakthrough came in 2018 with the 'Burgundy Dreams' series, which explored themes of passion, memory, and the subconscious mind. Since then, her work has been featured in major galleries across Europe and North America, earning critical acclaim for its emotional depth and technical mastery.",
      achievements: [
        "Venice Biennale 2022 - Represented Italy",
        "Guggenheim Fellowship Recipient 2021",
        "MoMA Permanent Collection",
        "European Contemporary Art Prize 2020",
        "Solo Exhibition at Palazzo Grassi, Venice"
      ],
      exhibitions: [
        { year: "2024", title: "Emotional Landscapes", venue: "Tate Modern, London" },
        { year: "2023", title: "Color and Memory", venue: "Centre Pompidou, Paris" },
        { year: "2022", title: "Venice Biennale", venue: "Italian Pavilion" },
        { year: "2021", title: "Abstract Realities", venue: "Guggenheim Museum, NYC" }
      ],
      yearsActive: "15+ years",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=600&h=600&fit=crop&crop=face",
      website: "www.elenamarchetti.art",
      social: {
        instagram: "@elena.marchetti.art",
        website: "www.elenamarchetti.art"
      },
      artworks: [
        {
          id: 1,
          title: "Burgundy Dreams",
          year: "2023",
          medium: "Oil on Canvas",
          dimensions: "36\" x 48\"",
          price: "$3,200",
          description: "A powerful exploration of subconscious desires rendered in rich burgundy tones with gold accents.",
          image: artwork1,
          available: true
        },
        {
          id: 2,
          title: "Golden Reverie",
          year: "2023",
          medium: "Acrylic and Gold Leaf",
          dimensions: "30\" x 40\"",
          price: "$2,800",
          description: "An ethereal piece that captures the fleeting moments between dreams and reality.",
          image: artwork2,
          available: true
        },
        {
          id: 3,
          title: "Crimson Depths",
          year: "2022",
          medium: "Mixed Media on Canvas",
          dimensions: "48\" x 60\"",
          price: "$4,500",
          description: "A monumental work exploring the depths of human emotion through layered textures and colors.",
          image: artwork3,
          available: false
        },
        {
          id: 4,
          title: "Twilight Embrace",
          year: "2024",
          medium: "Oil on Canvas",
          dimensions: "24\" x 36\"",
          price: "$2,400",
          description: "A tender piece capturing the intimate moments of dusk with warm, embracing tones.",
          image: artwork4,
          available: true
        }
      ]
    }
    // Add other artists here...
  };

  const artist = artists[id as keyof typeof artists];

  if (!artist) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Artist Not Found</h1>
          <Button asChild>
            <Link to="/artists">Back to Artists</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Button variant="ghost" className="mb-8" asChild>
          <Link to="/artists">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Artists
          </Link>
        </Button>

        {/* Artist Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          <div className="lg:col-span-1">
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <img
                src={artist.image}
                alt={artist.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold mb-3 text-primary">
                  {artist.name}
                </h1>
                <p className="text-xl text-accent font-medium mb-2">
                  {artist.specialization}
                </p>
                <div className="flex items-center text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4 mr-2" />
                  {artist.location}
                </div>
              </div>
              <Badge variant="secondary" className="bg-gallery-gold/20 text-gallery-gold">
                {artist.yearsActive}
              </Badge>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6">
              {artist.bio}
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-primary mb-2">About the Artist</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {artist.fullBio}
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <Button variant="default" asChild>
                  <a href={`https://${artist.website}`} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Visit Website
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/contact">
                    Commission Work
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements & Exhibitions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <Award className="h-5 w-5 text-gallery-gold mr-2" />
              <h3 className="text-xl font-serif font-semibold text-primary">
                Achievements
              </h3>
            </div>
            <div className="space-y-2">
              {artist.achievements.map((achievement, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0" />
                  <p className="text-muted-foreground text-sm">{achievement}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center mb-4">
              <Calendar className="h-5 w-5 text-primary mr-2" />
              <h3 className="text-xl font-serif font-semibold text-primary">
                Recent Exhibitions
              </h3>
            </div>
            <div className="space-y-3">
              {artist.exhibitions.map((exhibition, index) => (
                <div key={index} className="border-l-2 border-accent/30 pl-4">
                  <div className="flex items-center space-x-2 mb-1">
                    <Badge variant="outline" className="text-xs">
                      {exhibition.year}
                    </Badge>
                    <h4 className="font-medium text-primary text-sm">
                      {exhibition.title}
                    </h4>
                  </div>
                  <p className="text-muted-foreground text-xs">
                    {exhibition.venue}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Separator className="mb-16" />

        {/* Artworks Section */}
        <section>
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-serif font-bold text-primary">
              Available Artworks
            </h2>
            <p className="text-muted-foreground">
              {artist.artworks.filter(art => art.available).length} of {artist.artworks.length} available
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artist.artworks.map((artwork, index) => (
              <Card
                key={artwork.id}
                className={`group gallery-hover overflow-hidden border-0 shadow-lg ${
                  !artwork.available ? 'opacity-75' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-0">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={artwork.image}
                      alt={artwork.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {!artwork.available && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Badge variant="secondary" className="bg-red-500 text-white">
                          Sold
                        </Badge>
                      </div>
                    )}
                    {artwork.available && (
                      <div className="artwork-overlay group-hover:opacity-100 flex items-end">
                        <div className="p-6 text-white">
                          <Button variant="hero" size="sm">
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-serif text-lg font-semibold text-primary">
                        {artwork.title}
                      </h3>
                      <Badge variant="outline" className="text-xs">
                        {artwork.year}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm mb-2">
                      {artwork.medium} • {artwork.dimensions}
                    </p>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {artwork.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-accent">
                        {artwork.price}
                      </span>
                      {artwork.available ? (
                        <Button variant="luxury" size="sm">
                          <ShoppingBag className="mr-2 h-4 w-4" />
                          Purchase
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm" disabled>
                          Sold Out
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
              <Button variant="outline" size="lg" asChild>
                <a href={`https://${artist.website}`} target="_blank" rel="noopener noreferrer">
                  Visit Artist Website
                </a>
              </Button>
            </div>
          </Card>
        </section>
      </div>
    </main>
  );
};

export default ArtistProfile;