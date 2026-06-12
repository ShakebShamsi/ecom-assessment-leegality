import { describe, expect, it } from 'vitest';
import {
  clearFilters,
  productFiltersReducer,
  setCategory,
  setMaxPrice,
  setMinPrice,
  setPage,
  toggleBrand,
} from './filtersSlice';

describe('filtersSlice', () => {
  it('resets page when setting category', () => {
    const nextState = productFiltersReducer(
      {
        category: null,
        minPrice: '',
        maxPrice: '',
        selectedBrands: [],
        page: 3,
        pageSize: 12,
      },
      setCategory('beauty'),
    );

    expect(nextState.page).toBe(1);
    expect(nextState.category).toBe('beauty');
  });

  it('toggles brands and clears filters', () => {
    let state = productFiltersReducer(undefined, toggleBrand('Acme'));
    expect(state.selectedBrands).toEqual(['Acme']);

    state = productFiltersReducer(state, toggleBrand('Acme'));
    expect(state.selectedBrands).toEqual([]);

    state = productFiltersReducer(state, setMinPrice('10'));
    state = productFiltersReducer(state, setMaxPrice('500'));
    state = productFiltersReducer(state, setPage(2));
    state = productFiltersReducer(state, clearFilters());

    expect(state.page).toBe(1);
    expect(state.minPrice).toBe('');
    expect(state.maxPrice).toBe('');
    expect(state.selectedBrands).toEqual([]);
  });
});
