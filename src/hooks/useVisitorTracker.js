import { useEffect } from 'react';
import { trackVisit } from '../api/analytics';

export function useVisitorTracker() {
  useEffect(() => {
    // Track once per browser session
    const sessionKey = 'skj_visited_' + new Date().toISOString().slice(0, 10);
    if (!sessionStorage.getItem(sessionKey)) {
      trackVisit({
        referrer: document.referrer || 'Direct Visit',
        screen: `${window.innerWidth}x${window.innerHeight}`,
      }).then(() => {
        sessionStorage.setItem(sessionKey, 'true');
      }).catch(() => {});
    }
  }, []);
}

export default useVisitorTracker;

