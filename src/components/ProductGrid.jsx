import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';
import SectionTitle from './SectionTitle';
import ProductCard from './ProductCard';
import { ProductCardSkeleton } from './Skeleton';

const CATEGORIES = [
  'All',
  'Necklaces',
  'Bangles',
  'Earrings',
  'Rings',
  'Chains',
  'Silver Items',
];

export function ProductGrid({ products, loading, error, onSelectProduct }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

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

  return (
    <section id="products" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title="HANDCRAFTED ORNAMENT COLLECTIONS"
          subtitle="Explore authentic 22K 916 gold & sterling silver designs • Crafted with artisanal devotion"
          eyebrow="Catalogue"
        />

        {/* Category Tabs & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-sans font-semibold tracking-wider whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-gold-gradient text-deep shadow-gold-glow'
                    : 'bg-black/40 border border-gold/25 text-cream/70 hover:text-gold-light hover:border-gold/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search designs or styles..."
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
            Showing <strong className="text-gold-light font-semibold">{filteredProducts.length}</strong> ornament designs
            {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
          </span>
          <span className="hidden sm:inline text-cream/50">Click any ornament to view design variations</span>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16 glass-gold-card rounded-2xl border border-gold/20 p-8">
            <h3 className="font-cinzel text-lg text-gold-light mb-2">No Ornaments Found</h3>
            <p className="font-sans text-cream/70 text-sm mb-4">
              We couldn't find any designs matching your search. Please try a different category or search term.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-5 py-2 rounded-xl bg-gold-gradient text-deep font-sans text-xs font-bold uppercase shadow-gold-glow"
            >
              Reset Filters
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
                  onSelect={onSelectProduct}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default ProductGrid;
