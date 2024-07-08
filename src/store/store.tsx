import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from './itemSlice';

const store = configureStore({
  reducer: {
    itemsObject: itemsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
