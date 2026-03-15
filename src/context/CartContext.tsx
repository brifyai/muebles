import { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  color: string;
  quantity: number;
  category: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeFromCart: (id: number, color: string) => void;
  updateQuantity: (id: number, color: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getSubtotal: () => number;
  getItemCount: () => number;
  showMiniCart: boolean;
  setShowMiniCart: (show: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([
    {
      id: 1,
      name: 'Sofá Modular Oslo',
      price: 2499,
      originalPrice: 2899,
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400',
      color: 'Gris Grafito',
      quantity: 1,
      category: 'Sala de Estar',
    },
    {
      id: 4,
      name: 'Mesa de Centro Nogal',
      price: 899,
      image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=400',
      color: 'Nogal Natural',
      quantity: 2,
      category: 'Sala de Estar',
    },
    {
      id: 7,
      name: 'Lámpara de Arco',
      price: 459,
      originalPrice: 549,
      image: 'https://images.unsplash.com/photo-1543198126-a8ad8e47fb22?w=400',
      color: 'Latón Cepillado',
      quantity: 1,
      category: 'Sala de Estar',
    },
  ]);
  const [showMiniCart, setShowMiniCart] = useState(false);

  const addToCart = (item: Omit<CartItem, 'quantity'>, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id && i.color === item.color);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id && i.color === item.color
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { ...item, quantity }];
    });
    setShowMiniCart(true);
    setTimeout(() => setShowMiniCart(false), 3000);
  };

  const removeFromCart = (id: number, color: string) => {
    setItems((prev) => prev.filter((i) => !(i.id === id && i.color === color)));
  };

  const updateQuantity = (id: number, color: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id, color);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === id && i.color === color ? { ...i, quantity } : i))
    );
  };

  const getSubtotal = () => items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const getTotal = () => {
    const subtotal = getSubtotal();
    return subtotal >= 500 ? subtotal : subtotal + 89;
  };

  const getItemCount = () => items.reduce((sum, item) => sum + item.quantity, 0);

  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotal,
        getSubtotal,
        getItemCount,
        showMiniCart,
        setShowMiniCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
