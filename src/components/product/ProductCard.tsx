'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { formatCurrency, truncateText } from '@/utils/formatter';
import { useCart } from '@/hooks/useCart';
import { useWishlistStore } from '@/store/wishlistStore';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addItem(product, 1);
    toast.success('Produto adicionado ao carrinho!');
  };

  const handleToggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast.success('Removido dos favoritos');
    } else {
      addToWishlist(product);
      toast.success('Adicionado aos favoritos!');
    }
  };

  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
    >
      {/* Image Container */}
      <Link href={`/products/${product.id}`}>
        <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-700 overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          {product.rating && (
            <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-lg text-sm flex items-center gap-1">
              <Star size={14} fill="currentColor" />
              {product.rating.rate.toFixed(1)}
            </div>
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              handleToggleWishlist();
            }}
            className={`absolute top-2 left-2 p-2 rounded-full backdrop-blur-sm transition ${
              inWishlist 
                ? 'bg-red-500 text-white' 
                : 'bg-white/80 text-gray-700 hover:bg-white'
            }`}
            aria-label={inWishlist ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            <Heart size={18} fill={inWishlist ? 'currentColor' : 'none'} />
          </button>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition">
            {truncateText(product.title, 50)}
          </h3>
        </Link>

        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{product.description}</p>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{formatCurrency(product.price)}</p>
            {product.rating && (
              <p className="text-xs text-gray-500 dark:text-gray-400">({product.rating.count} avaliações)</p>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition"
          aria-label={`Adicionar ${product.title} ao carrinho`}
        >
          <ShoppingCart size={18} />
          Adicionar
        </button>
      </div>
    </motion.div>
  );
};
