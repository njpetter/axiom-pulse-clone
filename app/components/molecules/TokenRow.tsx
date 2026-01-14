'use client';


import React, { useEffect, useState } from 'react';
import type { Token } from '@/lib/api';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { selectToken } from '@/store/uiSlice';
import * as Popover from '@radix-ui/react-popover';


interface Props {
token: Token;
}


export default function TokenRow({ token }: Props) {
const [flash, setFlash] = useState<'up' | 'down' | 'none'>('none');
const dispatch = useDispatch();


useEffect(() => {
if (!token.lastChange) return;
setFlash(token.lastChange > 0 ? 'up' : 'down');
const id = setTimeout(() => setFlash('none'), 600);
return () => clearTimeout(id);
}, [token.lastChange]);


return (
<div
className="relative flex items-center gap-3 p-3 border border-[#242833] rounded-lg bg-[#10141b] hover:border-[#3b82f6] hover:bg-[#111827] cursor-pointer transition-colors duration-150"
onClick={() => dispatch(selectToken(token.id))}
>
{/* Avatar */}
<div className="w-10 h-10 rounded-md bg-gray-800 flex items-center justify-center text-[11px] text-gray-200">
{token.symbol ?? token.name[0]}
</div>


<div className="flex-1 min-w-0">
<div className="flex items-center justify-between gap-2">
<div className="truncate text-sm font-medium">{token.name}</div>
<div
className={clsx(
'px-2 py-0.5 rounded text-[11px] font-mono transition-colors duration-300',
flash === 'up'
? 'bg-green-900 text-green-300'
: flash === 'down'
? 'bg-red-900 text-red-300'
: 'bg-[#020617] text-gray-100'
)}
>
{token.price.toFixed(6)}
</div>
</div>
<div className="mt-1 flex items-center justify-between text-[11px] text-gray-400">
<div className="flex items-center gap-2">
<span className="uppercase text-[10px] text-gray-500">MC</span>
<span>${token.marketCap?.toLocaleString() ?? '—'}</span>
</div>
{token.age != null && <span>{token.age}s</span>}
</div>


{/* mini stats row with popover trigger */}
<div className="mt-1 flex items-center gap-3 text-[10px] text-gray-500">
<Popover.Root>
<Popover.Trigger
onClick={(e) => e.stopPropagation()}
className="px-1.5 py-0.5 rounded bg-[#020617] hover:bg-[#111827] border border-[#1f2933]"
>
Stats
</Popover.Trigger>

<Popover.Content sideOffset={6} className="z-50 p-2 bg-[#0b1115] rounded border border-[#1f2933] text-[12px]">
<div className="text-sm text-gray-200">24h Change: {token.lastChange != null ? `${token.lastChange}` : '—'}</div>
<div className="mt-1 text-xs text-gray-400">Volume: {token.volume?.toLocaleString() ?? '—'}</div>
<Popover.Arrow className="fill-[#0b1115]" />
</Popover.Content>
</Popover.Root>
</div>


</div>
</div>
);
}