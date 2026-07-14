# variables.css

**Caminho original:** `src/styles/variables.css`

## Descrição geral
Arquivo que centraliza as **variáveis CSS globais** (custom properties) do projeto, definindo a paleta de cores (incluindo o branding do Itaú), cores de status, sombras, transições, espaçamentos e raios de borda usados consistentemente em toda a aplicação. Também define ajustes automáticos de algumas variáveis para o modo escuro do sistema operacional/navegador.

## Conteúdo detalhado

Todas as variáveis são declaradas dentro do seletor `:root`, tornando-as acessíveis globalmente via `var(--nome-da-variavel)`.

### Cores primárias (branding Itaú)
- `--color-primary-orange: #ff9500`
- `--color-primary-orange-dark: #ff8a00`
- `--color-primary-orange-light: #ffa500`

### Cores neutras (escala de cinza, 50 a 900)
- `--color-gray-50` até `--color-gray-900`, seguindo a convenção de escala do Tailwind CSS (do mais claro ao mais escuro).

### Cores de status
- Sucesso: `--color-success` (`#10b981`) e `--color-success-light` (`#d1fae5`).
- Perigo/erro: `--color-danger` (`#ef4444`) e `--color-danger-light` (`#fee2e2`).
- Aviso: `--color-warning` (`#f59e0b`) e `--color-warning-light` (`#fef3c7`).
- Informação: `--color-info` (`#3b82f6`) e `--color-info-light` (`#dbeafe`).

### Sombras
- `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-xl`: valores de `box-shadow` com intensidade crescente.

### Transições
- `--transition-fast` (150ms), `--transition-base` (200ms), `--transition-slow` (300ms), todas com `ease-in-out`.

### Espaçamentos (spacing)
- `--space-xs` (0.25rem) até `--space-2xl` (3rem).

### Raios de borda (border-radius)
- `--radius-sm` (0.375rem) até `--radius-full` (9999px, círculo perfeito).

### Modo escuro
```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-gray-50: #0f172a;
    --color-gray-100: #1e293b;
    --color-gray-200: #334155;
    --color-gray-700: #e2e8f0;
    --color-gray-800: #f1f5f9;
    --color-gray-900: #f8fafc;
  }
}
```
Inverte parcialmente a escala de cinza quando o sistema do usuário está em modo escuro (`prefers-color-scheme: dark`), redefinindo apenas algumas das variáveis de cinza (não todas).

## Dependências / Relacionamentos
- É importado por `index.css` (`@import "./styles/variables.css";`), tornando as variáveis disponíveis globalmente.
- A variável `--color-primary-orange` é usada em `index.css` (regra `::selection`).
- As demais variáveis de cor, sombra, espaçamento e raio **estão definidas, mas atualmente a maior parte do estilo visual dos componentes é feita diretamente via classes utilitárias do Tailwind CSS** (ex.: `bg-orange-500`, `shadow-md`), não através destas variáveis CSS customizadas.

## Observações
- O comentário "Modo Escuro (Opcional)" no código-fonte indica que o suporte a modo escuro é parcial/experimental e não foi testado ou aplicado de forma abrangente em todos os componentes.
