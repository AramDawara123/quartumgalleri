import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface CartItem {
  id: string;
  artwork_id?: string;
  event_id?: string;
  item_type: 'artwork' | 'event';
  title: string;
  artist_name: string;
  price: number;
  image_url: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (itemId: string, item: any, type: 'artwork' | 'event') => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  // Generate session ID if not exists
  const getSessionId = () => {
    let sessionId = localStorage.getItem('cart_session_id');
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      localStorage.setItem('cart_session_id', sessionId);
    }
    return sessionId;
  };

  const loadCartItems = async () => {
    const sessionId = getSessionId();
    const { data, error } = await supabase
      .from('cart_items')
      .select(`
        id,
        artwork_id,
        event_id,
        item_type,
        quantity,
        artworks (
          title,
          price,
          image_url,
          artists (
            name
          )
        ),
        events (
          title,
          price,
          image_url,
          event_date
        )
      `)
      .eq('session_id', sessionId);

    if (error) {
      console.error('Error loading cart:', error);
      return;
    }

    const cartItems = data?.map((item: any) => {
      if (item.item_type === 'event' && item.events) {
        return {
          id: item.id,
          event_id: item.event_id,
          item_type: 'event' as const,
          title: item.events.title,
          artist_name: new Date(item.events.event_date).toLocaleDateString('nl-NL', { 
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          }),
          price: item.events.price || 0,
          image_url: item.events.image_url,
          quantity: item.quantity,
        };
      } else if (item.artworks) {
        return {
          id: item.id,
          artwork_id: item.artwork_id,
          item_type: 'artwork' as const,
          title: item.artworks.title,
          artist_name: item.artworks.artists?.name || 'Unknown Artist',
          price: item.artworks.price,
          image_url: item.artworks.image_url,
          quantity: item.quantity,
        };
      }
      return null;
    }).filter(Boolean) || [];

    setItems(cartItems as CartItem[]);
  };

  useEffect(() => {
    loadCartItems();
  }, []);

  const addToCart = async (itemId: string, item: any, type: 'artwork' | 'event') => {
    const sessionId = getSessionId();
    
    // Check if item already exists in cart
    const existingItem = items.find(cartItem => 
      type === 'artwork' ? cartItem.artwork_id === itemId : cartItem.event_id === itemId
    );
    
    if (existingItem) {
      await updateQuantity(existingItem.id, existingItem.quantity + 1);
      return;
    }

    const insertData: any = {
      session_id: sessionId,
      item_type: type,
      quantity: 1,
    };

    if (type === 'artwork') {
      insertData.artwork_id = itemId;
    } else {
      insertData.event_id = itemId;
    }

    const { error } = await supabase
      .from('cart_items')
      .insert(insertData);

    if (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Error",
        description: "Could not add item to cart",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Added to cart",
      description: `${item.title} has been added to your cart`,
    });

    await loadCartItems();
  };

  const removeFromCart = async (itemId: string) => {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', itemId);

    if (error) {
      toast({
        title: "Error",
        description: "Could not remove item from cart",
        variant: "destructive",
      });
      return;
    }

    await loadCartItems();
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(itemId);
      return;
    }

    const { error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', itemId);

    if (error) {
      toast({
        title: "Error",
        description: "Could not update quantity",
        variant: "destructive",
      });
      return;
    }

    await loadCartItems();
  };

  const clearCart = async () => {
    const sessionId = getSessionId();
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('session_id', sessionId);

    if (error) {
      toast({
        title: "Error",
        description: "Could not clear cart",
        variant: "destructive",
      });
      return;
    }

    setItems([]);
  };

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      total,
      itemCount,
    }}>
      {children}
    </CartContext.Provider>
  );
};