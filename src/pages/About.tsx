import { Quote, Award, Users, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import galleryHero from "@/assets/gallery-hero.jpg";

const About = () => {
  const teamMembers = [
    {
      name: "Victoria Sterling",
      role: "Gallery Director & Curator",
      bio: "With over 15 years in contemporary art curation, Victoria has shaped the gallery's vision and established relationships with emerging and established artists worldwide.",
      image: galleryHero,
    },
    {
      name: "Marcus Chen",
      role: "Senior Art Consultant",
      bio: "Marcus brings expertise in art valuation and collection management, helping clients discover pieces that resonate with their aesthetic and investment goals.",
      image: galleryHero,
    },
    {
      name: "Isabella Rodriguez",
      role: "Education & Outreach Director",
      bio: "Isabella develops our educational programs and community partnerships, making contemporary art accessible to diverse audiences through innovative initiatives.",
      image: galleryHero,
    },
  ];

  const achievements = [
    {
      icon: Award,
      title: "20+ Years",
      description: "Of excellence in contemporary art curation",
    },
    {
      icon: Users,
      title: "500+ Artists",
      description: "Represented from around the globe",
    },
    {
      icon: Heart,
      title: "10,000+ Collectors",
      description: "Trust us with their art acquisitions",
    },
  ];

  return (
    <main className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-primary">
            About Artisan Gallery
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A sanctuary for contemporary art, where creativity meets sophistication and every piece tells a unique story
          </p>
        </div>

        {/* Hero Image & Mission */}
        <div className="mb-20">
          <div className="relative aspect-[21/9] rounded-2xl overflow-hidden mb-12">
            <img
              src={galleryHero}
              alt="Artisan Gallery Interior"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                Where Art Meets Soul
              </h2>
              <p className="text-lg opacity-90 max-w-2xl">
                Since 2004, we've been a beacon for contemporary art enthusiasts, 
                fostering connections between artists and collectors in an atmosphere of elegance and discovery.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-primary">
                Our Story
              </h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  Founded in the heart of the arts district, Artisan Gallery emerged from a passion for 
                  contemporary expression and a vision to create a space where art transcends boundaries. 
                  Our journey began with a simple belief: that extraordinary art has the power to transform 
                  spaces, inspire conversations, and touch the human spirit.
                </p>
                <p>
                  Over two decades, we have carefully curated a collection that represents the finest in 
                  contemporary art, from emerging talents to internationally acclaimed masters. Each piece 
                  in our gallery is selected not just for its aesthetic merit, but for its ability to 
                  provoke thought, evoke emotion, and challenge perspectives.
                </p>
                <p>
                  Today, Artisan Gallery stands as more than a commercial space—we are a cultural hub, 
                  an educational resource, and a community gathering place for those who appreciate the 
                  transformative power of art.
                </p>
              </div>
            </div>
            
            <div className="elegant-gradient p-8 rounded-2xl">
              <div className="text-center">
                <Quote className="h-12 w-12 text-accent mx-auto mb-6" />
                <blockquote className="text-xl font-serif italic text-primary mb-6">
                  "Art is not what you see, but what you make others see. At Artisan Gallery, 
                  we believe every piece should inspire a new way of looking at the world."
                </blockquote>
                <cite className="text-muted-foreground">
                  — Victoria Sterling, Gallery Director
                </cite>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12 text-primary">
            Our Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <Card
                key={index}
                className="gallery-hover text-center border-0 shadow-lg"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="p-8">
                  <achievement.icon className="h-16 w-16 text-accent mx-auto mb-6" />
                  <h3 className="text-3xl font-bold text-primary mb-4">
                    {achievement.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {achievement.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Our Mission & Values */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-primary">
              Our Mission & Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Guided by principles that define our commitment to art, artists, and community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border border-border/50 hover:border-accent/50 transition-colors">
              <CardContent className="p-8">
                <h3 className="text-2xl font-serif font-bold mb-4 text-primary">
                  Our Mission
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  To discover, showcase, and celebrate contemporary art that challenges conventions, 
                  inspires dialogue, and enriches the cultural landscape. We are committed to supporting 
                  artists at every stage of their careers while making exceptional art accessible to 
                  collectors and enthusiasts alike.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-border/50 hover:border-accent/50 transition-colors">
              <CardContent className="p-8">
                <h3 className="text-2xl font-serif font-bold mb-4 text-primary">
                  Our Values
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <span>Authenticity in every piece we represent</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <span>Excellence in curation and presentation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <span>Inclusivity and accessibility in art appreciation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <span>Innovation in bridging traditional and contemporary</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Team */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-primary">
              Meet Our Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Passionate professionals dedicated to connecting you with extraordinary art
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="gallery-hover overflow-hidden border-0 shadow-lg"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="p-0">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl font-bold mb-2 text-primary">
                      {member.name}
                    </h3>
                    <p className="text-accent font-medium mb-4">
                      {member.role}
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="luxury-gradient rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Visit Our Gallery
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Experience our collection in person and discover the pieces that speak to your soul. 
            Our team is here to guide you through your art journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg">
              Schedule a Visit
            </Button>
            <Button variant="outline" size="lg" className="bg-white text-primary border-white hover:bg-white/90">
              Contact Our Team
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default About;