import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Calendar, Clock, MapPin, Users, Ticket, Edit, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface Event {
  id: string;
  title: string;
  description: string;
  event_date: string;
  location: string;
  image_url: string;
  price: number;
  max_attendees: number;
}

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const loadEvents = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('event_date');

    if (error) {
      toast({
        title: "Error",
        description: "Could not load events",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    setEvents(data || []);
    setLoading(false);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const getEventTypeColor = (eventDate: string) => {
    const now = new Date();
    const eventDateTime = new Date(eventDate);
    
    if (eventDateTime > now) {
      return "bg-accent text-accent-foreground";
    } else {
      return "bg-muted text-muted-foreground";
    }
  };

  const formatEventDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMMM dd, yyyy');
    } catch {
      return dateString;
    }
  };

  const formatEventTime = (dateString: string) => {
    try {
      return format(new Date(dateString), 'HH:mm');
    } catch {
      return 'Time TBA';
    }
  };

  const isUpcoming = (eventDate: string) => {
    return new Date(eventDate) > new Date();
  };

  if (loading) {
    return (
      <main className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-primary">
              Exhibitions & Events
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Loading events...
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden border-0 shadow-lg">
                <CardContent className="p-0">
                  <div className="aspect-[16/9] bg-muted animate-pulse" />
                  <div className="p-6 space-y-3">
                    <div className="h-6 bg-muted animate-pulse rounded w-3/4" />
                    <div className="h-4 bg-muted animate-pulse rounded w-full" />
                    <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
                    <div className="h-8 bg-muted animate-pulse rounded w-1/3" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (events.length === 0) {
    return (
      <main className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-primary">
              Exhibitions & Events
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join us for inspiring exhibitions, educational workshops, and exclusive art experiences
            </p>
          </div>
          
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-2xl font-serif font-semibold mb-2 text-primary">
              No events scheduled
            </h3>
            <p className="text-muted-foreground mb-6">
              Create exciting events for your gallery visitors through the dashboard.
            </p>
            <Button variant="default" asChild>
              <Link to="/dashboard">
                <Plus className="h-4 w-4 mr-2" />
                Add Events
              </Link>
            </Button>
          </div>
        </div>
      </main>
    );
  }

  const upcomingEvents = events.filter(event => isUpcoming(event.event_date));
  const featuredEvents = upcomingEvents.slice(0, 2); // Show first 2 upcoming as featured

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

        {/* Admin Actions */}
        <div className="flex justify-end mb-8">
          <Button variant="outline" asChild>
            <Link to="/dashboard">
              <Edit className="h-4 w-4 mr-2" />
              Manage Events
            </Link>
          </Button>
        </div>

        {/* Featured Events */}
        {featuredEvents.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-serif font-bold mb-8 text-primary">Featured Events</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredEvents.map((event, index) => (
                <Card
                  key={event.id}
                  className="group gallery-hover overflow-hidden border-0 shadow-xl"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <CardContent className="p-0">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <img
                        src={event.image_url || '/src/assets/exhibition.jpg'}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className={getEventTypeColor(event.event_date)}>
                          {isUpcoming(event.event_date) ? 'Upcoming' : 'Past'}
                        </Badge>
                      </div>
                      <div className="artwork-overlay group-hover:opacity-100 flex items-end">
                        <div className="p-6 text-white w-full">
                          <Button variant="hero" className="w-full">
                            <Ticket className="mr-2 h-4 w-4" />
                            Learn More
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
                          <span className="font-medium">{formatEventDate(event.event_date)}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Clock className="h-4 w-4 text-accent" />
                          <span>{formatEventTime(event.event_date)}</span>
                        </div>
                        {event.location && (
                          <div className="flex items-center gap-3">
                            <MapPin className="h-4 w-4 text-accent" />
                            <span>{event.location}</span>
                          </div>
                        )}
                        {event.max_attendees && (
                          <div className="flex items-center gap-3">
                            <Users className="h-4 w-4 text-accent" />
                            <span>{event.max_attendees} attendees max</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-6 pt-6 border-t">
                        <span className="text-2xl font-bold text-accent">
                          {event.price > 0 ? `€${event.price}` : 'Free'}
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
        )}

        {/* All Events */}
        <div className="mb-16">
          <h2 className="text-3xl font-serif font-bold mb-8 text-primary">
            All Events ({events.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <Card
                key={event.id}
                className="group gallery-hover border border-border/50 hover:border-accent/50"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <Badge className={getEventTypeColor(event.event_date)}>
                      {isUpcoming(event.event_date) ? 'Upcoming' : 'Past'}
                    </Badge>
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
                      <span className="font-medium">{formatEventDate(event.event_date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3 text-accent" />
                      <span>{formatEventTime(event.event_date)}</span>
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3 w-3 text-accent" />
                        <span>{event.location}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-accent">
                      {event.price > 0 ? `€${event.price}` : 'Free'}
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