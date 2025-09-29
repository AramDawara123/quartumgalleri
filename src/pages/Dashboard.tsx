import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArtistsManager } from '@/components/dashboard/ArtistsManager';
import { ArtworksManager } from '@/components/dashboard/ArtworksManager';
import { ArtistArtworksManager } from '@/components/dashboard/ArtistArtworksManager';
import { EventsManager } from '@/components/dashboard/EventsManager';
import { IncomingProductsManager } from '@/components/dashboard/IncomingProductsManager';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/AppSidebar';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('artworks');

  const renderContent = () => {
    switch (activeSection) {
      case 'artworks':
        return (
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
        );
      case 'artist-artworks':
        return (
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
        );
      case 'artists':
        return (
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
        );
      case 'events':
        return (
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
        );
      case 'incoming':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Inkomende Producten</CardTitle>
              <CardDescription>
                Beheer verwachte kunstwerken en leveringen
              </CardDescription>
            </CardHeader>
            <CardContent>
              <IncomingProductsManager />
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        <SidebarInset className="flex-1">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
            <div>
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p className="text-sm text-muted-foreground">
                Beheer uw kunstwerken, kunstenaars en evenementen
              </p>
            </div>
          </header>
          <main className="p-6">
            {renderContent()}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;