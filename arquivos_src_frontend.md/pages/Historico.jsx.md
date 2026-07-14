# Historico.jsx

**Caminho original:** `src/pages/Historico.jsx`

## Descrição geral
Página que exibe o histórico de transações (rota `/historico`) em formato de tabela, com suporte a ordenação por coluna, paginação, exportação para CSV e exclusão de todas as transações.

## Conteúdo detalhado

### Imports principais
- `useEffect`, `useState` de `react`.
- `MainLayout`, `Card`, `Button`, `LoadingSpinner`, `ErrorAlert` (componentes locais).
- `useTransacoes` (`../context/TransacaoContext`).
- `formatCurrency`, `formatDateTime` (`../utils/formatters`).
- `PAGINATION` (`../utils/constants`).
- `toast` de `react-hot-toast`.
- Ícones `ChevronLeft`, `ChevronRight`, `Download`, `Trash2` de `lucide-react`.

### Estado
- `currentPage`: página atual da tabela (inicial `1`).
- `sortBy`: coluna de ordenação (`'data'` ou `'valor'`, padrão `'data'`).
- `sortOrder`: direção da ordenação (`'asc'` ou `'desc'`, padrão `'desc'`).
- `deletingAll`: booleano de controle do estado de carregamento ao limpar todas as transações.

### Efeitos
- `useEffect` inicial: chama `recarregar()` do contexto ao montar a página.

### Lógica de ordenação e paginação
- `sortedTransacoes`: cópia de `transacoes` ordenada de acordo com `sortBy`/`sortOrder` (por `valor` numérico ou por `dataHora` convertida em timestamp).
- `totalPages`: calculado a partir do tamanho de `sortedTransacoes` e `PAGINATION.ITEMS_PER_PAGE` (10 itens por página).
- `paginatedTransacoes`: subconjunto de `sortedTransacoes` correspondente à página atual (`slice`).

### Funções
- **`handlePageChange(newPage)`**: atualiza `currentPage` se estiver dentro do intervalo válido (`1` a `totalPages`).
- **`handleSort(newSortBy)`**: se a coluna clicada já é a coluna atual de ordenação, inverte a direção (`asc`/`desc`); caso contrário, muda a coluna e define ordenação decrescente por padrão.
- **`handleLimparTodas()`**: pede confirmação via `window.confirm`; se confirmado, chama `limparTransacoes()` do contexto, exibe toast de sucesso, reseta a página para `1` e recarrega a lista.
- **`handleExport()`**: monta uma string CSV (colunas ID, Valor, Data e Hora) a partir de `sortedTransacoes`, cria um `Blob`, gera um link de download temporário (`<a>`) com nome de arquivo `transacoes-<data-atual>.csv`, dispara o download via `a.click()` e exibe toast de sucesso.

### Renderização
1. Se `loading` for `true` **e** não houver transações carregadas, exibe apenas o `LoadingSpinner`.
2. Caso contrário, renderiza:
   - **Cabeçalho** com título, subtítulo, botão "Exportar" (desabilitado se não houver transações) e botão "Limpar Tudo" (exibido apenas se houver transações, com estado de loading via `deletingAll`).
   - `ErrorAlert`, se houver erro.
   - **`Card`** com o total de transações no título, contendo:
     - Mensagem de "Nenhuma transação registrada ainda" caso a lista esteja vazia.
     - Caso contrário, uma **tabela** com colunas ID (8 primeiros caracteres), Valor (formatado em moeda) e Data/Hora (formatada), com cabeçalhos clicáveis para ordenar por Valor ou Data (exibindo seta `↑`/`↓` conforme a direção atual).
     - **Paginação** (exibida apenas se `totalPages > 1`): texto "Página X de Y" e botões de navegação anterior/próxima (`ChevronLeft`/`ChevronRight`), desabilitados nos limites.

## Dependências / Relacionamentos
- Consome o contexto `TransacaoContext` via `useTransacoes()` (`transacoes`, `loading`, `error`, `recarregar`, `limparTransacoes`).
- Usa `utils/formatters.js` (`formatCurrency`, `formatDateTime`) e `utils/constants.js` (`PAGINATION`).
- É registrada como rota `/historico` em `routes/AppRoutes.jsx`.

## Observações
Como descrito em `context/TransacaoContext.jsx`, a função `recarregar()` (que chama `carregarTransacoes()`) **não busca dados reais do back-end**, pois o endpoint de listagem (`GET /transacao`) não existe. Na prática, esta página só exibirá transações criadas durante a sessão atual do navegador (via `NovaTransacao.jsx`), sendo esvaziada a cada recarregamento da página.
