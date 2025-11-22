import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { ImageUpload } from './ImageUpload';

interface Artist {
  id: string;
  name: string;
  bio: string;
  image_url: string;
  website: string;
}

export const ArtistsManager = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingArtist, setEditingArtist] = useState<Artist | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    image_url: '',
    website: '',
  });
  const { toast } = useToast();

  const loadArtists = async () => {
    const { data, error } = await supabase
      .from('artists')
      .select('*')
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
    loadArtists();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingArtist) {
      const { error } = await supabase
        .from('artists')
        .update(formData)
        .eq('id', editingArtist.id);

      if (error) {
        toast({
          title: "Error",
          description: "Could not update artist",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Artist updated successfully",
      });
    } else {
      const { error } = await supabase
        .from('artists')
        .insert([formData]);

      if (error) {
        toast({
          title: "Error",
          description: "Could not create artist",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Artist created successfully",
      });
    }

    setIsDialogOpen(false);
    setEditingArtist(null);
    setFormData({ name: '', bio: '', image_url: '', website: '' });
    loadArtists();
  };

  const handleEdit = (artist: Artist) => {
    setEditingArtist(artist);
    setFormData({
      name: artist.name,
      bio: artist.bio || '',
      image_url: artist.image_url || '',
      website: artist.website || '',
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this artist?')) return;

    const { error } = await supabase
      .from('artists')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Could not delete artist",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Artist deleted successfully",
    });

    loadArtists();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Kunstenaars ({artists.length})</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingArtist(null)}>
              <Plus className="h-4 w-4 mr-2" />
              Nieuwe Kunstenaar
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingArtist ? 'Kunstenaar Bewerken' : 'Nieuwe Kunstenaar'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Naam"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <Textarea
                placeholder="Biografie"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              />
              <ImageUpload
                label="Afbeelding"
                value={formData.image_url}
                onChange={(url) => setFormData({ ...formData, image_url: url })}
                bucket="page-content"
              />
              <Input
                placeholder="Website"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              />
              <Button type="submit" className="w-full">
                {editingArtist ? 'Bijwerken' : 'Toevoegen'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Naam</TableHead>
            <TableHead>Website</TableHead>
            <TableHead className="w-[100px]">Acties</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {artists.map((artist) => (
            <TableRow key={artist.id}>
              <TableCell className="font-medium">{artist.name}</TableCell>
              <TableCell>{artist.website}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(artist)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(artist.id)}
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