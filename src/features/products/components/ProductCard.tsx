import { Link } from 'react-router-dom';
import type { Product } from '../model/types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="product-card-link" aria-label={`View ${product.title}`}>
        <img src={product.thumbnail} alt={product.title} className="product-card-image" loading="lazy" />
        <div className="product-card-body">
          <h3>{product.title}</h3>
          <p className="product-card-brand">{product.brand}</p>
          <div className="product-card-meta">
            <span className="price">${product.price}</span>
            <span className="rating">⭐ {product.rating.toFixed(1)}</span>
          </div>
        </div>
      </Link>
    </article>
  );
};
