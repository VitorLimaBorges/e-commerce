'use client';

import { useState, useMemo } from 'react';
import { ProductGrid } from '@/components/product/ProductGrid';
import { GridSkeleton } from '@/components/common/Skeleton';
import { Pagination } from '@/components/common/Pagination';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { useProducts, useFilteredProducts } from '@/hooks/useProducts';
import { ProductFilters, Product } from '@/types';
import { categories } from '@/mocks/products';
import { ChevronDown, Filter, SlidersHorizontal, Star } from 'lucide-react';

const ITEMS_PER_PAGE = 12;

export default function ProductsPage({
  searchParams,
}: Readonly<{
  searchParams: { category?: string; sort?: string; search?: string; page?: string };
}>) {
  const { data: products, isLoading } = useProducts();
  const [currentPage, setCurrentPage] = useState(Number.parseInt(searchParams.page || '1', 10));
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 10000 });
  const [minRating, setMinRating] = useState<number>(0);

  const [filters, setFilters] = useState<ProductFilters>({
    category: searchParams.category || 'all',
    sortBy: (searchParams.sort as 'price-asc' | 'price-desc' | 'title-asc' | 'title-desc' | undefined) || undefined,
  });

  // Filter and search
  const searchedAndFiltered = useMemo(() => {
    let result = products || [];
    
    // Search filter
    if (searchParams.search) {
      const query = searchParams.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    return result;
  }, [products, searchParams.search]);

  const filteredProducts = useFilteredProducts(searchedAndFiltered, filters);

  // Apply price range filter
  const priceFilteredProducts = useMemo(() => {
    return filteredProducts.filter((p: Product) => {
      const inPrice = p.price >= priceRange.min && p.price <= priceRange.max;
      const inRating = minRating === 0 || (p.rating?.rate ?? 0) >= minRating;
      return inPrice && inRating;
    });
  }, [filteredProducts, priceRange, minRating]);

  // Pagination
  const totalPages = Math.ceil((priceFilteredProducts?.length || 0) / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return priceFilteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [priceFilteredProducts, currentPage]);

  const handleCategoryChange = (category: string) => {
    setFilters((prev) => ({
      ...prev,
      category: category === 'all' ? undefined : category,
    }));
    setCurrentPage(1);
  };

  const handleSortChange = (sort: string) => {
    setFilters((prev) => ({
      ...prev,
      sortBy: sort as 'price-asc' | 'price-desc' | 'title-asc' | 'title-desc' | undefined,
    }));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setFilters({ category: 'all', sortBy: undefined });
    setPriceRange({ min: 0, max: 10000 });
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ label: 'Produtos' }]} />
        
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Produtos</h1>
            {searchParams.search && (
              <p className="text-gray-600 dark:text-gray-400">
                Resultados para: <span className="font-semibold">&quot;{searchParams.search}&quot;</span>
              </p>
            )}
          </div>
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <Filter size={16} />
            Limpar Filtros
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Filters */}
          <aside className="lg:w-64 shrink-0">
            <div className="sticky top-24 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <div className="flex items-center gap-2 mb-6">
                <SlidersHorizontal size={20} className="text-gray-700 dark:text-gray-300" />
                <h3 className="font-bold text-gray-900 dark:text-white">Filtros</h3>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <ChevronDown size={16} />
                  Categoria
                </h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      checked={!filters.category || filters.category === 'all'}
                      onChange={() => handleCategoryChange('all')}
                      className="w-4 h-4 text-blue-600 cursor-pointer"
                    />
                    <span className="text-gray-700 dark:text-gray-300">Todas</span>
                  </label>
                  {categories.map((cat) => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        checked={filters.category === cat}
                        onChange={() => handleCategoryChange(cat)}
                        className="w-4 h-4 text-blue-600 cursor-pointer"
                      />
                      <span className="text-gray-700 dark:text-gray-300 capitalize">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Faixa de Preço</h4>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400">Min: R$ {priceRange.min}</label>
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      step="50"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange((prev) => ({ ...prev, min: Number.parseInt(e.target.value, 10) }))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400">Max: R$ {priceRange.max}</label>
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      step="50"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange((prev) => ({ ...prev, max: Number.parseInt(e.target.value, 10) }))}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Avaliação mínima</h4>
                <div className="flex items-center gap-2 flex-wrap">
                  {[0, 4, 3, 2, 1].map((r) => (
                    <button
                      key={`rating-${r}`}
                      onClick={() => setMinRating(r)}
                      className={`px-3 py-1 rounded-lg border transition flex items-center gap-1 ${
                        minRating === r
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                      aria-label={r === 0 ? 'Todas as avaliações' : `${r}+ estrelas`}
                    >
                      {r === 0 ? (
                        <span>Todas</span>
                      ) : (
                        <>
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={`star-${r}-${i}`}
                              size={16}
                              className={i < r ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-600'}
                            />
                          ))}
                          <span className="ml-1 text-sm">{r}+</span>
                        </>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Ordenar por</h4>
                <select
                  value={filters.sortBy || ''}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Padrão</option>
                  <option value="price-asc">Menor Preço</option>
                  <option value="price-desc">Maior Preço</option>
                  <option value="title-asc">Nome (A-Z)</option>
                  <option value="title-desc">Nome (Z-A)</option>
                </select>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Mostrando {paginatedProducts?.length || 0} de {priceFilteredProducts?.length || 0} produtos
              </p>
            </div>

            {isLoading && <GridSkeleton count={12} />}

            {!isLoading && paginatedProducts && paginatedProducts.length > 0 && (
              <>
                <ProductGrid products={paginatedProducts} />
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            )}

            {!isLoading && (!paginatedProducts || paginatedProducts.length === 0) && (
              <div className="text-center py-16">
                <p className="text-xl text-gray-600 dark:text-gray-400">Nenhum produto encontrado</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
