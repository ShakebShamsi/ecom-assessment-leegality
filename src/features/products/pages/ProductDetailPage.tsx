import { useNavigate, useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../api/productsApi';
import { LoadingState } from '../../../shared/components/LoadingState';
import { ErrorState } from '../../../shared/components/ErrorState';

export const ProductDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const productId = Number(id);

  const { data: product, isLoading, isError } = useGetProductByIdQuery(productId, {
    skip: Number.isNaN(productId),
  });

  if (Number.isNaN(productId)) {
    return <ErrorState message="Invalid product ID." />;
  }

  if (isLoading) {
    return <LoadingState message="Loading product details..." />;
  }

  if (isError || !product) {
    return <ErrorState message="Unable to load product details. Please go back and try again." />;
  }

  return (
    <main className="detail-page">
      <button type="button" className="back-button" onClick={() => navigate(-1)}>
        Back
      </button>
      <section className="detail-card">
        <img src={product.thumbnail} alt={product.title} className="detail-image" />
        <div className="detail-content">
          <h1>{product.title}</h1>
          <p className="detail-description">{product.description}</p>
          <dl>
            <div>
              <dt>Price</dt>
              <dd>${product.price}</dd>
            </div>
            <div>
              <dt>Rating</dt>
              <dd>⭐ {product.rating.toFixed(1)}</dd>
            </div>
            <div>
              <dt>Brand</dt>
              <dd>{product.brand}</dd>
            </div>
            <div>
              <dt>Category</dt>
              <dd>{product.category}</dd>
            </div>
          </dl>
        </div>
      </section>
    </main>
  );
};
