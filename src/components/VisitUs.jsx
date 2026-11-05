import React from 'react';
import { motion } from 'framer-motion';
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaDirections,
  FaClock,
  FaTrain,
  FaBus,
  FaCar,
  FaCompass,
  FaExternalLinkAlt,
  FaShieldAlt,
} from 'react-icons/fa';
import SectionTitle from './SectionTitle';
import OpenNowBadge from './OpenNowBadge';
import { useLanguage } from '../context/LanguageContext';

export function VisitUs({ settings }) {
  const { t, isKn } = useLanguage();
  const addressText = isKn
    ? 'ಬಿ.ಎಚ್. ರಸ್ತೆ, ತಾಳಗುಪ್ಪ – 577430'
    : settings?.address?.full || 'B H Road, Talaguppa – 577430';
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'B H Road, Talaguppa 577430 Karnataka'
  )}`;

  const WEEKDAY_SCHEDULE = [
    {
      day: isKn ? 'ಸೋಮವಾರ' : 'Monday',
      hours: isKn
        ? 'ಬೆಳಗ್ಗೆ 10:00 – ಮಧ್ಯಾಹ್ನ 2:30 ಮತ್ತು ಸಂಜೆ 4:00 – ರಾತ್ರಿ 9:30'
        : '10:00 AM – 2:30 PM & 4:00 PM – 9:30 PM',
      isHoliday: false,
    },
    {
      day: isKn ? 'ಮಂಗಳವಾರ' : 'Tuesday',
      hours: isKn
        ? 'ಬೆಳಗ್ಗೆ 10:00 – ಮಧ್ಯಾಹ್ನ 2:30 ಮತ್ತು ಸಂಜೆ 4:00 – ರಾತ್ರಿ 9:30'
        : '10:00 AM – 2:30 PM & 4:00 PM – 9:30 PM',
      isHoliday: false,
    },
    {
      day: isKn ? 'ಬುಧವಾರ' : 'Wednesday',
      hours: isKn
        ? 'ಬೆಳಗ್ಗೆ 10:00 – ಮಧ್ಯಾಹ್ನ 2:30 ಮತ್ತು ಸಂಜೆ 4:00 – ರಾತ್ರಿ 9:30'
        : '10:00 AM – 2:30 PM & 4:00 PM – 9:30 PM',
      isHoliday: false,
    },
    {
      day: isKn ? 'ಗುರುವಾರ' : 'Thursday',
      hours: isKn
        ? 'ಬೆಳಗ್ಗೆ 10:00 – ಮಧ್ಯಾಹ್ನ 2:30 ಮತ್ತು ಸಂಜೆ 4:00 – ರಾತ್ರಿ 9:30'
        : '10:00 AM – 2:30 PM & 4:00 PM – 9:30 PM',
      isHoliday: false,
    },
    {
      day: isKn ? 'ಶುಕ್ರವಾರ' : 'Friday',
      hours: isKn
        ? 'ಬೆಳಗ್ಗೆ 10:00 – ಮಧ್ಯಾಹ್ನ 2:30 ಮತ್ತು ಸಂಜೆ 4:00 – ರಾತ್ರಿ 9:30'
        : '10:00 AM – 2:30 PM & 4:00 PM – 9:30 PM',
      isHoliday: false,
    },
    {
      day: isKn ? 'ಶನಿವಾರ' : 'Saturday',
      hours: isKn
        ? 'ಬೆಳಗ್ಗೆ 10:00 – ಮಧ್ಯಾಹ್ನ 2:30 ಮತ್ತು ಸಂಜೆ 4:00 – ರಾತ್ರಿ 9:30'
        : '10:00 AM – 2:30 PM & 4:00 PM – 9:30 PM',
      isHoliday: false,
    },
    {
      day: isKn ? 'ಭಾನುವಾರ' : 'Sunday',
      hours: isKn
        ? 'ವಾರದ ರಜೆ (ದಿನಪೂರ್ತಿ ಮುಚ್ಚಿರುತ್ತದೆ)'
        : 'Weekly Holiday (Closed all day)',
      isHoliday: true,
    },
  ];

  const LANDMARKS = [
    {
      icon: FaBus,
      title: isKn ? 'ತಾಳಗುಪ್ಪ ಬಸ್ ನಿಲ್ದಾಣ' : 'Talaguppa Bus Stand',
      detail: isKn ? 'ಕೇವಲ 2 ನಿಮಿಷಗಳ ನಡಿಗೆ (150 ಮೀ)' : '2 Mins Walk (150m) on B H Road',
    },
    {
      icon: FaTrain,
      title: isKn ? 'ತಾಳಗುಪ್ಪ ರೈಲ್ವೆ ನಿಲ್ದಾಣ' : 'Talaguppa Railway Station',
      detail: isKn ? '800 ಮೀಟರ್ • 2 ನಿಮಿಷಗಳ ವಾಹನ ಪಯಣ' : '800m • 2 mins drive (Sagar Line)',
    },
    {
      icon: FaDirections,
      title: isKn ? 'ರಾಷ್ಟ್ರೀಯ ಹೆದ್ದಾರಿ 206' : 'NH-206 Highway Access',
      detail: isKn ? 'ಸಾಗರ - ಜೋಗ ಜಲಪಾತ ಮುಖ್ಯ ರಸ್ತೆ' : 'Main Sagar – Jog Falls Highway Route',
    },
    {
      icon: FaCar,
      title: isKn ? 'ಉಚಿತ ವಾಹನ ನಿಲುಗಡೆ' : 'Dedicated Customer Parking',
      detail: isKn ? 'ಮಳಿಗೆಯ ಮುಂಭಾಗ ಸುಲಭ ಪಾರ್ಕಿಂಗ್' : 'Convenient free parking & AC lounge',
    },
  ];

  return (
    <section id="visit" className="py-20 px-4 sm:px-6 lg:px-8 relative font-sans">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title={t.visit.title}
          subtitle={t.visit.subtitle}
          eyebrow={t.visit.eyebrow}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Address, Hours Table & Action Buttons */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col justify-between glass-gold-card p-6 sm:p-8 rounded-3xl border border-gold/30"
          >
            <div>
              {/* Address Header */}
              <div className="flex items-start justify-between gap-4 mb-6 pb-6 border-b border-gold/20">
                <div className="flex items-start gap-3.5">
                  <div className="p-3 rounded-2xl bg-gold/15 text-gold text-xl border border-gold/30 mt-1">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <span className="font-sans text-[11px] font-semibold text-gold uppercase tracking-wider block mb-1">
                      {t.visit.addressHeader}
                    </span>
                    <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-cream mb-1">
                      {isKn ? 'ಶ್ರೀ ಕಾಮಾಕ್ಷಿ ಜ್ಯುವೆಲ್ಲರಿ ವರ್ಕ್ಸ್' : 'Shree Kamakshi Jewellery Works'}
                    </h3>
                    <p className="font-sans text-base text-gold-pale font-medium">
                      {addressText}
                    </p>
                    <p className="font-sans text-xs text-cream/60 mt-0.5">
                      {isKn ? 'ಶಿವಮೊಗ್ಗ ಜಿಲ್ಲೆ, ಕರ್ನಾಟಕ' : 'Shivamogga District, Karnataka'}
                    </p>
                  </div>
                </div>

                <OpenNowBadge showDetails={false} />
              </div>

              {/* Business Hours Table */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <FaClock className="text-gold text-xs" />
                  <h4 className="font-sans text-xs text-gold uppercase tracking-wider font-semibold">
                    {t.visit.timingsHeader}
                  </h4>
                </div>

                <div className="overflow-hidden rounded-xl border border-gold/20 bg-black/40">
                  <table className="w-full text-left text-xs font-sans">
                    <tbody className="divide-y divide-gold/10">
                      {WEEKDAY_SCHEDULE.map((item, idx) => (
                        <tr
                          key={idx}
                          className={`transition-colors ${
                            item.isHoliday
                              ? 'bg-ruby/20 text-red-200 font-semibold'
                              : 'hover:bg-gold/5 text-cream/90'
                          }`}
                        >
                          <td className="py-2.5 px-4 font-semibold text-cream/80 w-1/3">
                            {item.day}
                          </td>
                          <td className="py-2.5 px-4">
                            {item.isHoliday ? (
                              <span className="inline-flex items-center gap-1.5 text-red-300 font-semibold uppercase tracking-wider text-[11px]">
                                <span className="w-2 h-2 rounded-full bg-red-400" />
                                {item.hours}
                              </span>
                            ) : (
                              <span>{item.hours}</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="text-[11px] font-sans text-cream/55 italic mt-2 text-center">
                  {t.visit.afternoonNote}
                </p>
              </div>
            </div>

            {/* Tap-to-call, Email and Directions buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-gold/20">
              <a
                href="tel:9448628575"
                className="py-3 px-4 rounded-xl bg-gold-gradient hover:bg-gold-gradient-hover text-deep font-sans font-bold text-xs tracking-wider uppercase transition shadow-gold-glow flex items-center justify-center gap-2 text-center"
              >
                <FaPhoneAlt className="text-xs" />
                <span>{t.visit.callBtn}</span>
              </a>

              <a
                href="mailto:skjgvraikar@gmail.com"
                className="py-3 px-4 rounded-xl border border-gold/40 text-gold-light hover:bg-gold/15 font-sans font-semibold text-xs tracking-wider uppercase transition flex items-center justify-center gap-2 text-center"
              >
                <FaEnvelope className="text-xs" />
                <span>{t.visit.emailBtn}</span>
              </a>

              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-gold/15 border border-gold/50 text-gold-light hover:bg-gold/25 font-sans font-bold text-xs tracking-wider uppercase transition flex items-center justify-center gap-2 text-center"
              >
                <FaDirections className="text-sm text-gold" />
                <span>{t.visit.directionsBtn}</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Luxury Showroom Navigation Showcase (Zero Permission Popups) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 glass-gold-card p-6 sm:p-8 rounded-3xl border border-gold/30 flex flex-col justify-between relative overflow-hidden"
          >
            {/* Background subtle luxury glow */}
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between gap-3 mb-6 pb-5 border-b border-gold/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gold/20 text-gold border border-gold/40 flex items-center justify-center text-lg">
                    <FaCompass />
                  </div>
                  <div>
                    <span className="font-sans text-[11px] font-semibold text-gold uppercase tracking-wider block">
                      {isKn ? 'ಸ್ಥಳ ಮತ್ತು ಮಾರ್ಗದರ್ಶಿ' : 'SHOWROOM LOCATION & ROUTE GUIDE'}
                    </span>
                    <h4 className="font-cinzel text-lg font-bold text-cream">
                      {isKn ? 'ಸುಲಭವಾಗಿ ತಲುಪುವ ಮಾರ್ಗ' : 'How To Reach Our Showroom'}
                    </h4>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-gold-light text-[11px] font-sans font-medium">
                  <FaShieldAlt className="text-xs text-gold" />
                  <span>{isKn ? 'ನೇರ ಮಾರ್ಗ' : 'Direct Highway'}</span>
                </span>
              </div>

              {/* Showroom Route Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
                {LANDMARKS.map((lm, i) => {
                  const Icon = lm.icon;
                  return (
                    <div
                      key={i}
                      className="p-3.5 rounded-2xl bg-black/40 border border-gold/20 hover:border-gold/40 transition flex items-start gap-3"
                    >
                      <div className="p-2.5 rounded-xl bg-gold/10 text-gold border border-gold/25 flex-shrink-0 mt-0.5">
                        <Icon className="text-sm" />
                      </div>
                      <div>
                        <h5 className="font-sans text-xs font-bold text-cream">
                          {lm.title}
                        </h5>
                        <p className="font-sans text-[11px] text-cream/65 mt-0.5">
                          {lm.detail}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Highway & Sagar-Taluk Note */}
              <div className="p-4 rounded-2xl bg-gold/10 border border-gold/30 mb-6">
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-gold text-base flex-shrink-0 mt-0.5" />
                  <div className="text-xs font-sans">
                    <p className="font-semibold text-gold-pale mb-1">
                      {isKn
                        ? 'ಶ್ರೀ ಕಾಮಾಕ್ಷಿ ಜ್ಯುವೆಲ್ಲರಿ ವರ್ಕ್ಸ್ • ಬಿ.ಎಚ್. ರಸ್ತೆ, ತಾಳಗುಪ್ಪ'
                        : 'Shree Kamakshi Jewellery Works • B.H. Road, Talaguppa'}
                    </p>
                    <p className="text-cream/70 text-[11px] leading-relaxed">
                      {isKn
                        ? 'ಸಾಗರ ತಾಲೂಕು, ಶಿವಮೊಗ್ಗ ಜಿಲ್ಲೆ. ತಾಳಗುಪ್ಪದ ಮುಖ್ಯ ಬಿ.ಎಚ್. ರಸ್ತೆಯಲ್ಲಿ ಸುಲಭವಾಗಿ ಗುರುತಿಸಬಹುದಾದ ಪ್ರಮುಖ ಜ್ಯುವೆಲ್ಲರಿ ಮಳಿಗೆ.'
                        : 'Sagar Taluk, Shivamogga District – 577430. Situated right on the main B H Road with easy vehicle access and landmark visibility.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 1-Click Google Maps External Button (No Geolocation Permission Popups) */}
            <div className="space-y-2.5 pt-4 border-t border-gold/20">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-2xl bg-gold-gradient hover:bg-gold-gradient-hover text-deep font-sans font-bold text-xs tracking-wider uppercase transition shadow-gold-glow flex items-center justify-center gap-2.5 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <FaDirections className="text-base" />
                <span>
                  {isKn
                    ? 'ಗೂಗಲ್ ಮ್ಯಾಪ್ಸ್‌ನಲ್ಲಿ ದಾರಿ ಪಡೆಯಿರಿ'
                    : 'Open in Google Maps / Get Live Navigation'}
                </span>
                <FaExternalLinkAlt className="text-[10px] ml-1 opacity-75" />
              </a>

              <p className="font-sans text-[11px] text-center text-cream/50 flex items-center justify-center gap-1.5">
                <FaShieldAlt className="text-gold/70 text-xs" />
                <span>
                  {isKn
                    ? 'ಯಾವುದೇ ಅನಗತ್ಯ ಅನುಮತಿ ಕೇಳದೆ ನೇರವಾಗಿ ಗೂಗಲ್ ಮ್ಯಾಪ್ಸ್‌ನಲ್ಲಿ ತೆರೆಯುತ್ತದೆ'
                    : 'Opens Google Maps directly without intrusive location permission popups'}
                </span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default VisitUs;
