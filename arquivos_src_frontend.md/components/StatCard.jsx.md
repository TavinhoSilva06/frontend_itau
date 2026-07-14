# StatCard.jsx

**Caminho original:** `src/components/StatCard.jsx`

## Descrição geral
Componente especializado para exibir uma métrica/estatística individual (título, valor formatado e ícone), usado nos cinco cartões de resumo do Dashboard (total de transações, soma, média, mínimo e máximo).

## Conteúdo detalhado

### Imports
- `Card` (`./Card`): usado como wrapper visual base do cartão.
- `formatCurrency` (`../utils/formatters`): função utilizada para formatar valores monetários em Real brasileiro (BRL).

### Props (documentadas via JSDoc no topo do arquivo)
| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `title` | `string` | — | Título/rótulo da estatística (ex.: "Soma Total"). |
| `value` | `number` | — | Valor numérico a ser exibido. |
| `icon` | `React.ReactNode` (componente) | — | Componente de ícone (do `lucide-react`) exibido ao lado do valor. |
| `trend` | `string` | `null` | Tendência opcional: `'up'`, `'down'` ou `'neutral'`. |
| `valueFormat` | `string` | `'currency'` | Formato de exibição do valor: `'currency'`, `'number'` ou `'text'`. |

### Lógica interna
- `formatValue()`: retorna `'--'` se `value` for `null`/`undefined`; caso contrário, formata o valor conforme `valueFormat`:
  - `'currency'`: usa `formatCurrency` (formato `R$ 1.234,56`).
  - `'number'`: usa `toLocaleString('pt-BR')` (separadores de milhar no padrão brasileiro).
  - `'text'` (ou padrão): converte para `String(value)`.
- `trendColor`: mapeia cada valor de `trend` para uma classe de cor Tailwind (`up` → verde, `down` → vermelho, `neutral` → cinza).
- Renderiza um `Card` contendo o título, o valor formatado e, se `icon` for fornecido, um ícone dentro de um contêiner laranja claro (`bg-orange-100`).
- Se `trend` for fornecido, exibe um texto indicando a tendência: "↑ Crescendo", "↓ Caindo" ou "→ Estável".

## Dependências / Relacionamentos
- Depende de `components/Card.jsx` (wrapper visual) e `utils/formatters.js` (formatação de moeda).
- É usado em `pages/Dashboard.jsx` para renderizar os 5 cartões de estatísticas: "Total de Transações" (`valueFormat="number"`), "Soma Total", "Valor Médio", "Valor Mínimo" e "Valor Máximo" (todos `valueFormat="currency"`).
- Os ícones utilizados nesses cartões (`Hash`, `DollarSign`, `TrendingUp`, `MinusCircle`, `PlusCircle`) vêm da biblioteca `lucide-react` e são passados como prop `icon` pela página `Dashboard.jsx`.

## Observações
A prop `trend` está implementada e funcional, mas **não é utilizada atualmente** em nenhuma chamada do componente dentro de `Dashboard.jsx` — é um recurso disponível para uso futuro (ex.: comparação com período anterior).
