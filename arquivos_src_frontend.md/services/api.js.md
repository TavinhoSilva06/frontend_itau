# api.js

**Caminho original:** `src/services/api.js`

## Descrição geral
Módulo de configuração central do cliente HTTP (Axios) usado para todas as chamadas à API do back-end. Cria e exporta uma instância pré-configurada do Axios, evitando repetição de configuração (URL base, headers) em cada chamada de API do projeto.

## Conteúdo detalhado

### Imports
- `axios`: biblioteca de cliente HTTP.

### Configuração
```js
const api = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type": "application/json"
    }
});
```
- `baseURL`: define que todas as requisições feitas através desta instância terão como base o endereço `http://localhost:8080` (endereço padrão de desenvolvimento do back-end, presumivelmente Spring Boot, conforme indicado no rodapé da aplicação — ver `components/Footer.jsx`).
- `headers`: define o cabeçalho padrão `Content-Type: application/json` para todas as requisições.

### Export
`export default api;` — exporta a instância configurada como padrão do módulo.

## Dependências / Relacionamentos
- Depende da biblioteca externa `axios`.
- É importado e utilizado por:
  - `context/TransacaoContext.jsx` (chamadas `POST`/`DELETE` para transações).
  - `context/EstatisticaContext.jsx` (chamadas `GET`/`PUT` para estatísticas e intervalo).
  - `hooks/useApiCall.js` (importado, mas não utilizado diretamente no hook — a função de chamada é passada como parâmetro).

## Observações
- A URL base é **fixa** (`http://localhost:8080`), diferente do padrão usado em `utils/constants.js`, onde `API_BASE_URL` é definido de forma configurável via variável de ambiente (`import.meta.env.VITE_API_URL`). Isso significa que, atualmente, **a URL configurável em `constants.js` não é utilizada por este arquivo** — a aplicação sempre apontará para `localhost:8080`, independentemente de variáveis de ambiente, a menos que este arquivo seja atualizado para usar `API_BASE_URL`.
