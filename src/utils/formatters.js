/**
 * Formata um valor numérico como moeda BRL
 * @param {number} valor - Valor a formatar
 * @returns {string} Valor formatado (ex: "R$ 1.234,56")
 */
export const formatCurrency = (valor) => {
  if (valor === null || valor === undefined) return 'R$ 0,00';

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor);
};

/**
 * Formata uma data ISO em formato legível
 * @param {string|Date} dataHora - Data em formato ISO ou objeto Date
 * @returns {string} Data formatada (ex: "09/07/2026 14:30:45")
 */
export const formatDateTime = (dataHora) => {
  if (!dataHora) return '--/--/---- --:--:--';

  const data = new Date(dataHora);

  if (isNaN(data.getTime())) return 'Data inválida';

  return new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(data);
};

/**
 * Formata uma data ISO em formato apenas data
 * @param {string|Date} data - Data em formato ISO
 * @returns {string} Data formatada (ex: "09/07/2026")
 */
export const formatDate = (data) => {
  if (!data) return '--/--/----';

  const date = new Date(data);

  if (isNaN(date.getTime())) return 'Data inválida';

  return new Intl.DateTimeFormat('pt-BR').format(date);
};

/**
 * Formata tempo em segundos para formato legível
 * @param {number} segundos - Quantidade de segundos
 * @returns {string} Tempo formatado (ex: "2 horas", "30 minutos", "45 segundos")
 */
export const formatIntervalo = (segundos) => {
  if (!segundos || segundos <= 0) return '0s';

  if (segundos < 60) {
    return `${segundos}s`;
  }

  if (segundos < 3600) {
    const minutos = Math.floor(segundos / 60);
    return `${minutos}m`;
  }

  const horas = Math.floor(segundos / 3600);
  return `${horas}h`;
};

/**
 * Converte segundos para formato HH:mm:ss
 * @param {number} segundos - Quantidade de segundos
 * @returns {string} Tempo formatado (ex: "02:30:45")
 */
export const formatDuration = (segundos) => {
  if (!segundos || segundos <= 0) return '00:00:00';

  const horas = Math.floor(segundos / 3600);
  const minutos = Math.floor((segundos % 3600) / 60);
  const segs = segundos % 60;

  return [horas, minutos, segs]
    .map((val) => String(val).padStart(2, '0'))
    .join(':');
};

/**
 * Trunca texto para um comprimento máximo
 * @param {string} texto - Texto a truncar
 * @param {number} maxLength - Comprimento máximo
 * @returns {string} Texto truncado com "..." se necessário
 */
export const truncateText = (texto, maxLength = 50) => {
  if (!texto) return '';

  if (texto.length <= maxLength) return texto;

  return texto.slice(0, maxLength - 3) + '...';
};
