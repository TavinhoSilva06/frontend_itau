import Card from './Card';
import { formatCurrency } from '../utils/formatters';

/**
 * Componente StatCard - Exibir estatísticas com ícone
 * @param {string} title - Título da estatística
 * @param {number} value - Valor a exibir
 * @param {React.ReactNode} icon - Ícone Lucide React
 * @param {string} trend - Tendência (up, down, neutral) - opcional
 * @param {string} valueFormat - Formato do valor ('currency', 'number', 'text')
 */
export default function StatCard({
  title,
  value,
  icon: Icon,
  trend = null,
  valueFormat = 'currency',
}) {
  // Formatar valor baseado no tipo
  const formatValue = () => {
    if (value === null || value === undefined) return '--';

    switch (valueFormat) {
      case 'currency':
        return formatCurrency(value);
      case 'number':
        return value.toLocaleString('pt-BR');
      case 'text':
      default:
        return String(value);
    }
  };

  // Cor da tendência
  const trendColor = {
    up: 'text-green-500',
    down: 'text-red-500',
    neutral: 'text-gray-500',
  };

  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-800">{formatValue()}</p>
        </div>
        {Icon && (
          <div className="bg-orange-100 p-3 rounded-lg">
            <Icon className="w-6 h-6 text-orange-500" />
          </div>
        )}
      </div>
      {trend && (
        <div className={`mt-3 text-sm font-medium ${trendColor[trend]}`}>
          {trend === 'up' && '↑ Crescendo'}
          {trend === 'down' && '↓ Caindo'}
          {trend === 'neutral' && '→ Estável'}
        </div>
      )}
    </Card>
  );
}
