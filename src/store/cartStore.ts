'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Cart, CartItem } from '@/types';

interface CartStore {
  cart: Cart;
  addItem: (item: CartItem) => void;
  removeItem: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const initialState: Cart = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: initialState,

      addItem: (newItem: CartItem) => {
        set((state) => {
          const existingItem = state.cart.items.find((item) => item.id === newItem.id);

          let updatedItems;
          if (existingItem) {
            updatedItems = state.cart.items.map((item) =>
              item.id === newItem.id ? { ...item, quantity: item.quantity + newItem.quantity } : item
            );
          } else {
            updatedItems = [...state.cart.items, newItem];
          }

          const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
          const totalPrice = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

          return {
            cart: {
              items: updatedItems,
              totalItems,
              totalPrice,
            },
          };
        });
      },

      removeItem: (itemId: number) => {
        set((state) => {
          const updatedItems = state.cart.items.filter((item) => item.id !== itemId);
          const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
          const totalPrice = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

          return {
            cart: {
              items: updatedItems,
              totalItems,
              totalPrice,
            },
          };
        });
      },

      updateQuantity: (itemId: number, quantity: number) => {
        set((state) => {
          if (quantity <= 0) {
            get().removeItem(itemId);
            return state;
          }

          const updatedItems = state.cart.items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          );

          const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
          const totalPrice = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

          return {
            cart: {
              items: updatedItems,
              totalItems,
              totalPrice,
            },
          };
        });
      },

      clearCart: () => {
        set({ cart: initialState });
      },

      getTotalItems: () => get().cart.totalItems,
      getTotalPrice: () => get().cart.totalPrice,
    }),
    {
      name: 'cart-storage',
    }
  )
);
