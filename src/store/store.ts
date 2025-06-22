import { configureStore } from '@reduxjs/toolkit';
import marketplaceReducer from './marketplaceSlice';

export const store = configureStore({
  reducer: {
    marketplace: marketplaceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;