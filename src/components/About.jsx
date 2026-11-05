import React from 'react';
import { motion } from 'framer-motion';
import { FaHistory, FaQuoteLeft, FaAward, FaShieldAlt, FaBalanceScale, FaUserCheck } from 'react-icons/fa';
import SectionTitle from './SectionTitle';
import { useLanguage } from '../context/LanguageContext';

export function About({ settings }) {
  const { t, isKn } = useLanguage();
  const owner = settings?.owner || {};
  const currentProprietor = isKn ? t.about.proprietorName : (owner.name || t.about.proprietorName);
  const proprietorPhoto = owner.photo || '/images/owner.jpg';
  const proprietorTitle = t.about.proprietorBadge;
  const proprietorQuote = isKn ? t.about.proprietorQuote : (owner.quote || t.about.proprietorQuote);

  const fatherName = isKn ? t.about.founderName : (owner.fatherName || t.about.founderName);
  const fatherTribute = isKn ? t.about.founderTribute : (owner.fatherTribute || t.about.founderTribute);
  const legacyStory = isKn ? t.about.legacyStory : (owner.legacyStory || t.about.legacyStory);

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-gold/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-amber-700/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title={t.about.title}
          subtitle={t.about.subtitle}
          eyebrow={t.about.eyebrow}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Official Owner Portrait Card */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col items-center text-center"
          >
            <div className="relative group w-full max-w-sm">
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-gold/40 via-yellow-200/20 to-amber-700/40 blur-md group-hover:blur-lg transition-all duration-500" />
              
              <div className="relative glass-gold-card p-3 rounded-2xl border border-gold/50 shadow-gold-glow">
                <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden bg-black/60 shadow-inner">
                  <img
                    src={proprietorPhoto}
                    alt={`${currentProprietor} - ${proprietorTitle}`}
                    className="w-full h-full object-cover object-top filter contrast-105 group-hover:scale-103 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />

                  {/* Name and Title banner */}
                  <div className="absolute bottom-4 left-4 right-4 text-center">
                    <span className="px-3.5 py-1 rounded-full bg-deep/95 border border-gold/70 text-gold-light text-[10px] font-sans font-semibold tracking-widest uppercase inline-block mb-1.5 shadow-md">
                      ✦ {proprietorTitle} ✦
                    </span>
                    <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-cream gold-text-gradient">
                      {currentProprietor}
                    </h3>
                    <p className="font-sans text-xs text-gold-pale/80 tracking-wider mt-0.5">
                      {t.about.proprietorSub}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-3.5 text-xs font-sans text-cream/60 tracking-wide">
              {t.about.servingNote}
            </p>
          </motion.div>

          {/* Right Column: Founder's Legacy & Principles */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            {/* Proprietor Quote Banner */}
            <div className="glass-gold-card p-6 sm:p-7 rounded-2xl border border-gold/30 bg-gradient-to-r from-deep via-amber-950/20 to-deep relative">
              <FaQuoteLeft className="text-gold/25 text-2xl absolute top-5 left-5" />
              <div className="pl-8">
                <p className="font-playfair italic text-cream text-base sm:text-lg leading-relaxed">
                  "{proprietorQuote}"
                </p>
                <div className="mt-3 flex items-center justify-between border-t border-gold/15 pt-2 font-sans text-xs">
                  <span className="font-semibold text-gold-light">
                    {currentProprietor}
                  </span>
                  <span className="text-cream/55">
                    {t.about.masterGoldsmith}
                  </span>
                </div>
              </div>
            </div>

            {/* Founding Ancestral Legacy & Story */}
            <div className="glass-gold-card p-6 sm:p-8 rounded-2xl border border-gold/30 relative">
              <div className="flex items-center gap-3 mb-4">
                <span className="p-2.5 rounded-xl bg-gold/15 text-gold text-lg border border-gold/30">
                  <FaHistory />
                </span>
                <div>
                  <h3 className="font-cinzel text-lg sm:text-xl text-gold-light font-bold">
                    {t.about.legacyTitle}
                  </h3>
                  <p className="font-sans text-xs text-cream/65 tracking-wider uppercase">
                    {t.about.legacySub}
                  </p>
                </div>
              </div>

              <div className="space-y-4 font-sans text-cream/85 text-sm sm:text-base leading-relaxed">
                <div className="border-l-2 border-gold pl-4 py-2 bg-gold/5 rounded-r-xl">
                  <span className="text-[11px] font-sans font-semibold text-gold uppercase tracking-wider block mb-1">
                    {t.about.founderBadge}
                  </span>
                  <p className="font-playfair italic text-gold-pale text-base sm:text-lg">
                    "{fatherTribute}"
                  </p>
                </div>

                <p>
                  {legacyStory}
                </p>

                <p className="text-cream/75 text-sm">
                  {t.about.legacyParagraph2}
                </p>
              </div>
            </div>

            {/* Four Foundational Pillars */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              <div className="p-3.5 rounded-xl bg-black/40 border border-gold/20 text-center">
                <FaBalanceScale className="text-gold text-lg mx-auto mb-1.5" />
                <span className="font-sans text-xs font-bold text-gold-pale block">{t.about.pillars.zeroConcealmentTitle}</span>
                <span className="font-sans text-[11px] text-cream/55">{t.about.pillars.zeroConcealmentDesc}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-black/40 border border-gold/20 text-center">
                <FaAward className="text-gold text-lg mx-auto mb-1.5" />
                <span className="font-sans text-xs font-bold text-gold-pale block">{t.about.pillars.hallmarkTitle}</span>
                <span className="font-sans text-[11px] text-cream/55">{t.about.pillars.hallmarkDesc}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-black/40 border border-gold/20 text-center">
                <FaShieldAlt className="text-gold text-lg mx-auto mb-1.5" />
                <span className="font-sans text-xs font-bold text-gold-pale block">{t.about.pillars.customMadeTitle}</span>
                <span className="font-sans text-[11px] text-cream/55">{t.about.pillars.customMadeDesc}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-black/40 border border-gold/20 text-center">
                <FaUserCheck className="text-gold text-lg mx-auto mb-1.5" />
                <span className="font-sans text-xs font-bold text-gold-pale block">{t.about.pillars.familyTrustTitle}</span>
                <span className="font-sans text-[11px] text-cream/55">{t.about.pillars.familyTrustDesc}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;
