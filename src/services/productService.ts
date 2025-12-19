import axios, { AxiosInstance } from 'axios';
import { Product, ProductFilters } from '@/types';
import { mockProducts } from '@/mocks/products';

class ProductService {
  private readonly apiClient: AxiosInstance;
  private readonly baseURL = 'https://fakestoreapi.com/products';

  constructor() {
    this.apiClient = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
    });
  }

  /**
   * Fetch all products from API or fallback to mock data
   */
  async getAllProducts(): Promise<Product[]> {
    try {
      const response = await this.apiClient.get<Array<Record<string, unknown>>>('');
      return this.mapFakeStoreApiResponse(response.data);
    } catch {
      console.warn('Failed to fetch products from API, using mock data');
      return mockProducts;
    }
  }

  /**
   * Fetch a single product by ID
   */
  async getProductById(id: number): Promise<Product | null> {
    try {
      const response = await this.apiClient.get<Record<string, unknown>>(`/${id}`);
      return this.mapFakeStoreApiItem(response.data);
    } catch {
      console.warn(`Failed to fetch product ${id}, searching in mock data`);
      return mockProducts.find((p) => p.id === id) || null;
    }
  }

  /**
   * Get products by category
   */
  async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      const response = await this.apiClient.get<Array<Record<string, unknown>>>(`/category/${category}`);
      return this.mapFakeStoreApiResponse(response.data);
    } catch {
      console.warn(`Failed to fetch products for category ${category}`);
      return mockProducts.filter((p) => p.category === category);
    }
  }

  /**
   * Get all available categories
   */
  async getCategories(): Promise<string[]> {
    try {
      const response = await this.apiClient.get<string[]>('/categories');
      return response.data;
    } catch {
      console.warn('Failed to fetch categories');
      return ['electronics', 'fashion'];
    }
  }

  /**
   * Filter products locally
   */
  filterProducts(products: Product[], filters: ProductFilters): Product[] {
    let filtered = [...products];

    // Filter by category
    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter((p) => p.category === filters.category);
    }

    // Filter by price range
    if (filters.priceRange) {
      filtered = filtered.filter(
        (p) => p.price >= filters.priceRange!.min && p.price <= filters.priceRange!.max
      );
    }

    // Sort
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price-asc':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'title-asc':
          filtered.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'title-desc':
          filtered.sort((a, b) => b.title.localeCompare(a.title));
          break;
      }
    }

    return filtered;
  }

  /**
   * Map Fake Store API response to our Product type
   */
  private mapFakeStoreApiResponse(data: Array<Record<string, unknown>>): Product[] {
    return data.map((item) => this.mapFakeStoreApiItem(item));
  }

  /**
   * Map single Fake Store API item to our Product type
   */
  private mapFakeStoreApiItem(item: Record<string, unknown>): Product {
    const id = item.id as number;
    const title = item.title as string;
    const price = item.price as number;
    const description = item.description as string;
    const category = item.category as string;
    const image = item.image as string;
    const rating = item.rating as { rate: number; count: number };

    return {
      id,
      title,
      price,
      description,
      category,
      image,
      rating: {
        rate: rating?.rate || 0,
        count: rating?.count || 0,
      },
    };
  }
}

export const productService = new ProductService();
