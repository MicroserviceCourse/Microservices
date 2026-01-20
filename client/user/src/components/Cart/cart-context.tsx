import { createContext, useContext, useEffect, useState } from "react";
import type { CartContextType } from "../../types";
import { getCartCount } from "../../service/api/Cart";

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartCount, setCartCount] = useState(0);

  const refreshCartCount = async () => {
    try {
      const count = await getCartCount();
      setCartCount(count);
    } catch {
      setCartCount(0);
    }
  };

  useEffect(() => {
    refreshCartCount(); // load khi app start
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, refreshCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};