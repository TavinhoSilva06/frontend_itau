# AppRoutes.jsx

**Caminho original:** `src/routes/AppRoutes.jsx`

## Descrição geral
Componente central de roteamento da aplicação. Define, usando `react-router-dom`, todas as rotas disponíveis e qual página (componente) deve ser renderizada para cada uma delas.

## Conteúdo detalhado

### Imports
- `BrowserRouter`, `Routes`, `Route` de `react-router-dom`.
- Páginas: `Dashboard`, `NovaTransacao`, `Configuracao`, `Historico` (todas de `../pages/`).

### Rotas definidas
| Caminho (`path`) | Componente renderizado |
|---|---|
| `/` | `Dashboard` |
| `/nova-transacao` | `NovaTransacao` |
| `/configuracao` | `Configuracao` |
| `/historico` | `Historico` |

### Estrutura
```jsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/nova-transacao" element={<NovaTransacao />} />
    <Route path="/configuracao" element={<Configuracao />} />
    <Route path="/historico" element={<Historico />} />
  </Routes>
</BrowserRouter>
```

## Dependências / Relacionamentos
- Depende da biblioteca `react-router-dom`.
- Importa e renderiza as quatro páginas da pasta `pages/`.
- É importado e renderizado por `App.jsx`, dentro dos providers de contexto (`TransacaoProvider` e `EstatisticaProvider`), garantindo que todas as páginas tenham acesso aos dados globais.
- As rotas aqui definidas correspondem exatamente aos links de navegação definidos em `components/Sidebar.jsx`.

## Observações
Não há rota de fallback (ex.: página "404 - Não encontrada") definida para caminhos que não correspondem a nenhuma das quatro rotas listadas.
