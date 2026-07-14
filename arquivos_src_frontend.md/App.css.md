# App.css

**Caminho original:** `src/App.css`

## Descrição geral
Arquivo de estilos CSS que contém regras herdadas do template padrão gerado pelo Vite ao criar um projeto React (`create vite@latest`). Define estilos para uma seção de "hero" com logos sobrepostos, um contador de exemplo e uma seção de "próximos passos" (`next-steps`) com links, típicos da página inicial padrão do Vite.

## Conteúdo detalhado
Principais seletores definidos:

- **`.counter`**: estilo de um botão/contador de exemplo (fonte, padding, borda, cores via variáveis CSS `--accent`, `--accent-bg`, `--accent-border`), com estados `:hover` e `:focus-visible`.
- **`.hero`**: contêiner posicionado (`position: relative`) que organiza três elementos filhos (`.base`, `.framework`, `.vite`) usando `position: absolute` e transformações 3D (`perspective`, `rotateZ`, `rotateX`, `rotateY`, `scale`) para criar um efeito visual de logos sobrepostos e inclinados.
- **`#center`**: contêiner flexível centralizado (`flex-direction: column`, `place-content: center`, `place-items: center`), com ajuste de `padding` e `gap` em telas menores (`@media (max-width: 1024px)`).
- **`#next-steps`**: seção com `display: flex` e borda superior, dividindo o espaço em colunas que se tornam empilhadas (`flex-direction: column`) em telas menores.
- **`#docs`**: adiciona borda direita entre colunas da seção de próximos passos, que se transforma em borda inferior em telas menores.
- **`#next-steps ul`**: lista de links estilizada como *badges* (com ícone e texto), com efeito de sombra no hover e reorganização em grid de 2 colunas em telas menores.
- **`#spacer`**: elemento espaçador vertical com borda superior.
- **`.ticks`**: elemento decorativo que desenha pequenos "dentes" (triângulos) nas extremidades esquerda e direita usando `::before` e `::after`.

## Dependências / Relacionamentos
- Utiliza variáveis CSS (`--accent`, `--accent-bg`, `--accent-border`, `--border`, `--text-h`, `--social-bg`, `--shadow`) que **não são definidas neste arquivo** nem em `styles/variables.css` — são variáveis remanescentes do template padrão do Vite e não possuem definição visível no projeto atual.
- **Não é importado por nenhum outro arquivo** do projeto (nem `App.jsx`, nem `main.jsx`), portanto suas regras não têm efeito na aplicação atual.

## Observações
Este arquivo é um resquício (boilerplate) do template inicial do Vite/React e não reflete o design real do sistema, que é implementado com Tailwind CSS (ver `index.css` e `styles/`). Pode ser removido com segurança sem impactar a aplicação.
