# Sidebar.jsx

**Caminho original:** `src/components/Sidebar.jsx`

## Descrição geral
Componente de barra lateral de navegação, exibido em todas as páginas que utilizam o `MainLayout`. Contém os links (rotas) principais do sistema, permitindo a navegação entre as páginas do dashboard, criação de transação, configuração e histórico.

## Conteúdo detalhado

### Imports
- `NavLink` de `react-router-dom`: componente de link de navegação que preserva o histórico do navegador e permite estilização baseada na rota ativa.
- `LayoutDashboard`, `PlusCircle`, `Settings`, `History` de `lucide-react`: ícones exibidos ao lado de cada link.

### Lógica interna
- Não recebe props e não possui estado.
- Renderiza um `<aside>` com fundo escuro (`bg-slate-900`), texto branco, largura fixa (`w-64`) e altura mínima igual à altura da tela (`min-h-screen`).
- Dentro de um `<nav>` em coluna (`flex flex-col`), define quatro links (`NavLink`) com ícone + texto:
  | Rota | Ícone | Texto |
  |---|---|---|
  | `/` | `LayoutDashboard` | Dashboard |
  | `/nova-transacao` | `PlusCircle` | Nova Transação |
  | `/configuracao` | `Settings` | Configuração |
  | `/historico` | `History` | Histórico |
- Cada link possui efeito hover que altera a cor do texto para laranja (`hover:text-orange-400`).

## Dependências / Relacionamentos
- Depende de `react-router-dom` (para navegação) e `lucide-react` (para ícones).
- As rotas referenciadas (`/`, `/nova-transacao`, `/configuracao`, `/historico`) correspondem exatamente às rotas definidas em `routes/AppRoutes.jsx`.
- É importado e renderizado por `layouts/MainLayout.jsx`, aparecendo em todas as páginas do sistema.

## Observações
Não há lógica para destacar visualmente o link ativo (ex.: uso de `isActive` do `NavLink` para aplicar uma classe diferente) — todos os links compartilham o mesmo estilo, independentemente da rota atual.
