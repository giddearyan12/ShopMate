import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const cartCount = cart.reduce((acc, item) => acc + (item.qty || 1), 0);
  const cartTotal = cart.reduce((acc, item) => acc + (parseFloat(item.price) || 0) * (item.qty || 1), 0);

  const addToCart = (product, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) => (p.id === product.id ? { ...p, qty: Math.max(1, p.qty + qty) } : p));
      }
      const item = { id: product.id, name: product.name, price: parseFloat(product.price) || 0, image: product.image, category: product.category, qty };
      return [...prev, item];
    });
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((p) => p.id !== id));

  const updateQty = (id, qty) => {
    setCart((prev) => prev.map((p) => (p.id === id ? { ...p, qty: Math.max(1, qty) } : p)));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

export default CartContext;
