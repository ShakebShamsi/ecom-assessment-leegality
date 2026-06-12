import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../shared/components/Layout';
import { ProductListingPage } from '../features/products/pages/ProductListingPage';
import { ProductDetailPage } from '../features/products/pages/ProductDetailPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <ProductListingPage />,
      },
      {
        path: '/product/:id',
        element: <ProductDetailPage />,
      },
    ],
  },
]);
