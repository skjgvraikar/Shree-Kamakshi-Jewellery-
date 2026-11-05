import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEye, FaImages } from 'react-icons/fa';

export function ProductCard({ product, onSelect }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const mainImage = product.images?.[0] || '/images/products/gold-choker-necklace-set.webp';
  const variationCount = product.images?.length || 1;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25 }}
      className="glass-gold-card rounded-2xl overflow-hidden border border-gold/25 hover:border-gold/60 group flex flex-col justify-between cursor-pointer focus-within:ring-2 focus-within:ring-gold"
      onClick={() => onSelect(product)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(product);
        }
      }}
      aria-label={`View design variations for ${product.name}`}
    >
      {/* Image Container with Hover Zoom */}
      <div className="relative aspect-square w-full overflow-hidden bg-black/40 flex items-center justify-center p-4">
        {!imgLoaded && !imgError && (
          <div className="absolute inset-0 bg-gold/5 animate-pulse flex items-center justify-center">
            <span className="w-8 h-8 rounded-full border border-gold/30 border-t-transparent animate-spin" />
          </div>
        )}

        {imgError ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gold/5 p-4 text-center">
            <span className="font-cinzel text-xs text-gold">{product.name}</span>
          </div>
        ) : (
          <img
            src={mainImage}
            alt={product.name}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            className={`w-full h-full object-contain filter group-hover:scale-106 transition-transform duration-500 ease-out ${
              imgLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Category Tag Badge */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-sans font-semibold tracking-wider uppercase bg-[#120a03]/90 border border-gold/40 text-gold-light backdrop-blur-md shadow-sm">
            {product.category}
          </span>
          {product.badge && (
            <span className="px-2 py-0.5 rounded-full text-[9px] font-sans font-bold tracking-wider uppercase bg-gold-gradient text-deep shadow-sm">
              {product.badge}
            </span>
          )}
        </div>

        {/* Gallery count indicator */}
        {variationCount > 1 && (
          <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-[#120a03]/90 border border-gold/30 text-gold-pale text-[11px] font-sans font-medium flex items-center gap-1 backdrop-blur-sm">
            <FaImages className="text-gold text-[10px]" />
            <span>{variationCount} Designs</span>
          </div>
        )}

        {/* Hover View overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-deep/90 via-deep/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
          <span className="px-4 py-2 rounded-xl bg-gold-gradient text-deep font-sans text-xs font-bold tracking-wider uppercase shadow-gold-glow flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <FaEye /> View Variations
          </span>
        </div>
      </div>

      {/* Content Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-gradient-to-b from-transparent to-black/30">
        <div>
          <h3 className="font-playfair text-base sm:text-lg font-bold text-cream group-hover:text-gold-light transition-colors line-clamp-1 mb-1.5">
            {product.name}
          </h3>
          <p className="font-sans text-cream/70 text-xs sm:text-sm line-clamp-2 leading-relaxed">
            {product.description || 'Handcrafted fine jewellery made with certified 916 purity and traditional excellence.'}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-gold/15 flex items-center justify-between">
          <span className="font-sans text-[11px] text-gold font-medium tracking-wider uppercase">
            916 Hallmark
          </span>
          <span className="font-sans text-xs text-gold-light font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
            <span>Explore</span>
            <span>→</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductCard;
