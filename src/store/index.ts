import { configureStore } from '@reduxjs/toolkit';
import ratingReducer from './ratingSlice';

const store = configureStore({
  reducer: {
    rating: ratingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
