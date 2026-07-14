import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from "../layouts/MainLayout";
import Card from '../components/Card';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import ErrorAlert from '../components/ErrorAlert';
import { useTransacoes } from '../context/TransacaoContext';
import { validateTransacao } from '../utils/validations';
import toast from 'react-hot-toast';
import { DollarSign, Calendar } from 'lucide-react';

export default function NovaTransacao() {
  const navigate = useNavigate();
  const { criarTransacao, loading } = useTransacoes();
  const [formData, setFormData] = useState({
    valor: '',
    dataHora: '',
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);

  // Obter data/hora máxima (agora)
  const now = new Date();
  const maxDateTime = now.toISOString().slice(0, 16);

  // Atualizar campo do formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpar erro do campo
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // Enviar formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);

    // Validar
    const validation = validateTransacao(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      toast.error('Por favor, corrija os erros no formulário');
      return;
    }

    try {
      // Converter string para número
      const transacao = {
        valor: parseFloat(formData.valor),
        dataHora: new Date(formData.dataHora).toISOString(),
      };

      await criarTransacao(transacao);
      toast.success('Transação criada com sucesso! 🎉');
      
      // Resetar formulário
      setFormData({ valor: '', dataHora: '' });
      
      // Redirecionar após 2 segundos
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Erro ao criar transação';
      setApiError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Nova Transação</h1>
          <p className="text-gray-600 mt-1">Registre uma nova transação no sistema</p>
        </div>

        <Card title="Adicionar Transação">
          {apiError && (
            <ErrorAlert
              message={apiError}
              onDismiss={() => setApiError(null)}
            />
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo Valor */}
            <FormInput
              label="Valor (R$)"
              type="number"
              name="valor"
              value={formData.valor}
              onChange={handleInputChange}
              error={errors.valor}
              placeholder="0,00"
              step="0.01"
              min="0"
              required
            />

            {/* Campo Data/Hora */}
            <FormInput
              label="Data e Hora"
              type="datetime-local"
              name="dataHora"
              value={formData.dataHora}
              onChange={handleInputChange}
              error={errors.dataHora}
              max={maxDateTime}
              required
            />

            {/* Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                ℹ️ <strong>Dica:</strong> O valor da transação deve ser maior ou igual a zero, 
                e a data não pode ser futura.
              </p>
            </div>

            {/* Botões */}
            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                variant="primary"
                loading={loading}
                disabled={loading}
              >
                <DollarSign className="w-4 h-4" />
                Criar Transação
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate('/')}
                disabled={loading}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </Card>

        {/* Exemplo */}
        <Card title="Exemplo" className="mt-8">
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-gray-600">Valor: <span className="font-semibold text-gray-800">150,50</span></p>
            </div>
            <div>
              <p className="text-gray-600">Data: <span className="font-semibold text-gray-800">09/07/2026 às 14:30</span></p>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}