# LoadingSpinner.jsx

**Caminho original:** `src/components/LoadingSpinner.jsx`

## Descrição geral
Componente de indicador de carregamento (spinner giratório em SVG), usado como tela de espera enquanto dados estão sendo buscados na API, antes de qualquer conteúdo estar disponível para exibição.

## Conteúdo detalhado

### Props (documentadas via JSDoc no topo do arquivo)
| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `size` | `string` | `'md'` | Tamanho do spinner: `'sm'` (24px), `'md'` (40px) ou `'lg'` (64px). |
| `centered` | `boolean` | `true` | Se `true`, centraliza o spinner verticalmente ocupando a altura mínima da tela (`min-h-screen`). |
| `text` | `string` | `''` | Texto opcional exibido abaixo do spinner. |

### Lógica interna
- `sizeClasses`: mapeia cada valor de `size` para classes Tailwind de largura/altura (`w-6 h-6`, `w-10 h-10`, `w-16 h-16`).
- `containerClass`: alterna entre um contêiner centralizado em tela cheia ou um contêiner simples, conforme `centered`.
- Renderiza um SVG animado (`animate-spin`) representando um círculo com opacidade parcial e um traçado destacado em laranja (`text-orange-500`).
- Se `text` for informado, exibe um parágrafo abaixo do spinner.

## Dependências / Relacionamentos
- Não importa nada de outros módulos.
- É usado em:
  - `pages/Dashboard.jsx` (com texto "Carregando estatísticas...").
  - `pages/Historico.jsx` (com texto "Carregando histórico...").
  - `pages/Configuracao.jsx` (com texto "Carregando configurações...").

## Observações
Todas as páginas usam este componente em conjunto com condições de `loading` vindas dos contextos globais (`useEstatisticas`, `useTransacoes`) para bloquear a exibição do conteúdo até que os dados iniciais sejam carregados.
