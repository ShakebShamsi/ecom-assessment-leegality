import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { CategoryResponseItem, Product, ProductsResponse } from '../model/types';

const BASE_URL = 'https://dummyjson.com';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, { limit?: number; skip?: number }>({
      query: ({ limit = 200, skip = 0 }) => `/products?limit=${limit}&skip=${skip}`,
    }),
    getProductsByCategory: builder.query<ProductsResponse, { category: string; limit?: number; skip?: number }>({
      query: ({ category, limit = 200, skip = 0 }) =>
        `/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`,
    }),
    getProductById: builder.query<Product, number>({
      query: (id) => `/products/${id}`,
    }),
    getCategories: builder.query<string[], void>({
      query: () => '/products/categories',
      transformResponse: (response: Array<string | CategoryResponseItem>) =>
        response
          .map((item) => (typeof item === 'string' ? item : item.slug ?? item.name ?? ''))
          .filter(Boolean),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductsByCategoryQuery,
  useGetProductByIdQuery,
  useGetCategoriesQuery,
} = productsApi;
