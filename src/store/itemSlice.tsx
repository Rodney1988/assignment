import { createSlice } from '@reduxjs/toolkit';
import { ApiResponse } from '../types';
import { fetchAllItems } from '../api/itemsThunk';

interface ItemsState {
  ItemsData: ApiResponse;
  loading: boolean;
  error: string | null;
}

const initialState: ItemsState = {
  ItemsData: {},
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
        state.ItemsData = action.payload;
      })
      .addCase(fetchAllItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export default itemsSlice.reducer;
