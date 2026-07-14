# Footer.jsx

**Caminho original:** `src/components/Footer.jsx`

## Descrição geral
Componente simples de rodapé, exibido na parte inferior de todas as páginas que utilizam o `MainLayout`. Mostra um texto fixo informando as tecnologias usadas no desenvolvimento do projeto.

## Conteúdo detalhado
- Não recebe props.
- Renderiza um elemento `<footer>` com fundo escuro (`bg-slate-800`), texto cinza claro (`text-gray-300`), centralizado e com padding vertical, contendo o texto:
  > "Desenvolvido com React + Spring Boot + MongoDB"

## Dependências / Relacionamentos
- Não importa nada de outros módulos.
- É importado e renderizado por `layouts/MainLayout.jsx`, aparecendo, portanto, em todas as páginas do sistema (`Dashboard`, `NovaTransacao`, `Configuracao`, `Historico`).

## Observações
O texto do rodapé confirma que o back-end do projeto (fora do escopo desta pasta `src` do front-end) é construído com **Spring Boot** e persistência em **MongoDB**, informação útil para entender a stack full-stack completa do projeto "ITAU Challenge".
