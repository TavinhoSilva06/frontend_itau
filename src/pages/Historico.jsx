import { useEffect, useState } from 'react';
import MainLayout from "../layouts/MainLayout";
import Card from '../components/Card';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';
import { useTransacoes } from '../context/TransacaoContext';
import { formatCurrency, formatDateTime } from '../utils/formatters';
import { PAGINATION } from '../utils/constants';
import toast from 'react-hot-toast';
import { ChevronLeft, ChevronRight, Download, Trash2 } from 'lucide-react';

export default function Historico() {
  const { transacoes, loading, error, recarregar, limparTransacoes } = useTransacoes();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('data'); // 'data' ou 'valor'
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' ou 'desc'
  const [deletingAll, setDeletingAll] = useState(false);

  // Carregar transações ao montar
  useEffect(() => {
    recarregar();
  }, []);

  // Ordenar transações
  const sortedTransacoes = [...transacoes].sort((a, b) => {
    let compareA, compareB;

    if (sortBy === 'valor') {
      compareA = a.valor || 0;
      compareB = b.valor || 0;
    } else {
      compareA = new Date(a.dataHora || 0).getTime();
      compareB = new Date(b.dataHora || 0).getTime();
    }

    return sortOrder === 'asc' ? compareA - compareB : compareB - compareA;
  });

  // Paginar
  const totalPages = Math.ceil(sortedTransacoes.length / PAGINATION.ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * PAGINATION.ITEMS_PER_PAGE;
  const paginatedTransacoes = sortedTransacoes.slice(
    startIndex,
    startIndex + PAGINATION.ITEMS_PER_PAGE
  );

  // Mudar página
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Trocar ordem
  const handleSort = (newSortBy) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('desc');
    }
  };

  // Limpar todas as transações
  const handleLimparTodas = async () => {
    if (!window.confirm('Tem certeza que deseja deletar TODAS as transações? Esta ação não pode ser desfeita!')) {
      return;
    }

    try {
      setDeletingAll(true);
      await limparTransacoes();
      toast.success('Todas as transações foram removidas!');
      setCurrentPage(1);
      recarregar();
    } catch (err) {
      toast.error('Erro ao deletar transações');
    } finally {
      setDeletingAll(false);
    }
  };

  // Exportar como CSV
  const handleExport = () => {
    const csv = [
      ['ID', 'Valor', 'Data e Hora'].join(','),
      ...sortedTransacoes.map((t) =>
        [
          t.id || '--',
          `"${formatCurrency(t.valor)}"`,
          `"${formatDateTime(t.dataHora)}"`,
        ].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transacoes-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('Arquivo exportado com sucesso!');
  };

  if (loading && transacoes.length === 0) {
    return (
      <MainLayout>
        <LoadingSpinner text="Carregando histórico..." />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Histórico</h1>
            <p className="text-gray-600 mt-1">Visualize todas as suas transações</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={handleExport}
              disabled={transacoes.length === 0}
            >
              <Download className="w-4 h-4" />
              Exportar
            </Button>
            {transacoes.length > 0 && (
              <Button
                variant="danger"
                onClick={handleLimparTodas}
                loading={deletingAll}
                disabled={deletingAll}
              >
                <Trash2 className="w-4 h-4" />
                Limpar Tudo
              </Button>
            )}
          </div>
        </div>

        {error && <ErrorAlert message={error} />}

        <Card title={`Transações (${sortedTransacoes.length} total)`}>
          {sortedTransacoes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Nenhuma transação registrada ainda</p>
              <p className="text-gray-500 text-sm mt-2">Comece criando uma nova transação</p>
            </div>
          ) : (
            <>
              {/* Tabela */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">ID</th>
                      <th
                        className="text-left py-3 px-4 font-semibold text-gray-700 cursor-pointer hover:text-orange-500"
                        onClick={() => handleSort('valor')}
                      >
                        Valor {sortBy === 'valor' && (sortOrder === 'asc' ? '↑' : '↓')}
                      </th>
                      <th
                        className="text-left py-3 px-4 font-semibold text-gray-700 cursor-pointer hover:text-orange-500"
                        onClick={() => handleSort('data')}
                      >
                        Data e Hora {sortBy === 'data' && (sortOrder === 'asc' ? '↑' : '↓')}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedTransacoes.map((transacao, index) => (
                      <tr
                        key={transacao.id || index}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-3 px-4 text-sm font-mono text-gray-600">
                          {transacao.id?.substring(0, 8) || '--'}
                        </td>
                        <td className="py-3 px-4 text-sm font-semibold text-green-600">
                          {formatCurrency(transacao.valor)}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {formatDateTime(transacao.dataHora)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Paginação */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    Página {currentPage} de {totalPages}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </Card>
      </div>
    </MainLayout>
  );
}