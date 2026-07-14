import { createContext, useContext, useState, useCallback } from 'react';
import api from '../services/api';
import { ENDPOINTS } from '../utils/constants';

const EstatisticaContext = createContext();

/**
 * Provider para gerenciar estatísticas globalmente
 */
export function EstatisticaProvider({ children }) {
  const [estatisticas, setEstatisticas] = useState({
    count: 0,
    sum: 0,
    avg: 0,
    min: 0,
    max: 0,
  });
  const [intervalo, setIntervalo] = useState(60); // padrão: 60 segundos
  const [historicoIntervalo, setHistoricoIntervalo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Buscar estatísticas
  const carregarEstatisticas = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get(ENDPOINTS.ESTATISTICA.GET);
      setEstatisticas(response.data);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
      console.error('Erro ao carregar estatísticas:', errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Buscar intervalo atual
  const carregarIntervalo = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get(ENDPOINTS.ESTATISTICA.INTERVALO);
      setIntervalo(response.data.intervaloSegundos);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
      console.error('Erro ao carregar intervalo:', errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Atualizar intervalo
  const atualizarIntervalo = useCallback(async (novoIntervalo) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.put(ENDPOINTS.ESTATISTICA.INTERVALO, {
        intervaloSegundos: novoIntervalo,
      });
      setIntervalo(response.data.intervaloSegundos);
      return response.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || 'Erro ao atualizar intervalo';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Buscar histórico de intervalos
  const carregarHistoricoIntervalo = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get(ENDPOINTS.ESTATISTICA.INTERVALO_HISTORICO);
      setHistoricoIntervalo(response.data || []);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
      console.error('Erro ao carregar histórico:', errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Recarregar tudo
  const recarregar = useCallback(async () => {
    try {
      await Promise.all([
        carregarEstatisticas(),
        carregarIntervalo(),
        carregarHistoricoIntervalo(),
      ]);
    } catch (err) {
      console.error('Erro ao recarregar estatísticas:', err);
    }
  }, [carregarEstatisticas, carregarIntervalo, carregarHistoricoIntervalo]);

  const value = {
    estatisticas,
    intervalo,
    historicoIntervalo,
    loading,
    error,
    carregarEstatisticas,
    carregarIntervalo,
    atualizarIntervalo,
    carregarHistoricoIntervalo,
    recarregar,
  };

  return (
    <EstatisticaContext.Provider value={value}>
      {children}
    </EstatisticaContext.Provider>
  );
}

/**
 * Hook para usar EstatisticaContext
 */
export function useEstatisticas() {
  const context = useContext(EstatisticaContext);
  if (!context) {
    throw new Error('useEstatisticas deve ser usado dentro de EstatisticaProvider');
  }
  return context;
}
