import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';


export const useSortedTokens = (tokens: any[] | undefined) => {
const { sortBy, sortDir } = useSelector((s: RootState) => s.ui);
return useMemo(() => {
if (!tokens) return [];
const arr = [...tokens];
if (sortDir === 'none') return arr;
arr.sort((a: any, b: any) => {
const va = a[sortBy] ?? 0;
const vb = b[sortBy] ?? 0;
return sortDir === 'asc' ? va - vb : vb - va;
});
return arr;
}, [tokens, sortBy, sortDir]);
};