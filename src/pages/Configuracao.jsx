import { useEffect, useState } from 'react';
import MainLayout from "../layouts/MainLayout";
import Card from '../components/Card';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';
import { useEstatisticas } from '../context/EstatisticaContext';
import { validateIntervalo } from '../utils/validations';
import { formatDuration, formatDateTime } from '../utils/formatters';
import toast from 'react-hot-toast';
import { Settings, Clock, History } from 'lucide-react';

export default function Configuracao() {
  const {
    intervalo,
    historicoIntervalo,
    loading,
    error,
    carregarIntervalo,
    carregarHistoricoIntervalo,
    atualizarIntervalo,
  } = useEstatisticas();

  const [novoIntervalo, setNovoIntervalo] = useState('');
  const [validationError, setValidationError] = useState('');
  const [updating, setUpdating] = useState(false);

  // Carregar configurações ao montar
  useEffect(() => {
    const loadConfigs = async () => {
      await Promise.all([carregarIntervalo(), carregarHistoricoIntervalo()]);
    };
    loadConfigs();
  }, []);

  // Atualizar campo
  useEffect(() => {
    setNovoIntervalo(String(intervalo));
  }, [intervalo]);

  // Atualizar intervalo
  const handleUpdateIntervalo = async (e) => {
    e.preventDefault();
    setValidationError('');

    const validation = validateIntervalo(novoIntervalo);
    if (!validation.isValid) {
      setValidationError(validation.error);
      toast.error('Intervalo inválido');
      return;
    }

    try {
      setUpdating(true);
      await atualizarIntervalo(parseInt(novoIntervalo, 10));
      toast.success('Intervalo atualizado com sucesso! 🎉');
      await carregarHistoricoIntervalo();
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      toast.error(errorMessage);
    } finally {
      setUpdating(false);
    }
  };

  if (loading && !intervalo) {
    return (
      <MainLayout>
        <LoadingSpinner text="Carregando configurações..." />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Configuração</h1>
          <p className="text-gray-600 mt-1">Gerenciar configurações do sistema</p>
        </div>

        {error && <ErrorAlert message={error} />}

        {/* Atualizar Intervalo */}
        <Card title="Intervalo de Estatísticas" className="md:col-span-2">
          <form onSubmit={handleUpdateIntervalo} className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-blue-800">
                ℹ️ <strong>Intervalo Atual:</strong> {formatDuration(intervalo)} 
                ({intervalo} segundos)
              </p>
            </div>

            <FormInput
              label="Novo Intervalo (segundos)"
              type="number"
              value={novoIntervalo}
              onChange={(e) => {
                setNovoIntervalo(e.target.value);
                setValidationError('');
              }}
              error={validationError}
              placeholder="60"
              min="1"
              max="86400"
              required
            />

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-sm text-amber-800">
                📌 <strong>Limites:</strong> Mínimo 1 segundo, Máximo 24 horas (86.400 segundos)
              </p>
            </div>

            <Button
              type="submit"
              variant="primary"
              loading={updating}
              disabled={updating || String(intervalo) === novoIntervalo}
            >
              <Settings className="w-4 h-4" />
              Atualizar Intervalo
            </Button>
          </form>
        </Card>

        {/* Histórico de Alterações */}
        <Card title="Histórico de Alterações">
          {historicoIntervalo.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">Nenhuma alteração no histórico</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      <Clock className="w-4 h-4 inline mr-2" />
                      Data/Hora
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Intervalo (segundos)
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Duração
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {historicoIntervalo.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {formatDateTime(item.data || item.dataHora || item.timestamp)}
                      </td>
                      <td className="py-3 px-4 text-sm font-mono text-blue-600">
                        {item.intervaloSegundos}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {formatDuration(item.intervaloSegundos)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        {/* Info */}
        <Card title="Sobre o Intervalo de Estatísticas">
          <div className="space-y-3 text-sm">
            <div>
              <p className="font-semibold text-gray-800">O que é o intervalo?</p>
              <p className="text-gray-600 mt-1">
                O intervalo define a janela de tempo (em segundos) usada para calcular as 
                estatísticas (contagem, soma, média, mínimo e máximo) das transações.
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Exemplo:</p>
              <p className="text-gray-600 mt-1">
                Se o intervalo é 60 segundos, as estatísticas são calculadas apenas para 
                transações criadas nos últimos 60 segundos.
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Recomendação:</p>
              <p className="text-gray-600 mt-1">
                Use valores entre 60 segundos (1 minuto) e 3600 segundos (1 hora) para 
                melhores resultados.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}