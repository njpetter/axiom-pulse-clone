import { createSlice, PayloadAction } from '@reduxjs/toolkit';


type SortDirection = 'asc' | 'desc' | 'none';
interface UIState {
sortBy: string;
sortDir: SortDirection;
selectedTokenId?: string;
}


const initialState: UIState = { sortBy: 'marketCap', sortDir: 'desc' };


const slice = createSlice({
name: 'ui',
initialState,
reducers: {
setSort(state, action: PayloadAction<{ by: string; dir: SortDirection }>) {
state.sortBy = action.payload.by;
state.sortDir = action.payload.dir;
},
selectToken(state, action: PayloadAction<string | undefined>) {
state.selectedTokenId = action.payload;
}
}
});


export const { setSort, selectToken } = slice.actions;
export default slice.reducer;