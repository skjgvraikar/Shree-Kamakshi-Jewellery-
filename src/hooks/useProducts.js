import { useState, useEffect, useCallback } from 'react';
import { fetchProducts } from '../api/products';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFallback, setIsFallback] = useState(false);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const result = await fetchProducts();
      setProducts(result.data);
      setIsFallback(result.isFallback);
      setError(null);
    } catch (err) {
      console.error('Failed to load products:', err);
      setError(err.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return {
    products,
    loading,
    error,
    isFallback,
    refetch: loadProducts,
  };
}

export default useProducts;

