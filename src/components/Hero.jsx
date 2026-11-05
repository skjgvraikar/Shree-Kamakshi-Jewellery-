import React from 'react';
import { motion } from 'framer-motion';
import { FaPhoneAlt, FaMapMarkerAlt, FaAward, FaShieldAlt, FaGem, FaBalanceScale } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

export function Hero({ settings }) {
  const { t, isKn } = useLanguage();
  const shopName = isKn ? t.hero.shopName : (settings?.name || t.hero.shopName);
  const tagline = isKn ? t.hero.tagline : (settings?.tagline || t.hero.tagline);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const elem = document.querySelector(id);
    if (elem) {
      const topOffset = 80;
      const elementPosition = elem.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] md:min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans"
    >
      {/* Subtle radial lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-gold/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Sacred Frame with Goddess Kamakshi */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative mb-6"
        >
          {/* Subtle Outer Glow */}
          <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-gold/30 via-yellow-200/20 to-amber-600/30 blur-md" />

          {/* Arch frame container */}
          <div className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full p-1 bg-gradient-to-b from-[#f5df97] via-[#d4af37] to-[#8b6914] shadow-gold-glow-lg">
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-deep bg-deep flex items-center justify-center relative">
              <img
                src="/images/god.jpg"
                alt="Goddess Kamakshi"
                className="w-full h-full object-cover object-center scale-105 transition-transform duration-700 hover:scale-110"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Sacred Inscription */}
            <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-[#120b03] border border-gold/60 text-gold-light text-[11px] font-sans font-medium tracking-wider whitespace-nowrap shadow-md">
              {t.hero.kannadaDedication}
            </div>
          </div>
        </motion.div>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 mb-3.5 px-3.5 py-1 rounded-full bg-gold/10 border border-gold/30 backdrop-blur-sm"
        >
          <span className="font-sans text-[11px] font-semibold text-gold-pale tracking-[0.16em] uppercase">
            {t.hero.eyebrow}
          </span>
        </motion.div>

        {/* Main Shop Name */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="font-cinzel font-bold tracking-[0.03em] text-cream mb-4 max-w-4xl"
        >
          <span className="block gold-text-gradient drop-shadow-sm">
            {shopName}
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="font-playfair text-lg sm:text-xl md:text-2xl text-cream/90 max-w-2xl font-normal italic mb-8 tracking-wide leading-relaxed"
        >
          {tagline}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-12"
        >
          <a
            href="tel:9448628575"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gold-gradient hover:bg-gold-gradient-hover text-deep font-sans font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-gold-glow flex items-center justify-center gap-2.5 transform hover:-translate-y-0.5 active:translate-y-0"
            title="Call Shree Kamakshi Jewellery Works"
          >
            <FaPhoneAlt className="text-xs" />
            <span>{t.hero.callNowBtn}</span>
          </a>

          <a
            href="#visit"
            onClick={(e) => scrollToSection(e, '#visit')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-gold/50 hover:border-gold hover:bg-gold/15 text-gold-light font-sans font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <FaMapMarkerAlt className="text-gold" />
            <span>{t.hero.visitBtn}</span>
          </a>
        </motion.div>

        {/* Trust Badges Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl"
        >
          <div className="glass-gold-card p-3.5 sm:p-4 rounded-xl flex items-center gap-3 text-left">
            <FaAward className="text-gold text-xl flex-shrink-0" />
            <div>
              <p className="font-sans text-xs font-bold text-gold-pale tracking-wide uppercase">{t.hero.badges.hallmarkTitle}</p>
              <p className="font-sans text-[11px] text-cream/65">{t.hero.badges.hallmarkDesc}</p>
            </div>
          </div>

          <div className="glass-gold-card p-3.5 sm:p-4 rounded-xl flex items-center gap-3 text-left">
            <FaShieldAlt className="text-gold text-xl flex-shrink-0" />
            <div>
              <p className="font-sans text-xs font-bold text-gold-pale tracking-wide uppercase">{t.hero.badges.purityTitle}</p>
              <p className="font-sans text-[11px] text-cream/65">{t.hero.badges.purityDesc}</p>
            </div>
          </div>

          <div className="glass-gold-card p-3.5 sm:p-4 rounded-xl flex items-center gap-3 text-left">
            <FaGem className="text-gold text-xl flex-shrink-0" />
            <div>
              <p className="font-sans text-xs font-bold text-gold-pale tracking-wide uppercase">{t.hero.badges.artTitle}</p>
              <p className="font-sans text-[11px] text-cream/65">{t.hero.badges.artDesc}</p>
            </div>
          </div>

          <div className="glass-gold-card p-3.5 sm:p-4 rounded-xl flex items-center gap-3 text-left">
            <FaBalanceScale className="text-gold text-xl flex-shrink-0" />
            <div>
              <p className="font-sans text-xs font-bold text-gold-pale tracking-wide uppercase">{t.hero.badges.ratesTitle}</p>
              <p className="font-sans text-[11px] text-cream/65">{t.hero.badges.ratesDesc}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
