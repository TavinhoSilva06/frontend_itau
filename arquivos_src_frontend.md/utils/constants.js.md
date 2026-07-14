# constants.js

**Caminho original:** `src/utils/constants.js`

## Descrição geral
Arquivo central de constantes da aplicação: URL base da API, endpoints, regras de validação, mensagens de texto (sucesso/erro), configuração de paginação e timeouts. Centraliza "valores mágicos" para evitar duplicação e facilitar manutenção.

## Conteúdo detalhado

### `API_BASE_URL`
```js
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
```
URL base da API, obtida da variável de ambiente `VITE_API_URL` (definida em um arquivo `.env`, se existir) ou, na ausência dela, o valor padrão `http://localhost:8080`.

### `ENDPOINTS`
Objeto com os caminhos relativos dos endpoints da API, organizados por domínio:
- `TRANSACAO.CRIAR`: `/transacao/criar`
- `TRANSACAO.LIMPAR`: `/transacao`
- `ESTATISTICA.GET`: `/estatistica`
- `ESTATISTICA.INTERVALO`: `/estatistica/intervalo`
- `ESTATISTICA.INTERVALO_HISTORICO`: `/estatistica/intervalo/historico`

### `VALIDATIONS`
Limites usados nas regras de validação:
- `VALOR_MINIMO`: `0`
- `INTERVALO_MINIMO`: `1` (segundo)
- `INTERVALO_MAXIMO`: `86400` (24 horas em segundos)

### `MESSAGES`
Objeto com textos padronizados, divididos em:
- `SUCESSO`: mensagens de sucesso (`TRANSACAO_CRIADA`, `INTERVALO_ATUALIZADO`, `TRANSACOES_LIMPAS`).
- `ERRO`: mensagens de erro (`VALOR_INVALIDO`, `DATA_INVALIDA`, `DATA_FORA_INTERVALO`, `INTERVALO_INVALIDO`, `ERRO_TRANSACAO`, `ERRO_ESTATISTICA`, `ERRO_CONFIGURACAO`, `ERRO_GENERICO`).

### `PAGINATION`
- `ITEMS_PER_PAGE`: `10` (quantidade de itens exibidos por página na tabela de histórico).

### `TIMEOUTS`
- `API_CALL`: `30000` ms (30 segundos).
- `AUTO_REFRESH`: `10000` ms (10 segundos).

## Dependências / Relacionamentos
- `ENDPOINTS` é usado por `context/TransacaoContext.jsx` e `context/EstatisticaContext.jsx` para montar as chamadas à API.
- `VALIDATIONS` e `MESSAGES.ERRO` (parcialmente) são usados por `utils/validations.js`.
- `PAGINATION` é usado por `pages/Historico.jsx` para definir o número de itens por página.
- `API_BASE_URL` e `TIMEOUTS` **não são utilizados atualmente** em nenhum outro arquivo do projeto (a instância do Axios em `services/api.js` usa uma URL fixa `http://localhost:8080`, em vez de importar `API_BASE_URL` deste arquivo).

## Observações
Algumas constantes de `MESSAGES.SUCESSO` (como `TRANSACAO_CRIADA`, `INTERVALO_ATUALIZADO`, `TRANSACOES_LIMPAS`) não são usadas nas páginas — os textos de sucesso exibidos via `toast.success(...)` são, em geral, escritos diretamente no código das páginas (`pages/NovaTransacao.jsx`, `pages/Configuracao.jsx`, `pages/Historico.jsx`) em vez de referenciar estas constantes.
