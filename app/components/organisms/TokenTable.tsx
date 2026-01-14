'use client';
// src/components/organisms/TokenTable.tsx

import React, { useMemo } from 'react';
import { useTokensQuery } from '@/hooks/useTokensQuery';
import { useSortedTokens } from '@/hooks/useSortedTokens';
import TokenRow from '../molecules/TokenRow';
import TokenTableHeader from '../molecules/TokenTableHeader';
import ModalManager from '../organisms/ModalManager';
import Skeleton from '../atoms/Skeleton';
import type { Token } from '@/lib/api';

/**
 * TokenTable
 * - 3 columns: New Pairs, Final Stretch, Migrated
 * - uses useTokensQuery (React Query) for data
 * - uses useSortedTokens (Redux sort state) for sorting
 * - groups tokens by `token.column`
 * - displays skeletons, error state, empty state
 * - renders ModalManager (global token detail modal)
 *
 * Drop into: src/components/organisms/TokenTable.tsx
 */

const COLUMNS: { key: Token['column']; label: string }[] = [
  { key: 'new', label: 'New Pairs' },
  { key: 'final', label: 'Final Stretch' },
  { key: 'migrated', label: 'Migrated' },
];

export default function TokenTable(): React.ReactElement {
  const { data, isLoading, isError, refetch } = useTokensQuery();
  // `useSortedTokens` accepts undefined | Token[] and returns a stable sorted array
  const sorted = useSortedTokens(Array.isArray(data) ? data : []);

  /**
   * Group tokens by column and memoize so we don't re-calc on unrelated renders.
   * map shape: { new: Token[], final: Token[], migrated: Token[] }
   */
  const byColumn = useMemo(() => {
    const map: Record<Token['column'], Token[]> = {
      new: [],
      final: [],
      migrated: [],
    };
    for (const t of sorted as Token[]) {
      // Type guard: ensure token has column, fallback to 'new'
      if (t && (t.column === 'new' || t.column === 'final' || t.column === 'migrated')) {
        map[t.column as keyof typeof map].push(t);
      } else {
        map.new.push(t);
      }
    }
    return map;
  }, [sorted]);

  if (isError) {
    return (
      <div className="p-4 bg-red-900/10 border border-red-800 rounded-md text-sm">
        <div className="font-semibold text-red-200 mb-2">Failed to load tokens</div>
        <div className="flex gap-2">
          <button
            onClick={() => refetch()}
            className="px-3 py-1 rounded bg-red-700 text-xs hover:bg-red-600"
          >
            Retry
          </button>
          <div className="text-xs text-red-300 self-center">If the problem persists, check your network.</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full">
        {/* Top-level page header area can go here if needed */}
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Pulse</h1>
          <div className="text-sm text-gray-400">Live token discovery — mock data</div>
        </div>

        {/* Grid of three columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {COLUMNS.map((col) => (
            <section
              key={col.key}
              aria-labelledby={`col-${col.key}`}
              className="bg-[#020617] border border-[#1f2933] rounded-xl p-3 flex flex-col gap-3 min-h-[220px]"
            >
              {/* Column header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 id={`col-${col.key}`} className="text-sm font-semibold">
                    {col.label}
                  </h2>
                  {/* small badges / presets */}
                  <span className="text-[11px] text-gray-500 uppercase">P1</span>
                </div>
                <div className="text-[11px] text-gray-400">
                  {(byColumn[col.key] as Token[]).length} / {data ? (data as Token[]).length : '—'}
                </div>
              </div>

              {/* column-specific header controls (sorting etc.) */}
              <TokenTableHeader />

              {/* Column content */}
              <div className="flex-1 space-y-3">
                {/* Loading skeletons */}
                {isLoading &&
                  Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-20 w-full rounded-lg" />
                  ))}

                {/* Render rows once loaded */}
                {!isLoading &&
                  byColumn[col.key].map((t) => (
                    <TokenRow key={t.id} token={t} />
                  ))}

                {/* Empty state */}
                {!isLoading && byColumn[col.key].length === 0 && (
                  <div className="py-6 text-center text-xs text-gray-500 border border-dashed border-[#263043] rounded">
                    No tokens in this column yet.
                  </div>
                )}
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* Global modal manager (renders into document.body via portal) */}
      {Array.isArray(data) && <ModalManager tokens={data} />}
    </>
  );
}
