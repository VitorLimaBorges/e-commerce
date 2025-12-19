'use client';

import { useCartStore } from '@/store/cartStore';
import { CartItem } from '@/types';
import { useCallback } from 'react';

/**
 * Hook to manage cart operations
 */
export const useCart = () => {
  const {
    cart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  } = useCartStore();

  const handleAddItem = useCallback(
    (product: { id: number; title: string; price: number; image: string }, quantity: number = 1) => {
      const cartItem: CartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity,
      };
      addItem(cartItem);
    },
    [addItem]
  );

  const handleRemoveItem = useCallback(
    (itemId: number) => {
      removeItem(itemId);
    },
    [removeItem]
  );

  const handleUpdateQuantity = useCallback(
    (itemId: number, quantity: number) => {
      updateQuantity(itemId, quantity);
    },
    [updateQuantity]
  );

  const handleClearCart = useCallback(() => {
    clearCart();
  }, [clearCart]);

  return {
    items: cart.items,
    totalItems: getTotalItems(),
    totalPrice: getTotalPrice(),
    addItem: handleAddItem,
    removeItem: handleRemoveItem,
    updateQuantity: handleUpdateQuantity,
    clearCart: handleClearCart,
  };
};
