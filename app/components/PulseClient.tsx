// src/components/PulseClient.tsx
'use client';

import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useWebsocketMock } from '@/hooks/useWebsocketMock';
import TokenTable from './organisms/TokenTable';

/**
 * PulseClient:
 * - must be a Client Component because it uses `useQueryClient` and `useWebsocketMock`
 * - delegates rendering to TokenTable (TokenTable itself may also be a client component)
 */

export default function PulseClient() {
  const qc = useQueryClient(); // requires QueryClientProvider in layout
  // start the websocket mock on mount (hook handles cleanup)
  useWebsocketMock(qc);

  return <TokenTable />;
}
