import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaPhoneAlt, FaGlobe } from 'react-icons/fa';
import OpenNowBadge from './OpenNowBadge';
import { useLanguage } from '../context/LanguageContext';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { lang, toggleLang, t, isKn } = useLanguage();

  const NAV_LINKS = [
    { name: t.nav.home, href: '#hero', route: '/' },
    { name: t.nav.rates, href: '#rates', route: '/#rates' },
    { name: t.nav.about, href: '#about', route: '/#about' },
    { name: t.nav.products, href: '/products', isRoute: true },
    { name: t.nav.whyUs, href: '#why-us', route: '/#why-us' },
    { name: t.nav.visit, href: '#visit', route: '/#visit' },
    { name: t.nav.contact, href: '#contact', route: '/#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, link) => {
    e.preventDefault();
    setMobileOpen(false);

    if (link.isRoute) {
      navigate('/products');
      return;
    }

    if (location.pathname !== '/') {
      navigate(link.route);
    } else {
      const target = document.querySelector(link.href);
      if (target) {
        const topOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - topOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 font-sans ${
        scrolled
          ? 'bg-[#0a0602]/94 backdrop-blur-md border-b border-gold/25 shadow-glass py-2.5'
          : 'bg-gradient-to-b from-black/85 via-black/35 to-transparent py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2">
        {/* Brand / Logo */}
        <Link
          to="/"
          className="group flex items-center gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          <div className="w-9 h-9 rounded-full border border-gold/60 p-1 flex items-center justify-center bg-gold/10 group-hover:border-gold transition shadow-gold-glow">
            <span className="text-sm font-cinzel font-bold text-gold-light select-none">SK</span>
          </div>
          <div>
            <span className="block font-cinzel font-bold text-xs sm:text-sm tracking-[0.08em] gold-text-gradient">
              {isKn ? 'ಶ್ರೀ ಕಾಮಾಕ್ಷಿ' : 'SHREE KAMAKSHI'}
            </span>
            <span className="block font-sans text-[10px] text-cream/70 tracking-[0.14em] uppercase">
              {isKn ? 'ಜ್ಯುವೆಲ್ಲರಿ ವರ್ಕ್ಸ್ • ತಾಳಗುಪ್ಪ' : 'Jewellery Works • Talaguppa'}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6" aria-label="Main Navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link)}
              className={`font-sans text-xs tracking-[0.1em] font-medium uppercase transition relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:bg-gold after:transition-all hover:after:w-full ${
                link.isRoute && location.pathname === '/products'
                  ? 'text-gold after:w-full font-semibold'
                  : 'text-cream/75 hover:text-gold-light after:w-0'
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Language Switcher, Open Now Badge & Call Button */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Language Toggle Button */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gold/45 bg-gold/10 hover:bg-gold/25 text-gold-light font-sans text-xs font-semibold tracking-wider transition shadow-sm cursor-pointer"
            title={isKn ? 'Switch to English' : 'ಕನ್ನಡಕ್ಕೆ ಬದಲಾಯಿಸಿ'}
            aria-label={isKn ? 'Switch to English' : 'Switch to Kannada'}
          >
            <FaGlobe className="text-gold text-xs" />
            <span>{isKn ? 'English' : 'ಕನ್ನಡ'}</span>
          </button>

          <div className="hidden sm:block">
            <OpenNowBadge showDetails={false} />
          </div>

          <a
            href="tel:9448628575"
            className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/15 hover:bg-gold/25 border border-gold/40 text-gold-light font-sans text-xs font-semibold tracking-wide transition duration-200 shadow-sm"
            title="Call Shree Kamakshi Jewellery Works"
          >
            <FaPhoneAlt className="text-[10px] text-gold" />
            <span>9448628575</span>
          </a>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg border border-gold/30 text-gold-light hover:bg-gold/10 focus:outline-none focus:ring-2 focus:ring-gold"
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <HiX className="w-5 h-5" /> : <HiMenu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileOpen && (
        <div
          className="lg:hidden bg-[#0d0701]/98 backdrop-blur-xl border-b border-gold/30 px-6 py-6 transition-all duration-300 shadow-2xl"
          role="region"
          aria-label="Mobile Navigation Menu"
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-gold/15">
              <span className="font-sans text-xs text-cream/70 uppercase tracking-wider">
                {isKn ? 'ಭಾಷೆ / Language:' : 'Language / ಭಾಷೆ:'}
              </span>
              <button
                onClick={toggleLang}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-gold/60 bg-gold/15 text-gold-light font-sans text-xs font-bold tracking-wider"
              >
                <FaGlobe className="text-gold text-xs" />
                <span>{isKn ? 'Switch to English' : 'ಕನ್ನಡಕ್ಕೆ ಬದಲಾಯಿಸಿ'}</span>
              </button>
            </div>

            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                className={`font-sans text-xs uppercase tracking-widest border-b border-gold/10 pb-2.5 transition flex items-center justify-between ${
                  link.isRoute && location.pathname === '/products'
                    ? 'text-gold font-bold'
                    : 'text-cream/90 hover:text-gold-light'
                }`}
              >
                <span>{link.name}</span>
                <span className="text-gold/40 text-xs">→</span>
              </a>
            ))}

            <div className="pt-2 flex flex-col gap-2.5">
              <a
                href="tel:9448628575"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gold-gradient text-deep font-sans font-bold text-xs tracking-wider uppercase shadow-gold-glow"
              >
                <FaPhoneAlt />
                <span>{t.nav.callNow}: 9448628575</span>
              </a>
              <a
                href="tel:8660419854"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-gold/40 text-gold-light font-sans text-xs tracking-wider uppercase"
              >
                <FaPhoneAlt />
                <span>{t.nav.callNow}: 8660419854</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
