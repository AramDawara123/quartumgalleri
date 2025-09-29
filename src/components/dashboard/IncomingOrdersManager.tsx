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

interface IncomingOrder {
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

export const IncomingOrdersManager = () => {
  const [orders, setOrders] = useState<IncomingOrder[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<IncomingOrder | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    artist_id: '',
    expected_date: '',
    status: 'pending',
    notes: '',
  });

  useEffect(() => {
    loadOrders();
    loadArtists();
  }, []);

  const loadOrders = async () => {
    const { data, error } = await (supabase as any)
      .from('incoming_orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Fout bij laden van bestellingen');
      return;
    }
    setOrders(data || []);
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

    if (editingOrder) {
      const { error } = await (supabase as any)
        .from('incoming_orders')
        .update(formData)
        .eq('id', editingOrder.id);

      if (error) {
        toast.error('Fout bij bijwerken');
        return;
      }
      toast.success('Bestelling bijgewerkt');
    } else {
      const { error } = await (supabase as any).from('incoming_orders').insert([formData]);

      if (error) {
        toast.error('Fout bij toevoegen');
        return;
      }
      toast.success('Bestelling toegevoegd');
    }

    setIsDialogOpen(false);
    resetForm();
    loadOrders();
  };

  const handleEdit = (order: IncomingOrder) => {
    setEditingOrder(order);
    setFormData({
      title: order.title,
      description: order.description || '',
      artist_id: order.artist_id || '',
      expected_date: order.expected_date || '',
      status: order.status,
      notes: order.notes || '',
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Weet u zeker dat u deze bestelling wilt verwijderen?')) return;

    const { error } = await (supabase as any).from('incoming_orders').delete().eq('id', id);

    if (error) {
      toast.error('Fout bij verwijderen');
      return;
    }

    toast.success('Bestelling verwijderd');
    loadOrders();
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
    setEditingOrder(null);
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
              Nieuwe Bestelling
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingOrder ? 'Bestelling Bewerken' : 'Nieuwe Bestelling Toevoegen'}
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
                  {editingOrder ? 'Bijwerken' : 'Toevoegen'}
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
          {orders.map((order) => {
            const artist = artists.find((a) => a.id === order.artist_id);
            return (
              <TableRow key={order.id}>
                <TableCell>{order.title}</TableCell>
                <TableCell>{artist?.name || '-'}</TableCell>
                <TableCell>
                  {order.expected_date
                    ? new Date(order.expected_date).toLocaleDateString('nl-NL')
                    : '-'}
                </TableCell>
                <TableCell>{getStatusLabel(order.status)}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(order)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(order.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
          {orders.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground">
                Geen bestellingen gevonden
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
