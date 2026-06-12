import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../api/productsApi';
import { LoadingState } from '../../../shared/components/LoadingState';
import { ErrorState } from '../../../shared/components/ErrorState';
import { StarRating } from '../../../shared/components/StarRating';

const REVIEWS_PER_PAGE = 5;

export const ProductDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const productId = Number(id);
  const [currentReviewPage, setCurrentReviewPage] = useState(1);

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

  const reviews = product.reviews || [];
  const totalReviewPages = Math.ceil(reviews.length / REVIEWS_PER_PAGE);
  const startIndex = (currentReviewPage - 1) * REVIEWS_PER_PAGE;
  const displayedReviews = reviews.slice(startIndex, startIndex + REVIEWS_PER_PAGE);

  const generatePageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalReviewPages <= maxPagesToShow) {
      for (let i = 1; i <= totalReviewPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentReviewPage <= 3) {
        for (let i = 1; i <= maxPagesToShow; i++) {
          pages.push(i);
        }
      } else if (currentReviewPage >= totalReviewPages - 2) {
        for (let i = totalReviewPages - maxPagesToShow + 1; i <= totalReviewPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = currentReviewPage - 2; i <= currentReviewPage + 2; i++) {
          pages.push(i);
        }
      }
    }
    return pages;
  };

  return (
    <main className="detail-page">
      <button type="button" className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <section className="detail-card">
        <div className="detail-media">
          <img src={product.thumbnail} alt={product.title} className="detail-image" />
        </div>
        <div className="detail-content">
          <h1>{product.title}</h1>
          <div className="detail-price-rating">
            <span className="price">${product.price}</span>
            <StarRating rating={product.rating} size="large" />
          </div>
          <div className="detail-metadata">
            <div className="metadata-item">
              <span className="metadata-label">Brand:</span>
              <span className="metadata-value">{product.brand}</span>
            </div>
            <div className="metadata-item">
              <span className="metadata-label">Category:</span>
              <span className="metadata-value">{product.category}</span>
            </div>
          </div>
          <div className="detail-description-section">
            <h2>Description</h2>
            <p className="detail-description">{product.description}</p>
          </div>

          {reviews.length > 0 && (
            <section className="reviews-section">
              <h2>Reviews</h2>
              <div className="reviews-list">
                {displayedReviews.map((review, index) => (
                  <div key={`${review.reviewerEmail}-${index}`} className="review-item">
                    <div className="review-header">
                      <h3 className="reviewer-name">{review.reviewerName}</h3>
                      <StarRating rating={review.rating} size="small" />
                    </div>
                    <p className="review-comment">{review.comment}</p>
                  </div>
                ))}
              </div>

              {totalReviewPages > 1 && (
                <div className="pagination">
                  <button
                    className="pagination-btn"
                    onClick={() => setCurrentReviewPage(Math.max(1, currentReviewPage - 1))}
                    disabled={currentReviewPage === 1}
                    type="button"
                  >
                    ← Previous
                  </button>

                  {generatePageNumbers().map((page) => (
                    <button
                      key={page}
                      className={`pagination-btn ${currentReviewPage === page ? 'active' : ''}`}
                      onClick={() => setCurrentReviewPage(page)}
                      type="button"
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    className="pagination-btn"
                    onClick={() => setCurrentReviewPage(Math.min(totalReviewPages, currentReviewPage + 1))}
                    disabled={currentReviewPage === totalReviewPages}
                    type="button"
                  >
                    Next →
                  </button>
                </div>
              )}
            </section>
          )}
        </div>
      </section>
    </main>
  );
};
