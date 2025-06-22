import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { MarketplaceItem } from '../types';

interface MarketplaceState {
  items: MarketplaceItem[];
  loading: boolean;
  error: string | null;
}

const initialState: MarketplaceState = {
  items: [],
  loading: false,
  error: null
};

const marketplaceSlice = createSlice({
  name: 'marketplace',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<MarketplaceItem>) => {
      state.items.push(action.payload);
    },
    updateItem: (state, action: PayloadAction<{ id: string | number; updates: Partial<MarketplaceItem> }>) => {
      const { id, updates } = action.payload;
      const index = state.items.findIndex(item => item.id === id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...updates };
      }
    },
    deleteItem: (state, action: PayloadAction<string | number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  }
});

export const { 
  addItem, 
  updateItem, 
  deleteItem, 
  setLoading, 
  setError, 
  clearError 
} = marketplaceSlice.actions;

export default marketplaceSlice.reducer;
