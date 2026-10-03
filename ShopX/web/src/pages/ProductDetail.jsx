import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, Plus, Minus, Check, ArrowRight, ShieldCheck, Truck, RefreshCw, ChevronDown, ChevronUp, Share2, Sparkles, Loader2 } from 'lucide-react';
import { Api } from '../services/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { getProductGallery } from '../utils/imageService';
import ProductCard from '../components/ProductCard';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, addingProductId } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToast } = useToast();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState('Standard Curation');
  const [openAccordion, setOpenAccordion] = useState('materials');
  const [addedSuccess, setAddedSuccess] = useState(false);

  useEffect(() => {
    async function loadProduct() {
      setLoading(true);
      setSelectedImageIndex(0);
      setQuantity(1);
      setAddedSuccess(false);

      try {
        const prod = await Api.products.getById(id);
        setProduct(prod);

        // Fetch related products in category
        if (prod && prod.category) {
          const relatedData = await Api.products.search({
            categoryId: prod.category.id,
            size: 4
          });
          const list = ((relatedData && relatedData.content) || (Array.isArray(relatedData) ? relatedData : []))
            .filter(p => p.id !== prod.id);
          setRelatedProducts(list);
        }
      } catch (err) {
        console.error('Failed to load product details:', err);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (loading) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 'var(--header-height)' }}>
        <div style={{ textAlign: 'center' }}>
          <Loader2 size={36} className="animate-spin" style={{ color: 'var(--text-primary)', margin: '0 auto 1rem' }} />
          <div className="editorial-tag">RETRIEVING ARCHIVAL METADATA...</div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="shopcx-container" style={{ paddingTop: 'calc(var(--header-height) + 4rem)', paddingBottom: '6rem', textAlign: 'center' }}>
        <h2 className="font-serif" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          Object Not Found
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
          The requested object ID #{id} may have been archived or is temporarily unlisted.
        </p>
        <Link to="/shop" className="btn-editorial-primary">
          EXPLORE CATALOG
        </Link>
      </div>
    );
  }

  const galleryImages = getProductGallery(product);
  const isWishlisted = isInWishlist(product.id);
  const isOutOfStock = product.stockQuantity !== undefined && product.stockQuantity <= 0;
  const isAdding = addingProductId === product.id;

  const handleAddToCart = async () => {
    if (isOutOfStock) return;
    await addToCart(product, quantity);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2400);
  };

  const handleBuyNow = async () => {
    if (isOutOfStock) return;
    await addToCart(product, quantity);
    navigate('/checkout');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Explore ${product.name} on ShopCX`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      addToast('Link copied to clipboard', 'info');
    }
  };

  return (
    <div className="animate-fade-in" style={{ paddingTop: 'calc(var(--header-height) + 1.5rem)', paddingBottom: '6rem' }}>
      <div className="shopcx-container">
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2rem', fontSize: '0.78rem' }}>
          <Link to="/" className="editorial-tag" style={{ color: 'var(--text-muted)' }}>HOME</Link>
          <span style={{ color: 'var(--text-muted)' }}>/</span>
          <Link to="/shop" className="editorial-tag" style={{ color: 'var(--text-muted)' }}>SHOP</Link>
          {product.category && (
            <>
              <span style={{ color: 'var(--text-muted)' }}>/</span>
              <Link to={`/shop?category=${product.category.id}`} className="editorial-tag" style={{ color: 'var(--text-muted)' }}>
                {product.category.name?.toUpperCase()}
              </Link>
            </>
          )}
          <span style={{ color: 'var(--text-muted)' }}>/</span>
          <span className="editorial-tag" style={{ color: 'var(--text-primary)' }}>
            #{String(product.id).padStart(5, '0')}
          </span>
        </div>

        {/* Main Product Split Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: 'clamp(2.5rem, 6vw, 6rem)',
            alignItems: 'start'
          }}
        >
          {/* LEFT: GALLERY SECTION */}
          <div>
            {/* Primary Large Image */}
            <div
              className="img-zoom-container"
              style={{
                aspectRatio: '3 / 4',
                width: '100%',
                backgroundColor: '#eeeae2',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 16px 40px rgba(0,0,0,0.06)'
              }}
              data-cursor="explore"
            >
              <img
                src={galleryImages[selectedImageIndex] || galleryImages[0]}
                alt={product.name}
                className="img-zoom-target"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'opacity 0.4s ease, transform 0.85s var(--ease-editorial)'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  display: 'flex',
                  gap: '8px'
                }}
              >
                <button
                  onClick={handleShare}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.85)',
                    backdropFilter: 'blur(4px)',
                    borderRadius: '50%',
                    width: '38px',
                    height: '38px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                  }}
                  title="Share object"
                  data-cursor="button"
                >
                  <Share2 size={16} />
                </button>
              </div>
            </div>

            {/* Thumbnail Row */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${galleryImages.length}, 1fr)`,
                gap: '12px',
                marginTop: '16px'
              }}
            >
              {galleryImages.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  style={{
                    aspectRatio: '1/1',
                    overflow: 'hidden',
                    backgroundColor: '#eae8e1',
                    border: selectedImageIndex === idx ? '2px solid var(--text-primary)' : '1px solid var(--border-hairline)',
                    padding: '2px',
                    transition: 'all 0.2s ease',
                    opacity: selectedImageIndex === idx ? 1 : 0.65
                  }}
                  data-cursor="button"
                >
                  <img
                    src={imgUrl}
                    alt={`Angle ${idx + 1}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: DETAILS & ACTIONS */}
          <div style={{ display: 'flex', flexDirection: 'column', position: 'sticky', top: 'calc(var(--header-height) + 2rem)' }}>
            {/* Category & Status */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span className="editorial-tag" style={{ color: 'var(--accent-gold)' }}>
                {product.category?.name || 'HAUTE CURATION'}
              </span>
              <span
                className="editorial-tag"
                style={{
                  color: isOutOfStock ? '#d32f2f' : 'var(--accent-olive)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                ● {isOutOfStock ? 'OUT OF STOCK' : `IN STOCK (${product.stockQuantity || 1} AVAILABLE)`}
              </span>
            </div>

            {/* Title */}
            <h1
              className="font-serif"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                lineHeight: 1.1,
                color: 'var(--text-primary)',
                marginBottom: '1rem'
              }}
            >
              {product.name}
            </h1>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '1.75rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1.65rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)'
                }}
              >
                ₹{Number(product.price).toLocaleString('en-IN')}
              </span>
              <span className="editorial-tag" style={{ color: 'var(--text-muted)' }}>
                ALL TAXES & INSURED FULFILLMENT INCLUDED
              </span>
            </div>

            {/* Description */}
            <p
              style={{
                fontSize: '0.98rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                marginBottom: '2rem',
                borderBottom: '1px solid var(--border-hairline)',
                paddingBottom: '1.75rem'
              }}
            >
              {product.description ||
                'Crafted with deliberate restraint, this piece synthesizes tactile materials and functional mastery to endure beyond transient seasons.'}
            </p>

            {/* Options / Edition selector */}
            <div style={{ marginBottom: '1.75rem' }}>
              <div className="editorial-tag" style={{ marginBottom: '0.6rem' }}>SELECT CURATION FINISH</div>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {['Standard Curation', 'Studio Matte', 'Archival Edition'].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setSelectedOption(opt)}
                    style={{
                      padding: '0.65rem 1.25rem',
                      border: selectedOption === opt ? '1.5px solid var(--text-primary)' : '1px solid var(--border-hairline)',
                      backgroundColor: selectedOption === opt ? 'var(--text-primary)' : 'var(--bg-secondary)',
                      color: selectedOption === opt ? '#ffffff' : 'var(--text-primary)',
                      fontSize: '0.8rem',
                      fontFamily: 'var(--font-sans)',
                      letterSpacing: '0.04em',
                      transition: 'all 0.2s ease'
                    }}
                    data-cursor="button"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Stepper */}
            <div style={{ marginBottom: '2rem' }}>
              <div className="editorial-tag" style={{ marginBottom: '0.6rem' }}>QUANTITY</div>
              <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid var(--border-hairline)', backgroundColor: 'var(--bg-secondary)' }}>
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  disabled={quantity <= 1 || isOutOfStock}
                  style={{ padding: '0.7rem 1rem', color: 'var(--text-primary)' }}
                  data-cursor="button"
                >
                  <Minus size={14} />
                </button>
                <span style={{ padding: '0 1.25rem', fontFamily: 'var(--font-mono)', fontSize: '0.95rem', fontWeight: 600 }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(q => (product.stockQuantity ? Math.min(product.stockQuantity, q + 1) : q + 1))}
                  disabled={isOutOfStock || (product.stockQuantity && quantity >= product.stockQuantity)}
                  style={{ padding: '0.7rem 1rem', color: 'var(--text-primary)' }}
                  data-cursor="button"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* CTA Action Buttons */}
            <div style={{ display: 'flex', gap: '0.85rem', marginBottom: '1rem' }}>
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock || isAdding}
                className="btn-editorial-primary"
                style={{
                  flex: 1,
                  backgroundColor: addedSuccess ? 'var(--accent-olive)' : 'var(--text-primary)',
                  borderColor: addedSuccess ? 'var(--accent-olive)' : 'var(--text-primary)'
                }}
                data-cursor="button"
              >
                {addedSuccess ? (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <Check size={16} /> ADDED TO BAG
                  </span>
                ) : isAdding ? (
                  <span>COMMITTING...</span>
                ) : isOutOfStock ? (
                  <span>SOLD OUT</span>
                ) : (
                  <span>ADD TO BAG</span>
                )}
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                style={{
                  padding: '0 1.25rem',
                  border: '1px solid var(--border-strong)',
                  backgroundColor: 'transparent',
                  color: isWishlisted ? '#b05e45' : 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease'
                }}
                title={isWishlisted ? 'Saved' : 'Save to Wishlist'}
                data-cursor="button"
              >
                <Heart size={20} fill={isWishlisted ? '#b05e45' : 'none'} strokeWidth={1.75} />
              </button>
            </div>

            {/* Buy Now Direct Button */}
            {!isOutOfStock && (
              <button
                onClick={handleBuyNow}
                className="btn-editorial-secondary"
                style={{ width: '100%', marginBottom: '2rem' }}
                data-cursor="button"
              >
                INSTANT CHECKOUT <ArrowRight size={15} style={{ marginLeft: '6px' }} />
              </button>
            )}

            {/* Value Props */}
            <div
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-hairline)',
                padding: '1.25rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                marginBottom: '2rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem' }}>
                <Truck size={17} color="var(--accent-gold)" />
                <span>Complimentary insured shipping on all orders over ₹2,000</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem' }}>
                <ShieldCheck size={17} color="var(--accent-gold)" />
                <span>Direct authenticated provenance & warranty guaranteed</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem' }}>
                <RefreshCw size={17} color="var(--accent-gold)" />
                <span>30-day effortless white-glove exchange policy</span>
              </div>
            </div>

            {/* Accordion Specs */}
            <div style={{ borderTop: '1px solid var(--border-hairline)' }}>
              {/* Materials */}
              <div style={{ borderBottom: '1px solid var(--border-hairline)' }}>
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'materials' ? '' : 'materials')}
                  style={{
                    width: '100%',
                    padding: '1.1rem 0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    letterSpacing: '0.05em'
                  }}
                  data-cursor="button"
                >
                  <span>MATERIALS & PROVENANCE</span>
                  {openAccordion === 'materials' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openAccordion === 'materials' && (
                  <div style={{ paddingBottom: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.86rem', lineHeight: 1.6 }}>
                    Constructed with premium raw materials adhering to ISO craft standards. Every element undergoes strict durability and finish inspection before catalog release.
                  </div>
                )}
              </div>

              {/* Dimensions */}
              <div style={{ borderBottom: '1px solid var(--border-hairline)' }}>
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'dimensions' ? '' : 'dimensions')}
                  style={{
                    width: '100%',
                    padding: '1.1rem 0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    letterSpacing: '0.05em'
                  }}
                  data-cursor="button"
                >
                  <span>SPECIFICATIONS & PACKAGING</span>
                  {openAccordion === 'dimensions' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openAccordion === 'dimensions' && (
                  <div style={{ paddingBottom: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.86rem', lineHeight: 1.6 }}>
                    Delivered in museum-grade, recyclable protective casing with authenticity certificate and serial stamp #{String(product.id).padStart(6, '0')}.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <section style={{ marginTop: '7rem', borderTop: '1px solid var(--border-hairline)', paddingTop: '4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2.5rem' }}>
              <div>
                <span className="editorial-tag">ASSOCIATED OBJECTS</span>
                <h2 className="font-serif" style={{ fontSize: '2.4rem', marginTop: '4px' }}>
                  Related In {product.category?.name || 'Collection'}
                </h2>
              </div>
              <Link to={`/shop?category=${product.category?.id}`} className="btn-editorial-text" data-cursor="button">
                VIEW DOMAIN <ArrowRight size={14} />
              </Link>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: 'clamp(1.5rem, 3vw, 2.5rem)'
              }}
            >
              {relatedProducts.slice(0, 4).map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
