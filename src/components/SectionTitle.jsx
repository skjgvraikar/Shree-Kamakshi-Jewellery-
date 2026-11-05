import React from 'react';
import { motion } from 'framer-motion';

export function SectionTitle({ title, subtitle, eyebrow = 'Shree Kamakshi Jewellery Works', center = true }) {
  return (
    <div className={`mb-12 ${center ? 'text-center' : 'text-left'}`}>
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 mb-2.5"
        >
          <span className="h-[1px] w-6 bg-gold/50" />
          <span className="text-gold text-[11px] font-sans font-semibold tracking-[0.25em] uppercase">
            {eyebrow}
          </span>
          <span className="h-[1px] w-6 bg-gold/50" />
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="font-cinzel font-semibold text-cream tracking-[0.04em] gold-text-gradient drop-shadow-sm"
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-cream/75 font-sans text-sm sm:text-base mt-2.5 max-w-2xl mx-auto leading-relaxed font-normal"
        >
          {subtitle}
        </motion.p>
      )}

      <div className="flex items-center justify-center gap-2 mt-4">
        <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gold/40" />
        <span className="w-1.5 h-1.5 rounded-full bg-gold/70" />
        <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-gold/40" />
      </div>
    </div>
  );
}

export default SectionTitle;
