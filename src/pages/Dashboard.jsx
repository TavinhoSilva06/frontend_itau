import { useEffect, useState } from 'react';
import MainLayout from "../layouts/MainLayout";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { RefreshCw, TrendingUp, DollarSign, Hash, MinusCircle, PlusCircle } from 'lucide-react';
import StatCard from '../components/StatCard';
import SkeletonCard from '../components/SkeletonCard';
import Card from '../components/Card';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';
import { useEstatisticas } from '../context/EstatisticaContext';
import { formatCurrency } from '../utils/formatters';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const { estatisticas, loading, error, carregarEstatisticas } = useEstatisticas();
  const [refreshing, setRefreshing] = useState(false);

  // Carregar estatísticas ao montar
  useEffect(() => {
    carregarEstatisticas();
  }, []);

  // Dados para o gráfico de distribuição
  const chartData = [
    { name: 'Mínimo', value: estatisticas.min || 0 },
    { name: 'Média', value: estatisticas.avg || 0 },
    { name: 'Máximo', value: estatisticas.max || 0 },
  ];

  // Dados para o gráfico pizza
  const pieData = [
    { name: 'Soma', value: estatisticas.sum || 0 },
    { name: 'Restante', value: Math.max(0, (estatisticas.sum || 0) * 0.2) },
  ];

  const COLORS = ['#ff9500', '#e5e7eb'];

  // Recarregar com feedback visual
  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      await carregarEstatisticas();
      toast.success('Estatísticas atualizadas!');
    } catch (err) {
      toast.error('Erro ao atualizar estatísticas');
    } finally {
      setRefreshing(false);
    }
  };

  if (loading && !estatisticas.count) {
    return (
      <MainLayout>
        <LoadingSpinner text="Carregando estatísticas..." />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-600 mt-1">Acompanhe suas transações em tempo real</p>
          </div>
          <Button
            variant="primary"
            onClick={handleRefresh}
            disabled={refreshing}
            loading={refreshing}
          >
            <RefreshCw className="w-4 h-4" />
            Atualizar
          </Button>
        </div>

        {error && <ErrorAlert message={error} />}

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {loading && !estatisticas.count ? (
            <SkeletonCard count={5} />
          ) : (
            <>
              <StatCard
                title="Total de Transações"
                value={estatisticas.count || 0}
                icon={Hash}
                valueFormat="number"
              />
              <StatCard
                title="Soma Total"
                value={estatisticas.sum || 0}
                icon={DollarSign}
                valueFormat="currency"
              />
              <StatCard
                title="Valor Médio"
                value={estatisticas.avg || 0}
                icon={TrendingUp}
                valueFormat="currency"
              />
              <StatCard
                title="Valor Mínimo"
                value={estatisticas.min || 0}
                icon={MinusCircle}
                valueFormat="currency"
              />
              <StatCard
                title="Valor Máximo"
                value={estatisticas.max || 0}
                icon={PlusCircle}
                valueFormat="currency"
              />
            </>
          )}
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gráfico de Barras */}
          <Card title="Distribuição de Valores">
            {chartData.some((item) => item.value > 0) ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => formatCurrency(value)}
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #ccc',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="value" fill="#ff9500" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-gray-500">
                Nenhuma transação para exibir
              </div>
            )}
          </Card>

          {/* Gráfico Pizza */}
          <Card title="Proporção de Valores">
            {(estatisticas.sum || 0) > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => `${entry.name}: ${formatCurrency(entry.value)}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {COLORS.map((color, index) => (
                      <Cell key={`cell-${index}`} fill={color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => formatCurrency(value)}
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #ccc',
                      borderRadius: '8px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-gray-500">
                Nenhuma transação para exibir
              </div>
            )}
          </Card>
        </div>

        {/* Resumo */}
        <Card title="Resumo">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-600 font-medium">Total de Transações</p>
              <p className="text-2xl font-bold text-blue-900 mt-1">{estatisticas.count || 0}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-600 font-medium">Valor Total</p>
              <p className="text-2xl font-bold text-green-900 mt-1">
                {formatCurrency(estatisticas.sum || 0)}
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-purple-600 font-medium">Média por Transação</p>
              <p className="text-2xl font-bold text-purple-900 mt-1">
                {formatCurrency(estatisticas.avg || 0)}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}