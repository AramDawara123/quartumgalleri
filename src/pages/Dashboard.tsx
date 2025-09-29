import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArtistsManager } from '@/components/dashboard/ArtistsManager';
import { ArtworksManager } from '@/components/dashboard/ArtworksManager';
import { ArtistArtworksManager } from '@/components/dashboard/ArtistArtworksManager';
import { EventsManager } from '@/components/dashboard/EventsManager';
import { IncomingOrdersManager } from '@/components/dashboard/IncomingOrdersManager';
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
              <CardTitle>Manage All Artworks</CardTitle>
              <CardDescription>
                Overview of all artworks in the gallery
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
              <CardTitle>Artworks by Artist</CardTitle>
              <CardDescription>
                Manage artworks by specific artists
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
              <CardTitle>Manage Artists</CardTitle>
              <CardDescription>
                Manage the artists in your gallery
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
              <CardTitle>Manage Events</CardTitle>
              <CardDescription>
                Organize and manage gallery events
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
              <CardTitle>Incoming Orders</CardTitle>
              <CardDescription>
                Manage expected artworks and deliveries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <IncomingOrdersManager />
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
                Manage your artworks, artists and events
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