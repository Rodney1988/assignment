import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ApiResponse } from '../types';
import { fetchAllItems } from '../api/itemsThunk';

interface ItemsState {
  itemsData: ApiResponse | null;
  loading: boolean;
  error: string | null;
  activeItemId: string | null;
  snackbarString: string;
}

const initialState: ItemsState = {
  itemsData: {},
  loading: false,
  error: null,
  activeItemId: null,
  snackbarString: '',
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    // To be used on the CustomCard to set a specific item to "active"
    setActiveItem: (state, action: PayloadAction<string>) => {
      const itemKey = action.payload;

      // Ensure itemsData is not null
      if (state.itemsData) {
        // Clear previous active item if any
        if (state.activeItemId && state.itemsData[state.activeItemId]) {
          state.itemsData[state.activeItemId].active = false;
        }

        // Set new active item
        if (state.itemsData[itemKey]) {
          state.itemsData[itemKey].active = true;
          state.activeItemId = itemKey;
        }
      }
    },
    // To be used in the itemsThunk api method, sets message for snackbar
    setSnackbarString: (state, action: PayloadAction<string>) => {
      state.snackbarString = action.payload;
    },
  },
  // Note to self: extraReducers allows .addCase to handle the fetchAllItems async
  // Thunk created with createAsyncThunk (adjust thunk lifecycle)
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

export const { setActiveItem, setSnackbarString } = itemsSlice.actions;

export default itemsSlice.reducer;
