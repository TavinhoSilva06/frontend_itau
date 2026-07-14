# useApiCall.js

**Caminho original:** `src/hooks/useApiCall.js`

## Descrição geral
Arquivo que define dois *custom hooks* genéricos para simplificar chamadas à API: `useApiCall` (execução manual, disparada por evento) e `useFetch` (busca automática ao montar o componente, com possibilidade de refetch manual). Encapsulam a lógica repetitiva de `loading`/`error`/`try-catch`.

## Conteúdo detalhado

### Imports
- `useState`, `useCallback` de `react`.
- `api` (`../services/api`): importado, mas **não utilizado diretamente** neste arquivo (os hooks recebem a função de chamada de API como parâmetro `apiCall`, em vez de usar `api` diretamente).

### `useApiCall(apiCall, options = {})`
Hook para chamadas de API **disparadas manualmente** (ex.: ao clicar em um botão ou submeter um formulário).

- **Parâmetros:**
  - `apiCall`: função assíncrona que executa a requisição.
  - `options`: objeto opcional com `onSuccess(result)` e `onError(errorMessage)`.
- **Estado interno:** `data`, `loading` (inicial `false`), `error`.
- **`execute(...args)`**: função memoizada (`useCallback`) que executa `apiCall(...args)`, atualiza `data`, chama `options.onSuccess` em caso de sucesso, ou captura o erro (extraindo mensagem de `err.response?.data?.message` ou `err.message`), atualiza `error` e chama `options.onError`.
- **`refetch()`**: chama `execute()` sem argumentos.
- **Retorno:** `{ data, loading, error, execute, refetch }`.

### `useFetch(apiCall)`
Hook para chamadas de API que devem ser executadas **automaticamente ao montar o componente**, com suporte a nova busca manual.

- **Parâmetros:**
  - `apiCall`: função assíncrona que executa a requisição (sem argumentos).
- **Estado interno:** `data`, `loading` (inicial `true`, já que a busca ocorre automaticamente), `error`.
- **`refetch()`**: função memoizada que executa `apiCall()`, atualizando `data`/`error`/`loading` conforme o resultado.
- **Efeito de busca inicial:**
  ```js
  useCallback(() => {
    refetch();
  }, [refetch])();
  ```
  Este trecho **não é a forma idiomática de disparar um efeito no React** (o correto seria usar `useEffect`) — aqui, `useCallback` retorna uma função que é **imediatamente invocada** (`()` ao final), o que faz com que `refetch()` seja chamado a cada renderização do componente que usa este hook, e não apenas na montagem.
- **Retorno:** `{ data, loading, error, refetch }`.

## Dependências / Relacionamentos
- Depende de `services/api.js` (importado, mas não usado diretamente).
- **Nenhum componente ou página do projeto atual (`components/`, `pages/`, `context/`) importa ou utiliza `useApiCall` ou `useFetch`.** A lógica de chamadas à API nas páginas é feita diretamente através dos contextos (`TransacaoContext`, `EstatisticaContext`), que não usam estes hooks.

## Observações
- Este arquivo parece ter sido criado como uma abstração genérica reutilizável, mas **atualmente não está em uso** em nenhuma parte do projeto — toda a lógica de chamadas de API foi implementada diretamente dentro dos contextos.
- Há um problema técnico no `useFetch`: o padrão `useCallback(fn, deps)()` (chamado imediatamente) não é equivalente a um `useEffect` e pode causar chamadas repetidas a cada renderização, além de gerar o aviso do React de "hook chamado condicionalmente/de forma inesperada" em certos cenários. Caso este hook venha a ser utilizado no futuro, recomenda-se substituir esse trecho por um `useEffect(() => { refetch(); }, [])`.
