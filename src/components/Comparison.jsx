import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaMinus, FaAward, FaShieldAlt, FaBalanceScale, FaGem } from 'react-icons/fa';
import SectionTitle from './SectionTitle';
import { useLanguage } from '../context/LanguageContext';

export function Comparison() {
  const { t, isKn } = useLanguage();

  return (
    <section id="why-us" className="py-20 px-3 sm:px-6 lg:px-8 relative font-sans overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title={t.comparison.title}
          subtitle={t.comparison.subtitle}
          eyebrow={t.comparison.eyebrow}
        />

        {/* Trust Badges Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10 sm:mb-12">
          <div className="glass-gold-card p-4 sm:p-5 rounded-2xl border border-gold/30 text-center flex flex-col items-center shadow-gold-glow">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gold/15 flex items-center justify-center text-gold text-lg sm:text-xl mb-2 sm:mb-2.5">
              <FaAward />
            </div>
            <h4 className="font-sans text-[11px] sm:text-xs font-bold text-gold-pale uppercase tracking-wider mb-1">
              {t.comparison.badges.bisTitle}
            </h4>
            <p className="font-sans text-[10px] sm:text-[11px] text-cream/65 leading-tight">
              {t.comparison.badges.bisDesc}
            </p>
          </div>

          <div className="glass-gold-card p-4 sm:p-5 rounded-2xl border border-gold/30 text-center flex flex-col items-center shadow-gold-glow">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gold/15 flex items-center justify-center text-gold text-lg sm:text-xl mb-2 sm:mb-2.5">
              <FaShieldAlt />
            </div>
            <h4 className="font-sans text-[11px] sm:text-xs font-bold text-gold-pale uppercase tracking-wider mb-1">
              {t.comparison.badges.pureTitle}
            </h4>
            <p className="font-sans text-[10px] sm:text-[11px] text-cream/65 leading-tight">
              {t.comparison.badges.pureDesc}
            </p>
          </div>

          <div className="glass-gold-card p-4 sm:p-5 rounded-2xl border border-gold/30 text-center flex flex-col items-center shadow-gold-glow">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gold/15 flex items-center justify-center text-gold text-lg sm:text-xl mb-2 sm:mb-2.5">
              <FaBalanceScale />
            </div>
            <h4 className="font-sans text-[11px] sm:text-xs font-bold text-gold-pale uppercase tracking-wider mb-1">
              {t.comparison.badges.pricingTitle}
            </h4>
            <p className="font-sans text-[10px] sm:text-[11px] text-cream/65 leading-tight">
              {t.comparison.badges.pricingDesc}
            </p>
          </div>

          <div className="glass-gold-card p-4 sm:p-5 rounded-2xl border border-gold/30 text-center flex flex-col items-center shadow-gold-glow">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gold/15 flex items-center justify-center text-gold text-lg sm:text-xl mb-2 sm:mb-2.5">
              <FaGem />
            </div>
            <h4 className="font-sans text-[11px] sm:text-xs font-bold text-gold-pale uppercase tracking-wider mb-1">
              {t.comparison.badges.trustTitle}
            </h4>
            <p className="font-sans text-[10px] sm:text-[11px] text-cream/65 leading-tight">
              {t.comparison.badges.trustDesc}
            </p>
          </div>
        </div>

        {/* Clean Comparison Table - 100% Responsive, Fixed, Zero X-Scroll */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-gold-card rounded-2xl sm:rounded-3xl border border-gold/30 overflow-hidden shadow-2xl"
        >
          <div className="w-full overflow-hidden">
            <table className="w-full table-fixed text-left border-collapse">
              <thead>
                <tr className="border-b border-gold/25 bg-black/60 font-sans font-semibold">
                  {/* Column 1 */}
                  <th className="py-3 px-2.5 sm:py-4 sm:px-6 md:px-8 text-cream/80 w-[42%] sm:w-2/5 text-[10px] sm:text-xs tracking-wider uppercase">
                    {t.comparison.thFeatures}
                  </th>

                  {/* Column 2: Shree Kamakshi (Gold Column) */}
                  <th className="py-3 px-2 sm:py-4 sm:px-6 md:px-8 text-gold bg-gold/15 border-x border-gold/30 w-[31%] sm:w-3/10 text-center font-bold">
                    <span className="block font-cinzel text-xs sm:text-sm tracking-wide">
                      {isKn ? 'ಶ್ರೀ ಕಾಮಾಕ್ಷಿ' : 'SHREE KAMAKSHI'}
                    </span>
                    <span className="text-[9px] sm:text-[10px] text-gold-light/75 tracking-wider font-normal lowercase block">
                      {isKn ? 'ಜ್ಯುವೆಲ್ಲರಿ ವರ್ಕ್ಸ್' : 'jewellery works'}
                    </span>
                  </th>

                  {/* Column 3: Typical Jewellers */}
                  <th className="py-3 px-2 sm:py-4 sm:px-6 md:px-8 text-cream/50 w-[27%] sm:w-3/10 text-center text-[10px] sm:text-xs tracking-wider uppercase font-semibold">
                    {t.comparison.thOthers}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold/10 font-sans">
                {t.comparison.rows.map((row, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-gold/5 transition-colors group"
                  >
                    {/* Feature */}
                    <td className="py-3 px-2.5 sm:py-4 sm:px-6 md:px-8 align-middle">
                      <div className="font-sans text-xs sm:text-sm font-semibold text-cream group-hover:text-gold-light transition-colors leading-snug">
                        {row.feature}
                      </div>
                      <div className="text-[10px] sm:text-xs text-cream/60 mt-0.5 leading-snug">
                        {row.description}
                      </div>
                    </td>

                    {/* Shree Kamakshi (Gold Column) */}
                    <td className="py-3 px-2 sm:py-4 sm:px-6 md:px-8 bg-gold/10 border-x border-gold/20 text-center align-middle">
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
                        <FaCheckCircle className="text-gold text-xs sm:text-base flex-shrink-0" />
                        <span className="font-sans text-[11px] sm:text-xs md:text-sm font-semibold text-gold-pale leading-tight">
                          {row.us}
                        </span>
                      </div>
                    </td>

                    {/* Typical Jewellers */}
                    <td className="py-3 px-2 sm:py-4 sm:px-6 md:px-8 text-center text-cream/55 align-middle">
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
                        <FaMinus className="text-cream/35 text-[10px] sm:text-xs flex-shrink-0" />
                        <span className="text-[10px] sm:text-xs italic leading-tight">
                          {row.others}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Comparison;
