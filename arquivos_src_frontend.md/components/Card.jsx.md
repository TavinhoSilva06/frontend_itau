# Card.jsx

**Caminho original:** `src/components/Card.jsx`

## Descrição geral
Componente wrapper (contêiner) base e reutilizável, usado para envolver blocos de conteúdo com um estilo visual padronizado de "cartão" (fundo branco, borda sutil, sombra e cantos arredondados). É o bloco de construção visual mais usado em todas as páginas do sistema.

## Conteúdo detalhado

### Props
| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `title` | `string` | — | Título opcional exibido no topo do card, como um `<h3>`. |
| `children` | `React.ReactNode` | — | Conteúdo interno do card. |
| `className` | `string` | `''` | Classes Tailwind adicionais, mescladas às classes padrão. |

### Lógica interna
Renderiza uma `<div>` com classes Tailwind fixas (`bg-white`, `rounded-lg`, `shadow-md`, `p-6`, `border`, efeito de sombra maior no hover) combinadas com a prop `className`. Se `title` for fornecido, renderiza um `<h3>` estilizado antes do `children`.

## Dependências / Relacionamentos
- Não importa nada de outros módulos do projeto.
- É importado e usado por:
  - `components/StatCard.jsx` (como base visual dos cartões de estatística).
  - `pages/Dashboard.jsx` (cards "Distribuição de Valores", "Proporção de Valores", "Resumo").
  - `pages/NovaTransacao.jsx` (cards "Adicionar Transação" e "Exemplo").
  - `pages/Historico.jsx` (card da tabela de transações).
  - `pages/Configuracao.jsx` (cards "Intervalo de Estatísticas", "Histórico de Alterações", "Sobre o Intervalo de Estatísticas").

## Observações
Componente simples e altamente reutilizado — qualquer alteração de estilo aqui impacta visualmente quase toda a aplicação.
