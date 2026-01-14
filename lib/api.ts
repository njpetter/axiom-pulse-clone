export type ColumnKey = 'new' | 'final' | 'migrated';


export type Token = {
id: string;
name: string;
symbol?: string;
price: number;
marketCap?: number;
lastChange?: number; // delta for animation
avatar?: string;
age?: number; // seconds
column: ColumnKey;
volume?: number;
};


const COLS: ColumnKey[] = ['new', 'final', 'migrated'];


export async function fetchTokens(): Promise<Token[]> {
const list: Token[] = Array.from({ length: 45 }).map((_, i) => {
const col = COLS[i % COLS.length];
return {
id: `tok-${i}`,
name: col === 'new' ? `New Pair ${i}` : col === 'final' ? `Final ${i}` : `Migrated ${i}`,
symbol: `T${i}`,
price: +(Math.random() * 10).toFixed(6),
marketCap: Math.round(Math.random() * 1_000_000 + 50_000),
lastChange: 0,
age: Math.floor(Math.random() * 600),
column: col
};
});
await new Promise((r) => setTimeout(r, 500));
return list;
}