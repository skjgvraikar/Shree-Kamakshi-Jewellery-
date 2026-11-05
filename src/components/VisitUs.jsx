import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaDirections, FaClock } from 'react-icons/fa';
import SectionTitle from './SectionTitle';
import OpenNowBadge from './OpenNowBadge';
import { useLanguage } from '../context/LanguageContext';

export function VisitUs({ settings }) {
  const { t, isKn } = useLanguage();
  const addressText = isKn ? 'ಬಿ.ಎಚ್. ರಸ್ತೆ, ತಾಳಗುಪ್ಪ – 577430' : (settings?.address?.full || 'B H Road, Talaguppa – 577430');
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('B H Road, Talaguppa 577430 Karnataka')}`;

  const WEEKDAY_SCHEDULE = [
    { day: isKn ? 'ಸೋಮವಾರ' : 'Monday', hours: isKn ? 'ಬೆಳಗ್ಗೆ 10:00 – ಮಧ್ಯಾಹ್ನ 2:30 ಮತ್ತು ಸಂಜೆ 4:00 – ರಾತ್ರಿ 9:30' : '10:00 AM – 2:30 PM & 4:00 PM – 9:30 PM', isHoliday: false },
    { day: isKn ? 'ಮಂಗಳವಾರ' : 'Tuesday', hours: isKn ? 'ಬೆಳಗ್ಗೆ 10:00 – ಮಧ್ಯಾಹ್ನ 2:30 ಮತ್ತು ಸಂಜೆ 4:00 – ರಾತ್ರಿ 9:30' : '10:00 AM – 2:30 PM & 4:00 PM – 9:30 PM', isHoliday: false },
    { day: isKn ? 'ಬುಧವಾರ' : 'Wednesday', hours: isKn ? 'ಬೆಳಗ್ಗೆ 10:00 – ಮಧ್ಯಾಹ್ನ 2:30 ಮತ್ತು ಸಂಜೆ 4:00 – ರಾತ್ರಿ 9:30' : '10:00 AM – 2:30 PM & 4:00 PM – 9:30 PM', isHoliday: false },
    { day: isKn ? 'ಗುರುವಾರ' : 'Thursday', hours: isKn ? 'ಬೆಳಗ್ಗೆ 10:00 – ಮಧ್ಯಾಹ್ನ 2:30 ಮತ್ತು ಸಂಜೆ 4:00 – ರಾತ್ರಿ 9:30' : '10:00 AM – 2:30 PM & 4:00 PM – 9:30 PM', isHoliday: false },
    { day: isKn ? 'ಶುಕ್ರವಾರ' : 'Friday', hours: isKn ? 'ಬೆಳಗ್ಗೆ 10:00 – ಮಧ್ಯಾಹ್ನ 2:30 ಮತ್ತು ಸಂಜೆ 4:00 – ರಾತ್ರಿ 9:30' : '10:00 AM – 2:30 PM & 4:00 PM – 9:30 PM', isHoliday: false },
    { day: isKn ? 'ಶನಿವಾರ' : 'Saturday', hours: isKn ? 'ಬೆಳಗ್ಗೆ 10:00 – ಮಧ್ಯಾಹ್ನ 2:30 ಮತ್ತು ಸಂಜೆ 4:00 – ರಾತ್ರಿ 9:30' : '10:00 AM – 2:30 PM & 4:00 PM – 9:30 PM', isHoliday: false },
    { day: isKn ? 'ಭಾನುವಾರ' : 'Sunday', hours: isKn ? 'ವಾರದ ರಜೆ (ದಿನಪೂರ್ತಿ ಮುಚ್ಚಿರುತ್ತದೆ)' : 'Weekly Holiday (Closed all day)', isHoliday: true },
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

          {/* Right Column: Embedded Google Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 glass-gold-card rounded-3xl border border-gold/30 overflow-hidden flex flex-col justify-between"
          >
            <div className="relative w-full h-[360px] sm:h-[420px] bg-black/60">
              <iframe
                title="Google Map - Shree Kamakshi Jewellery Works, Talaguppa"
                src="https://maps.google.com/maps?q=B+H+Road,+Talaguppa+577430&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 filter contrast-105"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Map floating banner */}
              <div className="absolute top-4 left-4 right-4 bg-deep/92 backdrop-blur-md p-3.5 rounded-xl border border-gold/40 shadow-lg flex items-center justify-between">
                <div>
                  <h5 className="font-sans text-xs font-bold text-cream">
                    {isKn ? 'ಬಿ.ಎಚ್. ರಸ್ತೆ, ತಾಳಗುಪ್ಪ – 577430' : 'B H Road, Talaguppa – 577430'}
                  </h5>
                  <p className="font-sans text-[11px] text-gold-light">
                    {isKn ? 'ಮುಖ್ಯ ಬಿ.ಎಚ್. ರಸ್ತೆಯಲ್ಲಿ ಸುಲಭವಾಗಿ ತಲುಪಬಹುದು' : 'Prominently located on main B H Road highway'}
                  </p>
                </div>
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 rounded-lg bg-gold-gradient text-deep font-sans text-[10px] font-bold uppercase tracking-wider hover:brightness-110 transition shadow-sm"
                >
                  {t.visit.navigateMap}
                </a>
              </div>
            </div>

            <div className="p-4 bg-black/50 border-t border-gold/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-sans text-cream/70">
              <span>{t.visit.busStandText}</span>
              <span className="text-gold font-medium">{t.visit.parkingText}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default VisitUs;
