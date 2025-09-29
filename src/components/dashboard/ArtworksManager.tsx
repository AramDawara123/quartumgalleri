import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Upload, Link as LinkIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
  artists?: { name: string };
}

export const ArtworksManager = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingArtwork, setEditingArtwork] = useState<Artwork | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadMethod, setUploadMethod] = useState<'file' | 'url'>('file');
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    artist_id: '',
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

  const loadArtworks = async () => {
    const { data, error } = await supabase
      .from('artworks')
      .select(`
        *,
        artists (
          name
        )
      `)
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

  useEffect(() => {
    loadArtworks();
    loadArtists();
  }, []);

  const handleFileUpload = async () => {
    if (!selectedFile) return null;

    setUploading(true);
    const fileExt = selectedFile.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError, data } = await supabase.storage
      .from('artwork-images')
      .upload(filePath, selectedFile);

    setUploading(false);

    if (uploadError) {
      toast({
        title: "Error",
        description: "Could not upload image",
        variant: "destructive",
      });
      return null;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('artwork-images')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageUrl = formData.image_url;

    // If file upload method and a file is selected, upload it
    if (uploadMethod === 'file' && selectedFile) {
      const uploadedUrl = await handleFileUpload();
      if (!uploadedUrl) return;
      imageUrl = uploadedUrl;
    }

    const artworkData = {
      ...formData,
      image_url: imageUrl,
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
    setSelectedFile(null);
    setFormData({
      title: '',
      artist_id: '',
      description: '',
      price: '',
      image_url: '',
      category: '',
      dimensions: '',
      medium: '',
      year_created: '',
      available: true,
    });
    loadArtworks();
  };

  const handleEdit = (artwork: Artwork) => {
    setEditingArtwork(artwork);
    setFormData({
      title: artwork.title,
      artist_id: artwork.artist_id,
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

    loadArtworks();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Kunstwerken ({artworks.length})</h3>
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
                {editingArtwork ? 'Kunstwerk Bewerken' : 'Nieuw Kunstwerk'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Titel"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
              
              <Select
                value={formData.artist_id}
                onValueChange={(value) => setFormData({ ...formData, artist_id: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecteer kunstenaar" />
                </SelectTrigger>
                <SelectContent>
                  {artists.map((artist) => (
                    <SelectItem key={artist.id} value={artist.id}>
                      {artist.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

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

              <Tabs value={uploadMethod} onValueChange={(v) => setUploadMethod(v as 'file' | 'url')} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="file">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Bestand
                  </TabsTrigger>
                  <TabsTrigger value="url">
                    <LinkIcon className="h-4 w-4 mr-2" />
                    URL
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="file" className="space-y-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  />
                  {selectedFile && (
                    <p className="text-sm text-muted-foreground">
                      Geselecteerd: {selectedFile.name}
                    </p>
                  )}
                </TabsContent>
                <TabsContent value="url">
                  <Input
                    placeholder="Afbeelding URL"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  />
                </TabsContent>
              </Tabs>

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

              <Button type="submit" className="w-full" disabled={uploading}>
                {uploading ? 'Uploaden...' : editingArtwork ? 'Bijwerken' : 'Toevoegen'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Titel</TableHead>
            <TableHead>Kunstenaar</TableHead>
            <TableHead>Prijs</TableHead>
            <TableHead>Categorie</TableHead>
            <TableHead>Beschikbaar</TableHead>
            <TableHead className="w-[100px]">Acties</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {artworks.map((artwork) => (
            <TableRow key={artwork.id}>
              <TableCell className="font-medium">{artwork.title}</TableCell>
              <TableCell>{artwork.artists?.name}</TableCell>
              <TableCell>€{artwork.price.toFixed(2)}</TableCell>
              <TableCell>{artwork.category}</TableCell>
              <TableCell>{artwork.available ? 'Ja' : 'Nee'}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(artwork)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(artwork.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};