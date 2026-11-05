import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t, isKn } = useLanguage();

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    const elem = document.querySelector(href);
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

  const QUICK_LINKS = [
    { name: t.nav.home, href: '#hero' },
    { name: t.nav.rates, href: '#rates' },
    { name: t.nav.about, href: '#about' },
    { name: t.nav.products, href: '#products' },
    { name: t.nav.whyUs, href: '#why-us' },
    { name: t.nav.visit, href: '#visit' },
    { name: t.nav.contact, href: '#contact' },
  ];

  return (
    <footer className="bg-[#070401] border-t border-gold/25 pt-16 pb-28 md:pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full border border-gold/60 p-1 flex items-center justify-center bg-gold/10">
                <span className="text-sm font-cinzel font-bold text-gold-light select-none">SK</span>
              </div>
              <div>
                <span className="block font-cinzel font-bold text-sm tracking-[0.08em] gold-text-gradient">
                  {isKn ? 'ಶ್ರೀ ಕಾಮಾಕ್ಷಿ' : 'SHREE KAMAKSHI'}
                </span>
                <span className="block font-sans text-[10px] text-cream/70 tracking-[0.16em] uppercase">
                  {isKn ? 'ಜ್ಯುವೆಲ್ಲರಿ ವರ್ಕ್ಸ್' : 'Jewellery Works'}
                </span>
              </div>
            </div>

            <p className="font-sans text-xs sm:text-sm text-cream/70 leading-relaxed mb-4 max-w-sm">
              {t.footer.description}
            </p>

            <div className="flex items-center gap-2 text-xs font-sans text-gold-pale/75 font-medium">
              <span>BIS 916 Hallmark</span>
              <span>•</span>
              <span>100% Genuine Gold & Silver</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h4 className="font-sans text-xs text-gold uppercase tracking-wider font-semibold mb-4">
              {t.footer.quickNav}
            </h4>
            <ul className="space-y-2 font-sans text-xs">
              {QUICK_LINKS.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-cream/70 hover:text-gold-light transition flex items-center gap-1.5"
                  >
                    <span className="text-gold/40 text-[10px]">›</span>
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div className="lg:col-span-2">
            <h4 className="font-sans text-xs text-gold uppercase tracking-wider font-semibold mb-4">
              {t.footer.showroomHours}
            </h4>
            <div className="space-y-2 font-sans text-xs text-cream/75">
              <p>
                <strong className="text-gold-pale block mb-0.5">{t.footer.monSat}</strong>
                10:00 AM – 2:30 PM<br />
                4:00 PM – 9:30 PM
              </p>
              <p className="pt-1">
                <strong className="text-red-300 block mb-0.5">{t.footer.sundayHoliday}</strong>
                {t.footer.closedWord}
              </p>
            </div>
          </div>

          {/* Contact Summary */}
          <div className="lg:col-span-3">
            <h4 className="font-sans text-xs text-gold uppercase tracking-wider font-semibold mb-4">
              {t.footer.showroomContact}
            </h4>
            <div className="space-y-2.5 font-sans text-xs text-cream/75">
              <div className="flex items-start gap-2.5">
                <FaMapMarkerAlt className="text-gold text-xs mt-0.5 flex-shrink-0" />
                <span>{isKn ? 'ಬಿ.ಎಚ್. ರಸ್ತೆ, ತಾಳಗುಪ್ಪ – 577430, ಕರ್ನಾಟಕ' : 'B H Road, Talaguppa – 577430, Karnataka'}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <FaPhoneAlt className="text-gold text-xs flex-shrink-0" />
                <div className="flex gap-2">
                  <a href="tel:9448628575" className="hover:text-gold-light transition">9448628575</a>
                  <span>/</span>
                  <a href="tel:8660419854" className="hover:text-gold-light transition">8660419854</a>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <FaEnvelope className="text-gold text-xs flex-shrink-0" />
                <a href="mailto:skjgvraikar@gmail.com" className="hover:text-gold-light transition">
                  skjgvraikar@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="pt-8 border-t border-gold/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-cream/55">
          <p>© {currentYear} Shree Kamakshi Jewellery Works. {t.footer.allRightsReserved}</p>
          <div className="flex flex-wrap items-center justify-center gap-2 text-center text-[11px] sm:text-xs">
            <span className="text-cream/50">Framed & Designed by <strong className="text-gold-pale font-semibold">Amoga</strong></span>
            <span className="text-gold/40">•</span>
            <span className="text-cream/50">
              Developed by{' '}
              <a
                href="https://my-portfoliyo-nine.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-light hover:text-gold font-semibold underline underline-offset-2 transition-colors hover:scale-105 inline-block"
              >
                Shivam
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
