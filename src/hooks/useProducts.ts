'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { Product, ProductFilters } from '@/types';
import { productService } from '@/services/productService';

/**
 * Hook to fetch all products
 */
export const useProducts = (): UseQueryResult<Product[], Error> => {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => productService.getAllProducts(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });
};

/**
 * Hook to fetch a single product by ID
 */
export const useProduct = (id: number): UseQueryResult<Product | null, Error> => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getProductById(id),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: id > 0,
  });
};

/**
 * Hook to fetch products by category
 */
export const useProductsByCategory = (category: string): UseQueryResult<Product[], Error> => {
  return useQuery({
    queryKey: ['products', category],
    queryFn: () => productService.getProductsByCategory(category),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: !!category,
  });
};

/**
 * Hook to fetch all categories
 */
export const useCategories = (): UseQueryResult<string[], Error> => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => productService.getCategories(),
    staleTime: 10 * 60 * 1000,
    gcTime: 20 * 60 * 1000,
  });
};

/**
 * Hook to filter products
 */
export const useFilteredProducts = (
  products: Product[] | undefined,
  filters: ProductFilters
): Product[] => {
  if (!products) return [];
  return productService.filterProducts(products, filters);
};
