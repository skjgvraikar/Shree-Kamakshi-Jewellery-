import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaChevronLeft, FaChevronRight, FaWhatsapp, FaEnvelope, FaCheck } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

export function ProductModal({ product, onClose, onEnquire }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const modalRef = useRef(null);
  const closeBtnRef = useRef(null);
  const { t, isKn } = useLanguage();

  const images = product?.images?.length > 0 ? product.images : ['/images/products/gold-choker-necklace-set.webp'];
  const totalImages = images.length;

  const handleNext = useCallback(() => {
    setActiveImageIndex((prev) => (prev + 1) % totalImages);
  }, [totalImages]);

  const handlePrev = useCallback(() => {
    setActiveImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
  }, [totalImages]);

  useEffect(() => {
    closeBtnRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'Tab') {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusableElements || focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, handleNext, handlePrev]);

  // Touch Swipe handlers
  const minSwipeDistance = 50;
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) handleNext();
    if (isRightSwipe) handlePrev();
  };

  if (!product) return null;

  const currentImage = images[activeImageIndex];
  const designNumber = activeImageIndex + 1;

  const handleEnquiryClick = () => {
    const enquiryMessage = isKn
      ? `ನಾನು ಆಸಕ್ತಿ ಹೊಂದಿದ್ದೇನೆ: ${product.name} (ವಿನ್ಯಾಸ ${designNumber} - ವಿಭಾಗ: ${product.category})`
      : `I am interested in: ${product.name} (Design ${designNumber} - Category: ${product.category})`;
    onEnquire(enquiryMessage, product.category);
    onClose();
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      isKn
        ? `ನಮಸ್ಕಾರ ಶ್ರೀ ಕಾಮಾಕ್ಷಿ ಜ್ಯುವೆಲ್ಲರಿ ವರ್ಕ್ಸ್, ನಾನು ಈ ಆಭರಣವನ್ನು ನೋಡಲು ಆಸಕ್ತಿ ಹೊಂದಿದ್ದೇನೆ: ${product.name} (ವಿನ್ಯಾಸ ${designNumber}, ವಿಭಾಗ: ${product.category}). ದಯವಿಟ್ಟು ವಿವರಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಿ.`
        : `Namaste Shree Kamakshi Jewellery Works, I am interested in viewing: ${product.name} (Design variation ${designNumber}, Category: ${product.category}). Please share details and availability.`
    );
    window.open(`https://wa.me/919448628575?text=${text}`, '_blank');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto font-sans"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
      ref={modalRef}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 15 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-4xl max-h-[92vh] overflow-y-auto glass-gold-card rounded-3xl border border-gold/40 shadow-2xl p-5 sm:p-8 bg-[#100903]"
      >
        <button
          ref={closeBtnRef}
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-deep/80 border border-gold/40 text-gold-light hover:bg-gold hover:text-deep transition duration-200 focus:outline-none focus:ring-2 focus:ring-gold cursor-pointer"
          aria-label="Close modal"
        >
          <FaTimes className="text-sm" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left Column: Image Lightbox */}
          <div className="md:col-span-7 flex flex-col items-center">
            <div
              className="relative w-full aspect-square rounded-2xl overflow-hidden bg-black/60 border border-gold/25 flex items-center justify-center p-4 touch-pan-y"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImage}
                  src={currentImage}
                  alt={`${product.name} - Design ${designNumber}`}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                  className="max-h-full max-w-full object-contain filter contrast-105"
                />
              </AnimatePresence>

              {totalImages > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-deep/80 border border-gold/40 text-gold-light hover:bg-gold hover:text-deep transition backdrop-blur-sm cursor-pointer"
                    aria-label="Previous design variation"
                  >
                    <FaChevronLeft className="text-xs" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-deep/80 border border-gold/40 text-gold-light hover:bg-gold hover:text-deep transition backdrop-blur-sm cursor-pointer"
                    aria-label="Next design variation"
                  >
                    <FaChevronRight className="text-xs" />
                  </button>
                </>
              )}

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-deep/90 border border-gold/40 text-gold-light text-xs font-sans font-medium backdrop-blur-sm">
                {t.modal.designVariation} {designNumber} {t.modal.of} {totalImages}
              </div>
            </div>

            {totalImages > 1 && (
              <div className="flex gap-2.5 mt-4 overflow-x-auto py-1 max-w-full justify-center">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-14 h-14 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-gold shadow-gold-glow scale-105'
                        : 'border-gold/20 opacity-60 hover:opacity-100'
                    }`}
                    aria-label={`View design variation ${idx + 1}`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Details */}
          <div className="md:col-span-5 flex flex-col justify-between text-left">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-0.5 rounded-full text-xs font-sans font-semibold bg-gold/15 border border-gold/40 text-gold-light uppercase tracking-wider">
                  {product.category}
                </span>
                <span className="text-xs font-sans text-gold-pale/70 tracking-wider">
                  916 BIS Hallmark
                </span>
              </div>

              <h2
                id="modal-product-title"
                className="font-cinzel text-xl sm:text-2xl font-bold text-cream gold-text-gradient mb-1"
              >
                {product.name}
              </h2>

              <p className="font-sans text-xs text-gold/80 font-medium tracking-wide uppercase mb-4">
                {t.modal.designVariation} {designNumber} {t.modal.of} {totalImages}
              </p>

              <div className="p-4 rounded-xl bg-gold/5 border border-gold/20 mb-6">
                <p className="font-sans text-cream/85 text-sm leading-relaxed">
                  {product.description ||
                    'Masterfully crafted in authentic 22K hallmarked gold. Every contour is shaped by experienced artisans in Talaguppa for lasting brilliance and prestige.'}
                </p>
              </div>

              {/* Guarantees */}
              <div className="space-y-2 mb-6 text-xs font-sans text-cream/75">
                {t.modal.points.map((pt, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <FaCheck className="text-gold text-[10px] flex-shrink-0" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 pt-4 border-t border-gold/20">
              <button
                onClick={handleEnquiryClick}
                className="w-full py-3.5 rounded-xl bg-gold-gradient hover:bg-gold-gradient-hover text-deep font-sans font-bold text-xs tracking-wider uppercase transition-all duration-300 shadow-gold-glow flex items-center justify-center gap-2 cursor-pointer"
              >
                <FaEnvelope className="text-xs" />
                <span>{t.modal.enquireBtn}</span>
              </button>

              <button
                onClick={handleWhatsAppDirect}
                className="w-full py-3 rounded-xl border border-emerald-500/60 hover:bg-emerald-500/15 text-emerald-400 font-sans font-semibold text-xs tracking-wider uppercase transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <FaWhatsapp className="text-sm text-emerald-400" />
                <span>{t.modal.whatsappBtn}</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default ProductModal;
