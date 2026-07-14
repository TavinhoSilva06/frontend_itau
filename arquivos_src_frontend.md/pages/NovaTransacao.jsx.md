# NovaTransacao.jsx

**Caminho original:** `src/pages/NovaTransacao.jsx`

## Descrição geral
Página de formulário para criação de uma nova transação (rota `/nova-transacao`). Permite ao usuário informar um valor e uma data/hora, valida os dados no front-end antes de enviá-los à API, e exibe feedback visual (toasts) de sucesso ou erro.

## Conteúdo detalhado

### Imports principais
- `useState` de `react`.
- `useNavigate` de `react-router-dom` (redirecionamento programático).
- `MainLayout` (`../layouts/MainLayout`).
- Componentes locais: `Card`, `Button`, `FormInput`, `ErrorAlert`.
- `useTransacoes` (`../context/TransacaoContext`).
- `validateTransacao` (`../utils/validations`).
- `toast` de `react-hot-toast`.
- Ícones `DollarSign`, `Calendar` de `lucide-react` (apenas `DollarSign` é efetivamente usado na renderização).

### Estado
- `formData`: objeto `{ valor: '', dataHora: '' }`, controlando os campos do formulário.
- `errors`: objeto com mensagens de erro de validação por campo.
- `apiError`: mensagem de erro retornada pela API, se houver.
- `maxDateTime`: calculado a partir de `new Date().toISOString().slice(0, 16)`, usado como limite máximo (`max`) do campo de data/hora, impedindo selecionar datas futuras diretamente no seletor do navegador.

### Funções
- **`handleInputChange(e)`**: atualiza o campo correspondente em `formData` e limpa o erro daquele campo, se existir.
- **`handleSubmit(e)`**:
  1. Previne o comportamento padrão do formulário (`e.preventDefault()`).
  2. Limpa `apiError`.
  3. Valida os dados com `validateTransacao(formData)`. Se inválido, define `errors` e exibe um toast de erro, interrompendo o envio.
  4. Se válido, converte `valor` para `float` e `dataHora` para ISO string, e chama `criarTransacao(transacao)` do contexto.
  5. Em caso de sucesso: exibe toast de sucesso ("Transação criada com sucesso! 🎉"), reseta o formulário e navega para `/` após 1.500 ms (`setTimeout`).
  6. Em caso de erro: define `apiError` e exibe toast de erro com a mensagem correspondente.

### Renderização
1. **Cabeçalho** com título "Nova Transação" e subtítulo.
2. **`Card` "Adicionar Transação"** contendo:
   - `ErrorAlert` (se `apiError` existir, com opção de fechar via `onDismiss`).
   - Formulário (`<form onSubmit={handleSubmit}>`) com:
     - `FormInput` para "Valor (R$)" (tipo `number`, `step="0.01"`, `min="0"`, obrigatório).
     - `FormInput` para "Data e Hora" (tipo `datetime-local`, `max={maxDateTime}`, obrigatório).
     - Bloco informativo azul com dica sobre as regras de validação.
     - Botões "Criar Transação" (`type="submit"`, com estado de loading) e "Cancelar" (navega para `/`).
3. **`Card` "Exemplo"**: exibe um exemplo estático de valor (`150,50`) e data (`09/07/2026 às 14:30`) para orientar o usuário sobre o formato esperado.

## Dependências / Relacionamentos
- Consome o contexto `TransacaoContext` via `useTransacoes()` (função `criarTransacao` e estado `loading`).
- Usa a função `validateTransacao` de `utils/validations.js` para validação client-side.
- Usa os componentes `Card`, `Button`, `FormInput`, `ErrorAlert` e o layout `MainLayout`.
- É registrada como rota `/nova-transacao` em `routes/AppRoutes.jsx`.

## Observações
A validação de data impede datas futuras (`validateData` em `utils/validations.js`), reforçando essa regra também na interface através do atributo `max` do input de data/hora.
