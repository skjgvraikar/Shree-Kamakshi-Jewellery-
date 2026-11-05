import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowUp, FaSyncAlt, FaInfoCircle, FaCoins, FaCheckCircle } from 'react-icons/fa';
import SectionTitle from './SectionTitle';
import { RateCardSkeleton } from './Skeleton';
import { useLanguage } from '../context/LanguageContext';

export function LiveRates({ ratesData, loading, error, isFallback, lastRefreshedAt, onRefresh }) {
  const [multiplier, setMultiplier] = useState(1);
  const [showFullTable, setShowFullTable] = useState(false);
  const { t, isKn } = useLanguage();

  const formatPrice = (val) => {
    if (error || !val || isNaN(val) || Number(val) <= 0) return '₹ --';
    return '₹ ' + Math.round(val * multiplier).toLocaleString(isKn ? 'kn-IN' : 'en-IN');
  };

  const formatSilverPrice = (val, isKg = false) => {
    if (error || !val || isNaN(val) || Number(val) <= 0) return '₹ --';
    if (isKg) return '₹ ' + Math.round(val).toLocaleString(isKn ? 'kn-IN' : 'en-IN');
    return '₹ ' + Math.round(val * multiplier).toLocaleString(isKn ? 'kn-IN' : 'en-IN');
  };

  const getTimeString = (date) => {
    if (!date) return 'Live Market Sync';
    return date.toLocaleTimeString(isKn ? 'kn-IN' : 'en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  };

  const getDateString = (date) => {
    const d = date || new Date();
    return d.toLocaleDateString(isKn ? 'kn-IN' : 'en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <section id="rates" className="py-20 px-3 sm:px-6 lg:px-8 relative font-sans overflow-x-hidden">
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title={t.rates.title}
          subtitle={t.rates.subtitle}
          eyebrow={t.rates.eyebrow}
        />

        {/* Controls: Unit Toggle & Manual Refresh */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-gold/20">
          <div className="flex items-center gap-2">
            <span className="font-sans text-xs text-gold/80 font-semibold tracking-wider uppercase">{t.rates.unitLabel}</span>
            <div className="inline-flex rounded-xl p-1 bg-deep/80 border border-gold/30">
              <button
                onClick={() => setMultiplier(1)}
                className={`px-4 py-1.5 rounded-lg text-xs font-sans font-medium transition-all ${
                  multiplier === 1
                    ? 'bg-gold-gradient text-deep font-bold shadow-sm'
                    : 'text-cream/70 hover:text-gold-light'
                }`}
              >
                {t.rates.oneGram}
              </button>
              <button
                onClick={() => setMultiplier(10)}
                className={`px-4 py-1.5 rounded-lg text-xs font-sans font-medium transition-all ${
                  multiplier === 10
                    ? 'bg-gold-gradient text-deep font-bold shadow-sm'
                    : 'text-cream/70 hover:text-gold-light'
                }`}
              >
                {t.rates.tenGrams}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-cream/70 font-sans">
            <span>{getDateString(lastRefreshedAt)}</span>
            <span>•</span>
            <span className="text-gold-pale/90">
              {ratesData?.fetchedAtIST
                ? `${t.rates.lastUpdated} ${ratesData.fetchedAtIST}`
                : `${t.rates.lastUpdated} ${getTimeString(lastRefreshedAt)}`}
            </span>
            <button
              onClick={onRefresh}
              className="p-2 rounded-lg border border-gold/30 text-gold-light hover:bg-gold/15 transition flex items-center gap-1.5 font-sans text-xs font-medium cursor-pointer"
              title={t.rates.refresh}
              aria-label="Refresh rates"
            >
              <FaSyncAlt className={`text-xs ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">{t.rates.refresh}</span>
            </button>
          </div>
        </div>

        {/* Offline / Cached fallback notice */}
        {(error || isFallback) && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-3.5 rounded-xl bg-amber-950/40 border border-gold/40 text-xs font-sans text-gold-pale flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-2.5">
              <FaInfoCircle className="text-gold flex-shrink-0" />
              <span>
                {error || t.rates.cachedNotice}
              </span>
            </div>
            <span className="text-[10px] uppercase font-sans font-semibold tracking-wider px-2 py-0.5 rounded bg-gold/20 text-gold-light">
              Cached Rates
            </span>
          </motion.div>
        )}

        {/* Prominent Cards Grid: 22K Gold, 24K Gold, Silver */}
        {loading && !ratesData ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <RateCardSkeleton />
            <RateCardSkeleton />
            <RateCardSkeleton />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: 22K Gold */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-gold-card p-6 sm:p-7 rounded-2xl border border-gold/40 hover:border-gold relative overflow-hidden group shadow-gold-glow flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 w-28 h-28 bg-gold/15 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110" />

              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <span className="px-3 py-1 rounded-full text-[10px] font-sans font-bold bg-gold-gradient text-deep tracking-widest uppercase">
                    {t.rates.mostPopular}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold font-sans">
                    <FaArrowUp className="text-[10px]" />
                    <span>{ratesData?.change?.gold22 || '+0.85%'}</span>
                  </div>
                </div>

                <div className="flex items-baseline gap-2 mb-1">
                  <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-cream">
                    {t.rates.gold22Title}
                  </h3>
                  <span className="font-sans text-xs text-gold-light font-medium">{t.rates.gold22Sub}</span>
                </div>
                <p className="font-sans text-xs text-cream/65 mb-5">
                  {t.rates.gold22Desc}
                </p>

                <div className="my-4">
                  <div className="font-sans text-3xl sm:text-4xl font-extrabold gold-text-gradient tracking-tight">
                    {formatPrice(ratesData?.gold22)}
                  </div>
                  <div className="font-sans text-xs text-cream/55 mt-1 font-medium">
                    {multiplier === 1 ? (isKn ? 'ಪ್ರತಿ 1 ಗ್ರಾಂ ದರ' : 'Rate per 1 gram') : (isKn ? 'ಪ್ರತಿ 10 ಗ್ರಾಂ ದರ (1 ತೊಲ)' : 'Rate per 10 grams (1 tola)')}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gold/15 flex items-center justify-between text-xs text-cream/70 font-sans">
                <span>{t.rates.purity916}</span>
                <span className="text-gold-light font-medium flex items-center gap-1">
                  <FaCheckCircle className="text-[10px]" /> {t.rates.bisCertified}
                </span>
              </div>
            </motion.div>

            {/* Card 2: 24K Gold */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass-gold-card p-6 sm:p-7 rounded-2xl border border-gold/30 hover:border-gold/60 relative overflow-hidden group flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-400/10 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110" />

              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <span className="px-3 py-1 rounded-full text-[10px] font-sans font-semibold bg-gold/20 text-gold-pale tracking-widest uppercase border border-gold/30">
                    {t.rates.pureBullion}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold font-sans">
                    <FaArrowUp className="text-[10px]" />
                    <span>{ratesData?.change?.gold24 || '+0.88%'}</span>
                  </div>
                </div>

                <div className="flex items-baseline gap-2 mb-1">
                  <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-cream">
                    {t.rates.gold24Title}
                  </h3>
                  <span className="font-sans text-xs text-gold-light font-medium">{t.rates.gold24Sub}</span>
                </div>
                <p className="font-sans text-xs text-cream/65 mb-5">
                  {t.rates.gold24Desc}
                </p>

                <div className="my-4">
                  <div className="font-sans text-3xl sm:text-4xl font-extrabold gold-text-gradient tracking-tight">
                    {formatPrice(ratesData?.gold24)}
                  </div>
                  <div className="font-sans text-xs text-cream/55 mt-1 font-medium">
                    {multiplier === 1 ? (isKn ? 'ಪ್ರತಿ 1 ಗ್ರಾಂ ದರ' : 'Rate per 1 gram') : (isKn ? 'ಪ್ರತಿ 10 ಗ್ರಾಂ ದರ (1 ತೊಲ)' : 'Rate per 10 grams (1 tola)')}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gold/15 flex items-center justify-between text-xs text-cream/70 font-sans">
                <span>{t.rates.purity999}</span>
                <span className="text-gold-light font-medium">{t.rates.sovereignStandard}</span>
              </div>
            </motion.div>

            {/* Card 3: Silver */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-gold-card p-6 sm:p-7 rounded-2xl border border-silver/30 hover:border-silver/60 relative overflow-hidden group flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110" />

              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <span className="px-3 py-1 rounded-full text-[10px] font-sans font-semibold bg-silver/20 text-silver-light tracking-widest uppercase border border-silver/30">
                    {t.rates.silverBullion}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold font-sans">
                    <FaArrowUp className="text-[10px]" />
                    <span>{ratesData?.change?.silver || '+1.10%'}</span>
                  </div>
                </div>

                <div className="flex items-baseline gap-2 mb-1">
                  <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-cream">
                    {t.rates.silverTitle}
                  </h3>
                  <span className="font-sans text-xs text-silver-light font-medium">{t.rates.silverSub}</span>
                </div>
                <p className="font-sans text-xs text-cream/65 mb-5">
                  {t.rates.silverDesc}
                </p>

                <div className="my-4">
                  <div className="font-sans text-3xl sm:text-4xl font-extrabold silver-text-gradient tracking-tight">
                    {formatSilverPrice(ratesData?.silver)}
                  </div>
                  <div className="font-sans text-xs text-cream/55 mt-1 font-medium">
                    {multiplier === 1
                      ? (isKn ? `ಪ್ರತಿ 1 ಗ್ರಾಂ ದರ (₹ ${Math.round(ratesData?.silver * 1000).toLocaleString('kn-IN')} / ಕೆಜಿ)` : `Rate per 1 gram (₹ ${Math.round(ratesData?.silver * 1000).toLocaleString('en-IN')} / kg)`)
                      : (isKn ? 'ಪ್ರತಿ 10 ಗ್ರಾಂ ದರ' : 'Rate per 10 grams')}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-silver/15 flex items-center justify-between text-xs text-cream/70 font-sans">
                <span>{t.rates.silverKgPrefix} {formatSilverPrice(ratesData?.silverKg || (ratesData?.silver * 1000), true)}</span>
                <span className="text-silver-light font-medium">{t.rates.hallmarkFine}</span>
              </div>
            </motion.div>
          </div>
        )}

        {/* Toggle Detailed Breakdown Button */}
        <div className="text-center mt-8">
          <button
            onClick={() => setShowFullTable(!showFullTable)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gold/40 text-gold-light hover:bg-gold/10 font-sans text-xs font-semibold tracking-wider uppercase transition cursor-pointer"
          >
            <FaCoins className="text-gold" />
            <span>{showFullTable ? t.rates.hideTableBtn : t.rates.viewTableBtn}</span>
          </button>
        </div>

        {/* Detailed Breakdown Table - 100% Responsive Table */}
        {showFullTable && ratesData && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-6 glass-gold-card rounded-2xl p-2.5 sm:p-6 border border-gold/30 shadow-glass overflow-hidden"
          >
            <table className="w-full table-fixed text-left text-xs sm:text-sm font-sans">
              <thead>
                <tr className="border-b border-gold/30 text-[10px] sm:text-xs text-gold uppercase tracking-wider font-semibold">
                  <th className="py-2.5 px-2 sm:py-3 sm:px-4 w-[38%]">{t.rates.thMetal}</th>
                  <th className="py-2.5 px-1.5 sm:py-3 sm:px-4 w-[28%]">{t.rates.thPurity}</th>
                  <th className="py-2.5 px-1.5 sm:py-3 sm:px-4 text-right w-[17%]">{t.rates.th1g}</th>
                  <th className="py-2.5 px-1.5 sm:py-3 sm:px-4 text-right w-[17%]">{t.rates.th10g}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold/10 text-xs sm:text-sm">
                <tr className="hover:bg-gold/5 transition">
                  <td className="py-2.5 px-2 sm:py-3.5 sm:px-4 font-medium text-cream leading-tight">{t.rates.gold24Title}</td>
                  <td className="py-2.5 px-1.5 sm:py-3.5 sm:px-4 text-cream/70 leading-tight">99.9%</td>
                  <td className="py-2.5 px-1.5 sm:py-3.5 sm:px-4 text-right text-gold-light font-bold">
                    ₹ {ratesData.gold24.toLocaleString(isKn ? 'kn-IN' : 'en-IN')}
                  </td>
                  <td className="py-2.5 px-1.5 sm:py-3.5 sm:px-4 text-right text-gold-light font-bold">
                    ₹ {(ratesData.gold24 * 10).toLocaleString(isKn ? 'kn-IN' : 'en-IN')}
                  </td>
                </tr>
                <tr className="hover:bg-gold/5 transition bg-gold/5">
                  <td className="py-2.5 px-2 sm:py-3.5 sm:px-4 font-semibold text-cream leading-tight">
                    <span>{t.rates.gold22Title}</span>
                  </td>
                  <td className="py-2.5 px-1.5 sm:py-3.5 sm:px-4 text-cream/70 leading-tight">91.6% BIS</td>
                  <td className="py-2.5 px-1.5 sm:py-3.5 sm:px-4 text-right text-gold font-bold text-xs sm:text-base">
                    ₹ {ratesData.gold22.toLocaleString(isKn ? 'kn-IN' : 'en-IN')}
                  </td>
                  <td className="py-2.5 px-1.5 sm:py-3.5 sm:px-4 text-right text-gold font-bold text-xs sm:text-base">
                    ₹ {(ratesData.gold22 * 10).toLocaleString(isKn ? 'kn-IN' : 'en-IN')}
                  </td>
                </tr>
                <tr className="hover:bg-gold/5 transition">
                  <td className="py-2.5 px-2 sm:py-3.5 sm:px-4 font-medium text-cream leading-tight">18 Karat (750)</td>
                  <td className="py-2.5 px-1.5 sm:py-3.5 sm:px-4 text-cream/70 leading-tight">75.0%</td>
                  <td className="py-2.5 px-1.5 sm:py-3.5 sm:px-4 text-right text-cream font-bold">
                    ₹ {(ratesData.gold18 || Math.round(ratesData.gold24 * 0.75)).toLocaleString(isKn ? 'kn-IN' : 'en-IN')}
                  </td>
                  <td className="py-2.5 px-1.5 sm:py-3.5 sm:px-4 text-right text-cream font-bold">
                    ₹ {((ratesData.gold18 || Math.round(ratesData.gold24 * 0.75)) * 10).toLocaleString(isKn ? 'kn-IN' : 'en-IN')}
                  </td>
                </tr>
                <tr className="hover:bg-silver/5 transition">
                  <td className="py-2.5 px-2 sm:py-3.5 sm:px-4 font-medium text-silver-light leading-tight">{t.rates.silverTitle} (999)</td>
                  <td className="py-2.5 px-1.5 sm:py-3.5 sm:px-4 text-cream/70 leading-tight">99.9%</td>
                  <td className="py-2.5 px-1.5 sm:py-3.5 sm:px-4 text-right text-silver-light font-bold">
                    ₹ {ratesData.silver.toLocaleString(isKn ? 'kn-IN' : 'en-IN')}
                  </td>
                  <td className="py-2.5 px-1.5 sm:py-3.5 sm:px-4 text-right text-silver-light font-bold">
                    ₹ {(ratesData.silver * 10).toLocaleString(isKn ? 'kn-IN' : 'en-IN')}
                  </td>
                </tr>
                <tr className="hover:bg-silver/5 transition">
                  <td className="py-2.5 px-2 sm:py-3.5 sm:px-4 font-medium text-silver-light leading-tight">Sterling Silver (925)</td>
                  <td className="py-2.5 px-1.5 sm:py-3.5 sm:px-4 text-cream/70 leading-tight">92.5%</td>
                  <td className="py-2.5 px-1.5 sm:py-3.5 sm:px-4 text-right text-silver-light font-bold">
                    ₹ {Math.round(ratesData.silver * 0.925).toLocaleString(isKn ? 'kn-IN' : 'en-IN')}
                  </td>
                  <td className="py-2.5 px-1.5 sm:py-3.5 sm:px-4 text-right text-silver-light font-bold">
                    ₹ {Math.round(ratesData.silver * 0.925 * 10).toLocaleString(isKn ? 'kn-IN' : 'en-IN')}
                  </td>
                </tr>
              </tbody>
            </table>
          </motion.div>
        )}

        {/* Market Rate Variation Alert / Disclaimer (User Requirement) */}
        <div className="mt-8 p-3.5 sm:p-4 rounded-2xl bg-gold/5 border border-gold/25 text-xs text-cream/70 flex items-start sm:items-center gap-3 font-sans shadow-sm">
          <FaInfoCircle className="text-gold text-sm sm:text-base mt-0.5 sm:mt-0 flex-shrink-0" />
          <div className="flex-1 leading-relaxed text-[11px] sm:text-xs">
            <span className="text-gold-pale font-semibold">
              {isKn ? 'ದರ ವ್ಯತ್ಯಾಸ ಸೂಚನೆ: ' : 'Market Price Notice: '}
            </span>
            <span>
              {isKn
                ? 'ದೈನಂದಿನ ಬುಲಿಯನ್ ಮಾರುಕಟ್ಟೆ ದರಗಳು ಪ್ರತಿ 6 ಗಂಟೆಗಳಿಗೊಮ್ಮೆ ಭಾರತೀಯ ಮಾರುಕಟ್ಟೆ ಸಮಯಕ್ಕೆ ಅನುಗುಣವಾಗಿ ನವೀಕರಣಗೊಳ್ಳುತ್ತವೆ. ಸ್ಥಳೀಯ ಮಾರುಕಟ್ಟೆ ಏರಿಳಿತಗಳು, ತಯಾರಿಕಾ ವೆಚ್ಚ (Making Charges) ಮತ್ತು ಜಿಎಸ್‌ಟಿಗೆ ಅನುಗುಣವಾಗಿ ಶೋರೂಂ ಬಿಲ್ಲಿಂಗ್ ದರಗಳಲ್ಲಿ ಸಣ್ಣ ವ್ಯತ್ಯಾಸವಿರಬಹುದು.'
                : 'Bullion rates are automatically synchronized every 6 hours aligned with Indian bullion market trading hours. Actual showroom billing price may vary slightly based on local market fluctuations, making charges, and applicable GST.'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LiveRates;
