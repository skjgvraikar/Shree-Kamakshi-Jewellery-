import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaQuestionCircle, FaPhoneAlt, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import SectionTitle from './SectionTitle';

export function FAQ() {
  const { isKn } = useLanguage();
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: isKn
        ? 'ಶ್ರೀ ಕಾಮಾಕ್ಷಿ ಜ್ಯುವೆಲ್ಲರಿ ವರ್ಕ್ಸ್ ಎಲ್ಲಿ ನೆಲೆಸಿದೆ?'
        : 'Where is Shree Kamakshi Jewellery Works located?',
      a: isKn
        ? 'ನಮ್ಮ ಶೋರೂಂ ಕರ್ನಾಟಕದ ಶಿವಮೊಗ್ಗ ಜಿಲ್ಲೆ, ಸಾಗರ ತಾಲೂಕಿನ ತಾಳಗುಪ್ಪದ ಬಿ ಹೆಚ್ ರಸ್ತೆಯಲ್ಲಿದೆ (ಅಂಚೆ ಕೋಡ್: 577430). ಸಂಪರ್ಕಕ್ಕಾಗಿ: 9448628575 ಅಥವಾ 8660419854.'
        : 'Shree Kamakshi Jewellery Works is located on B H Road, Talaguppa – 577430, Sagar Taluk, Shivamogga District, Karnataka. You can call our master goldsmiths directly at 9448628575 or 8660419854.',
      tag: isKn ? 'ಸ್ಥಳ ಮತ್ತು ವಿಳಾಸ' : 'Location & Address',
    },
    {
      q: isKn
        ? 'ಎಲ್ಲಾ ಚಿನ್ನದ ಒಡವೆಗಳು ಬಿಐಎಸ್ 916 ಹಾಲ್ಮಾರ್ಕ್ ಪ್ರಮಾಣೀಕೃತವೇ?'
        : 'Are all gold ornaments certified with BIS 916 Hallmark?',
      a: isKn
        ? 'ಹೌದು! ನಮ್ಮಲ್ಲಿ ಮಾರಾಟವಾಗುವ ಪ್ರತಿ ಚಿನ್ನದ ಒಡವೆಯೂ (ಕಂಠಹಾರ, ಬಳೆ, ಉಂಗುರ, ಸರ) ಭಾರತ ಸರ್ಕಾರದ ಅಧಿಕೃತ ಬಿಐಎಸ್ 916 ಹಾಲ್ಮಾರ್ಕ್ ಮುದ್ರೆಯನ್ನು ಹೊಂದಿರುತ್ತದೆ. ನೈಜ 91.6% ಶುದ್ಧತೆಯ ಖಾತರಿ ನೀಡಲಾಗುತ್ತದೆ.'
        : 'Yes, 100% of our gold jewellery is certified with government-authorized BIS 916 Hallmark laser stamps, verifying standard 91.6% pure gold across all necklaces, bangles, rings, and chains.',
      tag: isKn ? 'ಶುದ್ಧತೆಯ ಖಾತರಿ' : 'Purity Guarantee',
    },
    {
      q: isKn
        ? 'ಶೋರೂಂ ತೆರೆಯುವ ಸಮಯ ಯಾವುದು?'
        : 'What are the showroom opening hours in Talaguppa?',
      a: isKn
        ? 'ಶೋರೂಂ ಸೋಮವಾರದಿಂದ ಶನಿವಾರದವರೆಗೆ ಪ್ರತಿದಿನ ಬೆಳಗ್ಗೆ 10:00 ರಿಂದ ಮಧ್ಯಾಹ್ನ 2:30 ರವರೆಗೆ ಮತ್ತು ಸಂಜೆ 4:00 ರಿಂದ ರಾತ್ರಿ 9:30 ರವರೆಗೆ ತೆರೆದಿರುತ್ತದೆ. ಭಾನುವಾರ ರಜೆ ಇರುತ್ತದೆ.'
        : 'Our showroom is open Monday through Saturday in two sessions: Morning 10:00 AM – 2:30 PM, and Evening 4:00 PM – 9:30 PM. Sunday is our weekly holiday.',
      tag: isKn ? 'ಕಾರ್ಯನಿರ್ವಹಣಾ ಸಮಯ' : 'Store Timings',
    },
    {
      q: isKn
        ? 'ಮದುವೆ ಹಾಗೂ ಶುಭ ಸಮಾರಂಭಗಳಿಗೆ ಕಸ್ಟಮ್ ಚಿನ್ನದ ಒಡವೆಗಳನ್ನು ಮಾಡಿಸಬಹುದೇ?'
        : 'Can I place custom orders for bridal and temple jewellery?',
      a: isKn
        ? 'ಖಂಡಿತವಾಗಿ! ನಮ್ಮ ನುರಿತ ಕುಶಲಕರ್ಮಿಗಳು ನಿಮ್ಮ ಇಷ್ಟದ ವಿನ್ಯಾಸ, ಕಾಸು ಮಾಲೆ, ಲಕ್ಷ್ಮಿ ಹಾರ, ಕಡಗ ಮತ್ತು ದೇವರ ಪೂಜಾ ಆಭರಣಗಳನ್ನು ನಿಮ್ಮ ಅಗತ್ಯಕ್ಕೆ ತಕ್ಕಂತೆ ಅಚ್ಚುಕಟ್ಟಾಗಿ ಸಿದ್ಧಪಡಿಸಿಕೊಡುತ್ತಾರೆ.'
        : 'Yes! We specialize in bespoke bridal necklaces, heirloom Kasu Malas, hand-carved peacock kadas, and temple jewellery tailored to your family traditions and budget.',
      tag: isKn ? 'ಕಸ್ಟಮ್ ಆರ್ಡರ್‌ಗಳು' : 'Custom Crafting',
    },
    {
      q: isKn
        ? 'ಇಂದಿನ ಲೈವ್ ಚಿನ್ನ ಮತ್ತು ಬೆಳ್ಳಿ ದರಗಳನ್ನು ತಿಳಿಯುವುದು ಹೇಗೆ?'
        : 'How do I check live gold and silver rates today in Talaguppa?',
      a: isKn
        ? 'ನಮ್ಮ ವೆಬ್‌ಸೈಟ್‌ನ ಲೈವ್ ದರಗಳ ವಿಭಾಗದಲ್ಲಿ ಪ್ರತಿ 6 ಗಂಟೆಗಳಿಗೊಮ್ಮೆ ಭಾರತೀಯ ಮಾರುಕಟ್ಟೆ ಸಮಯಕ್ಕೆ ಅನುಗುಣವಾಗಿ ಅಪ್‌ಡೇಟ್ ಆಗುವ 22 ಕ್ಯಾರೆಟ್ (916) ಹಾಗೂ 24 ಕ್ಯಾರೆಟ್ (999) ಚಿನ್ನ ಮತ್ತು ಬೆಳ್ಳಿಯ ನೈಜ ದರಗಳನ್ನು ವೀಕ್ಷಿಸಬಹುದು.'
        : 'You can view real-time bullion spot rates for 22K (916) Hallmark gold, 24K fine bullion, and 999 silver directly on our website rates section, synchronized every 6 hours aligned with Indian market hours.',
      tag: isKn ? 'ಲೈವ್ ದರಗಳು' : 'Live Bullion Rates',
    },
    {
      q: isKn
        ? 'ಪೂಜಾ ಬೆಳ್ಳಿ ವಸ್ತುಗಳು ಮತ್ತು ದೇವರ ದೀಪಗಳು ಲಭ್ಯವಿವೆಯೇ?'
        : 'Do you offer pure silver pooja items and silverware articles?',
      a: isKn
        ? 'ಹೌದು, ಶುದ್ಧ ಬೆಳ್ಳಿಯ ಪೂಜಾ ದೀಪಗಳು (ದೀಪಾರಾಧನೆ), ಕುಂಕುಮ ಬಾಕ್ಸ್, ಹರಿವಾಣ, ಗೆಜ್ಜೆ ಕಾಲುಂಗುರ, ಕಡಗ ಮತ್ತು ಬೆಳ್ಳಿ ನಾಣ್ಯಗಳು ಸದಾ ಲಭ್ಯವಿವೆ.'
        : 'Yes, we stock a wide array of pure 925 and 999 silver articles including pooja deepam lamps, kumkum boxes, silver thalis, baby kadas, and certified silver coins for religious ceremonies.',
      tag: isKn ? 'ಬೆಳ್ಳಿ ವಸ್ತುಗಳು' : 'Pooja Silver',
    },
  ];

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 relative font-sans">
      <div className="max-w-4xl mx-auto">
        <SectionTitle
          title={isKn ? 'ಪದೇ ಪದೇ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು' : 'Frequently Asked Questions'}
          subtitle={
            isKn
              ? 'ತಾಳಗುಪ್ಪದ ನಮ್ಮ ಶೋರೂಂ, ಚಿನ್ನದ ಶುದ್ಧತೆ ಮತ್ತು ಸೇವೆಗಳ ಬಗ್ಗೆ ಸಾಮಾನ್ಯ ಮಾಹಿತಿ'
              : 'Essential details on BIS 916 Hallmark purity, showroom timings, custom orders, and live rates'
          }
          eyebrow={isKn ? 'ಗ್ರಾಹಕರ ಮಾಹಿತಿ' : 'Customer Knowledge'}
        />

        <div className="space-y-3.5 mt-10">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-gradient-to-r from-[#170e05] to-[#120a03] border-gold/60 shadow-gold-glow'
                    : 'bg-[#120a03]/80 border-gold/20 hover:border-gold/40'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-3.5">
                    <span className="w-6 h-6 rounded-full bg-gold/15 text-gold text-xs flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                      Q{index + 1}
                    </span>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gold-light/80 block mb-1">
                        {faq.tag}
                      </span>
                      <h3 className="font-sans text-sm sm:text-base font-bold text-cream leading-snug">
                        {faq.q}
                      </h3>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-gold flex-shrink-0"
                  >
                    <FaChevronDown className="text-xs" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-cream/75 leading-relaxed font-sans border-t border-gold/10 pt-3"
                    >
                      <p className="pl-9">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Help Banner */}
        <div className="mt-10 p-5 rounded-2xl bg-gold/10 border border-gold/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <FaPhoneAlt className="text-gold text-lg flex-shrink-0 hidden sm:block" />
            <div>
              <p className="text-xs font-bold text-cream">
                {isKn ? 'ಇನ್ನಷ್ಟು ಮಾಹಿತಿ ಬೇಕೇ?' : 'Have specific questions or custom requirements?'}
              </p>
              <p className="text-[11px] text-cream/65">
                {isKn ? 'ನಮ್ಮ ಅಕ್ಕಸಾಲಿಗರನ್ನು ನೇರವಾಗಿ ಸಂಪರ್ಕಿಸಿ' : 'Speak directly with our showroom goldsmiths'}
              </p>
            </div>
          </div>
          <a
            href="tel:9448628575"
            className="px-5 py-2 rounded-xl bg-gold-gradient text-deep text-xs font-bold uppercase tracking-wider shadow-sm hover:opacity-95 transition"
          >
            {isKn ? 'ಕರೆ ಮಾಡಿ: 9448628575' : 'Call 9448628575'}
          </a>
        </div>
      </div>
    </section>
  );
}

export default FAQ;
