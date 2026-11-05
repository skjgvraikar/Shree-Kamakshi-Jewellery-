import { useState, useEffect, useCallback } from 'react';
import { fetchCategories } from '../api/categories';

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFallback, setIsFallback] = useState(false);

  const loadCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, isFallback: fallback } = await fetchCategories();
      setCategories(data);
      setIsFallback(fallback);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return {
    categories,
    loading,
    error,
    isFallback,
    refresh: loadCategories,
  };
}

export default useCategories;

