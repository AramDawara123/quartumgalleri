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
        title: "Error",
        description: "Enter a discount code",
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
        title: "Invalid code",
        description: "This discount code is not valid or expired",
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
        title: "Expired code",
        description: "This discount code has expired",
        variant: "destructive",
      });
      return;
    }

    if (discount.max_uses && discount.current_uses >= discount.max_uses) {
      toast({
        title: "Code used",
        description: "This discount code has already been used the maximum number of times",
        variant: "destructive",
      });
      return;
    }

    if (discount.min_purchase && total < Number(discount.min_purchase)) {
      toast({
        title: "Minimum purchase not reached",
        description: `Minimum purchase of €${Number(discount.min_purchase).toFixed(2)} required`,
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
      title: "Discount applied!",
      description: `€${discountAmount.toFixed(2)} discount applied`,
    });
  };

  const removeDiscount = () => {
    setAppliedDiscount(null);
    setDiscountCode('');
    toast({
      title: "Discount removed",
      description: "The discount code has been removed from your cart",
    });
  };

  const finalTotal = appliedDiscount ? total - appliedDiscount.amount : total;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Add some beautiful artworks to your collection</p>
          <Link to="/artworks">
            <Button>View Artworks</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Shopping Cart</h1>
        <p className="text-muted-foreground">{itemCount} item(s) in your cart</p>
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
                          <p className="text-muted-foreground">by {item.artist_name}</p>
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
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>€{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>

                {/* Discount Code Section */}
                <div className="border-t pt-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      Discount Code
                    </label>
                    {!appliedDiscount ? (
                      <div className="flex gap-2">
                        <Input
                          placeholder="Enter code"
                          value={discountCode}
                          onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                          onKeyDown={(e) => e.key === 'Enter' && applyDiscountCode()}
                        />
                        <Button onClick={applyDiscountCode} size="sm">
                          Apply
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{appliedDiscount.code}</p>
                          <p className="text-xs text-muted-foreground">
                            {appliedDiscount.type === 'percentage' 
                              ? `${appliedDiscount.value}% discount`
                              : `€${appliedDiscount.value.toFixed(2)} discount`}
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
                    <span>Discount:</span>
                    <span>-€{appliedDiscount.amount.toFixed(2)}</span>
                  </div>
                )}

                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>€{finalTotal.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="space-y-2 pt-4">
                  <Button className="w-full" size="lg" asChild>
                    <Link to="/checkout">Checkout</Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={clearCart}
                  >
                    Clear Cart
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