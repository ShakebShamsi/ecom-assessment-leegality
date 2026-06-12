import { useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { FiltersPanel } from '../components/FiltersPanel';
import { ProductCard } from '../components/ProductCard';
import { Pagination } from '../components/Pagination';
import { useGetProductsByCategoryQuery, useGetProductsQuery } from '../api/productsApi';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setPage } from '../store/filtersSlice';
import {
  selectAvailableBrands,
  selectPaginatedProducts,
  selectPaginationMeta,
} from '../store/selectors';
import { LoadingState } from '../../../shared/components/LoadingState';
import { ErrorState } from '../../../shared/components/ErrorState';
import { EmptyState } from '../../../shared/components/EmptyState';

interface LayoutContext {
  isSidebarOpen: boolean;
}

export const ProductListingPage = () => {
  const dispatch = useAppDispatch();
  const category = useAppSelector((state) => state.productFilters.category);
  const { isSidebarOpen } = useOutletContext<LayoutContext>();

  const allProductsQuery = useGetProductsQuery({ limit: 200, skip: 0 }, { skip: Boolean(category) });
  const categoryProductsQuery = useGetProductsByCategoryQuery(
    { category: category ?? '', limit: 200, skip: 0 },
    { skip: !category },
  );

  const activeQuery = category ? categoryProductsQuery : allProductsQuery;
  const sourceProducts = useMemo(() => activeQuery.data?.products ?? [], [activeQuery.data?.products]);

  const brands = useAppSelector((state) => selectAvailableBrands(state, sourceProducts));
  const paginatedProducts = useAppSelector((state) => selectPaginatedProducts(state, sourceProducts));
  const pagination = useAppSelector((state) => selectPaginationMeta(state, sourceProducts));

  if (activeQuery.isLoading) {
    return <LoadingState message="Loading products..." />;
  }

  if (activeQuery.isError) {
    return <ErrorState message="We could not load products right now. Please try again." />;
  }

  return (
    <main className={`listing-page ${isSidebarOpen ? 'with-sidebar' : 'without-sidebar'}`}>
      {isSidebarOpen ? <FiltersPanel brands={brands} /> : null}
      <section className="products-section" aria-live="polite">
        <div className="products-header">
          <h1>Product Listing</h1>
          <p>{pagination.totalItems} product(s) found</p>
        </div>

        {paginatedProducts.length === 0 ? (
          <EmptyState
            title="No products found"
            description="Try adjusting your filters to find matching products."
          />
        ) : (
          <>
            <div className="product-grid">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={(page) => dispatch(setPage(page))}
            />
          </>
        )}
      </section>
    </main>
  );
};
