import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import SectionTitle from './SectionTitle';
import { useLanguage } from '../context/LanguageContext';
import { useCategories } from '../hooks/useCategories';

export function CategoryShowcase() {
  const { t, isKn } = useLanguage();
  const { categories, loading } = useCategories();

  // Map category items with bilingual labels if available in dictionary
  const items = (categories && categories.length > 0) ? categories : [
    {
      name: t.categories.items.Necklaces.name,
      slug: 'Necklaces',
      tagline: t.categories.items.Necklaces.tagline,
      count: t.categories.items.Necklaces.count,
      image: '/images/products/lakshmi-temple-necklace.webp',
      accent: t.categories.items.Necklaces.accent,
    },
    {
      name: t.categories.items.Bangles.name,
      slug: 'Bangles',
      tagline: t.categories.items.Bangles.tagline,
      count: t.categories.items.Bangles.count,
      image: '/images/products/peacock-kada.svg',
      accent: t.categories.items.Bangles.accent,
    },
    {
      name: t.categories.items.Earrings.name,
      slug: 'Earrings',
      tagline: t.categories.items.Earrings.tagline,
      count: t.categories.items.Earrings.count,
      image: '/images/products/chandbalis.webp',
      accent: t.categories.items.Earrings.accent,
    },
    {
      name: t.categories.items.Rings.name,
      slug: 'Rings',
      tagline: t.categories.items.Rings.tagline,
      count: t.categories.items.Rings.count,
      image: '/images/products/engagement-solitaire-rings.jpg',
      accent: t.categories.items.Rings.accent,
    },
    {
      name: t.categories.items.Chains.name,
      slug: 'Chains',
      tagline: t.categories.items.Chains.tagline,
      count: t.categories.items.Chains.count,
      image: '/images/products/gold-chain-classic.svg',
      accent: t.categories.items.Chains.accent,
    },
    {
      name: t.categories.items.SilverItems.name,
      slug: 'Silver Items',
      tagline: t.categories.items.SilverItems.tagline,
      count: t.categories.items.SilverItems.count,
      image: '/images/products/silver-anklet.svg',
      accent: t.categories.items.SilverItems.accent,
    },
  ];

  return (
    <section id="products" className="py-20 px-4 sm:px-6 lg:px-8 relative font-sans">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title={t.categories.title}
          subtitle={t.categories.subtitle}
          eyebrow={t.categories.eyebrow}
        />

        {/* Category Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {items.map((cat, idx) => {
            const displayName = (isKn && t.categories.items[cat.slug]?.name) || cat.name;
            const displayTagline = (isKn && t.categories.items[cat.slug]?.tagline) || cat.tagline;
            const displayAccent = (isKn && t.categories.items[cat.slug]?.accent) || cat.accent || 'BIS 916';
            const displayCount = (isKn && t.categories.items[cat.slug]?.count) || cat.count || '';

            return (
              <motion.div
                key={cat.id || cat.slug || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                <Link
                  to={`/products?category=${encodeURIComponent(cat.slug || cat.name)}`}
                  className="group block glass-gold-card rounded-2xl overflow-hidden border border-gold/25 hover:border-gold/70 transition-all duration-300 relative shadow-lg hover:shadow-gold-glow flex flex-col justify-between h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  {/* Visual Image container */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/50 p-6 flex items-center justify-center">
                    <div className="absolute inset-0 bg-radial-gradient from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <img
                      src={cat.image}
                      alt={displayName}
                      loading="lazy"
                      className="max-h-full max-w-full object-contain filter group-hover:scale-108 transition-transform duration-500 ease-out"
                    />

                    {/* Count chip */}
                    {displayCount && (
                      <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-sans font-semibold tracking-wider uppercase bg-[#120a03]/90 border border-gold/40 text-gold-light backdrop-blur-md">
                        {displayCount}
                      </span>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between bg-gradient-to-b from-transparent to-black/40">
                    <div>
                      <span className="text-[10px] font-sans font-semibold text-gold tracking-widest uppercase block mb-1">
                        {displayAccent}
                      </span>
                      <h3 className="font-cinzel text-xl font-bold text-cream group-hover:text-gold-light transition-colors mb-1">
                        {displayName}
                      </h3>
                      <p className="font-sans text-xs text-cream/70 leading-relaxed">
                        {displayTagline}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-gold/15 flex items-center justify-between font-sans text-xs font-semibold text-gold-light">
                      <span>{t.categories.exploreBtn}</span>
                      <span className="transform group-hover:translate-x-1.5 transition-transform flex items-center gap-1">
                        <FaArrowRight className="text-[11px]" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            to="/products"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gold-gradient hover:bg-gold-gradient-hover text-deep font-sans font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-gold-glow hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>{t.categories.browseAllBtn}</span>
            <FaArrowRight className="text-xs" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CategoryShowcase;
