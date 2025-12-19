import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { Toaster } from '@/components/common/Toaster';
import { ScrollToTop } from '@/components/common/ScrollToTop';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Ecommerce - Produtos de Qualidade',
  description:
    'Sua loja online de confiança com os melhores produtos e ofertas do mercado.',
  openGraph: {
    title: 'Ecommerce',
    description: 'Sua loja online de confiança com os melhores produtos.',
    url: 'https://ecommerce.com',
    siteName: 'Ecommerce',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-900`}>
        <Providers>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Toaster />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}
