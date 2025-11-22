import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Minus, Plus, Trash2, ShoppingBag, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, clearCart, total, itemCount } = useCart();
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<{
    code: string;
    type: 'percentage' | 'fixed';
    value: number;
    amount: number;
  } | null>(null);
  const { toast } = useToast();

  const applyDiscountCode = async () => {
    if (!discountCode.trim()) {
      toast({
        title: "Fout",
        description: "Voer een kortingscode in",
        variant: "destructive",
      });
      return;
    }

    const { data: discount, error } = await supabase
      .from('discounts')
      .select('*')
      .eq('code', discountCode.trim())
      .eq('active', true)
      .eq('applies_to', 'artwork')
      .single();

    if (error || !discount) {
      toast({
        title: "Ongeldige code",
        description: "Deze kortingscode is niet geldig of verlopen",
        variant: "destructive",
      });
      return;
    }

    // Check if discount is still valid (dates and usage)
    const now = new Date();
    const startDate = new Date(discount.start_date);
    const endDate = discount.end_date ? new Date(discount.end_date) : null;

    if (now < startDate || (endDate && now > endDate)) {
      toast({
        title: "Verlopen code",
        description: "Deze kortingscode is verlopen",
        variant: "destructive",
      });
      return;
    }

    if (discount.max_uses && discount.current_uses >= discount.max_uses) {
      toast({
        title: "Code gebruikt",
        description: "Deze kortingscode is al het maximaal aantal keren gebruikt",
        variant: "destructive",
      });
      return;
    }

    if (discount.min_purchase && total < Number(discount.min_purchase)) {
      toast({
        title: "Minimum aankoop niet bereikt",
        description: `Minimum aankoop van €${Number(discount.min_purchase).toFixed(2)} vereist`,
        variant: "destructive",
      });
      return;
    }

    // Calculate discount amount
    let discountAmount = 0;
    if (discount.discount_type === 'percentage') {
      discountAmount = (total * Number(discount.discount_value)) / 100;
    } else {
      discountAmount = Number(discount.discount_value);
    }

    setAppliedDiscount({
      code: discount.code,
      type: discount.discount_type as 'percentage' | 'fixed',
      value: Number(discount.discount_value),
      amount: discountAmount,
    });

    toast({
      title: "Korting toegepast!",
      description: `€${discountAmount.toFixed(2)} korting toegepast`,
    });
  };

  const removeDiscount = () => {
    setAppliedDiscount(null);
    setDiscountCode('');
    toast({
      title: "Korting verwijderd",
      description: "De kortingscode is verwijderd van uw winkelwagen",
    });
  };

  const finalTotal = appliedDiscount ? total - appliedDiscount.amount : total;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-2">Uw winkelwagen is leeg</h2>
          <p className="text-muted-foreground mb-6">Voeg enkele prachtige kunstwerken toe aan uw collectie</p>
          <Link to="/artworks">
            <Button>Bekijk Kunstwerken</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Winkelwagen</h1>
        <p className="text-muted-foreground">{itemCount} item(s) in uw winkelwagen</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {items.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{item.title}</h3>
                          <p className="text-muted-foreground">door {item.artist_name}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <Badge variant="secondary">{item.quantity}</Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="font-semibold">€{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Overzicht</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotaal:</span>
                  <span>€{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Verzendkosten:</span>
                  <span>Gratis</span>
                </div>

                {/* Discount Code Section */}
                <div className="border-t pt-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      Kortingscode
                    </label>
                    {!appliedDiscount ? (
                      <div className="flex gap-2">
                        <Input
                          placeholder="Voer code in"
                          value={discountCode}
                          onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                          onKeyDown={(e) => e.key === 'Enter' && applyDiscountCode()}
                        />
                        <Button onClick={applyDiscountCode} size="sm">
                          Toepassen
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{appliedDiscount.code}</p>
                          <p className="text-xs text-muted-foreground">
                            {appliedDiscount.type === 'percentage' 
                              ? `${appliedDiscount.value}% korting`
                              : `€${appliedDiscount.value.toFixed(2)} korting`}
                          </p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={removeDiscount}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {appliedDiscount && (
                  <div className="flex justify-between text-green-600">
                    <span>Korting:</span>
                    <span>-€{appliedDiscount.amount.toFixed(2)}</span>
                  </div>
                )}

                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Totaal:</span>
                    <span>€{finalTotal.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="space-y-2 pt-4">
                  <Button className="w-full" size="lg" asChild>
                    <Link to="/checkout">Afrekenen</Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={clearCart}
                  >
                    Winkelwagen Legen
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;