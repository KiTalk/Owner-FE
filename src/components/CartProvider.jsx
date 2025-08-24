// src/components/CartProvider.jsx
import React, { useState } from "react";
import { CartContext } from "./CartContext";

export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // 장바구니에 상품 추가
  const addToCart = (item) => {
    setCartItems((prev) => {
      const exists = prev.find((p) => p.id === item.id);
      if (exists) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  // 상품 제거
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((p) => p.id !== id));
  };

  // 수량 업데이트
  const updateQuantity = (id, qty) => {
    if (qty <= 0) {
      setCartItems((prev) => prev.filter((p) => p.id !== id));
    } else {
      setCartItems((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, quantity: qty } : p
        )
      );
    }
  };

  // 장바구니 비우기
  const clearCart = () => setCartItems([]);

  // 총 수량 / 총 가격
  const totalQuantity = cartItems.reduce((sum, p) => sum + p.quantity, 0);
  const totalPrice = cartItems.reduce((sum, p) => sum + p.price * p.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalQuantity,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
