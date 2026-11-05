import React from 'react';
import useOpenStatus from '../hooks/useOpenStatus';
import { useLanguage } from '../context/LanguageContext';

export function OpenNowBadge({ showDetails = false, className = '' }) {
  const { isOpen, badgeText, subText, dotClass, colorClass } = useOpenStatus();
  const { isKn } = useLanguage();

  const displayBadgeText = isKn ? (isOpen ? 'ಈಗ ತೆರೆದಿದೆ' : 'ಈಗ ಮುಚ್ಚಲಾಗಿದೆ') : badgeText;

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-sans font-medium tracking-wide backdrop-blur-md shadow-sm transition-all duration-300 ${colorClass} ${className}`}
      role="status"
      aria-live="polite"
      title={subText}
    >
      <span className={`w-2 h-2 rounded-full ${dotClass}`} aria-hidden="true" />
      <span className="font-semibold">{displayBadgeText}</span>
      {showDetails && subText && (
        <span className="hidden sm:inline-block text-[11px] opacity-75 pl-1 border-l border-current/30 font-normal">
          {subText}
        </span>
      )}
    </div>
  );
}

export default OpenNowBadge;
