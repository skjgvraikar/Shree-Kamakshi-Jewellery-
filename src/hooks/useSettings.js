import { useState, useEffect, useCallback } from 'react';
import { fetchSettings } from '../api/settings';

export function useSettings() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFallback, setIsFallback] = useState(false);

  const loadSettings = useCallback(async () => {
    setLoading(true);
    try {
      const result = await fetchSettings();
      setSettings(result.data);
      setIsFallback(result.isFallback);
      setError(null);
    } catch (err) {
      console.error('Failed to load settings:', err);
      setError(err.message || 'Failed to load shop settings');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  return {
    settings,
    loading,
    error,
    isFallback,
    refetch: loadSettings,
  };
}

export default useSettings;

