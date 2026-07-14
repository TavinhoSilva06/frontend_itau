import { useState, useCallback } from 'react';
import api from '../services/api';

/**
 * Hook genérico para chamadas de API
 * @param {Function} apiCall - Função que faz a chamada à API
 * @param {Object} options - Opções adicionais { onSuccess, onError }
 * @returns {Object} { data, loading, error, execute, refetch }
 */
export const useApiCall = (apiCall, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (...args) => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiCall(...args);
        setData(result);
        options.onSuccess?.(result);
        return result;
      } catch (err) {
        const errorMessage =
          err.response?.data?.message ||
          err.message ||
          'Erro na requisição';
        setError(errorMessage);
        options.onError?.(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [apiCall, options]
  );

  const refetch = useCallback(() => {
    return execute();
  }, [execute]);

  return { data, loading, error, execute, refetch };
};

/**
 * Hook para fetch inicial + refetch manual
 * @param {Function} apiCall - Função que faz a chamada à API
 * @returns {Object} { data, loading, error, refetch }
 */
export const useFetch = (apiCall) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall();
      setData(result);
      return result;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        'Erro ao carregar dados';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiCall]);

  // Fetch inicial
  useCallback(() => {
    refetch();
  }, [refetch])();

  return { data, loading, error, refetch };
};
