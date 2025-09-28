import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArtistsManager } from '@/components/dashboard/ArtistsManager';
import { ArtworksManager } from '@/components/dashboard/ArtworksManager';
import { ArtistArtworksManager } from '@/components/dashboard/ArtistArtworksManager';
import { EventsManager } from '@/components/dashboard/EventsManager';
import { Palette, Users, Calendar, UserCheck } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Beheer uw kunstwerken, kunstenaars en evenementen</p>
      </div>

      <Tabs defaultValue="artworks" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="artworks" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Alle Kunstwerken
          </TabsTrigger>
          <TabsTrigger value="artist-artworks" className="flex items-center gap-2">
            <UserCheck className="h-4 w-4" />
            Per Kunstenaar
          </TabsTrigger>
          <TabsTrigger value="artists" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Kunstenaars
          </TabsTrigger>
          <TabsTrigger value="events" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Evenementen
          </TabsTrigger>
        </TabsList>

        <TabsContent value="artworks">
          <Card>
            <CardHeader>
              <CardTitle>Alle Kunstwerken Beheren</CardTitle>
              <CardDescription>
                Overzicht van alle kunstwerken in de galerie
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ArtworksManager />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="artist-artworks">
          <Card>
            <CardHeader>
              <CardTitle>Kunstwerken per Kunstenaar</CardTitle>
              <CardDescription>
                Beheer de kunstwerken van specifieke kunstenaars
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ArtistArtworksManager />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="artists">
          <Card>
            <CardHeader>
              <CardTitle>Kunstenaars Beheren</CardTitle>
              <CardDescription>
                Beheer de kunstenaars in uw galerie
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ArtistsManager />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events">
          <Card>
            <CardHeader>
              <CardTitle>Evenementen Beheren</CardTitle>
              <CardDescription>
                Organiseer en beheer galerie evenementen
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EventsManager />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;