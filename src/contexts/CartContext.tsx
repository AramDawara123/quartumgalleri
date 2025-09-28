import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface CartItem {
  id: string;
  artwork_id: string;
  title: string;
  artist_name: string;
  price: number;
  image_url: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (artworkId: string, artwork: any) => Promise<void>;
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
        quantity,
        artworks (
          title,
          price,
          image_url,
          artists (
            name
          )
        )
      `)
      .eq('session_id', sessionId);

    if (error) {
      console.error('Error loading cart:', error);
      return;
    }

    const cartItems = data?.map((item: any) => ({
      id: item.id,
      artwork_id: item.artwork_id,
      title: item.artworks.title,
      artist_name: item.artworks.artists?.name || 'Unknown Artist',
      price: item.artworks.price,
      image_url: item.artworks.image_url,
      quantity: item.quantity,
    })) || [];

    setItems(cartItems);
  };

  useEffect(() => {
    loadCartItems();
  }, []);

  const addToCart = async (artworkId: string, artwork: any) => {
    const sessionId = getSessionId();
    
    // Check if item already exists in cart
    const existingItem = items.find(item => item.artwork_id === artworkId);
    
    if (existingItem) {
      await updateQuantity(existingItem.id, existingItem.quantity + 1);
      return;
    }

    const { error } = await supabase
      .from('cart_items')
      .insert({
        session_id: sessionId,
        artwork_id: artworkId,
        quantity: 1,
      });

    if (error) {
      toast({
        title: "Error",
        description: "Could not add item to cart",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Added to cart",
      description: `${artwork.title} has been added to your cart`,
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