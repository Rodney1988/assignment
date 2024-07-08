import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Item {
  id: string;
  name: string;
}

interface ItemsState {
  items: Item[];
}

const initialState: ItemsState = {
  items: [{ id: 'hello', name: 'John' }],
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Item>) {
      state.items.push(action.payload);
    },
  },
});

export const { addItem } = itemsSlice.actions;

export default itemsSlice.reducer;
