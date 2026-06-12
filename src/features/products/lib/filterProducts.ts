import type { Product } from '../model/types';

export interface FilterOptions {
  minPrice: string;
  maxPrice: string;
  selectedBrands: string[];
}

const parsePositiveNumber = (value: string): number | null => {
  if (!value.trim()) {
    return null;
  }

  const numericValue = Number(value);
  if (!Number.isFinite(numericValue) || numericValue < 0) {
    return null;
  }

  return numericValue;
};

export const filterProducts = (products: Product[], options: FilterOptions): Product[] => {
  const minPrice = parsePositiveNumber(options.minPrice);
  const maxPrice = parsePositiveNumber(options.maxPrice);

  return products.filter((product) => {
    const meetsMinPrice = minPrice === null ? true : product.price >= minPrice;
    const meetsMaxPrice = maxPrice === null ? true : product.price <= maxPrice;
    const meetsBrand =
      options.selectedBrands.length === 0 ? true : options.selectedBrands.includes(product.brand);

    return meetsMinPrice && meetsMaxPrice && meetsBrand;
  });
};

export const paginateProducts = (
  products: Product[],
  page: number,
  pageSize: number,
): Product[] => {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return products.slice(start, end);
};
