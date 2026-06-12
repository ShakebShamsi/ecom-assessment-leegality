import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface ProductFiltersState {
  category: string | null;
  minPrice: string;
  maxPrice: string;
  selectedBrands: string[];
  page: number;
  pageSize: number;
}

const initialState: ProductFiltersState = {
  category: null,
  minPrice: '',
  maxPrice: '',
  selectedBrands: [],
  page: 1,
  pageSize: 12,
};

const filtersSlice = createSlice({
  name: 'productFilters',
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<string | null>) {
      state.category = action.payload;
      state.page = 1;
    },
    setMinPrice(state, action: PayloadAction<string>) {
      state.minPrice = action.payload;
      state.page = 1;
    },
    setMaxPrice(state, action: PayloadAction<string>) {
      state.maxPrice = action.payload;
      state.page = 1;
    },
    toggleBrand(state, action: PayloadAction<string>) {
      const brand = action.payload;
      const exists = state.selectedBrands.includes(brand);

      state.selectedBrands = exists
        ? state.selectedBrands.filter((item) => item !== brand)
        : [...state.selectedBrands, brand];
      state.page = 1;
    },
    clearFilters(state) {
      state.category = null;
      state.minPrice = '';
      state.maxPrice = '';
      state.selectedBrands = [];
      state.page = 1;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
});

export const {
  setCategory,
  setMinPrice,
  setMaxPrice,
  toggleBrand,
  clearFilters,
  setPage,
} = filtersSlice.actions;

export const productFiltersReducer = filtersSlice.reducer;
