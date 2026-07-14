// API Base URL
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// Endpoints
export const ENDPOINTS = {
  TRANSACAO: {
    CRIAR: '/transacao/criar',
    LIMPAR: '/transacao',
  },
  ESTATISTICA: {
    GET: '/estatistica',
    INTERVALO: '/estatistica/intervalo',
    INTERVALO_HISTORICO: '/estatistica/intervalo/historico',
  },
};

// Validação
export const VALIDATIONS = {
  VALOR_MINIMO: 0,
  INTERVALO_MINIMO: 1,
  INTERVALO_MAXIMO: 86400, // 24 horas em segundos
};

// Mensagens
export const MESSAGES = {
  SUCESSO: {
    TRANSACAO_CRIADA: 'Transação criada com sucesso!',
    INTERVALO_ATUALIZADO: 'Intervalo atualizado com sucesso!',
    TRANSACOES_LIMPAS: 'Todas as transações foram removidas!',
  },
  ERRO: {
    VALOR_INVALIDO: 'Valor deve ser maior ou igual a 0',
    DATA_INVALIDA: 'Data não pode ser futura',
    DATA_FORA_INTERVALO: 'Data está fora do intervalo permitido',
    INTERVALO_INVALIDO: 'Intervalo deve estar entre 1 segundo e 24 horas',
    ERRO_TRANSACAO: 'Erro ao processar transação',
    ERRO_ESTATISTICA: 'Erro ao carregar estatísticas',
    ERRO_CONFIGURACAO: 'Erro ao atualizar configuração',
    ERRO_GENERICO: 'Algo deu errado. Tente novamente!',
  },
};

// Paginação
export const PAGINATION = {
  ITEMS_PER_PAGE: 10,
};

// Timeouts
export const TIMEOUTS = {
  API_CALL: 30000, // 30 segundos
  AUTO_REFRESH: 10000, // 10 segundos
};
