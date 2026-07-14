# validations.js

**Caminho original:** `src/utils/validations.js`

## Descrição geral
Módulo de funções utilitárias puras para **validação de dados de formulário** no lado do cliente (front-end), antes de enviar informações à API. Cobre validação de valores de transação, datas e intervalos de estatísticas, seguindo um padrão de retorno consistente (`{ isValid, error }` ou `{ isValid, errors }`).

## Conteúdo detalhado

### Import
- `VALIDATIONS`, `MESSAGES` de `./constants`: limites numéricos e mensagens de erro padronizadas.

### `validateValor(valor)`
Valida o valor de uma transação.
- Retorna erro `'Valor é obrigatório'` se `valor` for `null`, `undefined` ou string vazia.
- Retorna erro `'Valor deve ser um número'` se `parseFloat(valor)` resultar em `NaN`.
- Retorna erro `MESSAGES.ERRO.VALOR_INVALIDO` (`'Valor deve ser maior ou igual a 0'`) se o valor numérico for menor que `VALIDATIONS.VALOR_MINIMO` (`0`).
- Caso contrário, retorna `{ isValid: true }`.

### `validateData(dataHora)`
Valida a data/hora de uma transação.
- Retorna erro `'Data e hora são obrigatórias'` se `dataHora` for falsy.
- Retorna erro `'Data inválida'` se a data não puder ser interpretada (`isNaN(data.getTime())`).
- Retorna erro `MESSAGES.ERRO.DATA_INVALIDA` (`'Data não pode ser futura'`) se a data informada for posterior ao momento atual (`data > agora`).
- Caso contrário, retorna `{ isValid: true }`.

### `validateIntervalo(intervalo)`
Valida um valor de intervalo (em segundos) para as configurações de estatísticas.
- Retorna erro `'Intervalo é obrigatório'` se `intervalo` for `null`, `undefined` ou string vazia.
- Retorna erro `'Intervalo deve ser um número'` se `parseInt(intervalo, 10)` resultar em `NaN`.
- Retorna erro `MESSAGES.ERRO.INTERVALO_INVALIDO` (`'Intervalo deve estar entre 1 segundo e 24 horas'`) se o valor estiver fora do intervalo `[VALIDATIONS.INTERVALO_MINIMO, VALIDATIONS.INTERVALO_MAXIMO]` (ou seja, fora de `[1, 86400]`).
- Caso contrário, retorna `{ isValid: true }`.

### `validateTransacao(transacao)`
Validação composta de uma transação completa (`{ valor, dataHora }`):
- Executa `validateValor(transacao.valor)` e `validateData(transacao.dataHora)`.
- Monta um objeto `errors` com as chaves `valor` e/ou `dataHora`, preenchidas apenas se a respectiva validação falhar.
- Retorna `{ isValid: Object.keys(errors).length === 0, errors }`.

## Dependências / Relacionamentos
- Depende de `utils/constants.js` (`VALIDATIONS`, `MESSAGES`).
- É utilizado por:
  - `pages/NovaTransacao.jsx` (`validateTransacao`, chamado no `handleSubmit` antes de enviar a transação à API).
  - `pages/Configuracao.jsx` (`validateIntervalo`, chamado no `handleUpdateIntervalo` antes de enviar o novo intervalo à API).

## Observações
As funções `validateValor` e `validateData` são usadas internamente por `validateTransacao`, mas também estão exportadas individualmente, podendo ser reaproveitadas de forma independente em outros formulários, se necessário no futuro.
