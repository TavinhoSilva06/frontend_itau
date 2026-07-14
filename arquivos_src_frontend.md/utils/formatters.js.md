# formatters.js

**Caminho original:** `src/utils/formatters.js`

## Descrição geral
Módulo de funções utilitárias puras para **formatação de dados** exibidos na interface: valores monetários, datas/horas e durações em segundos, todas seguindo o padrão brasileiro (`pt-BR`) de formatação.

## Conteúdo detalhado

### `formatCurrency(valor)`
Formata um número como moeda brasileira (BRL) usando `Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })`.
- Retorna `'R$ 0,00'` se `valor` for `null`/`undefined`.
- Exemplo de saída: `"R$ 1.234,56"`.

### `formatDateTime(dataHora)`
Formata uma data/hora (string ISO ou objeto `Date`) em formato legível brasileiro completo (dia, mês, ano, hora, minuto, segundo), usando `Intl.DateTimeFormat('pt-BR', {...})`.
- Retorna `'--/--/---- --:--:--'` se `dataHora` for falsy.
- Retorna `'Data inválida'` se a data não puder ser interpretada (`isNaN(data.getTime())`).
- Exemplo de saída: `"09/07/2026 14:30:45"`.

### `formatDate(data)`
Formata apenas a parte da data (sem hora), usando `Intl.DateTimeFormat('pt-BR')`.
- Retorna `'--/--/----'` se `data` for falsy.
- Retorna `'Data inválida'` se a data não puder ser interpretada.
- Exemplo de saída: `"09/07/2026"`.

### `formatIntervalo(segundos)`
Converte uma quantidade de segundos em uma representação curta e legível:
- Retorna `'0s'` se `segundos` for `0`, negativo ou falsy.
- Se menor que 60: retorna em segundos (ex.: `"45s"`).
- Se menor que 3600: retorna em minutos, arredondado para baixo (ex.: `"30m"`).
- Caso contrário: retorna em horas, arredondado para baixo (ex.: `"2h"`).

### `formatDuration(segundos)`
Converte uma quantidade de segundos no formato `HH:mm:ss`.
- Retorna `'00:00:00'` se `segundos` for `0`, negativo ou falsy.
- Calcula horas, minutos e segundos restantes, preenchendo cada parte com zero à esquerda (`padStart(2, '0')`).
- Exemplo de saída: `"02:30:45"`.

### `truncateText(texto, maxLength = 50)`
Trunca uma string para um comprimento máximo, adicionando `"..."` ao final se o texto exceder o limite.
- Retorna `''` se `texto` for falsy.
- Se `texto.length <= maxLength`, retorna o texto original sem alterações.

## Dependências / Relacionamentos
- Não depende de nenhum outro módulo do projeto (funções puras, sem efeitos colaterais).
- É utilizado por:
  - `components/StatCard.jsx` (`formatCurrency`).
  - `pages/Dashboard.jsx` (`formatCurrency`, usado nos tooltips dos gráficos e no resumo).
  - `pages/Historico.jsx` (`formatCurrency`, `formatDateTime`).
  - `pages/Configuracao.jsx` (`formatDuration`, `formatDateTime`).

## Observações
As funções `formatDate`, `formatIntervalo` e `truncateText` estão implementadas, mas **não possuem uso ativo** em nenhum componente ou página do projeto atualmente — estão disponíveis para uso futuro.
