interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) {
    return null;
  }

  const maxVisiblePages = 4;
  const startPage = Math.max(1, Math.min(currentPage - 1, totalPages - maxVisiblePages + 1));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  const pages = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

  return (
    <nav className="pagination" aria-label="Products pagination">
      <button
        className="pagination-nav"
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ← Previous
      </button>
      <ul>
        {pages.map((page) => (
          <li key={page}>
            <button
              type="button"
              className={`pagination-page ${page === currentPage ? 'active' : ''}`}
              onClick={() => onPageChange(page)}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
      <button
        className="pagination-nav"
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next →
      </button>
    </nav>
  );
};
