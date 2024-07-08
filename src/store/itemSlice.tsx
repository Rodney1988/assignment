import { createSlice } from '@reduxjs/toolkit';
import { ApiResponse } from '../types';
import { fetchAllItems } from '../api/itemsThunk';

interface ItemsState {
  itemsData: ApiResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: ItemsState = {
  itemsData: null,
  loading: false,
  error: null,
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  //extraReducres allows .addCase to handle the fetchAllItems async Thunk created with createAsyncThunk
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllItems.fulfilled, (state, action) => {
        state.loading = false;
        state.itemsData = action.payload;
      })
      .addCase(fetchAllItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || 'An error occurred';
      });
  },
});

export default itemsSlice.reducer;
