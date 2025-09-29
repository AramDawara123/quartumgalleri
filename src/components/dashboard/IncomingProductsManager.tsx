import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface IncomingProduct {
  id: string;
  title: string;
  description: string | null;
  artist_id: string | null;
  expected_date: string | null;
  status: string;
  notes: string | null;
  created_at: string;
}

interface Artist {
  id: string;
  name: string;
}

export const IncomingProductsManager = () => {
  const [products, setProducts] = useState<IncomingProduct[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<IncomingProduct | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    artist_id: '',
    expected_date: '',
    status: 'pending',
    notes: '',
  });

  useEffect(() => {
    loadProducts();
    loadArtists();
  }, []);

  const loadProducts = async () => {
    const { data, error } = await supabase
      .from('incoming_products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Fout bij laden van producten');
      return;
    }
    setProducts(data || []);
  };

  const loadArtists = async () => {
    const { data, error } = await supabase
      .from('artists')
      .select('id, name')
      .order('name');

    if (error) {
      toast.error('Fout bij laden van kunstenaars');
      return;
    }
    setArtists(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingProduct) {
      const { error } = await supabase
        .from('incoming_products')
        .update(formData)
        .eq('id', editingProduct.id);

      if (error) {
        toast.error('Fout bij bijwerken');
        return;
      }
      toast.success('Product bijgewerkt');
    } else {
      const { error } = await supabase.from('incoming_products').insert([formData]);

      if (error) {
        toast.error('Fout bij toevoegen');
        return;
      }
      toast.success('Product toegevoegd');
    }

    setIsDialogOpen(false);
    resetForm();
    loadProducts();
  };

  const handleEdit = (product: IncomingProduct) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      description: product.description || '',
      artist_id: product.artist_id || '',
      expected_date: product.expected_date || '',
      status: product.status,
      notes: product.notes || '',
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Weet u zeker dat u dit product wilt verwijderen?')) return;

    const { error } = await supabase.from('incoming_products').delete().eq('id', id);

    if (error) {
      toast.error('Fout bij verwijderen');
      return;
    }

    toast.success('Product verwijderd');
    loadProducts();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      artist_id: '',
      expected_date: '',
      status: 'pending',
      notes: '',
    });
    setEditingProduct(null);
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: 'In afwachting',
      confirmed: 'Bevestigd',
      received: 'Ontvangen',
      cancelled: 'Geannuleerd',
    };
    return labels[status] || status;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nieuw Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? 'Product Bewerken' : 'Nieuw Product Toevoegen'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Titel</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Beschrijving</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="artist_id">Kunstenaar</Label>
                <Select
                  value={formData.artist_id}
                  onValueChange={(value) => setFormData({ ...formData, artist_id: value })}
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
              </div>
              <div>
                <Label htmlFor="expected_date">Verwachte Datum</Label>
                <Input
                  id="expected_date"
                  type="date"
                  value={formData.expected_date}
                  onChange={(e) => setFormData({ ...formData, expected_date: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">In afwachting</SelectItem>
                    <SelectItem value="confirmed">Bevestigd</SelectItem>
                    <SelectItem value="received">Ontvangen</SelectItem>
                    <SelectItem value="cancelled">Geannuleerd</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="notes">Notities</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Annuleren
                </Button>
                <Button type="submit">
                  {editingProduct ? 'Bijwerken' : 'Toevoegen'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Titel</TableHead>
            <TableHead>Kunstenaar</TableHead>
            <TableHead>Verwachte Datum</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Acties</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => {
            const artist = artists.find((a) => a.id === product.artist_id);
            return (
              <TableRow key={product.id}>
                <TableCell>{product.title}</TableCell>
                <TableCell>{artist?.name || '-'}</TableCell>
                <TableCell>
                  {product.expected_date
                    ? new Date(product.expected_date).toLocaleDateString('nl-NL')
                    : '-'}
                </TableCell>
                <TableCell>{getStatusLabel(product.status)}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(product)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
          {products.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground">
                Geen producten gevonden
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
