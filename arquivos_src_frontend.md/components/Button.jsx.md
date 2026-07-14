# Button.jsx

**Caminho original:** `src/components/Button.jsx`

## Descrição geral
Componente de botão reutilizável, usado em todas as páginas do sistema (Dashboard, Nova Transação, Histórico, Configuração) para ações como enviar formulários, atualizar dados, cancelar operações e excluir registros. Suporta três variações visuais e um estado de carregamento (*loading*) com spinner animado embutido em SVG.

## Conteúdo detalhado

### Props (documentadas via JSDoc no topo do arquivo)
| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `variant` | `string` | `'primary'` | Estilo visual: `'primary'` (laranja), `'secondary'` (cinza) ou `'danger'` (vermelho). |
| `disabled` | `boolean` | `false` | Desabilita o botão (bloqueia clique e aplica opacidade reduzida). |
| `loading` | `boolean` | `false` | Exibe um ícone de spinner girando à esquerda do texto e desabilita o botão automaticamente. |
| `children` | `React.ReactNode` | — | Conteúdo/texto exibido dentro do botão. |
| `onClick` | `Function` | — | Callback de clique. |
| `className` | `string` | `''` | Classes Tailwind adicionais, mescladas às classes padrão. |
| `type` | `string` | `'button'` | Tipo HTML do botão (`button`, `submit`, `reset`). |
| `...props` | — | — | Demais atributos HTML são propagados (spread) para o elemento `<button>`. |

### Lógica interna
- `variantClasses`: objeto que mapeia cada variante (`primary`, `secondary`, `danger`) para classes Tailwind de cor de fundo/texto e efeito hover.
- `baseClasses`: classes comuns a todos os botões (padding, `border-radius`, transição de cor, alinhamento flex, e estado `disabled` visualmente esmaecido).
- O botão fica desabilitado quando `disabled || loading` é verdadeiro.
- Quando `loading` é `true`, um ícone SVG de spinner (círculo com opacidade parcial + traçado animado) é exibido antes do `children`, com a classe `animate-spin` do Tailwind.

## Dependências / Relacionamentos
- Não importa nada de outros módulos do projeto (é um componente "puro" de UI).
- É usado em:
  - `pages/Dashboard.jsx` (botão "Atualizar").
  - `pages/NovaTransacao.jsx` (botões "Criar Transação" e "Cancelar").
  - `pages/Historico.jsx` (botões "Exportar", "Limpar Tudo" e paginação).
  - `pages/Configuracao.jsx` (botão "Atualizar Intervalo").

## Observações
Segue o padrão de "componente controlado por variantes" comum em design systems, facilitando reuso e consistência visual em toda a aplicação.
