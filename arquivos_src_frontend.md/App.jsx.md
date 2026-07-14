# App.jsx

**Caminho original:** `src/App.jsx`

## Descrição geral
Componente raiz da aplicação React. É responsável por montar a árvore de *providers* de contexto global e renderizar o sistema de rotas, além de configurar o componente de notificações (toasts) usado em toda a aplicação.

## Conteúdo detalhado

### Imports
- `Toaster` de `react-hot-toast`: componente que renderiza as notificações (toasts) na tela.
- `AppRoutes` (`./routes/AppRoutes`): componente que define todas as rotas da aplicação.
- `TransacaoProvider` (`./context/TransacaoContext`): provider do contexto de transações.
- `EstatisticaProvider` (`./context/EstatisticaContext`): provider do contexto de estatísticas.

### Estrutura do componente `App`
O componente `App` não recebe props e retorna a seguinte hierarquia:

```
TransacaoProvider
  └── EstatisticaProvider
        ├── AppRoutes
        └── Toaster (configurado)
```

Isso garante que **todas as páginas e componentes filhos** (renderizados dentro de `AppRoutes`) tenham acesso aos dados e funções expostos pelos contextos de transações e estatísticas via hooks (`useTransacoes` e `useEstatisticas`).

### Configuração do `Toaster`
O `Toaster` é configurado com:
- `position="top-right"`: toasts aparecem no canto superior direito.
- `reverseOrder={false}`: novos toasts aparecem abaixo dos existentes.
- `gutter={8}`: espaçamento de 8px entre toasts.
- `toastOptions`: estilos customizados:
  - Estilo padrão: fundo branco, texto preto, borda arredondada e sombra suave.
  - Estilo de **sucesso**: fundo verde claro (`#d1fae5`), texto verde escuro (`#065f46`), ícone verde (`#10b981`).
  - Estilo de **erro**: fundo vermelho claro (`#fee2e2`), texto vermelho escuro (`#7f1d1d`), ícone vermelho (`#ef4444`).
  - Duração padrão de exibição: `4000` ms.

## Dependências / Relacionamentos
- Depende de `AppRoutes` para renderizar as páginas (`Dashboard`, `NovaTransacao`, `Configuracao`, `Historico`).
- Depende dos providers `TransacaoProvider` e `EstatisticaProvider` para fornecer estado global à aplicação.
- É importado e renderizado por `main.jsx`, sendo o ponto de entrada visual da aplicação.
- As páginas e componentes (ex.: `Dashboard.jsx`, `NovaTransacao.jsx`) usam `toast.success(...)` e `toast.error(...)` da biblioteca `react-hot-toast`, que são exibidos através do `Toaster` configurado aqui.

## Observações
- O arquivo `App.css`, que existe na mesma pasta, **não é importado neste componente** — o estilo real do projeto vem do Tailwind CSS (via `index.css`) e não das classes definidas em `App.css`.
