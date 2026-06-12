import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { clearFilters, setSearchTerm } from '../../features/products/store/filtersSlice';

interface HeaderProps {
  onMenuClick?: () => void;
  isSidebarOpen?: boolean;
}

export const Header = ({ onMenuClick, isSidebarOpen = false }: HeaderProps) => {
  const storedSearchTerm = useAppSelector((state) => state.productFilters.searchTerm);
  const [searchQuery, setSearchQuery] = useState(storedSearchTerm);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setSearchQuery(storedSearchTerm);
  }, [storedSearchTerm]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const normalizedValue = searchQuery.trim();
      dispatch(setSearchTerm(normalizedValue));
      if (location.pathname !== '/') {
        navigate('/');
      }
    }, 350);

    return () => window.clearTimeout(timer);
  }, [dispatch, location.pathname, navigate, searchQuery]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const normalizedValue = searchQuery.trim();
    dispatch(setSearchTerm(normalizedValue));
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  const handleLogoClick = () => {
    dispatch(clearFilters());
    navigate('/');
  };

  return (
    <header className="amazon-header">
      <div className="header-wrapper">
        <button
          type="button"
          className="header-menu-btn"
          onClick={onMenuClick ?? handleLogoClick}
          aria-label="Open menu"
          aria-expanded={isSidebarOpen}
          aria-controls="filters-panel"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>

        <form onSubmit={handleSearch} className="header-search-form">
          <span className="header-search-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7" />
              <path d="M16.5 16.5 21 21" />
            </svg>
          </span>
          <input
            type="search"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="header-search-input"
            aria-label="Search products"
          />
        </form>

        <nav className="header-nav-items">
          <button type="button" className="header-nav-icon-btn" aria-label="Cart">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="9" cy="20" r="1.6" />
              <circle cx="18" cy="20" r="1.6" />
              <path d="M2.5 4h2.2l2.5 10h10.2l2-7.5H7.2" />
            </svg>
          </button>
          <button type="button" className="header-nav-icon-btn" aria-label="Orders">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="8" />
              <path d="M12 8.5v4.2l2.8 1.8" />
            </svg>
          </button>
          <button type="button" className="header-nav-icon-btn" aria-label="Account">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="8" r="3.2" />
              <path d="M5 19c1.2-3 3.7-4.8 7-4.8 3.3 0 5.8 1.8 7 4.8" />
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
};
