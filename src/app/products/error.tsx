"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Search } from "lucide-react";

export default function ProductsError({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[40vh] bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 flex flex-col items-center justify-center text-center">
      <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
        <AlertTriangle className="text-red-600" />
      </div>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Falha ao carregar produtos</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Ocorreu um erro ao buscar os produtos. Tente novamente ou ajuste os filtros.
      </p>
      <div className="flex items-center gap-3">
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
        >
          <RefreshCw size={16} /> Recarregar
        </button>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          <Search size={16} /> Ver todos
        </Link>
      </div>
    </div>
  );
}
