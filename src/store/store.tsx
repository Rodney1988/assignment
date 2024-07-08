import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from './itemSlice';

export interface RootState {
  items: ReturnType<typeof itemsReducer>;
  // Add more slices here as your app grows
}

const store = configureStore({
  reducer: {
    items: itemsReducer,
    // Add more reducers here as your app grows
  },
});

export default store;
