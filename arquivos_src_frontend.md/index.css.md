# index.css

**Caminho original:** `src/index.css`

## Descrição geral
Arquivo central de estilos globais da aplicação. É o primeiro (e único) arquivo CSS importado diretamente pelo código JavaScript (via `main.jsx`) e atua como ponto de agregação de todo o CSS do projeto, incluindo o Tailwind CSS e os arquivos auxiliares da pasta `styles/`.

## Conteúdo detalhado

### Imports (no topo do arquivo)
```css
@import "tailwindcss";
@import "./styles/variables.css";
@import "./styles/animations.css";
```
- `@import "tailwindcss";`: carrega o framework Tailwind CSS (v4, sintaxe de import único da nova versão), habilitando todas as classes utilitárias usadas nos componentes (ex.: `bg-orange-500`, `flex`, `rounded-lg`).
- `@import "./styles/variables.css";`: importa as variáveis CSS globais (cores, sombras, espaçamentos, border-radius) usadas em todo o projeto.
- `@import "./styles/animations.css";`: importa as animações e classes utilitárias de transição/efeitos visuais (fade, slide, skeleton, shimmer, etc.).

### Estilos globais definidos
- `html { scroll-behavior: smooth; }`: rolagem suave da página.
- `body`: define uma pilha de fontes (`font-family`) baseada em fontes de sistema (`-apple-system`, `Segoe UI`, `Roboto`, etc.) e ativa suavização de fontes (`font-smoothing`) para melhor renderização visual.
- **Estilização da barra de rolagem** (`::-webkit-scrollbar` e variantes `-track`/`-thumb`/`-thumb:hover`): define uma barra de rolagem fina (8px), com trilha cinza clara (`#f1f5f9`) e "polegar" (thumb) em tons de cinza (`#cbd5e1` / `#94a3b8` no hover).
- **`::selection`**: define a cor de fundo do texto selecionado pelo usuário usando a variável `--color-primary-orange` (laranja do Itaú/branding), com texto branco.

## Dependências / Relacionamentos
- É importado por `main.jsx`, sendo carregado uma única vez na inicialização da aplicação.
- Depende de `styles/variables.css` (para a variável `--color-primary-orange` usada em `::selection`) e de `styles/animations.css` (para as classes de animação usadas por componentes como `SkeletonCard.jsx`).
- Habilita o uso do Tailwind CSS em todo o projeto — todos os componentes (`Button.jsx`, `Card.jsx`, páginas, etc.) dependem indiretamente deste arquivo para que suas classes utilitárias funcionem.

## Observações
Este é o arquivo de estilos mais importante do projeto: qualquer alteração nas variáveis de tema ou remoção do `@import "tailwindcss"` afeta a aparência de toda a aplicação.
