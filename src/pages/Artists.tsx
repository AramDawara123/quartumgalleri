import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { MapPin, Award, Palette, Edit, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
interface Artist {
  id: string;
  name: string;
  bio: string;
  image_url: string;
  website: string;
  created_at: string;
}
const Artists = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const {
    toast
  } = useToast();
  const loadArtists = async () => {
    setLoading(true);
    const {
      data,
      error
    } = await supabase.from('artists').select('*').order('name');
    if (error) {
      toast({
        title: "Error",
        description: "Could not load artists",
        variant: "destructive"
      });
      setLoading(false);
      return;
    }
    setArtists(data || []);
    setLoading(false);
  };
  useEffect(() => {
    loadArtists();
  }, []);
  if (loading) {
    return <main className="min-h-screen py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-primary">
              Our Artists
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Loading artists...
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => <Card key={i} className="overflow-hidden border-0 shadow-lg">
                <CardContent className="p-0">
                  <div className="aspect-square bg-muted animate-pulse" />
                  <div className="p-6 space-y-3">
                    <div className="h-6 bg-muted animate-pulse rounded w-3/4" />
                    <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
                    <div className="h-4 bg-muted animate-pulse rounded w-full" />
                    <div className="h-4 bg-muted animate-pulse rounded w-2/3" />
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </main>;
  }
  if (artists.length === 0) {
    return <main className="min-h-screen py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-primary">
              Our Artists
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Meet the talented artists whose creativity brings our gallery to life.
            </p>
          </div>
          
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎨</div>
            <h3 className="text-2xl font-serif font-semibold mb-2 text-primary">
              No artists yet
            </h3>
            <p className="text-muted-foreground mb-6">
              Start building your gallery by adding artists through the dashboard.
            </p>
            <Button variant="default" asChild>
              <Link to="/dashboard">
                <Plus className="h-4 w-4 mr-2" />
                Add Artists
              </Link>
            </Button>
          </div>
        </div>
      </main>;
  }
  return <main className="min-h-screen py-20">
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

        {/* Admin Actions */}
        <div className="flex justify-end mb-8">
          <Button variant="outline" asChild>
            
          </Button>
        </div>

        {/* All Artists */}
        <section>
          <div className="flex items-center mb-12">
            <Palette className="h-6 w-6 text-primary mr-3" />
            <h2 className="text-3xl font-serif font-bold text-primary">
              All Artists ({artists.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artists.map((artist, index) => <Card key={artist.id} className="group gallery-hover border border-border/50 hover:border-accent/50" style={{
            animationDelay: `${index * 0.05}s`
          }}>
                <CardContent className="p-0">
                  <div className="relative aspect-square overflow-hidden">
                    <img src={artist.image_url || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face'} alt={artist.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
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
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {artist.bio || 'Talented artist creating beautiful works.'}
                    </p>
                    <div className="flex items-center justify-between">
                      {artist.website && <a href={artist.website} target="_blank" rel="noopener noreferrer" className="text-xs text-accent hover:underline">
                          Visit Website
                        </a>}
                      <Button variant="elegant" size="sm" asChild>
                        <Link to={`/artists/${artist.id}`}>
                          View Portfolio
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-20 text-center">
          
        </section>
      </div>
    </main>;
};
export default Artists;