import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import LiveRates from '../components/LiveRates';
import About from '../components/About';
import CategoryShowcase from '../components/CategoryShowcase';
import Comparison from '../components/Comparison';
import VisitUs from '../components/VisitUs';
import ContactForm from '../components/ContactForm';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import FloatingButtons from '../components/FloatingButtons';
import SEO from '../components/SEO';

import useRates from '../hooks/useRates';
import useSettings from '../hooks/useSettings';
import useVisitorTracker from '../hooks/useVisitorTracker';

export function HomePage() {
  useVisitorTracker();

  const {
    rates,
    loading: ratesLoading,
    error: ratesError,
    isFallback: ratesIsFallback,
    lastRefreshedAt,
    refetch: refetchRates,
  } = useRates();

  const {
    settings,
    loading: settingsLoading,
    error: settingsError,
  } = useSettings();

  const [prefillData, setPrefillData] = useState(null);

  // Check if user came from Products page with an enquiry prefill
  useEffect(() => {
    const saved = sessionStorage.getItem('prefill_enquiry');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setPrefillData(parsed);
        sessionStorage.removeItem('prefill_enquiry');

        // Scroll to contact form after brief delay
        setTimeout(() => {
          const contactSection = document.querySelector('#contact');
          if (contactSection) {
            const topOffset = 80;
            const elementPosition = contactSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - topOffset;
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth',
            });
          }
        }, 150);
      } catch (e) {
        console.error('Failed to parse prefill enquiry', e);
      }
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative text-cream selection:bg-gold selection:text-deep bg-royal-pattern font-sans">
      <SEO />

      {/* Floating background ambient lights */}
      <div className="fixed top-12 left-1/4 w-72 h-72 bg-gold/5 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="fixed bottom-20 right-10 w-96 h-96 bg-amber-600/5 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* 1. Navbar */}
      <Navbar />

      <main className="flex-1 relative z-10">
        {/* 2. Hero Section */}
        <Hero settings={settings} />

        {/* 3. Live Rates Section */}
        <LiveRates
          ratesData={rates}
          loading={ratesLoading}
          error={ratesError}
          isFallback={ratesIsFallback}
          lastRefreshedAt={lastRefreshedAt}
          onRefresh={refetchRates}
        />

        {/* 4. About Us & Heritage */}
        <About settings={settings} />

        {/* 5. Clean Curated Category Showcase (Neat on Home!) */}
        <CategoryShowcase />

        {/* 6. Why Choose Us (Comparison) */}
        <Comparison />

        {/* 7. Visit Us */}
        <VisitUs settings={settings} />

        {/* 8. Frequently Asked Questions (SEO Rich Snippets) */}
        <FAQ />

        {/* 9. Contact Us / Enquiry */}
        <ContactForm settings={settings} prefillData={prefillData} />
      </main>

      {/* 10. Footer */}
      <Footer />

      {/* 10. Mobile Floating Quick Action Dock */}
      <FloatingButtons />
    </div>
  );
}

export default HomePage;

