# FormInput.jsx

**Caminho original:** `src/components/FormInput.jsx`

## Descrição geral
Componente de campo de formulário reutilizável, que encapsula um `<label>`, um `<input>` e uma mensagem de erro opcional, com estilização condicional baseada na presença de erro de validação.

## Conteúdo detalhado

### Props (documentadas via JSDoc no topo do arquivo)
| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `label` | `string` | — | Rótulo exibido acima do campo. Se não informado, o `<label>` não é renderizado. |
| `type` | `string` | `'text'` | Tipo do input HTML (`text`, `number`, `date`, `datetime-local`, etc.). |
| `value` | `string \| number` | — | Valor controlado do campo. |
| `onChange` | `Function` | — | Callback chamado ao alterar o valor. |
| `error` | `string` | — | Mensagem de erro; se presente, altera o estilo do input (borda/fundo vermelhos) e exibe o texto do erro abaixo do campo. |
| `placeholder` | `string` | `''` | Texto de placeholder. |
| `required` | `boolean` | `false` | Se `true`, exibe um asterisco vermelho (`*`) ao lado do label. |
| `className` | `string` | `''` | Classes Tailwind adicionais aplicadas ao contêiner externo. |
| `...props` | — | — | Demais atributos HTML (ex.: `name`, `min`, `max`, `step`) são propagados ao `<input>`. |

### Lógica interna
- Renderiza o `<label>` apenas se `label` for informado (com asterisco vermelho se `required`).
- O `<input>` recebe classes Tailwind condicionais: se `error` estiver presente, aplica borda e fundo vermelhos com anel de foco vermelho; caso contrário, usa borda cinza padrão com anel de foco laranja.
- Exibe a mensagem de erro (`<p>` vermelho) abaixo do input, se `error` for fornecido.

## Dependências / Relacionamentos
- Não importa nada de outros módulos.
- É usado em:
  - `pages/NovaTransacao.jsx` (campos "Valor (R$)" e "Data e Hora").
  - `pages/Configuracao.jsx` (campo "Novo Intervalo (segundos)").

## Observações
A validação em si (regras de negócio) não é feita neste componente — ele apenas **exibe** o resultado da validação (mensagem de erro), que é calculada externamente pelas funções em `utils/validations.js` e passada via prop `error`.
