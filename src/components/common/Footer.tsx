'use client';

import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-white font-bold mb-4">Sobre</h3>
            <p className="text-sm">
              Seu destino para produtos de qualidade com as melhores ofertas do mercado.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Links Rápidos</h3>
            <ul className="text-sm space-y-2">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition">
                  Produtos
                </Link>
              </li>
              <li>
                <button className="hover:text-white transition cursor-pointer">
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-bold mb-4">Suporte</h3>
            <ul className="text-sm space-y-2">
              <li>
                <button className="hover:text-white transition cursor-pointer">
                  Contato
                </button>
              </li>
              <li>
                <button className="hover:text-white transition cursor-pointer">
                  Políticas
                </button>
              </li>
              <li>
                <button className="hover:text-white transition cursor-pointer">
                  Termos
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-4">Contato</h3>
            <p className="text-sm mb-2">Email: support@ecommerce.com</p>
            <p className="text-sm">Telefone: +55 (11) 9999-9999</p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>&copy; 2025 Ecommerce. Todos os direitos reservados.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <button className="hover:text-white transition cursor-pointer">
              Facebook
            </button>
            <button className="hover:text-white transition cursor-pointer">
              Instagram
            </button>
            <button className="hover:text-white transition cursor-pointer">
              Twitter
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
