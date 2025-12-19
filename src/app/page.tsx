import { Metadata } from 'next';
import { ProductGrid } from '@/components/product/ProductGrid';
import { mockProducts } from '@/mocks/products';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Home - Ecommerce',
  description:
    'Bem-vindo à nossa loja online. Encontre os melhores produtos com as melhores ofertas.',
};

export default async function Home() {
  return (
    <div>
      {/* Hero Banner */}
      <section className="relative h-96 bg-linear-to-r from-blue-600 to-purple-600 flex items-center justify-center text-center text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-80 h-80 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="relative z-10 max-w-2xl px-4">
          <h1 className="text-5xl font-bold mb-4">Bem-vindo à nossa Loja</h1>
          <p className="text-xl mb-8 text-blue-50">
            Encontre os melhores produtos com as melhores ofertas do mercado
          </p>
          <Link
            href="/products"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
          >
            Explorar Produtos
          </Link>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Categorias</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Electronics Category */}
          <Link
            href="/products?category=electronics"
            className="group relative h-48 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition"
          >
            <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-cyan-500 opacity-80 group-hover:opacity-90 transition" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <h3 className="text-2xl font-bold mb-2">Eletrônicos</h3>
                <p className="text-sm opacity-90">Descubra nossa coleção</p>
              </div>
            </div>
          </Link>

          {/* Fashion Category */}
          <Link
            href="/products?category=fashion"
            className="group relative h-48 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition"
          >
            <div className="absolute inset-0 bg-linear-to-r from-purple-500 to-pink-500 opacity-80 group-hover:opacity-90 transition" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <h3 className="text-2xl font-bold mb-2">Moda</h3>
                <p className="text-sm opacity-90">Produtos em destaque</p>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Produtos em Destaque</h2>
        <ProductGrid products={mockProducts.slice(0, 8)} />
      </section>

      {/* Trust Section */}
      <section className="bg-gray-50 py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Por que confiar em nós?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xl font-bold">
                  ✓
                </div>
              </div>
              <h3 className="font-bold text-lg mb-2">Frete Grátis</h3>
              <p className="text-gray-600">Envio gratuito para todas as compras acima de R$ 100</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xl font-bold">
                  ✓
                </div>
              </div>
              <h3 className="font-bold text-lg mb-2">Garantia 100%</h3>
              <p className="text-gray-600">Satisfação garantida ou seu dinheiro de volta</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xl font-bold">
                  ✓
                </div>
              </div>
              <h3 className="font-bold text-lg mb-2">Suporte 24/7</h3>
              <p className="text-gray-600">Atendimento ao cliente disponível a qualquer momento</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
