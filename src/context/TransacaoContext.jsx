import { createContext, useContext, useState, useCallback } from 'react';
import api from '../services/api';
import { ENDPOINTS } from '../utils/constants';

const TransacaoContext = createContext();

/**
 * Provider para gerenciar transações globalmente
 */
export function TransacaoProvider({ children }) {
  const [transacoes, setTransacoes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Buscar todas as transações
  const carregarTransacoes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      // Nota: Backend não tem endpoint GET /transacao, então retornamos array vazio
      // Isso será atualizado quando o backend tiver esse endpoint
      setTransacoes([]);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
      console.error('Erro ao carregar transações:', errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Criar nova transação
  const criarTransacao = useCallback(async (transacao) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post(ENDPOINTS.TRANSACAO.CRIAR, transacao);
      
      // Adicionar à lista local
      setTransacoes((prev) => [response.data, ...prev]);
      
      return response.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || 'Erro ao criar transação';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Limpar todas as transações
  const limparTransacoes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      await api.delete(ENDPOINTS.TRANSACAO.LIMPAR);
      setTransacoes([]);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || 'Erro ao limpar transações';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Recarregar manualmente
  const recarregar = useCallback(() => {
    return carregarTransacoes();
  }, [carregarTransacoes]);

  const value = {
    transacoes,
    loading,
    error,
    criarTransacao,
    limparTransacoes,
    recarregar,
  };

  return (
    <TransacaoContext.Provider value={value}>
      {children}
    </TransacaoContext.Provider>
  );
}

/**
 * Hook para usar TransacaoContext
 */
export function useTransacoes() {
  const context = useContext(TransacaoContext);
  if (!context) {
    throw new Error('useTransacoes deve ser usado dentro de TransacaoProvider');
  }
  return context;
}
