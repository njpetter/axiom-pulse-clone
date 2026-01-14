'use client';
import type { RootState } from '@/store';
import { selectToken } from '@/store/uiSlice';
import { createPortal } from 'react-dom';
import { Token } from '@/lib/api';
import { useSelector as useReduxSelector, useDispatch } from 'react-redux';


interface Props {
tokens: Token[];
}


export default function ModalManager({ tokens }: Props) {
    const selectedId = useReduxSelector((s: RootState) => s.ui.selectedTokenId);
    const dispatch = useDispatch();

    if (!selectedId) return null;
    const token = tokens.find((t) => t.id === selectedId);
    if (!token) return null;

    return createPortal(
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60">
            <div className="w-full max-w-md rounded-xl bg-[#101318] border border-gray-700 p-5 shadow-xl">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded bg-gray-800 flex items-center justify-center text-sm">
                            {token.symbol ?? token.name[0]}
                        </div>
                        <div>
                            <div className="text-sm font-semibold">{token.name}</div>
                            <div className="text-xs text-gray-400">{token.symbol}</div>
                        </div>
                    </div>
                    <button
                        onClick={() => dispatch(selectToken(undefined))}
                        className="text-gray-400 hover:text-gray-100 text-lg leading-none"
                        aria-label="Close token details"
                    >
                        ×
                    </button>
                </div>

                <div className="mt-4 space-y-2 text-xs text-gray-300">
                    <div className="flex justify-between">
                        <span>Price</span>
                        <span className="font-mono">{token.price.toFixed(6)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Market Cap</span>
                        <span>${token.marketCap?.toLocaleString() ?? '—'}</span>
                    </div>
                    {token.age != null && (
                        <div className="flex justify-between">
                            <span>Age</span>
                            <span>{token.age} s</span>
                        </div>
                    )}
                </div>
            </div>
        </div>,
        document.body
    );
}

// Use the react-redux useSelector implementation
function useSelector<T>(selector: (state: RootState) => T): T {
    return useReduxSelector(selector);
}
