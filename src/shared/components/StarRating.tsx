interface StarRatingProps {
  rating: number;
  showLabel?: boolean;
  size?: 'small' | 'medium' | 'large';
  totalStars?: number;
}

const STAR_PATH =
  'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z';

interface SingleStarProps {
  fillPercent: number;
  id: string;
  sizePx: number;
}

const SingleStar = ({ fillPercent, id, sizePx }: SingleStarProps) => (
  <svg
    width={sizePx}
    height={sizePx}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset={`${fillPercent}%`} stopColor="#f5a623" />
        <stop offset={`${fillPercent}%`} stopColor="#d1d5db" />
      </linearGradient>
    </defs>
    <path d={STAR_PATH} fill={`url(#${id})`} />
  </svg>
);

export const StarRating = ({
  rating,
  showLabel = true,
  size = 'medium',
  totalStars = 5,
}: StarRatingProps) => {
  const sizePx = { small: 16, medium: 20, large: 24 }[size];

  const stars = Array.from({ length: totalStars }, (_, i) => {
    const fillPercent = Math.min(100, Math.max(0, (rating - i) * 100));
    return fillPercent;
  });

  return (
    <span className={`star-rating star-rating-${size}`} aria-label={`${rating} out of ${totalStars} stars`}>
      <span className="stars">
        {stars.map((fillPercent, i) => (
          <SingleStar
            key={i}
            id={`star-${rating}-${i}`}
            fillPercent={fillPercent}
            sizePx={sizePx}
          />
        ))}
      </span>
      {showLabel && <span className="rating-label">({rating.toFixed(1)})</span>}
    </span>
  );
};
