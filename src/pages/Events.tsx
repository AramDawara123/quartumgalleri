import { Calendar, Clock, MapPin, Users, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import exhibitionImage from "@/assets/exhibition.jpg";

const Events = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: "Contemporary Visions Exhibition",
      description: "Featuring groundbreaking works by emerging contemporary artists exploring themes of identity, technology, and human connection in the digital age.",
      date: "March 15 - April 30, 2024",
      time: "10:00 AM - 8:00 PM",
      location: "Main Gallery",
      image: exhibitionImage,
      type: "Exhibition",
      capacity: "Open Access",
      price: "Free",
      featured: true,
    },
    {
      id: 2,
      title: "Artist Workshop: Abstract Techniques",
      description: "Learn advanced abstract painting methods from renowned artist Elena Marchetti. This hands-on workshop covers color theory, texture creation, and emotional expression through abstract forms.",
      date: "March 22, 2024",
      time: "2:00 PM - 5:00 PM",
      location: "Studio Workshop",
      image: exhibitionImage,
      type: "Workshop",
      capacity: "15 participants",
      price: "$150",
      featured: false,
    },
    {
      id: 3,
      title: "Gallery Night Opening",
      description: "Exclusive preview evening for collectors and art enthusiasts. Enjoy wine, canapés, and the first look at our newest acquisitions in an intimate setting.",
      date: "April 5, 2024",
      time: "6:00 PM - 9:00 PM",
      location: "Entire Gallery",
      image: exhibitionImage,
      type: "Opening",
      capacity: "By invitation",
      price: "Members only",
      featured: true,
    },
    {
      id: 4,
      title: "Sculpture Symposium",
      description: "A comprehensive exploration of contemporary sculpture with panel discussions featuring leading sculptors, curators, and critics.",
      date: "April 12, 2024",
      time: "1:00 PM - 6:00 PM",
      location: "Conference Hall",
      image: exhibitionImage,
      type: "Symposium",
      capacity: "100 attendees",
      price: "$75",
      featured: false,
    },
    {
      id: 5,
      title: "Youth Art Mentorship Program",
      description: "A monthly program connecting young artists with established professionals. Includes portfolio reviews, career guidance, and networking opportunities.",
      date: "Every first Saturday",
      time: "10:00 AM - 12:00 PM",
      location: "Education Center",
      image: exhibitionImage,
      type: "Program",
      capacity: "20 youth artists",
      price: "Free",
      featured: false,
    },
    {
      id: 6,
      title: "Digital Art & NFT Showcase",
      description: "Exploring the intersection of traditional and digital art forms. Features interactive installations and discussions about the future of art in the digital realm.",
      date: "May 10 - June 15, 2024",
      time: "11:00 AM - 7:00 PM",
      location: "Digital Gallery",
      image: exhibitionImage,
      type: "Exhibition",
      capacity: "Open Access",
      price: "$20",
      featured: true,
    },
  ];

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "Exhibition": return "bg-accent text-accent-foreground";
      case "Workshop": return "bg-gallery-gold text-accent-foreground";
      case "Opening": return "bg-luxury text-luxury-foreground";
      case "Symposium": return "bg-primary text-primary-foreground";
      case "Program": return "bg-secondary text-secondary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <main className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-primary">
            Exhibitions & Events
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join us for inspiring exhibitions, educational workshops, and exclusive art experiences
          </p>
        </div>

        {/* Featured Events */}
        <div className="mb-16">
          <h2 className="text-3xl font-serif font-bold mb-8 text-primary">Featured Events</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {upcomingEvents.filter(event => event.featured).map((event, index) => (
              <Card
                key={event.id}
                className="group gallery-hover overflow-hidden border-0 shadow-xl"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="p-0">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className={getEventTypeColor(event.type)}>
                        {event.type}
                      </Badge>
                    </div>
                    <div className="artwork-overlay group-hover:opacity-100 flex items-end">
                      <div className="p-6 text-white w-full">
                        <Button variant="hero" className="w-full">
                          <Ticket className="mr-2 h-4 w-4" />
                          Get Tickets
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="font-serif text-2xl font-bold mb-4 text-primary">
                      {event.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {event.description}
                    </p>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-4 w-4 text-accent" />
                        <span className="font-medium">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="h-4 w-4 text-accent" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="h-4 w-4 text-accent" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="h-4 w-4 text-accent" />
                        <span>{event.capacity}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-6 pt-6 border-t">
                      <span className="text-2xl font-bold text-accent">
                        {event.price}
                      </span>
                      <Button variant="luxury">
                        Learn More
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* All Events */}
        <div className="mb-16">
          <h2 className="text-3xl font-serif font-bold mb-8 text-primary">All Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <Card
                key={event.id}
                className="group gallery-hover border border-border/50 hover:border-accent/50"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <Badge className={getEventTypeColor(event.type)}>
                      {event.type}
                    </Badge>
                    {event.featured && (
                      <Badge variant="outline" className="border-accent text-accent">
                        Featured
                      </Badge>
                    )}
                  </div>
                  
                  <h3 className="font-serif text-xl font-semibold mb-3 text-primary">
                    {event.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3 leading-relaxed">
                    {event.description}
                  </p>
                  
                  <div className="space-y-2 text-sm mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3 text-accent" />
                      <span className="font-medium">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3 text-accent" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3 w-3 text-accent" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-accent">
                      {event.price}
                    </span>
                    <Button variant="elegant" size="sm">
                      Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="elegant-gradient rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-serif font-bold mb-4 text-primary">
            Stay Updated
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive exclusive invitations to gallery openings, 
            early access to tickets, and updates on new exhibitions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <Button variant="luxury" size="lg">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Events;