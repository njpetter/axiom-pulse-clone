'use client';


import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { setSort } from '@/store/uiSlice';


const SORT_FIELDS = [
{ key: 'marketCap', label: 'MC' },
{ key: 'price', label: 'Price' },
{ key: 'age', label: 'Age' }
];


export default function TokenTableHeader() {
const dispatch = useDispatch();
const { sortBy, sortDir } = useSelector((s: RootState) => s.ui);


function cycleSort(field: string) {
if (sortBy !== field) {
dispatch(setSort({ by: field, dir: 'desc' }));
return;
}
if (sortDir === 'desc') {
dispatch(setSort({ by: field, dir: 'asc' }));
} else if (sortDir === 'asc') {
dispatch(setSort({ by: field, dir: 'none' }));
} else {
dispatch(setSort({ by: field, dir: 'desc' }));
}
}


return (
<div className="flex items-center justify-between text-xs text-gray-400 mb-2">
<div className="flex items-center gap-2">
<span className="uppercase tracking-wide text-[11px]">Pairs</span>
</div>
<div className="flex items-center gap-4">
{SORT_FIELDS.map((f) => {
const isActive = sortBy === f.key && sortDir !== 'none';
return (
<button
key={f.key}
onClick={() => cycleSort(f.key)}
className="inline-flex items-center gap-1 hover:text-gray-200 transition-colors"
>
<span>{f.label}</span>
{isActive && (
<span className="text-[9px]">{sortDir === 'asc' ? '▲' : '▼'}</span>
)}
</button>
);
})}
</div>
</div>
);
}