import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../../app/store';
import type { Product } from '../model/types';
import { filterProducts, paginateProducts } from '../lib/filterProducts';

const selectFilterState = (state: RootState) => state.productFilters;

export const selectAvailableBrands = createSelector(
  [(_state: RootState, products: Product[]) => products],
  (products) => [...new Set(products.map((product) => product.brand).filter(Boolean))].sort(),
);

export const selectFilteredProducts = createSelector(
  [
    (_state: RootState, products: Product[]) => products,
    selectFilterState,
  ],
  (products, filters) =>
    filterProducts(products, {
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      selectedBrands: filters.selectedBrands,
    }),
);

export const selectPaginatedProducts = createSelector(
  [selectFilteredProducts, selectFilterState],
  (products, filters) => paginateProducts(products, filters.page, filters.pageSize),
);

export const selectPaginationMeta = createSelector([selectFilteredProducts, selectFilterState], (products, filters) => ({
  currentPage: filters.page,
  pageSize: filters.pageSize,
  totalItems: products.length,
  totalPages: Math.max(1, Math.ceil(products.length / filters.pageSize)),
}));
