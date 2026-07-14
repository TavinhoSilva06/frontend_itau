# ErrorAlert.jsx

**Caminho original:** `src/components/ErrorAlert.jsx`

## Descrição geral
Componente de alerta visual para exibir mensagens de erro de forma destacada (fundo vermelho claro, ícone e opção de fechar), usado em várias páginas para exibir erros vindos da API ou de validações.

## Conteúdo detalhado

### Imports
- `AlertCircle`, `X` de `lucide-react`: ícones usados para representar o alerta e o botão de fechar, respectivamente.

### Props
| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `message` | `string` | — | Texto da mensagem de erro exibida. Se `null`/vazio, o componente não renderiza nada (`return null`). |
| `onDismiss` | `Function` | — | Callback chamado ao clicar no botão de fechar. |
| `dismissible` | `boolean` | `true` | Controla se o botão de fechar (`X`) é exibido. |

### Lógica interna
- Se `message` for falsy, o componente retorna `null` (não renderiza nada).
- Caso contrário, renderiza uma `<div>` estilizada com ícone `AlertCircle`, o texto da mensagem, e, se `dismissible` for `true` **e** `onDismiss` for fornecido, um botão com ícone `X` para fechar o alerta.

## Dependências / Relacionamentos
- Depende da biblioteca externa `lucide-react` para os ícones.
- É usado em:
  - `pages/Dashboard.jsx` (exibe erros ao carregar estatísticas).
  - `pages/NovaTransacao.jsx` (exibe erros da API ao criar transação, com `onDismiss` para fechar).
  - `pages/Historico.jsx` (exibe erros ao carregar/limpar transações).
  - `pages/Configuracao.jsx` (exibe erros ao carregar/atualizar configurações).

## Observações
Componente puramente de apresentação (não contém lógica de negócio); toda a lógica de captura de erro é feita nos contextos (`TransacaoContext`, `EstatisticaContext`) e nas páginas que o consomem.
