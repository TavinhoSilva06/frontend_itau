# SkeletonCard.jsx

**Caminho original:** `src/components/SkeletonCard.jsx`

## Descrição geral
Componente de *placeholder* visual ("esqueleto de carregamento") que simula a estrutura de um `StatCard` enquanto os dados reais ainda estão sendo carregados da API, melhorando a percepção de performance da interface.

## Conteúdo detalhado

### Props (documentadas via JSDoc no topo do arquivo)
| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `count` | `number` | `5` | Quantidade de cartões-esqueleto a serem renderizados. |

### Lógica interna
- Usa `Array.from({ length: count }).map(...)` para gerar `count` blocos repetidos.
- Cada bloco é uma `<div>` com estilo de cartão (fundo branco, borda, sombra) e animação `animate-pulse` (classe utilitária nativa do Tailwind), simulando:
  - Duas barras retangulares cinza representando um título e um valor (parte textual).
  - Um quadrado cinza representando o espaço de um ícone.

## Dependências / Relacionamentos
- Não importa nada de outros módulos.
- É usado em `pages/Dashboard.jsx`, exibido no lugar dos `StatCard` reais enquanto `loading` é `true` e ainda não há dados de estatísticas (`!estatisticas.count`), com `count={5}` (correspondendo aos 5 cartões de estatística exibidos no dashboard).

## Observações
Complementa visualmente o componente `StatCard.jsx`, imitando sua estrutura de layout (título + valor + ícone) para uma transição mais suave entre o estado de carregamento e o estado com dados.
