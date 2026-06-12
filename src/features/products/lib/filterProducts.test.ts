import { describe, expect, it } from 'vitest';
import { filterProducts, paginateProducts } from './filterProducts';
import type { Product } from '../model/types';

const products: Product[] = [
  {
    id: 1,
    title: 'Phone',
    description: 'Smart phone',
    category: 'electronics',
    price: 300,
    rating: 4.3,
    brand: 'Acme',
    thumbnail: 'phone.png',
    images: [],
  },
  {
    id: 2,
    title: 'Shoes',
    description: 'Running shoes',
    category: 'fashion',
    price: 120,
    rating: 4.1,
    brand: 'Orbit',
    thumbnail: 'shoes.png',
    images: [],
  },
  {
    id: 3,
    title: 'Tablet',
    description: 'Work tablet',
    category: 'electronics',
    price: 800,
    rating: 4.8,
    brand: 'Acme',
    thumbnail: 'tablet.png',
    images: [],
  },
];

describe('filterProducts', () => {
  it('applies brand and price range together', () => {
    const result = filterProducts(products, {
      minPrice: '200',
      maxPrice: '700',
      searchTerm: '',
      selectedBrands: ['Acme'],
    });

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
  });

  it('ignores invalid numeric values', () => {
    const result = filterProducts(products, {
      minPrice: '-1',
      maxPrice: 'abc',
      searchTerm: '',
      selectedBrands: [],
    });

    expect(result).toHaveLength(3);
  });

  it('filters by search term across title, description, brand, and category', () => {
    const result = filterProducts(products, {
      minPrice: '',
      maxPrice: '',
      searchTerm: 'work',
      selectedBrands: [],
    });

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(3);
  });
});

describe('paginateProducts', () => {
  it('returns expected slice by page', () => {
    const result = paginateProducts(products, 2, 2);

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(3);
  });
});
