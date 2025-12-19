'use client';

import Image from 'next/image';
import { CartItem } from '@/types';
import { formatCurrency } from '@/utils/formatter';
import { Trash2, Plus, Minus } from 'lucide-react';

interface CartItemComponentProps {
  item: CartItem;
  onRemove: (id: number) => void;
  onQuantityChange: (id: number, quantity: number) => void;
}

export const CartItemComponent = ({
  item,
  onRemove,
  onQuantityChange,
}: CartItemComponentProps) => {
  return (
    <div className="flex gap-4 py-4 border-b border-gray-200 dark:border-gray-700">
      {/* Product Image */}
      <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden shrink-0">
        <Image
          src={item.image}
          alt={item.title}
          width={96}
          height={96}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 dark:text-white">{item.title}</h3>
        <p className="text-lg font-bold text-blue-600 dark:text-blue-400 mt-1">{formatCurrency(item.price)}</p>
      </div>

      {/* Quantity Control */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => onQuantityChange(item.id, item.quantity - 1)}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition"
          aria-label="Diminuir quantidade"
        >
          <Minus size={18} className="text-gray-600 dark:text-gray-400" />
        </button>
        <span className="text-gray-900 dark:text-white font-semibold w-8 text-center">{item.quantity}</span>
        <button
          onClick={() => onQuantityChange(item.id, item.quantity + 1)}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition"
          aria-label="Aumentar quantidade"
        >
          <Plus size={18} className="text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      {/* Subtotal */}
      <div className="w-20 text-right">
        <p className="font-bold text-gray-900 dark:text-white">{formatCurrency(item.price * item.quantity)}</p>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => onRemove(item.id)}
        className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition"
        aria-label="Remover item"
      >
        <Trash2 size={20} className="text-red-500 dark:text-red-400" />
      </button>
    </div>
  );
};
