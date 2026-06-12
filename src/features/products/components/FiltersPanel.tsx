import { useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useGetCategoriesQuery } from '../api/productsApi';
import {
  setCategory,
  setMaxPrice,
  setMinPrice,
  toggleBrand,
} from '../store/filtersSlice';
import { sanitizeNumericInput } from '../../../shared/lib/sanitize';

interface FiltersPanelProps {
  brands: string[];
}

export const FiltersPanel = ({ brands }: FiltersPanelProps) => {
  const dispatch = useAppDispatch();
  const { category, maxPrice, minPrice, selectedBrands } = useAppSelector((state) => state.productFilters);
  const { data: categories = [] } = useGetCategoriesQuery();
  const [searchText, setSearchText] = useState('');
  const [priceDraft, setPriceDraft] = useState<{ min: string; max: string } | null>(null);

  const minDraft = priceDraft?.min ?? minPrice;
  const maxDraft = priceDraft?.max ?? maxPrice;

  const toLabel = (value: string) =>
    value
      .split('-')
      .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
      .join(' ');

  const normalizedSearch = searchText.trim().toLowerCase();

  const filteredCategories = useMemo(
    () =>
      categories
        .filter(Boolean)
        .filter((item) => toLabel(item).toLowerCase().includes(normalizedSearch)),
    [categories, normalizedSearch],
  );

  const brandOptions = useMemo(
    () =>
      brands
        .filter(Boolean)
        .filter((brand) => brand.toLowerCase().includes(normalizedSearch)),
    [brands, normalizedSearch],
  );

  const handleApplyPrice = () => {
    dispatch(setMinPrice(sanitizeNumericInput(minDraft)));
    dispatch(setMaxPrice(sanitizeNumericInput(maxDraft)));
    setPriceDraft(null);
  };

  return (
    <aside id="filters-panel" className="filters-panel" aria-label="Filters">
      <div className="filters-search">
        <span className="filters-search-icon" aria-hidden="true">
          🔍
        </span>
        <input
          type="search"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          placeholder="Search..."
          aria-label="Search filters"
        />
      </div>

      <div className="filters-group">
        <h3>Categories</h3>
        <div className="brand-list">
          {filteredCategories.map((item) => (
            <label key={item} className="brand-item">
              <input
                type="checkbox"
                checked={category === item}
                onChange={() => dispatch(setCategory(category === item ? null : item))}
              />
              <span>{toLabel(item)}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filters-group">
        <h3>Price Range</h3>
        <div className="price-range-row">
          <input
            id="min-price"
            type="text"
            inputMode="decimal"
            value={minDraft}
            onChange={(event) => {
              const nextMin = sanitizeNumericInput(event.target.value);
              setPriceDraft((previous) => ({ min: nextMin, max: previous?.max ?? maxPrice }));
            }}
            placeholder="Min"
            aria-label="Min price"
          />
          <input
            id="max-price"
            type="text"
            inputMode="decimal"
            value={maxDraft}
            onChange={(event) => {
              const nextMax = sanitizeNumericInput(event.target.value);
              setPriceDraft((previous) => ({ min: previous?.min ?? minPrice, max: nextMax }));
            }}
            placeholder="Max"
            aria-label="Max price"
          />
        </div>
        <button type="button" className="price-apply-btn" onClick={handleApplyPrice}>
          Apply
        </button>
      </div>

      <div className="filters-group">
        <h3>Brands</h3>
        <div className="brand-list">
          {brandOptions.length === 0 && <p className="helper-text">No matching brands.</p>}
          {brandOptions.map((brand) => (
            <label key={brand} className="brand-item">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => dispatch(toggleBrand(brand))}
              />
              <span>{brand}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
};
