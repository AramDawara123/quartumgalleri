import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Palette, Eye } from 'lucide-react';

interface Artist {
  id: string;
  name: string;
}

interface Artwork {
  id: string;
  title: string;
  artist_id: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  dimensions: string;
  medium: string;
  year_created: number;
  available: boolean;
}

export const ArtistArtworksManager = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [selectedArtist, setSelectedArtist] = useState<string>('');
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingArtwork, setEditingArtwork] = useState<Artwork | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    image_url: '',
    category: '',
    dimensions: '',
    medium: '',
    year_created: '',
    available: true,
  });
  const { toast } = useToast();

  const loadArtists = async () => {
    const { data, error } = await supabase
      .from('artists')
      .select('id, name')
      .order('name');

    if (error) {
      toast({
        title: "Error",
        description: "Could not load artists",
        variant: "destructive",
      });
      return;
    }

    setArtists(data || []);
  };

  const loadArtworks = async (artistId: string) => {
    if (!artistId) {
      setArtworks([]);
      return;
    }

    const { data, error } = await supabase
      .from('artworks')
      .select('*')
      .eq('artist_id', artistId)
      .order('title');

    if (error) {
      toast({
        title: "Error",
        description: "Could not load artworks",
        variant: "destructive",
      });
      return;
    }

    setArtworks(data || []);
  };

  useEffect(() => {
    loadArtists();
  }, []);

  useEffect(() => {
    if (selectedArtist) {
      loadArtworks(selectedArtist);
    }
  }, [selectedArtist]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedArtist) {
      toast({
        title: "Error",
        description: "Please select an artist first",
        variant: "destructive",
      });
      return;
    }

    const artworkData = {
      ...formData,
      artist_id: selectedArtist,
      price: parseFloat(formData.price),
      year_created: formData.year_created ? parseInt(formData.year_created) : null,
    };

    if (editingArtwork) {
      const { error } = await supabase
        .from('artworks')
        .update(artworkData)
        .eq('id', editingArtwork.id);

      if (error) {
        toast({
          title: "Error",
          description: "Could not update artwork",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Artwork updated successfully",
      });
    } else {
      const { error } = await supabase
        .from('artworks')
        .insert([artworkData]);

      if (error) {
        toast({
          title: "Error",
          description: "Could not create artwork",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Artwork created successfully",
      });
    }

    setIsDialogOpen(false);
    setEditingArtwork(null);
    setFormData({
      title: '',
      description: '',
      price: '',
      image_url: '',
      category: '',
      dimensions: '',
      medium: '',
      year_created: '',
      available: true,
    });
    loadArtworks(selectedArtist);
  };

  const handleEdit = (artwork: Artwork) => {
    setEditingArtwork(artwork);
    setFormData({
      title: artwork.title,
      description: artwork.description || '',
      price: artwork.price.toString(),
      image_url: artwork.image_url || '',
      category: artwork.category || '',
      dimensions: artwork.dimensions || '',
      medium: artwork.medium || '',
      year_created: artwork.year_created?.toString() || '',
      available: artwork.available,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this artwork?')) return;

    const { error } = await supabase
      .from('artworks')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Could not delete artwork",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Artwork deleted successfully",
    });

    loadArtworks(selectedArtist);
  };

  const selectedArtistName = artists.find(a => a.id === selectedArtist)?.name || '';

  return (
    <div className="space-y-6">
      {/* Artist Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Selecteer Kunstenaar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedArtist} onValueChange={setSelectedArtist}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Kies een kunstenaar om hun werken te beheren" />
            </SelectTrigger>
            <SelectContent>
              {artists.map((artist) => (
                <SelectItem key={artist.id} value={artist.id}>
                  {artist.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Artworks Management */}
      {selectedArtist && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>
                Kunstwerken van {selectedArtistName} ({artworks.length})
              </CardTitle>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => setEditingArtwork(null)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Nieuw Kunstwerk
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingArtwork ? 'Kunstwerk Bewerken' : `Nieuw Kunstwerk voor ${selectedArtistName}`}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                      placeholder="Titel"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                    
                    <Textarea
                      placeholder="Beschrijving"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />

                    <Input
                      type="number"
                      step="0.01"
                      placeholder="Prijs (€)"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />

                    <Input
                      placeholder="Afbeelding URL"
                      value={formData.image_url}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    />

                    <Input
                      placeholder="Categorie"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    />

                    <Input
                      placeholder="Afmetingen"
                      value={formData.dimensions}
                      onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                    />

                    <Input
                      placeholder="Medium"
                      value={formData.medium}
                      onChange={(e) => setFormData({ ...formData, medium: e.target.value })}
                    />

                    <Input
                      type="number"
                      placeholder="Jaar gemaakt"
                      value={formData.year_created}
                      onChange={(e) => setFormData({ ...formData, year_created: e.target.value })}
                    />

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="available"
                        checked={formData.available}
                        onCheckedChange={(checked) => setFormData({ ...formData, available: checked })}
                      />
                      <label htmlFor="available">Beschikbaar</label>
                    </div>

                    <Button type="submit" className="w-full">
                      {editingArtwork ? 'Bijwerken' : 'Toevoegen'}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            {artworks.length === 0 ? (
              <div className="text-center py-8">
                <Palette className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">
                  Deze kunstenaar heeft nog geen werken. Voeg het eerste kunstwerk toe!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {artworks.map((artwork) => (
                  <Card key={artwork.id} className="overflow-hidden">
                    <div className="aspect-square relative">
                      {artwork.image_url ? (
                        <img
                          src={artwork.image_url}
                          alt={artwork.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <Eye className="h-8 w-8 text-muted-foreground" />
                        </div>
                      )}
                      <div className="absolute top-2 right-2">
                        <Badge variant={artwork.available ? "default" : "secondary"}>
                          {artwork.available ? "Beschikbaar" : "Niet beschikbaar"}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-semibold truncate mb-1">{artwork.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                        {artwork.description}
                      </p>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-lg font-bold text-primary">
                          €{artwork.price.toFixed(2)}
                        </span>
                        {artwork.category && (
                          <Badge variant="outline" className="text-xs">
                            {artwork.category}
                          </Badge>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleEdit(artwork)}
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          Bewerken
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(artwork.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {!selectedArtist && (
        <Card>
          <CardContent className="py-12 text-center">
            <Palette className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">Kies een kunstenaar</h3>
            <p className="text-muted-foreground">
              Selecteer een kunstenaar om hun kunstwerken te beheren
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};