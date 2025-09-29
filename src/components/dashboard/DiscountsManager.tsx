import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Pencil, Trash2, Plus } from 'lucide-react';

interface Discount {
  id: string;
  code: string;
  description: string | null;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  applies_to: 'artwork' | 'event';
  min_purchase: number | null;
  max_uses: number | null;
  current_uses: number;
  start_date: string;
  end_date: string | null;
  active: boolean;
}

export const DiscountsManager = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingDiscount, setEditingDiscount] = useState<Discount | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    code: '',
    description: '',
    discount_type: 'percentage' as 'percentage' | 'fixed',
    discount_value: '',
    applies_to: 'artwork' as 'artwork' | 'event',
    min_purchase: '',
    max_uses: '',
    start_date: new Date().toISOString().split('T')[0],
    end_date: '',
    active: true,
  });

  const { data: discounts, isLoading } = useQuery({
    queryKey: ['discounts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('discounts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Discount[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const { error } = await supabase.from('discounts').insert(data);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['discounts'] });
      toast({ title: 'Discount created successfully' });
      resetForm();
    },
    onError: () => {
      toast({ title: 'Error creating discount', variant: 'destructive' });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const { error } = await supabase.from('discounts').update(data).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['discounts'] });
      toast({ title: 'Discount updated successfully' });
      resetForm();
    },
    onError: () => {
      toast({ title: 'Error updating discount', variant: 'destructive' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('discounts').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['discounts'] });
      toast({ title: 'Discount deleted successfully' });
    },
    onError: () => {
      toast({ title: 'Error deleting discount', variant: 'destructive' });
    },
  });

  const toggleActiveMutation = useMutation({
    mutationFn: async ({ id, active }: { id: string; active: boolean }) => {
      const { error } = await supabase.from('discounts').update({ active }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['discounts'] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const submitData = {
      code: formData.code.toUpperCase(),
      description: formData.description || null,
      discount_type: formData.discount_type,
      discount_value: parseFloat(formData.discount_value),
      applies_to: formData.applies_to,
      min_purchase: formData.min_purchase ? parseFloat(formData.min_purchase) : null,
      max_uses: formData.max_uses ? parseInt(formData.max_uses) : null,
      start_date: formData.start_date,
      end_date: formData.end_date || null,
      active: formData.active,
    };

    if (editingDiscount) {
      updateMutation.mutate({ id: editingDiscount.id, data: submitData });
    } else {
      createMutation.mutate(submitData);
    }
  };

  const resetForm = () => {
    setFormData({
      code: '',
      description: '',
      discount_type: 'percentage',
      discount_value: '',
      applies_to: 'artwork',
      min_purchase: '',
      max_uses: '',
      start_date: new Date().toISOString().split('T')[0],
      end_date: '',
      active: true,
    });
    setEditingDiscount(null);
    setIsFormOpen(false);
  };

  const handleEdit = (discount: Discount) => {
    setEditingDiscount(discount);
    setFormData({
      code: discount.code,
      description: discount.description || '',
      discount_type: discount.discount_type,
      discount_value: discount.discount_value.toString(),
      applies_to: discount.applies_to,
      min_purchase: discount.min_purchase?.toString() || '',
      max_uses: discount.max_uses?.toString() || '',
      start_date: discount.start_date.split('T')[0],
      end_date: discount.end_date?.split('T')[0] || '',
      active: discount.active,
    });
    setIsFormOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Discounts</h3>
        <Button onClick={() => setIsFormOpen(!isFormOpen)}>
          <Plus className="mr-2 h-4 w-4" />
          {isFormOpen ? 'Cancel' : 'Add Discount'}
        </Button>
      </div>

      {isFormOpen && (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="code">Discount Code *</Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder="SUMMER2024"
                required
              />
            </div>

            <div>
              <Label htmlFor="discount_value">Discount Value *</Label>
              <Input
                id="discount_value"
                type="number"
                step="0.01"
                value={formData.discount_value}
                onChange={(e) => setFormData({ ...formData, discount_value: e.target.value })}
                placeholder={formData.discount_type === 'percentage' ? '10' : '100'}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Description of the discount"
            />
          </div>

          <div>
            <Label>Discount Type *</Label>
            <RadioGroup
              value={formData.discount_type}
              onValueChange={(value: 'percentage' | 'fixed') =>
                setFormData({ ...formData, discount_type: value })
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="percentage" id="percentage" />
                <Label htmlFor="percentage">Percentage (%)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="fixed" id="fixed" />
                <Label htmlFor="fixed">Fixed Amount (€)</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label>Applies To *</Label>
            <RadioGroup
              value={formData.applies_to}
              onValueChange={(value: 'artwork' | 'event') =>
                setFormData({ ...formData, applies_to: value })
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="artwork" id="artwork" />
                <Label htmlFor="artwork">Artwork</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="event" id="event" />
                <Label htmlFor="event">Event</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="min_purchase">Minimum Purchase (€)</Label>
              <Input
                id="min_purchase"
                type="number"
                step="0.01"
                value={formData.min_purchase}
                onChange={(e) => setFormData({ ...formData, min_purchase: e.target.value })}
                placeholder="Optional"
              />
            </div>

            <div>
              <Label htmlFor="max_uses">Max Uses</Label>
              <Input
                id="max_uses"
                type="number"
                value={formData.max_uses}
                onChange={(e) => setFormData({ ...formData, max_uses: e.target.value })}
                placeholder="Optional"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="start_date">Start Date *</Label>
              <Input
                id="start_date"
                type="date"
                value={formData.start_date}
                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="end_date">End Date</Label>
              <Input
                id="end_date"
                type="date"
                value={formData.end_date}
                onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="active"
              checked={formData.active}
              onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
            />
            <Label htmlFor="active">Active</Label>
          </div>

          <div className="flex gap-2">
            <Button type="submit">
              {editingDiscount ? 'Update' : 'Create'} Discount
            </Button>
            <Button type="button" variant="outline" onClick={resetForm}>
              Cancel
            </Button>
          </div>
        </form>
      )}

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Applies To</TableHead>
              <TableHead>Uses</TableHead>
              <TableHead>Active</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {discounts?.map((discount) => (
              <TableRow key={discount.id}>
                <TableCell className="font-mono">{discount.code}</TableCell>
                <TableCell className="capitalize">{discount.discount_type}</TableCell>
                <TableCell>
                  {discount.discount_type === 'percentage'
                    ? `${discount.discount_value}%`
                    : `€${discount.discount_value}`}
                </TableCell>
                <TableCell className="capitalize">{discount.applies_to}</TableCell>
                <TableCell>
                  {discount.current_uses}
                  {discount.max_uses ? ` / ${discount.max_uses}` : ''}
                </TableCell>
                <TableCell>
                  <Switch
                    checked={discount.active}
                    onCheckedChange={(checked) =>
                      toggleActiveMutation.mutate({ id: discount.id, active: checked })
                    }
                  />
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(discount)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteMutation.mutate(discount.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};
