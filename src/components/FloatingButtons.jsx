import React from 'react';
import { FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

export function FloatingButtons() {
  const { isKn } = useLanguage();

  return (
    <aside
      aria-label="Quick Action Buttons"
      className="fixed bottom-0 left-0 right-0 z-40 p-3 bg-[#0d0701]/95 backdrop-blur-lg border-t border-gold/30 md:hidden flex items-center gap-3 shadow-2xl font-sans"
    >
      {/* Call Button */}
      <a
        href="tel:9448628575"
        className="flex-1 py-3 px-4 rounded-xl bg-gold-gradient text-deep font-sans font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-gold-glow active:scale-95 transition-transform"
        aria-label="Call Shree Kamakshi Jewellery Works"
      >
        <FaPhoneAlt className="text-xs" />
        <span>{isKn ? 'ಕರೆ ಮಾಡಿ' : 'Call Now'}</span>
      </a>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/919448628575"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-cream font-sans font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform"
        aria-label="Chat with Shree Kamakshi Jewellery Works on WhatsApp"
      >
        <FaWhatsapp className="text-base text-cream" />
        <span>WhatsApp</span>
      </a>
    </aside>
  );
}

export default FloatingButtons;
