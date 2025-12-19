'use client';

import { formatCurrency } from '@/utils/formatter';
import Link from 'next/link';

interface CartSummaryProps {
  totalItems: number;
  totalPrice: number;
  onCheckout?: () => void;
}

export const CartSummary = ({ totalItems, totalPrice, onCheckout }: CartSummaryProps) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Resumo do Pedido</h2>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-gray-700 dark:text-gray-300">
          <span>Subtotal ({totalItems} itens)</span>
          <span>{formatCurrency(totalPrice)}</span>
        </div>
        <div className="flex justify-between text-gray-700 dark:text-gray-300">
          <span>Envio</span>
          <span className="text-green-600 dark:text-green-400 font-medium">Grátis</span>
        </div>
        <div className="flex justify-between text-gray-700 dark:text-gray-300">
          <span>Impostos</span>
          <span>{formatCurrency(totalPrice * 0.1)}</span>
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
        <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
          <span>Total</span>
          <span>{formatCurrency(totalPrice * 1.1)}</span>
        </div>
      </div>

      {totalItems > 0 ? (
        <button
          onClick={onCheckout}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Ir para Checkout
        </button>
      ) : (
        <Link
          href="/products"
          className="block text-center bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 py-3 rounded-lg font-semibold hover:bg-gray-400 dark:hover:bg-gray-500 transition"
        >
          Continuar Comprando
        </Link>
      )}
    </div>
  );
};
