# Navbar.jsx

**Caminho original:** `src/components/Navbar.jsx`

## Descrição geral
Componente de barra de navegação superior (cabeçalho fixo no topo), exibido em todas as páginas que utilizam o `MainLayout`. Contém o título/marca do sistema e um subtítulo.

## Conteúdo detalhado
- Não recebe props.
- Renderiza um elemento `<header>` com fundo laranja (`bg-orange-500`), texto branco, altura fixa (`h-16`) e sombra (`shadow-lg`), organizado com `flex` para distribuir os itens entre as extremidades (`justify-between`).
- Conteúdo:
  - `<h1>`: título "ITAU Challenge" em destaque (fonte grande e em negrito).
  - `<span>`: subtítulo "API Dashboard" em fonte menor, alinhado à direita.

## Dependências / Relacionamentos
- Não importa nada de outros módulos.
- É importado e renderizado por `layouts/MainLayout.jsx`, aparecendo, portanto, em todas as páginas do sistema (`Dashboard`, `NovaTransacao`, `Configuracao`, `Historico`).

## Observações
Componente estático — não possui estado, interatividade ou navegação (diferente de `Sidebar.jsx`, que contém os links de navegação entre páginas).
