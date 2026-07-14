# EstatisticaContext.jsx

**Caminho original:** `src/context/EstatisticaContext.jsx`

## Descrição geral
Contexto global (React Context API) responsável por gerenciar todo o estado relacionado a **estatísticas de transações** e ao **intervalo de tempo** usado para calculá-las, incluindo comunicação com a API do back-end. Expõe um `Provider` e um hook customizado (`useEstatisticas`) para consumo em qualquer componente da aplicação.

## Conteúdo detalhado

### Imports
- `createContext`, `useContext`, `useState`, `useCallback` de `react`.
- `api` (`../services/api`): instância do Axios configurada para chamadas HTTP.
- `ENDPOINTS` (`../utils/constants`): objeto com os caminhos das rotas da API.

### Estado gerenciado (`EstatisticaProvider`)
| Estado | Valor inicial | Descrição |
|---|---|---|
| `estatisticas` | `{ count: 0, sum: 0, avg: 0, min: 0, max: 0 }` | Objeto com as estatísticas atuais das transações. |
| `intervalo` | `60` | Intervalo (em segundos) usado para calcular as estatísticas. |
| `historicoIntervalo` | `[]` | Histórico de alterações do intervalo. |
| `loading` | `false` | Indica se uma requisição está em andamento. |
| `error` | `null` | Mensagem de erro da última operação, se houver. |

### Funções expostas
- **`carregarEstatisticas()`**: faz `GET` em `ENDPOINTS.ESTATISTICA.GET` (`/estatistica`) e atualiza `estatisticas`.
- **`carregarIntervalo()`**: faz `GET` em `ENDPOINTS.ESTATISTICA.INTERVALO` (`/estatistica/intervalo`) e atualiza `intervalo` com o campo `intervaloSegundos` da resposta.
- **`atualizarIntervalo(novoIntervalo)`**: faz `PUT` em `ENDPOINTS.ESTATISTICA.INTERVALO`, enviando `{ intervaloSegundos: novoIntervalo }`, e atualiza `intervalo` com a resposta.
- **`carregarHistoricoIntervalo()`**: faz `GET` em `ENDPOINTS.ESTATISTICA.INTERVALO_HISTORICO` (`/estatistica/intervalo/historico`) e atualiza `historicoIntervalo`.
- **`recarregar()`**: executa em paralelo (`Promise.all`) `carregarEstatisticas`, `carregarIntervalo` e `carregarHistoricoIntervalo`.

Todas as funções seguem o mesmo padrão: definem `loading = true`, limpam `error`, fazem a chamada à API, tratam erros extraindo a mensagem de `err.response?.data?.message` ou `err.message`, e finalizam com `loading = false` no bloco `finally`.

### Hook `useEstatisticas()`
Wrapper de `useContext(EstatisticaContext)` que lança um erro (`throw new Error(...)`) caso seja usado fora de um `EstatisticaProvider`, garantindo uso correto do contexto.

## Dependências / Relacionamentos
- Depende de `services/api.js` (chamadas HTTP) e `utils/constants.js` (endpoints).
- É fornecido (provider) em `App.jsx`, envolvendo toda a árvore de rotas.
- É consumido via o hook `useEstatisticas()` em:
  - `pages/Dashboard.jsx` (exibição de estatísticas e gráficos).
  - `pages/Configuracao.jsx` (exibição/edição do intervalo e histórico de alterações).

## Observações
Este contexto centraliza toda a lógica de estado e comunicação com os endpoints `/estatistica/*` do back-end, evitando duplicação de lógica de fetch/erro em cada página que precisa desses dados.
