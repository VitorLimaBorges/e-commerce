'use client';

import { ReactNode, useEffect } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/utils/queryClient';
import { useThemeStore } from '@/store/themeStore';

interface ProvidersProps {
  children: ReactNode;
}

function ThemeProvider({ children }: Readonly<{ children: ReactNode }>) {
  const { isDark } = useThemeStore();

  useEffect(() => {
    // Aplica o tema ao carregar a página
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  return <>{children}</>;
}

export function Providers({ children }: Readonly<ProvidersProps>) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>{children}</ThemeProvider>
    </QueryClientProvider>
  );
}
