import { configureStore } from '@reduxjs/toolkit';
import { productsApi } from '../features/products/api/productsApi';
import { productFiltersReducer } from '../features/products/store/filtersSlice';

export const store = configureStore({
  reducer: {
    productFilters: productFiltersReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: true,
    }).concat(productsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
