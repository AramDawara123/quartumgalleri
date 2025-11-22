import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArtistsManager } from '@/components/dashboard/ArtistsManager';
import { ArtworksManager } from '@/components/dashboard/ArtworksManager';
import { ArtistArtworksManager } from '@/components/dashboard/ArtistArtworksManager';
import { EventsManager } from '@/components/dashboard/EventsManager';
import { IncomingOrdersManager } from '@/components/dashboard/IncomingOrdersManager';
import { DiscountsManager } from '@/components/dashboard/DiscountsManager';
import { PageContentManager } from '@/components/dashboard/PageContentManager';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/AppSidebar';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Loader2 } from 'lucide-react';

const Dashboard = () => {
  const { isLoading, isAdmin } = useAdminAuth();
  const [activeSection, setActiveSection] = useState('artworks');

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'artworks':
        return (
          <Card className="border-0 shadow-xl card-glow overflow-hidden">
            <CardHeader className="border-b bg-muted/30 p-4 sm:p-6">
              <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-serif">Alle Kunstwerken Beheren</CardTitle>
              <CardDescription className="text-sm sm:text-base mt-1">
                Overzicht van alle kunstwerken in de galerie
              </CardDescription>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 md:p-6">
              <ArtworksManager />
            </CardContent>
          </Card>
        );
      case 'artist-artworks':
        return (
          <Card className="border-0 shadow-xl card-glow overflow-hidden">
            <CardHeader className="border-b bg-muted/30 p-4 sm:p-6">
              <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-serif">Kunstwerken per Kunstenaar</CardTitle>
              <CardDescription className="text-sm sm:text-base mt-1">
                Beheer kunstwerken van specifieke kunstenaars
              </CardDescription>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 md:p-6">
              <ArtistArtworksManager />
            </CardContent>
          </Card>
        );
      case 'artists':
        return (
          <Card className="border-0 shadow-xl card-glow overflow-hidden">
            <CardHeader className="border-b bg-muted/30 p-4 sm:p-6">
              <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-serif">Kunstenaars Beheren</CardTitle>
              <CardDescription className="text-sm sm:text-base mt-1">
                Beheer de kunstenaars in uw galerie
              </CardDescription>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 md:p-6">
              <ArtistsManager />
            </CardContent>
          </Card>
        );
      case 'events':
        return (
          <Card className="border-0 shadow-xl card-glow overflow-hidden">
            <CardHeader className="border-b bg-muted/30 p-4 sm:p-6">
              <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-serif">Evenementen Beheren</CardTitle>
              <CardDescription className="text-sm sm:text-base mt-1">
                Organiseer en beheer galerie evenementen
              </CardDescription>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 md:p-6">
              <EventsManager />
            </CardContent>
          </Card>
        );
      case 'incoming':
        return (
          <Card className="border-0 shadow-xl card-glow overflow-hidden">
            <CardHeader className="border-b bg-muted/30 p-4 sm:p-6">
              <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-serif">Inkomende Bestellingen</CardTitle>
              <CardDescription className="text-sm sm:text-base mt-1">
                Beheer verwachte kunstwerken en leveringen
              </CardDescription>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 md:p-6">
              <IncomingOrdersManager />
            </CardContent>
          </Card>
        );
      case 'discounts':
        return (
          <Card className="border-0 shadow-xl card-glow overflow-hidden">
            <CardHeader className="border-b bg-muted/30 p-4 sm:p-6">
              <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-serif">Kortingen Beheren</CardTitle>
              <CardDescription className="text-sm sm:text-base mt-1">
                Maak en beheer kortingscodes voor kunstwerken en evenementen
              </CardDescription>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 md:p-6">
              <DiscountsManager />
            </CardContent>
          </Card>
        );
      case 'page-content':
        return (
          <Card className="border-0 shadow-xl card-glow overflow-hidden">
            <CardHeader className="border-b bg-muted/30 p-4 sm:p-6">
              <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-serif">About Us Pagina Beheren</CardTitle>
              <CardDescription className="text-sm sm:text-base mt-1">
                Bewerk de inhoud van de About Us pagina
              </CardDescription>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 md:p-6">
              <PageContentManager />
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        <SidebarInset className="flex-1">
          <header className="sticky top-0 z-10 flex h-16 sm:h-20 items-center gap-3 sm:gap-4 border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 px-4 sm:px-6 lg:px-8 shadow-sm">
            <SidebarTrigger className="shrink-0" />
            <div className="flex items-center justify-between w-full min-w-0">
              <div className="min-w-0">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold font-serif text-primary truncate">
                  Dashboard
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
                  Beheer uw kunstwerken, kunstenaars en evenementen
                </p>
              </div>
            </div>
          </header>
          <main className="p-3 sm:p-4 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto w-full">
              {renderContent()}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;