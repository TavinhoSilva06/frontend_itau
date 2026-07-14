import { VALIDATIONS, MESSAGES } from './constants';

/**
 * Valida um valor de transação
 * @param {number} valor - Valor a validar
 * @returns {Object} { isValid: boolean, error?: string }
 */
export const validateValor = (valor) => {
  if (valor === null || valor === undefined || valor === '') {
    return { isValid: false, error: 'Valor é obrigatório' };
  }

  const numValor = parseFloat(valor);

  if (isNaN(numValor)) {
    return { isValid: false, error: 'Valor deve ser um número' };
  }

  if (numValor < VALIDATIONS.VALOR_MINIMO) {
    return { isValid: false, error: MESSAGES.ERRO.VALOR_INVALIDO };
  }

  return { isValid: true };
};

/**
 * Valida uma data de transação
 * @param {string} dataHora - Data em formato ISO (2026-07-09T14:30)
 * @returns {Object} { isValid: boolean, error?: string }
 */
export const validateData = (dataHora) => {
  if (!dataHora) {
    return { isValid: false, error: 'Data e hora são obrigatórias' };
  }

  const data = new Date(dataHora);

  if (isNaN(data.getTime())) {
    return { isValid: false, error: 'Data inválida' };
  }

  const agora = new Date();
  if (data > agora) {
    return { isValid: false, error: MESSAGES.ERRO.DATA_INVALIDA };
  }

  return { isValid: true };
};

/**
 * Valida um intervalo de estatísticas (em segundos)
 * @param {number} intervalo - Intervalo em segundos
 * @returns {Object} { isValid: boolean, error?: string }
 */
export const validateIntervalo = (intervalo) => {
  if (intervalo === null || intervalo === undefined || intervalo === '') {
    return { isValid: false, error: 'Intervalo é obrigatório' };
  }

  const numIntervalo = parseInt(intervalo, 10);

  if (isNaN(numIntervalo)) {
    return { isValid: false, error: 'Intervalo deve ser um número' };
  }

  if (
    numIntervalo < VALIDATIONS.INTERVALO_MINIMO ||
    numIntervalo > VALIDATIONS.INTERVALO_MAXIMO
  ) {
    return { isValid: false, error: MESSAGES.ERRO.INTERVALO_INVALIDO };
  }

  return { isValid: true };
};

/**
 * Valida uma transação completa
 * @param {Object} transacao - { valor, dataHora }
 * @returns {Object} { isValid: boolean, errors: { valor?: string, dataHora?: string } }
 */
export const validateTransacao = (transacao) => {
  const errors = {};

  const valorValidation = validateValor(transacao.valor);
  if (!valorValidation.isValid) {
    errors.valor = valorValidation.error;
  }

  const dataValidation = validateData(transacao.dataHora);
  if (!dataValidation.isValid) {
    errors.dataHora = dataValidation.error;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
