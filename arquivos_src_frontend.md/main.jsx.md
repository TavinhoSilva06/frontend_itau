# main.jsx

**Caminho original:** `src/main.jsx`

## Descrição geral
Ponto de entrada (*entry point*) da aplicação React. É o primeiro arquivo JavaScript executado no navegador (referenciado pelo `index.html` através do Vite) e é responsável por montar a árvore de componentes React na `DOM`.

## Conteúdo detalhado

### Imports
- `StrictMode` de `react`: habilita verificações e avisos extras do React em tempo de desenvolvimento (detecta efeitos colaterais inesperados, APIs obsoletas, etc.).
- `createRoot` de `react-dom/client`: API do React 18+/19 para criar a raiz de renderização concorrente.
- `./index.css`: importa os estilos globais da aplicação (que por sua vez importam Tailwind CSS e os arquivos de `styles/`).
- `App` de `./App.jsx`: componente raiz da aplicação.

### Lógica
```js
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```
1. Localiza o elemento HTML com `id="root"` (definido no `index.html`, fora do `src`).
2. Cria uma raiz de renderização React nesse elemento.
3. Renderiza o componente `App`, envolvido por `StrictMode`.

## Dependências / Relacionamentos
- Importa e renderiza `App.jsx`, que por sua vez contém todos os providers e rotas da aplicação.
- Importa `index.css`, ativando o carregamento em cascata de todos os estilos globais (Tailwind, variáveis e animações).
- É referenciado diretamente pelo `index.html` da raiz do projeto (fora da pasta `src`) como script de entrada do Vite (`type="module"`).

## Observações
Este arquivo segue exatamente o padrão gerado por `create vite@latest` para projetos React e normalmente não precisa de alterações, exceto quando se deseja adicionar providers globais adicionais (embora, neste projeto, os providers de contexto já estejam encapsulados dentro de `App.jsx`, e não aqui).
