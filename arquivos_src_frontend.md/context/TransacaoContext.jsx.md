# TransacaoContext.jsx

**Caminho original:** `src/context/TransacaoContext.jsx`

## Descrição geral
Contexto global (React Context API) responsável por gerenciar o estado relacionado a **transações**: listagem local, criação de novas transações e limpeza de todas as transações, incluindo comunicação com a API do back-end. Expõe um `Provider` e um hook customizado (`useTransacoes`).

## Conteúdo detalhado

### Imports
- `createContext`, `useContext`, `useState`, `useCallback` de `react`.
- `api` (`../services/api`): instância do Axios configurada.
- `ENDPOINTS` (`../utils/constants`): objeto com os caminhos das rotas da API.

### Estado gerenciado (`TransacaoProvider`)
| Estado | Valor inicial | Descrição |
|---|---|---|
| `transacoes` | `[]` | Lista de transações mantida localmente no front-end. |
| `loading` | `false` | Indica se uma requisição está em andamento. |
| `error` | `null` | Mensagem de erro da última operação, se houver. |

### Funções expostas
- **`carregarTransacoes()`**: **não faz nenhuma chamada real à API** — apenas define `transacoes` como um array vazio (`[]`). Um comentário no código explica que o back-end **não possui** um endpoint `GET /transacao`, então esta função é um placeholder até que esse endpoint exista.
- **`criarTransacao(transacao)`**: faz `POST` em `ENDPOINTS.TRANSACAO.CRIAR` (`/transacao/criar`) enviando o objeto `transacao` (`{ valor, dataHora }`), e adiciona o resultado retornado ao início da lista local (`setTransacoes((prev) => [response.data, ...prev])`).
- **`limparTransacoes()`**: faz `DELETE` em `ENDPOINTS.TRANSACAO.LIMPAR` (`/transacao`) e esvazia a lista local (`setTransacoes([])`).
- **`recarregar()`**: apenas chama `carregarTransacoes()` (que, como descrito acima, apenas zera a lista, pois não há endpoint de listagem no back-end).

Todas as funções seguem o padrão de `loading`/`error`/`try-catch-finally`, extraindo mensagens de erro de `err.response?.data?.message` ou `err.message`.

### Hook `useTransacoes()`
Wrapper de `useContext(TransacaoContext)` que lança um erro caso usado fora de um `TransacaoProvider`.

## Dependências / Relacionamentos
- Depende de `services/api.js` (chamadas HTTP) e `utils/constants.js` (endpoints).
- É fornecido (provider) em `App.jsx`, envolvendo toda a árvore de rotas (e envolvendo também o `EstatisticaProvider`).
- É consumido via o hook `useTransacoes()` em:
  - `pages/NovaTransacao.jsx` (criação de transações).
  - `pages/Historico.jsx` (listagem — atualmente sempre vazia —, limpeza e exportação de transações).

## Observações
**Ponto de atenção importante:** como o back-end não expõe um endpoint de listagem de transações (`GET /transacao`), a página `Historico.jsx` **nunca exibirá transações reais** carregadas do servidor — a lista `transacoes` só é preenchida temporariamente após uma criação bem-sucedida (`criarTransacao`) durante a mesma sessão do navegador, sendo perdida ao recarregar a página. Isso deve ser resolvido implementando o endpoint correspondente no back-end e atualizando `carregarTransacoes()` para consumi-lo.
