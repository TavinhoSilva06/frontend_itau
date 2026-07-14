# MainLayout.jsx

**Caminho original:** `src/layouts/MainLayout.jsx`

## Descrição geral
Componente de layout estrutural, usado como "molde" (wrapper) para todas as páginas do sistema. Define a estrutura visual comum: barra de navegação superior (`Navbar`), barra lateral (`Sidebar`), área de conteúdo principal (onde a página específica é renderizada) e rodapé (`Footer`).

## Conteúdo detalhado

### Imports
- `Navbar` (`../components/Navbar`).
- `Sidebar` (`../components/Sidebar`).
- `Footer` (`../components/Footer`).

### Props
| Prop | Tipo | Descrição |
|---|---|---|
| `children` | `React.ReactNode` | Conteúdo específico da página, renderizado na área principal (`<main>`). |

### Estrutura renderizada
```
<div> (fundo cinza claro, altura mínima da tela)
  ├── <Navbar />
  ├── <div> (flex)
  │     ├── <Sidebar />
  │     └── <main> (flex-1, padding) → {children}
  └── <Footer />
</div>
```

## Dependências / Relacionamentos
- Depende de `components/Navbar.jsx`, `components/Sidebar.jsx` e `components/Footer.jsx`.
- É importado e usado como wrapper em todas as páginas:
  - `pages/Dashboard.jsx`
  - `pages/NovaTransacao.jsx`
  - `pages/Configuracao.jsx`
  - `pages/Historico.jsx`

## Observações
Centraliza a estrutura visual comum da aplicação, evitando duplicação de `Navbar`/`Sidebar`/`Footer` em cada página individualmente. Qualquer alteração estrutural do layout geral (ex.: adicionar um breadcrumb, mudar a disposição do menu) deve ser feita aqui.
