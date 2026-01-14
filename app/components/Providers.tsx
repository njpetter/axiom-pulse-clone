// src/components/Providers.tsx
'use client';

import React, { useRef } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/store';

/**
 * Providers (Client Component)
 * - Keeps client-only providers inside a client boundary
 * - QueryClient is created once per mounted Providers using useRef
 */

export default function Providers({ children }: { children: React.ReactNode }) {
  // create queryClient once per session
  const qcRef = useRef<QueryClient | null>(null);
  if (qcRef.current === null) {
    qcRef.current = new QueryClient({
      defaultOptions: {
        queries: { refetchOnWindowFocus: false, retry: 1 },
      },
    });
  }

  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={qcRef.current}>
        {children}
      </QueryClientProvider>
    </ReduxProvider>
  );
}
