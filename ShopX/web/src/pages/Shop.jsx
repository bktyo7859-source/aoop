import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, Search, X, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { Api } from '../services/api';
import ProductCard from '../components/ProductCard';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  // Filters state from URL params
  const currentPage = parseInt(searchParams.get('page') || '0', 10);
  const currentCategory = searchParams.get('category') || '';
  const currentSearch = searchParams.get('search') || '';
  const currentSort = searchParams.get('sort') || 'featured';
  const inStockOnly = searchParams.get('instock') === 'true';

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(currentSearch);

  // Load categories
  useEffect(() => {
    async function loadCats() {
      try {
        const res = await Api.categories.getAll();
        setCategories(Array.isArray(res) ? res : []);
      } catch (err) {
        console.error('Failed to load categories:', err);
      }
    }
    loadCats();
  }, []);

  // Fetch products
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await Api.products.search({
        page: currentPage,
        size: 24,
        search: currentSearch,
        categoryId: currentCategory ? Number(currentCategory) : null
      });

      let list = (data && data.content) || (Array.isArray(data) ? data : []);

      // Client-side sort if needed
      if (currentSort === 'price_asc') {
        list = [...list].sort((a, b) => (a.price || 0) - (b.price || 0));
      } else if (currentSort === 'price_desc') {
        list = [...list].sort((a, b) => (b.price || 0) - (a.price || 0));
      } else if (currentSort === 'name_asc') {
        list = [...list].sort((a, b) => (a.name || '').localeCompare(b.name || ''));
      }

      if (inStockOnly) {
        list = list.filter(p => p.stockQuantity && p.stockQuantity > 0);
      }

      setProducts(list);
      setTotalPages(data.totalPages || 1);
      setTotalElements(data.totalElements || list.length);
    } catch (err) {
      console.error('Failed to fetch products:', err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, currentCategory, currentSearch, currentSort, inStockOnly]);

  useEffect(() => {
    fetchProducts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [fetchProducts]);

  const updateParam = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    if (key !== 'page') {
      params.set('page', '0'); // reset page on filter change
    }
    setSearchParams(params);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateParam('search', searchInput.trim());
  };

  const clearAllFilters = () => {
    setSearchParams({});
    setSearchInput('');
  };

  const activeCategoryObj = categories.find(c => String(c.id) === String(currentCategory));

  return (
    <div className="animate-fade-in" style={{ paddingTop: 'var(--header-height)', minHeight: '80vh' }}>
      {/* Page Banner / Header */}
      <section style={{ borderBottom: '1px solid var(--border-hairline)', backgroundColor: '#faf9f6', padding: 'clamp(2.5rem, 5vw, 4rem) 0' }}>
        <div className="shopcx-container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
            <span className="editorial-tag">COLLECTION INDEX</span>
            {activeCategoryObj && (
              <>
                <span style={{ color: 'var(--text-muted)' }}>/</span>
                <span className="editorial-tag" style={{ color: 'var(--text-primary)' }}>
                  {activeCategoryObj.name}
                </span>
              </>
            )}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '1.5rem' }}>
            <div>
              <h1 className="font-serif" style={{ fontSize: 'clamp(2.2rem, 5vw, 4.2rem)', lineHeight: 1.05 }}>
                {activeCategoryObj ? activeCategoryObj.name : 'All Curated Objects'}
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.5rem', maxWidth: '520px' }}>
                Showing {totalElements.toLocaleString('en-IN')} objects verified in real-time inventory.
              </p>
            </div>

            {/* Quick search inside shop */}
            <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid var(--text-primary)', paddingBottom: '4px', minWidth: '240px' }}>
              <input
                type="text"
                placeholder="Filter by name..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                style={{
                  border: 'none',
                  outline: 'none',
                  backgroundColor: 'transparent',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.86rem',
                  flex: 1
                }}
              />
              <button type="submit" style={{ padding: '4px', color: 'var(--text-primary)' }} data-cursor="button">
                <Search size={16} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="shopcx-container" style={{ paddingTop: '2.5rem', paddingBottom: '5rem' }}>
        {/* Filter Controls Bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            paddingBottom: '1.5rem',
            borderBottom: '1px solid var(--border-hairline)',
            marginBottom: '2.5rem'
          }}
        >
          {/* Left Category Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <select
              value={currentCategory}
              onChange={(e) => updateParam('category', e.target.value)}
              style={{
                padding: '0.55rem 1.2rem',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-hairline)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.82rem',
                letterSpacing: '0.04em',
                cursor: 'pointer',
                outline: 'none'
              }}
              data-cursor="button"
            >
              <option value="">All Categories ({categories.length})</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            {/* In Stock toggle */}
            <button
              onClick={() => updateParam('instock', inStockOnly ? '' : 'true')}
              style={{
                padding: '0.55rem 1.1rem',
                backgroundColor: inStockOnly ? 'var(--text-primary)' : 'var(--bg-secondary)',
                color: inStockOnly ? '#ffffff' : 'var(--text-primary)',
                border: '1px solid var(--border-hairline)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.82rem',
                letterSpacing: '0.04em',
                transition: 'all 0.2s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
              data-cursor="button"
            >
              <span>● In Stock Only</span>
            </button>

            {(currentCategory || currentSearch || inStockOnly) && (
              <button
                onClick={clearAllFilters}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-muted)',
                  padding: '4px 8px'
                }}
                data-cursor="button"
              >
                <X size={14} /> RESET FILTERS
              </button>
            )}
          </div>

          {/* Right Sort Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span className="editorial-tag">SORT BY:</span>
            <select
              value={currentSort}
              onChange={(e) => updateParam('sort', e.target.value)}
              style={{
                padding: '0.55rem 1.2rem',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-hairline)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.82rem',
                letterSpacing: '0.04em',
                cursor: 'pointer',
                outline: 'none'
              }}
              data-cursor="button"
            >
              <option value="featured">Curated (Featured)</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="name_asc">Alphabetical: A–Z</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '350px' }}>
            <div style={{ textAlign: 'center' }}>
              <Loader2 size={36} className="animate-spin" style={{ color: 'var(--text-primary)', margin: '0 auto 1rem' }} />
              <div className="editorial-tag">RETRIEVING INVENTORY...</div>
            </div>
          </div>
        ) : products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 1rem', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-hairline)' }}>
            <h3 className="font-serif" style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>
              No matching objects found
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.75rem' }}>
              Try adjusting your search criteria or resetting filters to browse the full archive.
            </p>
            <button onClick={clearAllFilters} className="btn-editorial-primary" data-cursor="button">
              RESET ALL FILTERS
            </button>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 'clamp(1.75rem, 3vw, 2.75rem)'
            }}
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1.5rem',
              marginTop: '4rem',
              paddingTop: '2rem',
              borderTop: '1px solid var(--border-hairline)'
            }}
          >
            <button
              onClick={() => updateParam('page', String(currentPage - 1))}
              disabled={currentPage <= 0}
              className="btn-editorial-secondary"
              style={{ padding: '0.75rem 1.4rem', opacity: currentPage <= 0 ? 0.4 : 1 }}
              data-cursor="button"
            >
              <ChevronLeft size={16} style={{ marginRight: '4px' }} /> PREV
            </button>

            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
              PAGE {currentPage + 1} OF {totalPages}
            </span>

            <button
              onClick={() => updateParam('page', String(currentPage + 1))}
              disabled={currentPage >= totalPages - 1}
              className="btn-editorial-secondary"
              style={{ padding: '0.75rem 1.4rem', opacity: currentPage >= totalPages - 1 ? 0.4 : 1 }}
              data-cursor="button"
            >
              NEXT <ChevronRight size={16} style={{ marginLeft: '4px' }} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
