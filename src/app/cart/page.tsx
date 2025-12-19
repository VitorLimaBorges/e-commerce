'use client';

import { useCart } from '@/hooks/useCart';
import { CartItemComponent } from '@/components/cart/CartItemComponent';
import { CartSummary } from '@/components/cart/CartSummary';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingCart } from 'lucide-react';

export default function CartPage() {
  const router = useRouter();
  const { items, totalItems, totalPrice, removeItem, updateQuantity, clearCart } = useCart();

  const handleCheckout = () => {
    router.push('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <ShoppingCart size={64} className="mx-auto text-gray-400 dark:text-gray-600 mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Seu carrinho está vazio</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">Que tal adicionar alguns produtos?</p>
            <Link
              href="/products"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Continuar Comprando
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Carrinho de Compras</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {totalItems} {totalItems === 1 ? 'item' : 'itens'}
              </h2>
              <button
                onClick={clearCart}
                className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-500 text-sm font-medium"
              >
                Limpar Carrinho
              </button>
            </div>

            <div className="space-y-4">
              {items.map((item) => (
                <CartItemComponent
                  key={item.id}
                  item={item}
                  onRemove={removeItem}
                  onQuantityChange={updateQuantity}
                />
              ))}
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <CartSummary
              totalItems={totalItems}
              totalPrice={totalPrice}
              onCheckout={handleCheckout}
            />

            {/* Continue Shopping */}
            <Link
              href="/products"
              className="block text-center mt-4 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500 font-medium"
            >
              ← Continuar Comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
