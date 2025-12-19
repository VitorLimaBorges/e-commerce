'use client';

import { useProduct, useProducts } from '@/hooks/useProducts';
import { useCart } from '@/hooks/useCart';
import { useWishlistStore } from '@/store/wishlistStore';
import Image from 'next/image';
import { formatCurrency } from '@/utils/formatter';
import { useState } from 'react';
import { Heart, Share2, Star, Truck, Shield, Check } from 'lucide-react';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { ProductGrid } from '@/components/product/ProductGrid';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function ProductDetailPage({ params }: Readonly<{ params: { id: string } }>) {
  const productId = Number.parseInt(params.id, 10);
  const { data: product, isLoading, error } = useProduct(productId);
  const { data: allProducts } = useProducts();
  const { addItem } = useCart();
  const { items: wishlistItems, addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlistStore();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const isInWishlist = product ? wishlistItems.some((item) => item.id === product.id) : false;

  // Related products from same category
  const relatedProducts = allProducts
    ?.filter((p) => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full" />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Produto não encontrado</h1>
          <a href="/products" className="text-blue-600 hover:underline">
            Voltar para produtos
          </a>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast.success(`${quantity}x ${product.title} adicionado ao carrinho!`);
  };

  const toggleWishlist = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id);
      toast.success('Removido dos favoritos');
    } else {
      addToWishlist(product);
      toast.success('Adicionado aos favoritos!');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: product.description,
          url: globalThis.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(globalThis.location.href);
      toast.success('Link copiado!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Breadcrumbs 
          items={[
            { label: 'Produtos', href: '/products' },
            { label: product.title }
          ]} 
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
          {/* Product Images */}
          <div className="flex flex-col gap-4">
            <motion.div 
              className="relative w-full h-96 bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain p-8"
                priority
              />
            </motion.div>
            <div className="flex gap-2">
              {[0, 1, 2, 3].map((i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-20 bg-white dark:bg-gray-800 rounded-lg p-2 border-2 transition ${
                    selectedImage === i 
                      ? 'border-blue-600' 
                      : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <Image
                    src={product.image}
                    alt="Thumbnail"
                    width={80}
                    height={80}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            {/* Category Badge */}
            <div className="mb-4">
              <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium capitalize">
                {product.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{product.title}</h1>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-2 mb-6">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={`star-${product.id}-${i}`}
                      size={18}
                      className={
                        i < Math.round(product.rating!.rate)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300 dark:text-gray-600'
                      }
                    />
                  ))}
                </div>
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  {product.rating.rate.toFixed(1)} ({product.rating.count} avaliações)
                </span>
              </div>
            )}

            {/* Price */}
            <div className="mb-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
              <p className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {formatCurrency(product.price)}
              </p>
              <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                <Check size={16} className="text-green-600" />
                Em estoque e pronto para envio
              </p>
            </div>

            {/* Description */}
            <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">{product.description}</p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-8">
              <label htmlFor="quantity" className="font-semibold text-gray-700 dark:text-gray-300">Quantidade:</label>
              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                >
                  −
                </button>
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  max="10"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value, 10) || 1))}
                  className="px-6 py-2 font-semibold w-16 text-center border-0 bg-transparent text-gray-900 dark:text-white"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                >
                  +
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mb-8">
              <motion.button
                onClick={handleAddToCart}
                whileTap={{ scale: 0.95 }}
                className="flex-1 py-3 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition"
              >
                Adicionar ao Carrinho
              </motion.button>
              <motion.button 
                onClick={toggleWishlist}
                whileTap={{ scale: 0.9 }}
                className={`px-6 py-3 border rounded-lg transition ${
                  isInWishlist 
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                    : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <Heart 
                  size={20} 
                  className={isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-400'} 
                />
              </motion.button>
              <button 
                onClick={handleShare}
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                <Share2 size={20} className="text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="space-y-3 border-t border-gray-200 dark:border-gray-700 pt-6">
              <div className="flex items-center gap-3">
                <Truck className="text-blue-600" size={20} />
                <span className="text-gray-700 dark:text-gray-300">Frete grátis para compras acima de R$ 100</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="text-blue-600" size={20} />
                <span className="text-gray-700 dark:text-gray-300">Garantia de satisfação de 30 dias</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 border-t border-gray-200 dark:border-gray-700 pt-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Produtos Relacionados</h2>
            <ProductGrid products={relatedProducts} />
          </div>
        )}
      </div>
    </div>
  );
}
