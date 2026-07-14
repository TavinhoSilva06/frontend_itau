# Configuracao.jsx

**Caminho original:** `src/pages/Configuracao.jsx`

## Descrição geral
Página de configurações do sistema (rota `/configuracao`), que permite visualizar e atualizar o **intervalo de tempo** (em segundos) usado para o cálculo das estatísticas de transações, além de exibir o histórico de alterações desse intervalo e uma seção explicativa sobre o conceito.

## Conteúdo detalhado

### Imports principais
- `useEffect`, `useState` de `react`.
- `MainLayout`, `Card`, `Button`, `FormInput`, `LoadingSpinner`, `ErrorAlert` (componentes locais).
- `useEstatisticas` (`../context/EstatisticaContext`).
- `validateIntervalo` (`../utils/validations`).
- `formatDuration`, `formatDateTime` (`../utils/formatters`).
- `toast` de `react-hot-toast`.
- Ícones `Settings`, `Clock`, `History` de `lucide-react`.

### Estado
- Do contexto (`useEstatisticas`): `intervalo`, `historicoIntervalo`, `loading`, `error`, além das funções `carregarIntervalo`, `carregarHistoricoIntervalo`, `atualizarIntervalo`.
- Estado local: `novoIntervalo` (valor do campo de formulário, como string), `validationError` (mensagem de erro de validação local), `updating` (booleano de loading ao submeter a atualização).

### Efeitos
- `useEffect` inicial: carrega `carregarIntervalo()` e `carregarHistoricoIntervalo()` em paralelo (`Promise.all`) ao montar a página.
- `useEffect` reativo a `intervalo`: sincroniza `novoIntervalo` com o valor atual de `intervalo` sempre que este mudar (ex.: após carregamento inicial ou atualização bem-sucedida).

### Funções
- **`handleUpdateIntervalo(e)`**:
  1. Previne o comportamento padrão do formulário.
  2. Limpa `validationError`.
  3. Valida `novoIntervalo` com `validateIntervalo`. Se inválido, define o erro e exibe toast, interrompendo o processo.
  4. Se válido, define `updating = true`, chama `atualizarIntervalo(parseInt(novoIntervalo, 10))`, exibe toast de sucesso e recarrega o histórico (`carregarHistoricoIntervalo()`).
  5. Em caso de erro, exibe toast com a mensagem de erro correspondente.
  6. Finaliza com `updating = false`.

### Renderização
1. Se `loading` for `true` **e** não houver `intervalo` carregado, exibe apenas o `LoadingSpinner`.
2. Caso contrário, renderiza:
   - **Cabeçalho** com título "Configuração" e subtítulo.
   - `ErrorAlert`, se houver erro.
   - **`Card` "Intervalo de Estatísticas"**: formulário com:
     - Bloco informativo azul mostrando o intervalo atual formatado (`formatDuration`) e em segundos.
     - `FormInput` para "Novo Intervalo (segundos)" (tipo `number`, `min="1"`, `max="86400"`).
     - Bloco informativo âmbar com os limites permitidos (1 segundo a 24 horas).
     - Botão "Atualizar Intervalo", desabilitado se `updating` for `true` **ou** se o valor do campo for igual ao intervalo atual (evita submissões inúteis).
   - **`Card` "Histórico de Alterações"**: tabela com Data/Hora, Intervalo (segundos) e Duração formatada (`formatDuration`) de cada alteração registrada em `historicoIntervalo`; exibe mensagem "Nenhuma alteração no histórico" se a lista estiver vazia. Nota: a data de cada item é lida de `item.data`, `item.dataHora` ou `item.timestamp` (o primeiro campo não `undefined` é usado), indicando incerteza sobre o nome exato do campo retornado pela API.
   - **`Card` "Sobre o Intervalo de Estatísticas"**: texto explicativo estático sobre o que é o intervalo, um exemplo prático e uma recomendação de uso (entre 60 e 3.600 segundos).

## Dependências / Relacionamentos
- Consome o contexto `EstatisticaContext` via `useEstatisticas()`.
- Usa `utils/validations.js` (`validateIntervalo`) e `utils/formatters.js` (`formatDuration`, `formatDateTime`).
- É registrada como rota `/configuracao` em `routes/AppRoutes.jsx`.

## Observações
O botão de atualização é inteligentemente desabilitado quando o valor digitado é idêntico ao intervalo já salvo (`String(intervalo) === novoIntervalo`), evitando chamadas desnecessárias à API.
