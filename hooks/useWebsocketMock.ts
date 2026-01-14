'use client';
import { QueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';


export function useWebsocketMock(queryClient: QueryClient) {
const interval = useRef<number | null>(null);


useEffect(() => {
function tick() {
queryClient.setQueryData(['tokens'], (old: any) => {
if (!old) return old;
// `old` is an array of tokens
const next = (old as any[]).map((t) => {
if (Math.random() > 0.9) {
const delta = t.price * (Math.random() - 0.5) * 0.02;
return { ...t, price: +(t.price + delta).toFixed(6), lastChange: delta };
}
return t;
});
return next;
});
}
interval.current = window.setInterval(tick, 800);
return () => { if (interval.current) window.clearInterval(interval.current); };
}, [queryClient]);
}