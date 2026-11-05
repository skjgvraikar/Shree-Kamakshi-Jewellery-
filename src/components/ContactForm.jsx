import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaClock, FaCheckCircle, FaExclamationTriangle, FaPaperPlane } from 'react-icons/fa';
import SectionTitle from './SectionTitle';
import { submitEnquiry } from '../api/enquiries';
import { useLanguage } from '../context/LanguageContext';

export function ContactForm({ settings, prefillData }) {
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [errorMessage, setErrorMessage] = useState('');
  const lastSubmitTimeRef = useRef(0);
  const { t, isKn } = useLanguage();

  const ENQUIRY_TYPES = [
    { value: 'Gold Jewellery', label: t.contact.types.gold },
    { value: 'Silver Items', label: t.contact.types.silver },
    { value: 'Custom Design', label: t.contact.types.custom },
    { value: 'Exchange/Buyback', label: t.contact.types.exchange },
    { value: 'Price Enquiry', label: t.contact.types.price },
    { value: 'Other', label: t.contact.types.other },
  ];

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      type: 'Gold Jewellery',
      message: '',
      company_hp: '', // Honeypot
    },
  });

  const messageVal = watch('message', '');

  useEffect(() => {
    if (prefillData?.message) {
      setValue('message', prefillData.message);
      if (prefillData.category) {
        if (prefillData.category.toLowerCase().includes('silver')) {
          setValue('type', 'Silver Items');
        } else {
          setValue('type', 'Gold Jewellery');
        }
      }
    }
  }, [prefillData, setValue]);

  const onSubmit = async (data) => {
    if (data.company_hp) {
      console.warn('Bot detected via honeypot.');
      return;
    }

    const now = Date.now();
    if (now - lastSubmitTimeRef.current < 5000) {
      setErrorMessage(isKn ? 'ದಯವಿಟ್ಟು ಸ್ವಲ್ಪ ಸಮಯ ಕಾಯಿರಿ.' : 'Please wait a few moments before submitting again.');
      setSubmitStatus('error');
      return;
    }
    lastSubmitTimeRef.current = now;

    setSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');

    const payload = {
      name: data.name.trim(),
      phone: data.phone.trim(),
      email: data.email?.trim() || '',
      type: data.type,
      message: data.message.trim(),
      createdAt: new Date().toISOString(),
    };

    try {
      await submitEnquiry(payload);
      setSubmitStatus('success');
      reset();
    } catch (err) {
      console.error('Submission failed, triggering WhatsApp fallback:', err);
      setSubmitStatus('error');
      setErrorMessage(
        isKn
          ? 'ಸರ್ವರ್ ಸಂಪರ್ಕ ಸಾಧ್ಯವಾಗಿಲ್ಲ. ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ವಾಟ್ಸಾಪ್ ಮೂಲಕ ನೇರವಾಗಿ ನಮ್ಮ ಅಕ್ಕಸಾಲಿಗರಿಗೆ ಕಳುಹಿಸಬಹುದು.'
          : 'Unable to reach server. You can immediately send this enquiry to our goldsmith directly on WhatsApp.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleWhatsAppFallback = () => {
    const currentName = watch('name') || 'Valued Customer';
    const currentPhone = watch('phone') || '';
    const currentType = watch('type') || 'Jewellery Enquiry';
    const currentMsg = watch('message') || '';

    const text = encodeURIComponent(
      `*New Jewellery Enquiry*\nName: ${currentName}\nPhone: ${currentPhone}\nCategory: ${currentType}\nMessage: ${currentMsg}`
    );
    window.open(`https://wa.me/919448628575?text=${text}`, '_blank');
  };

  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('B H Road, Talaguppa 577430 Karnataka')}`;

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative font-sans">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title={t.contact.title}
          subtitle={t.contact.subtitle}
          eyebrow={t.contact.eyebrow}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Enquiry Form (order-1 on mobile) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:col-span-7 glass-gold-card p-6 sm:p-9 rounded-3xl border border-gold/35 shadow-2xl relative"
          >
            <div className="mb-6">
              <span className="font-sans text-[11px] font-semibold text-gold uppercase tracking-wider block mb-1">
                {t.contact.directConsultation}
              </span>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-cream">
                {t.contact.formTitle}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-cream/70 mt-1">
                {t.contact.formSubtitle}
              </p>
            </div>

            {/* Live Region for Status Messages */}
            <div aria-live="polite" className="mb-4">
              <AnimatePresence>
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    className="p-4 sm:p-5 rounded-2xl bg-emerald-950/60 border border-emerald-500/60 text-emerald-300 flex items-center gap-3.5 mb-4 shadow-lg"
                  >
                    <FaCheckCircle className="text-2xl text-emerald-400 flex-shrink-0" />
                    <div>
                      <h4 className="font-sans text-xs sm:text-sm font-bold text-emerald-200">
                        {t.contact.thankYouTitle}
                      </h4>
                      <p className="font-sans text-xs text-emerald-300/80 mt-0.5">
                        {t.contact.thankYouDesc}
                      </p>
                    </div>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    className="p-4 sm:p-5 rounded-2xl bg-amber-950/70 border border-amber-500/60 text-amber-200 mb-4 shadow-lg"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <FaExclamationTriangle className="text-lg text-amber-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-sans text-xs sm:text-sm font-bold text-amber-100">
                          {isKn ? 'ಸಂಪರ್ಕ ಸೂಚನೆ' : 'Connection Notice'}
                        </h4>
                        <p className="font-sans text-xs text-amber-200/90 mt-0.5">
                          {errorMessage}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleWhatsAppFallback}
                      className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-cream font-sans font-bold text-xs tracking-wider uppercase transition flex items-center justify-center gap-2 shadow-md cursor-pointer"
                    >
                      <FaWhatsapp className="text-sm" />
                      <span>{t.contact.whatsappFallback}</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
              {/* Hidden Honeypot Field */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="company_hp">Do not fill this field</label>
                <input
                  id="company_hp"
                  type="text"
                  tabIndex="-1"
                  autoComplete="off"
                  {...register('company_hp')}
                />
              </div>

              {/* Full Name */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="block font-sans text-xs font-semibold text-gold-pale mb-1 uppercase tracking-wider"
                >
                  {t.contact.fullName} <span className="text-red-400">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder={isKn ? 'ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರನ್ನು ನಮೂದಿಸಿ' : 'Enter your full name'}
                  className={`w-full bg-white text-stone-900 font-medium border rounded-xl py-2.5 px-4 font-sans text-sm placeholder:text-stone-400 focus:outline-none transition shadow-sm ${
                    errors.name ? 'border-red-500 ring-2 ring-red-500/20' : 'border-stone-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20'
                  }`}
                  {...register('name', {
                    required: isKn ? 'ದಯವಿಟ್ಟು ಹೆಸರು ನಮೂದಿಸಿ' : 'Full name is required',
                    minLength: { value: 2, message: isKn ? 'ಹೆಸರು ಕನಿಷ್ಠ 2 ಅಕ್ಷರಗಳಿರಬೇಕು' : 'Name must be at least 2 characters' },
                  })}
                  aria-invalid={errors.name ? 'true' : 'false'}
                />
                {errors.name && (
                  <p className="text-red-400 text-xs font-sans mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Phone & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone */}
                <div>
                  <label
                    htmlFor="contact-phone"
                    className="block font-sans text-xs font-semibold text-gold-pale mb-1 uppercase tracking-wider"
                  >
                    {t.contact.phone} <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    placeholder={isKn ? '10 ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ' : '10-digit mobile number'}
                    className={`w-full bg-white text-stone-900 font-medium border rounded-xl py-2.5 px-4 font-sans text-sm placeholder:text-stone-400 focus:outline-none transition shadow-sm ${
                      errors.phone ? 'border-red-500 ring-2 ring-red-500/20' : 'border-stone-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20'
                    }`}
                    {...register('phone', {
                      required: isKn ? 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ಅಗತ್ಯವಿದೆ' : 'Phone number is required',
                      pattern: {
                        value: /^[6-9]\d{9}$/,
                        message: isKn ? 'ಸರಿಯಾದ 10 ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ' : 'Enter a valid 10-digit Indian mobile number',
                      },
                    })}
                    aria-invalid={errors.phone ? 'true' : 'false'}
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-xs font-sans mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Email (Optional) */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block font-sans text-xs font-semibold text-gold-pale mb-1 uppercase tracking-wider"
                  >
                    {t.contact.email} <span className="text-cream/40 text-[10px]">{t.contact.optional}</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="your.email@gmail.com"
                    className={`w-full bg-white text-stone-900 font-medium border rounded-xl py-2.5 px-4 font-sans text-sm placeholder:text-stone-400 focus:outline-none transition shadow-sm ${
                      errors.email ? 'border-red-500 ring-2 ring-red-500/20' : 'border-stone-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20'
                    }`}
                    {...register('email', {
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: isKn ? 'ಸರಿಯಾದ ಇಮೇಲ್ ವಿಳಾಸ ನಮೂದಿಸಿ' : 'Enter a valid email address',
                      },
                    })}
                    aria-invalid={errors.email ? 'true' : 'false'}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs font-sans mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Enquiry Type Dropdown */}
              <div>
                <label
                  htmlFor="contact-type"
                  className="block font-sans text-xs font-semibold text-gold-pale mb-1 uppercase tracking-wider"
                >
                  {t.contact.enquiryType}
                </label>
                <select
                  id="contact-type"
                  className="w-full bg-white text-stone-900 font-medium border border-stone-300 rounded-xl py-2.5 px-4 font-sans text-sm focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 transition cursor-pointer shadow-sm"
                  {...register('type')}
                >
                  {ENQUIRY_TYPES.map((item) => (
                    <option key={item.value} value={item.value} className="bg-white text-stone-900 font-medium py-1">
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label
                    htmlFor="contact-message"
                    className="block font-sans text-xs font-semibold text-gold-pale uppercase tracking-wider"
                  >
                    {t.contact.message} <span className="text-red-400">*</span>
                  </label>
                  <span
                    className={`text-xs font-sans ${
                      (messageVal?.length || 0) > 480 ? 'text-amber-400' : 'text-cream/55'
                    }`}
                  >
                    {messageVal?.length || 0} / 500 characters
                  </span>
                </div>
                <textarea
                  id="contact-message"
                  rows="4"
                  maxLength={500}
                  placeholder={isKn ? 'ವಿನ್ಯಾಸ, ಸಂದರ್ಭ, ಸಮಯ ಅಥವಾ ನೀವು ಕೇಳಬಯಸುವ ವಿವರಗಳನ್ನು ಬರೆಯಿರಿ...' : 'Tell us about the design, occasion, preferred timing, or questions you have...'}
                  className={`w-full bg-white text-stone-900 font-medium border rounded-xl py-2.5 px-4 font-sans text-sm placeholder:text-stone-400 focus:outline-none transition resize-none shadow-sm ${
                    errors.message ? 'border-red-500 ring-2 ring-red-500/20' : 'border-stone-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20'
                  }`}
                  {...register('message', {
                    required: isKn ? 'ದಯವಿಟ್ಟು ಸಂದೇಶ ನಮೂದಿಸಿ' : 'Please write a brief message',
                    maxLength: { value: 500, message: isKn ? 'ಸಂದೇಶ 500 ಅಕ್ಷರಗಳನ್ನು ಮೀರಬಾರದು' : 'Message must not exceed 500 characters' },
                  })}
                  aria-invalid={errors.message ? 'true' : 'false'}
                />
                {errors.message && (
                  <p className="text-red-400 text-xs font-sans mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-xl bg-gold-gradient hover:bg-gold-gradient-hover text-deep font-sans font-bold text-xs tracking-wider uppercase transition-all duration-300 shadow-gold-glow flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                {submitting ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-deep border-t-transparent rounded-full animate-spin" />
                    <span>{t.contact.submittingBtn}</span>
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="text-xs" />
                    <span>{t.contact.sendBtn}</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Right Column: Contact Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="order-2 lg:col-span-5 flex flex-col gap-6"
          >
            <div className="glass-gold-card p-6 sm:p-8 rounded-3xl border border-gold/30 flex flex-col justify-between">
              <div>
                <span className="font-sans text-[11px] font-semibold text-gold uppercase tracking-wider block mb-1">
                  {t.contact.directLine}
                </span>
                <h3 className="font-cinzel text-xl font-bold text-cream mb-6">
                  {t.contact.contactInfo}
                </h3>

                <div className="space-y-5">
                  {/* Phone */}
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-gold/15 text-gold text-base border border-gold/30 mt-1 flex-shrink-0">
                      <FaPhoneAlt />
                    </div>
                    <div>
                      <h4 className="font-sans text-xs text-gold uppercase tracking-wider font-semibold">
                        {isKn ? 'ಕರೆ ಮಾಡಿ (ಟ್ಯಾಪ್ ಮಾಡಿ)' : 'Call Us (Tap to call)'}
                      </h4>
                      <div className="flex flex-col gap-0.5 mt-1 font-sans text-base text-cream font-medium">
                        <a
                          href="tel:9448628575"
                          className="hover:text-gold-light transition flex items-center gap-2"
                        >
                          <span>9448628575</span>
                          <span className="text-[11px] text-gold font-sans font-normal">{t.contact.primaryPhone}</span>
                        </a>
                        <a
                          href="tel:8660419854"
                          className="hover:text-gold-light transition flex items-center gap-2"
                        >
                          <span>8660419854</span>
                          <span className="text-[11px] text-gold font-sans font-normal">{t.contact.showroomPhone}</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-gold/15 text-gold text-base border border-gold/30 mt-1 flex-shrink-0">
                      <FaEnvelope />
                    </div>
                    <div>
                      <h4 className="font-sans text-xs text-gold uppercase tracking-wider font-semibold">
                        {isKn ? 'ಇಮೇಲ್ ಮಾಡಿ' : 'Email Us'}
                      </h4>
                      <a
                        href="mailto:skjgvraikar@gmail.com"
                        className="font-sans text-sm text-cream hover:text-gold-light transition break-all mt-1 block"
                      >
                        skjgvraikar@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-gold/15 text-gold text-base border border-gold/30 mt-1 flex-shrink-0">
                      <FaMapMarkerAlt />
                    </div>
                    <div>
                      <h4 className="font-sans text-xs text-gold uppercase tracking-wider font-semibold">
                        {isKn ? 'ಸ್ಥಳ' : 'Location'}
                      </h4>
                      <p className="font-sans text-sm text-cream mt-1">
                        {isKn ? 'ಬಿ.ಎಚ್. ರಸ್ತೆ, ತಾಳಗುಪ್ಪ – 577430' : 'B H Road, Talaguppa – 577430'}
                      </p>
                      <p className="font-sans text-xs text-cream/60">
                        {isKn ? 'ಶಿವಮೊಗ್ಗ ಜಿಲ್ಲೆ, ಕರ್ನಾಟಕ' : 'Shivamogga District, Karnataka'}
                      </p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-gold/15 text-gold text-base border border-gold/30 mt-1 flex-shrink-0">
                      <FaClock />
                    </div>
                    <div>
                      <h4 className="font-sans text-xs text-gold uppercase tracking-wider font-semibold">
                        {isKn ? 'ಮಳಿಗೆಯ ಸಮಯ' : 'Showroom Hours'}
                      </h4>
                      <p className="font-sans text-xs sm:text-sm text-cream mt-1">
                        10:00 AM – 2:30 PM & 4:00 PM – 9:30 PM
                      </p>
                      <p className="font-sans text-xs text-red-300 mt-0.5 font-medium">
                        {isKn ? 'ಭಾನುವಾರ ರಜೆ (ಮುಚ್ಚಿರುತ್ತದೆ)' : 'Sunday Holiday (Closed)'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2.5 mt-8 pt-5 border-t border-gold/20">
                <a
                  href="tel:9448628575"
                  className="py-3 px-4 rounded-xl bg-gold-gradient hover:bg-gold-gradient-hover text-deep font-sans font-bold text-xs tracking-wider uppercase transition shadow-gold-glow flex items-center justify-center gap-2 text-center"
                >
                  <FaPhoneAlt />
                  <span>{t.contact.callNowBtn}</span>
                </a>

                <a
                  href="https://wa.me/919448628575"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-cream font-sans font-bold text-xs tracking-wider uppercase transition flex items-center justify-center gap-2 text-center"
                >
                  <FaWhatsapp className="text-sm" />
                  <span>{t.contact.whatsappBtn}</span>
                </a>

                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl border border-gold/40 text-gold-light hover:bg-gold/15 font-sans font-semibold text-xs tracking-wider uppercase transition flex items-center justify-center gap-2 text-center"
                >
                  <FaMapMarkerAlt />
                  <span>{t.contact.directionsBtn}</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;
