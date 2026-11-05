import { useState, useEffect } from 'react';

/**
 * Hook to determine if Shree Kamakshi Jewellery Works is currently open.
 * Hours:
 * - Monday to Saturday: 10:00 AM – 2:30 PM and 4:00 PM – 9:30 PM
 * - Sunday: Holiday (Closed all day)
 * - Closed between 2:30 PM – 4:00 PM
 * Updates every minute.
 */
export function useOpenStatus() {
  const [status, setStatus] = useState(() => calculateOpenStatus());

  useEffect(() => {
    const update = () => {
      setStatus(calculateOpenStatus());
    };

    update();
    const interval = setInterval(update, 60000); // re-check every minute

    return () => clearInterval(interval);
  }, []);

  return status;
}

function calculateOpenStatus() {
  const now = new Date();
  const day = now.getDay(); // 0 is Sunday, 1 is Monday, ..., 6 is Saturday
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentTotalMinutes = hours * 60 + minutes;

  // Time boundaries in minutes from midnight
  const MORNING_OPEN = 10 * 60;          // 10:00 AM -> 600 mins
  const MORNING_CLOSE = 14 * 60 + 30;    // 02:30 PM -> 870 mins
  const EVENING_OPEN = 16 * 60;          // 04:00 PM -> 960 mins
  const EVENING_CLOSE = 21 * 60 + 30;    // 09:30 PM -> 1290 mins

  // Sunday is holiday
  if (day === 0) {
    return {
      isOpen: false,
      statusText: 'Closed Today (Sunday Holiday)',
      badgeText: 'Closed Now',
      subText: 'Reopens Monday at 10:00 AM',
      colorClass: 'text-amber-400 border-amber-500/40 bg-amber-950/40',
      dotClass: 'bg-red-500',
    };
  }

  // Morning session: 10:00 AM to 2:30 PM
  if (currentTotalMinutes >= MORNING_OPEN && currentTotalMinutes < MORNING_CLOSE) {
    const minutesLeft = MORNING_CLOSE - currentTotalMinutes;
    return {
      isOpen: true,
      statusText: 'Open Now (Morning Session)',
      badgeText: 'Open Now',
      subText: minutesLeft <= 30 ? `Closes for afternoon break in ${minutesLeft} mins` : 'Open until 2:30 PM',
      colorClass: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/40',
      dotClass: 'bg-emerald-400 animate-pulse',
    };
  }

  // Afternoon break: 2:30 PM to 4:00 PM
  if (currentTotalMinutes >= MORNING_CLOSE && currentTotalMinutes < EVENING_OPEN) {
    const minutesToEvening = EVENING_OPEN - currentTotalMinutes;
    return {
      isOpen: false,
      statusText: 'Closed (Afternoon Break)',
      badgeText: 'Closed Now',
      subText: `Reopens at 4:00 PM (in ${minutesToEvening} mins)`,
      colorClass: 'text-amber-400 border-amber-500/40 bg-amber-950/40',
      dotClass: 'bg-amber-400',
    };
  }

  // Evening session: 4:00 PM to 9:30 PM
  if (currentTotalMinutes >= EVENING_OPEN && currentTotalMinutes < EVENING_CLOSE) {
    const minutesLeft = EVENING_CLOSE - currentTotalMinutes;
    return {
      isOpen: true,
      statusText: 'Open Now (Evening Session)',
      badgeText: 'Open Now',
      subText: minutesLeft <= 30 ? `Closes for today in ${minutesLeft} mins` : 'Open until 9:30 PM',
      colorClass: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/40',
      dotClass: 'bg-emerald-400 animate-pulse',
    };
  }

  // Before 10:00 AM
  if (currentTotalMinutes < MORNING_OPEN) {
    return {
      isOpen: false,
      statusText: 'Closed Now',
      badgeText: 'Closed Now',
      subText: 'Opens today at 10:00 AM',
      colorClass: 'text-amber-400 border-amber-500/40 bg-amber-950/40',
      dotClass: 'bg-red-500',
    };
  }

  // After 9:30 PM
  const nextOpenDay = day === 6 ? 'Monday' : 'tomorrow';
  return {
    isOpen: false,
    statusText: 'Closed for the Night',
    badgeText: 'Closed Now',
    subText: `Reopens ${nextOpenDay} at 10:00 AM`,
    colorClass: 'text-amber-400 border-amber-500/40 bg-amber-950/40',
    dotClass: 'bg-red-500',
  };
}

export default useOpenStatus;

