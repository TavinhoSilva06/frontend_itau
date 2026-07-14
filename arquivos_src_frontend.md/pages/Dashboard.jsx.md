# Dashboard.jsx

**Caminho original:** `src/pages/Dashboard.jsx`

## Descrição geral
Página inicial do sistema (rota `/`), que exibe um painel (dashboard) com estatísticas resumidas das transações: contadores, gráficos de barras e pizza, e um resumo em cartões coloridos. É a página mais rica em visualizações de dados do projeto.

## Conteúdo detalhado

### Imports principais
- `useEffect`, `useState` de `react`.
- `MainLayout` (`../layouts/MainLayout`).
- Componentes de gráfico da biblioteca `recharts`: `BarChart`, `Bar`, `XAxis`, `YAxis`, `CartesianGrid`, `Tooltip`, `Legend`, `ResponsiveContainer`, `PieChart`, `Pie`, `Cell`.
- Ícones do `lucide-react`: `RefreshCw`, `TrendingUp`, `DollarSign`, `Hash`, `MinusCircle`, `PlusCircle`.
- Componentes locais: `StatCard`, `SkeletonCard`, `Card`, `Button`, `LoadingSpinner`, `ErrorAlert`.
- `useEstatisticas` (`../context/EstatisticaContext`).
- `formatCurrency` (`../utils/formatters`).
- `toast` de `react-hot-toast`.

### Estado e efeitos
- Usa `useEstatisticas()` para obter `estatisticas`, `loading`, `error` e `carregarEstatisticas`.
- Estado local `refreshing` (booleano) para feedback visual durante atualização manual.
- `useEffect` inicial: chama `carregarEstatisticas()` ao montar a página.

### Dados derivados para os gráficos
- `chartData`: array com os valores Mínimo, Média e Máximo das estatísticas, usado no gráfico de barras.
- `pieData`: array com "Soma" e "Restante" (calculado como 20% da soma, apenas para fins visuais de proporção), usado no gráfico de pizza.
- `COLORS`: paleta `['#ff9500', '#e5e7eb']` (laranja e cinza claro) para o gráfico de pizza.

### Funções
- **`handleRefresh()`**: define `refreshing = true`, chama `carregarEstatisticas()`, exibe toast de sucesso ou erro, e finaliza `refreshing = false`.

### Renderização condicional
- Se `loading` for `true` **e** `estatisticas.count` for `0`/falsy, renderiza apenas um `LoadingSpinner` dentro do `MainLayout` (tela de carregamento inicial).
- Caso contrário, renderiza o dashboard completo:
  1. **Cabeçalho** com título, subtítulo e botão "Atualizar" (com ícone `RefreshCw` e estado de loading).
  2. **`ErrorAlert`**, se houver erro.
  3. **Grade de 5 `StatCard`** (ou 5 `SkeletonCard` durante o carregamento):
     - Total de Transações (`Hash`, formato número).
     - Soma Total (`DollarSign`, formato moeda).
     - Valor Médio (`TrendingUp`, formato moeda).
     - Valor Mínimo (`MinusCircle`, formato moeda).
     - Valor Máximo (`PlusCircle`, formato moeda).
  4. **Gráfico de barras** ("Distribuição de Valores"): exibido dentro de um `Card`, usando `recharts`, com tooltip formatado em moeda. Se todos os valores forem zero, exibe mensagem "Nenhuma transação para exibir".
  5. **Gráfico de pizza** ("Proporção de Valores"): exibido dentro de outro `Card`, também com tooltip em moeda. Se a soma for zero, exibe a mesma mensagem de "nenhuma transação".
  6. **Cartão de Resumo**: três blocos coloridos (azul, verde, roxo) com "Total de Transações", "Valor Total" e "Média por Transação".

## Dependências / Relacionamentos
- Consome o contexto `EstatisticaContext` via `useEstatisticas()`.
- Usa os componentes `StatCard`, `SkeletonCard`, `Card`, `Button`, `LoadingSpinner`, `ErrorAlert` e o layout `MainLayout`.
- É registrada como rota `/` em `routes/AppRoutes.jsx`.

## Observações
Todos os dados exibidos vêm do endpoint `/estatistica` (via `EstatisticaContext`) — a página não faz nenhuma chamada de API diretamente, delegando toda a comunicação ao contexto.
