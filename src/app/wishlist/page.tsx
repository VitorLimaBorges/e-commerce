'use client';

import { useWishlistStore } from '@/store/wishlistStore';
import { ProductCard } from '@/components/product/ProductCard';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';

export default function WishlistPage() {
  const { items } = useWishlistStore();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Favoritos' }]} />
        
        <div className="flex items-center gap-3 mb-8">
          <Heart size={32} className="text-red-500" />
          <h1 className="text-3xl font-bold text-gray-900">Meus Favoritos</h1>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-block p-8 bg-gray-100 rounded-full mb-6">
              <Heart size={64} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Nenhum favorito ainda</h2>
            <p className="text-gray-600 mb-8">
              Adicione produtos aos favoritos clicando no ícone de coração
            </p>
            <Link
              href="/products"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Explorar Produtos
            </Link>
          </div>
        ) : (
          <>
            <p className="text-gray-600 mb-6">{items.length} {items.length === 1 ? 'produto' : 'produtos'}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {items.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
