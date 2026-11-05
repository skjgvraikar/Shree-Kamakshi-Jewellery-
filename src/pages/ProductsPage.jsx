import React, { useState, useEffect, useMemo, Suspense, lazy } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaArrowLeft, FaHome } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';
import { ProductCardSkeleton } from '../components/Skeleton';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingButtons from '../components/FloatingButtons';
import useProducts from '../hooks/useProducts';
import useVisitorTracker from '../hooks/useVisitorTracker';
import { useLanguage } from '../context/LanguageContext';

const ProductModal = lazy(() => import('../components/ProductModal'));

export function ProductsPage() {
  useVisitorTracker();

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t, isKn } = useLanguage();
  const categoryParam = searchParams.get('category') || 'All';

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { products, loading } = useProducts();

  const CATEGORY_TABS = [
    { slug: 'All', label: isKn ? 'ಎಲ್ಲಾ' : 'All' },
    { slug: 'Necklaces', label: isKn ? 'ಕಂಠಹಾರ' : 'Necklaces' },
    { slug: 'Bangles', label: isKn ? 'ಬಳೆಗಳು' : 'Bangles' },
    { slug: 'Earrings', label: isKn ? 'ಕಿವಿಯೋಲೆ' : 'Earrings' },
    { slug: 'Rings', label: isKn ? 'ಉಂಗುರ' : 'Rings' },
    { slug: 'Chains', label: isKn ? 'ಸರಗಳು' : 'Chains' },
    { slug: 'Silver Items', label: isKn ? 'ಬೆಳ್ಳಿ ವಸ್ತುಗಳು' : 'Silver Items' },
  ];

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleCategoryChange = (slug) => {
    setSelectedCategory(slug);
    if (slug === 'All') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: slug });
    }
  };

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        product.category?.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch =
        searchQuery.trim() === '' ||
        product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  const handleProductEnquiry = (message, category) => {
    sessionStorage.setItem('prefill_enquiry', JSON.stringify({ message, category }));
    navigate('/#contact');
  };

  const getCategoryDisplayTitle = () => {
    if (selectedCategory === 'All') return t.productsPage.allTitle;
    const matched = CATEGORY_TABS.find(c => c.slug === selectedCategory);
    return isKn ? `${matched?.label || selectedCategory} ${t.productsPage.collectionSuffix}` : `${selectedCategory} Collection`;
  };

  return (
    <div className="min-h-screen flex flex-col relative text-cream selection:bg-gold selection:text-deep bg-royal-pattern font-sans">
      <Helmet>
        <title>{getCategoryDisplayTitle()} | Shree Kamakshi Jewellery Works</title>
        <meta
          name="description"
          content={`Browse authentic handcrafted ${selectedCategory} ornaments in certified 916 BIS Hallmark gold and pure sterling silver from Shree Kamakshi Jewellery Works, Talaguppa.`}
        />
        <link rel="canonical" href={`https://shree-kamakshi-jewellery.vercel.app/products${selectedCategory !== 'All' ? `?category=${encodeURIComponent(selectedCategory)}` : ''}`} />
        <meta property="og:title" content={`${getCategoryDisplayTitle()} | Shree Kamakshi Jewellery Works`} />
        <meta
          property="og:description"
          content={`Explore our exclusive ${selectedCategory} collection in 916 Hallmark pure gold and silver in Talaguppa, Karnataka.`}
        />
        <meta property="og:url" content="https://shree-kamakshi-jewellery.vercel.app/products" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://shree-kamakshi-jewellery.vercel.app/images/god.jpg" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: `${getCategoryDisplayTitle()} - Shree Kamakshi Jewellery Works`,
            url: 'https://shree-kamakshi-jewellery.vercel.app/products',
            description: `Browse authentic handcrafted ${selectedCategory} ornaments in certified 916 BIS Hallmark gold and pure sterling silver from Shree Kamakshi Jewellery Works, Talaguppa.`,
            provider: {
              '@type': 'JewelryStore',
              name: 'Shree Kamakshi Jewellery Works',
              telephone: '+91-9448628575',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'B H Road, Talaguppa',
                addressLocality: 'Talaguppa',
                postalCode: '577430',
                addressRegion: 'Karnataka',
                addressCountry: 'IN',
              },
            },
          })}
        </script>
      </Helmet>

      {/* Navbar */}
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-sans text-cream/60 mb-6">
          <Link to="/" className="hover:text-gold transition flex items-center gap-1.5">
            <FaHome className="text-xs" />
            <span>{t.productsPage.breadcrumbHome}</span>
          </Link>
          <span>/</span>
          <span className="text-cream/80">{t.productsPage.breadcrumbCatalogue}</span>
          {selectedCategory !== 'All' && (
            <>
              <span>/</span>
              <span className="text-gold font-medium">
                {CATEGORY_TABS.find(c => c.slug === selectedCategory)?.label || selectedCategory}
              </span>
            </>
          )}
        </div>

        {/* Page Header */}
        <div className="mb-10 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gold/20 pb-6">
          <div>
            <span className="text-gold text-[11px] font-sans font-semibold tracking-[0.2em] uppercase block mb-1">
              {isKn ? 'ಶ್ರೀ ಕಾಮಾಕ್ಷಿ ಜ್ಯುವೆಲ್ಲರಿ ವರ್ಕ್ಸ್' : 'Shree Kamakshi Jewellery Works'}
            </span>
            <h1 className="font-cinzel text-2xl sm:text-4xl font-bold text-cream gold-text-gradient">
              {getCategoryDisplayTitle()}
            </h1>
            <p className="font-sans text-xs sm:text-sm text-cream/70 mt-1 max-w-xl">
              {t.productsPage.subText}
            </p>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gold/40 text-gold-light hover:bg-gold/15 font-sans text-xs font-semibold tracking-wider uppercase transition self-start sm:self-auto"
          >
            <FaArrowLeft className="text-[11px]" />
            <span>{t.productsPage.backToHome}</span>
          </Link>
        </div>

        {/* Controls: Filter Tabs & Search Box */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {CATEGORY_TABS.map((tab) => (
              <button
                key={tab.slug}
                onClick={() => handleCategoryChange(tab.slug)}
                className={`px-4 py-2 rounded-full text-xs font-sans font-semibold tracking-wider whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === tab.slug
                    ? 'bg-gold-gradient text-deep shadow-gold-glow'
                    : 'bg-black/40 border border-gold/25 text-cream/70 hover:text-gold-light hover:border-gold/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder={t.productsPage.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-deep/80 border border-gold/30 rounded-xl py-2 pl-9 pr-8 text-xs font-sans text-cream placeholder-cream/40 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gold/60 text-xs" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-cream/50 hover:text-cream text-xs"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs font-sans text-cream/60 mb-6 px-1">
          <span>
            {t.productsPage.showingText} <strong className="text-gold-light font-semibold">{filteredProducts.length}</strong> {t.productsPage.designsWord}
            {selectedCategory !== 'All' ? ` (${CATEGORY_TABS.find(c => c.slug === selectedCategory)?.label || selectedCategory})` : ''}
          </span>
          <span className="hidden sm:inline text-cream/50">{t.productsPage.hintClick}</span>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 glass-gold-card rounded-2xl border border-gold/20 p-8 max-w-lg mx-auto">
            <h3 className="font-cinzel text-lg text-gold-light mb-2">{t.productsPage.notFoundTitle}</h3>
            <p className="font-sans text-cream/70 text-sm mb-4">
              {t.productsPage.notFoundDesc}
            </p>
            <button
              onClick={() => {
                handleCategoryChange('All');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 rounded-xl bg-gold-gradient text-deep font-sans text-xs font-bold uppercase shadow-gold-glow cursor-pointer"
            >
              {t.productsPage.resetFilters}
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={setSelectedProduct}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Buttons */}
      <FloatingButtons />

      {/* Product Lightbox Modal (Lazy Loaded) */}
      {selectedProduct && (
        <Suspense
          fallback={
            <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center">
              <div className="w-12 h-12 border-2 border-gold border-t-transparent rounded-full animate-spin" />
            </div>
          }
        >
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onEnquire={handleProductEnquiry}
          />
        </Suspense>
      )}
    </div>
  );
}

export default ProductsPage;
