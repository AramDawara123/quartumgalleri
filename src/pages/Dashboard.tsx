import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArtistsManager } from '@/components/dashboard/ArtistsManager';
import { ArtworksManager } from '@/components/dashboard/ArtworksManager';
import { ArtistArtworksManager } from '@/components/dashboard/ArtistArtworksManager';
import { EventsManager } from '@/components/dashboard/EventsManager';
import { IncomingOrdersManager } from '@/components/dashboard/IncomingOrdersManager';
import { DiscountsManager } from '@/components/dashboard/DiscountsManager';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/AppSidebar';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('artworks');

  const renderContent = () => {
    switch (activeSection) {
      case 'artworks':
        return (
          <Card className="border-0 shadow-lg">
            <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-accent/5">
              <CardTitle className="text-2xl font-serif">Alle Kunstwerken Beheren</CardTitle>
              <CardDescription className="text-base">
                Overzicht van alle kunstwerken in de galerie
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <ArtworksManager />
            </CardContent>
          </Card>
        );
      case 'artist-artworks':
        return (
          <Card className="border-0 shadow-lg">
            <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-accent/5">
              <CardTitle className="text-2xl font-serif">Kunstwerken per Kunstenaar</CardTitle>
              <CardDescription className="text-base">
                Beheer kunstwerken van specifieke kunstenaars
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <ArtistArtworksManager />
            </CardContent>
          </Card>
        );
      case 'artists':
        return (
          <Card className="border-0 shadow-lg">
            <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-accent/5">
              <CardTitle className="text-2xl font-serif">Kunstenaars Beheren</CardTitle>
              <CardDescription className="text-base">
                Beheer de kunstenaars in uw galerie
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <ArtistsManager />
            </CardContent>
          </Card>
        );
      case 'events':
        return (
          <Card className="border-0 shadow-lg">
            <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-accent/5">
              <CardTitle className="text-2xl font-serif">Evenementen Beheren</CardTitle>
              <CardDescription className="text-base">
                Organiseer en beheer galerie evenementen
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <EventsManager />
            </CardContent>
          </Card>
        );
      case 'incoming':
        return (
          <Card className="border-0 shadow-lg">
            <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-accent/5">
              <CardTitle className="text-2xl font-serif">Inkomende Bestellingen</CardTitle>
              <CardDescription className="text-base">
                Beheer verwachte kunstwerken en leveringen
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <IncomingOrdersManager />
            </CardContent>
          </Card>
        );
      case 'discounts':
        return (
          <Card className="border-0 shadow-lg">
            <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-accent/5">
              <CardTitle className="text-2xl font-serif">Kortingen Beheren</CardTitle>
              <CardDescription className="text-base">
                Maak en beheer kortingscodes voor kunstwerken en evenementen
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <DiscountsManager />
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/30">
        <AppSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        <SidebarInset className="flex-1">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6 shadow-sm">
            <SidebarTrigger />
            <div className="flex items-center justify-between w-full">
              <div>
                <h1 className="text-2xl font-bold font-serif text-primary">Dashboard</h1>
                <p className="text-sm text-muted-foreground">
                  Beheer uw kunstwerken, kunstenaars en evenementen
                </p>
              </div>
            </div>
          </header>
          <main className="p-4 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
              {renderContent()}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;