# animations.css

**Caminho original:** `src/styles/animations.css`

## Descrição geral
Arquivo que centraliza **animações CSS globais** (`@keyframes`) e classes utilitárias reutilizáveis de animação/transição/efeitos visuais, usadas para dar mais dinamismo à interface (entradas suaves, indicadores de carregamento, efeitos de hover, gradientes, etc.).

## Conteúdo detalhado

### Animações de entrada (fade/slide/scale)
- `@keyframes fadeIn` + `.animate-fade-in`: transição de opacidade `0` → `1`.
- `@keyframes slideInLeft` + `.animate-slide-in-left`: entrada deslizando da esquerda (`translateX(-20px)` → `0`) com fade.
- `@keyframes slideInRight` + `.animate-slide-in-right`: entrada deslizando da direita (`translateX(20px)` → `0`) com fade.
- `@keyframes slideInTop` + `.animate-slide-in-top`: entrada deslizando de cima (`translateY(-20px)` → `0`) com fade.
- `@keyframes scaleIn` + `.animate-scale-in`: entrada com leve aumento de escala (`scale(0.95)` → `1`) com fade.

### Animações de destaque/loading
- `@keyframes pulse` + `.animate-pulse-custom`: pulsação de opacidade (`1` ↔ `0.5`) infinita.
- `@keyframes bounce` + `.animate-bounce-custom`: quique vertical (`translateY(0)` ↔ `translateY(-10px)`) infinito.
- `@keyframes skeleton-loading` + classes `.skeleton`, `.skeleton-text`, `.skeleton-title`: alternância de cor de fundo (tons de cinza-azulado) simulando um placeholder de carregamento (efeito "esqueleto").
- `@keyframes spin` + `.animate-spin-custom`: rotação contínua de 360°.
- `@keyframes shimmer` + `.shimmer`: efeito de "brilho deslizante" usando gradiente linear animado, comumente usado em placeholders de carregamento.

### Classes utilitárias de interação
- `.hover-scale` (+ `:hover`): aumenta levemente o elemento (`scale(1.05)`) ao passar o mouse.
- `.hover-color`: transição suave de cor de texto/fundo.
- `.transition-smooth` / `.transition-smooth-slow`: transições genéricas de todas as propriedades (200ms / 300ms).

### Classes utilitárias visuais (branding)
- `.gradient-bg`: fundo em gradiente diagonal laranja (`#ff9500` → `#ff8a00`), cores do branding do Itaú.
- `.text-gradient`: aplica o mesmo gradiente laranja como cor do texto, usando `background-clip: text`.

## Dependências / Relacionamentos
- É importado por `index.css` (`@import "./styles/animations.css";`), tornando todas as classes disponíveis globalmente.
- A classe `.skeleton` (e variantes) complementa visualmente componentes como `components/SkeletonCard.jsx`, embora este componente utilize a classe nativa `animate-pulse` do Tailwind em vez das classes `.skeleton*` definidas aqui.

## Observações
Diversas classes definidas neste arquivo (`.animate-slide-in-*`, `.animate-scale-in`, `.hover-scale`, `.gradient-bg`, `.text-gradient`, `.shimmer`, etc.) **não foram encontradas em uso ativo** nos componentes/páginas atuais do projeto — parecem ser um conjunto de utilitários preparados para uso futuro ou para enriquecer a interface com mais transições e efeitos visuais.
