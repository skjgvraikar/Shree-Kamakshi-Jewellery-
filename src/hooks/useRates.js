import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchRates } from '../api/rates';

const FIVE_MINUTES = 5 * 60 * 1000;

export function useRates() {
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFallback, setIsFallback] = useState(false);
  const [lastRefreshedAt, setLastRefreshedAt] = useState(null);
  const lastGoodRatesRef = useRef(null);

  const loadRates = useCallback(async (isInitial = false) => {
    if (isInitial) setLoading(true);
    try {
      const result = await fetchRates();
      setRates(result.data);
      lastGoodRatesRef.current = result.data;
      setIsFallback(result.isFallback);
      setError(null);
      setLastRefreshedAt(new Date());
    } catch (err) {
      console.error('Failed to load rates:', err);
      // Keep last good value on failure
      if (lastGoodRatesRef.current) {
        setRates(lastGoodRatesRef.current);
        setError('Displaying cached rates due to connection issue.');
      } else {
        setError('Unable to fetch rates. Showing standard reference.');
      }
      setIsFallback(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRates(true);

    const interval = setInterval(() => {
      loadRates(false);
    }, FIVE_MINUTES);

    return () => clearInterval(interval);
  }, [loadRates]);

  return {
    rates,
    loading,
    error,
    isFallback,
    lastRefreshedAt,
    refetch: () => loadRates(false),
  };
}

export default useRates;

