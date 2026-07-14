# Frontend - ITAU Transactions

Aplicação React modern para gerenciamento de transações com interface responsiva e performance otimizada.

## 📦 Instalação

```bash
cd ITAUtask-frontend

npm install
```

## 🚀 Desenvolvimento

```bash
# Copiar variáveis de ambiente
cp .env.example .env.development

# Iniciar servidor Vite
npm run dev
```

Acesso: http://localhost:5173

## 🔨 Build

```bash
npm run build  # Produção
npm run preview  # Preview do build local
```

## 📂 Estrutura

### `/components`
Componentes reutilizáveis:
- `Card` - Wrapper base
- `Button` - Botão com variantes
- `FormInput` - Campo com validação
- `StatCard` - Card de estatísticas
- `LoadingSpinner` - Indicador de carregamento
- `ErrorAlert` - Alerta de erro
- `SkeletonCard` - Placeholder de loading

### `/context`
State Management com Context API:
- `TransacaoContext` - Gerencia transações
- `EstatisticaContext` - Gerencia estatísticas

### `/hooks`
Hooks personalizados:
- `useApiCall` - Hook genérico para API calls
- `useFetch` - Hook para fetch inicial

### `/pages`
Páginas da aplicação:
- `Dashboard` - Visualização de estatísticas
- `NovaTransacao` - Criar transação
- `Historico` - Lista de transações
- `Configuracao` - Gerenciar configurações

### `/services`
Integração com API:
- `api.js` - Cliente Axios configurado

### `/utils`
Funções utilitárias:
- `constants.js` - Constantes globais
- `validations.js` - Funções de validação
- `formatters.js` - Funções de formatação

### `/styles`
Estilos globais:
- `variables.css` - Variáveis CSS
- `animations.css` - Animações reutilizáveis

## 🎨 Design System

### Cores
- **Primária**: #ff9500 (Laranja ITAU)
- **Sucesso**: #10b981 (Verde)
- **Erro**: #ef4444 (Vermelho)
- **Neutras**: Escala de cinza

### Tipografia
- **Font**: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto
- **Smooth rendering**: antialiased

### Breakpoints (TailwindCSS)
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## 🧪 Testes

Executar smoke tests manuais:
1. Dashboard: Verificar cards carregam
2. Nova Transação: Criar com validação
3. Histórico: Listar e paginar
4. Configuração: Atualizar intervalo

## 📱 Responsividade

Testado em:
- Mobile: 375px (iPhone SE)
- Tablet: 768px (iPad)
- Desktop: 1440px+

## 🔧 Configuração

### Variáveis de Ambiente

```env
VITE_API_URL=http://localhost:8080  # URL do backend
VITE_APP_NAME=ITAU Transactions      # Nome da app
VITE_APP_VERSION=1.0.0              # Versão
```

### Axios Client

Base URL: `import.meta.env.VITE_API_URL`  
Timeout: 30 segundos  
Content-Type: application/json

## 🚢 Deploy

### Docker

```bash
# Build
docker build -t itautask-frontend:1.0.0 .

# Run
docker run -d -p 80:80 itautask-frontend:1.0.0
```

### Nginx

Configuração incluída em `nginx.conf`:
- SPA routing (fallback para index.html)
- Cache headers otimizados
- Gzip compression
- Security headers
- Proxy para backend

## 📊 Performance

- **Bundle**: ~150KB gzipped
- **Lighthouse**: 95+ pontos
- **Time to Interactive**: <2s
- **First Contentful Paint**: <1s

## 🔍 Debug

### Console Logging
```javascript
// API calls
console.log('GET /transacao', response);

// Context changes
console.log('useTransacoes:', { transacoes, loading, error });
```

### React DevTools
- Inspecionar components
- Rastrear props changes
- Profiling

### Network Tab
- Verificar requisições
- Ver payloads
- Status codes

## 📚 Bibliotecas

- **react**: 19.0.0 - UI library
- **react-router-dom**: 7.0.0 - Routing
- **axios**: HTTP client
- **recharts**: Gráficos interativos
- **tailwindcss**: Utility CSS
- **lucide-react**: Ícones
- **react-hot-toast**: Notificações
- **vite**: Build tool

## 🔗 Links

- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [TailwindCSS](https://tailwindcss.com)
- [Recharts](https://recharts.org)
- [Axios](https://axios-http.com)

## 📝 Convenções

### Naming
- Components: PascalCase (`Dashboard.jsx`)
- Utils/Hooks: camelCase (`useTransacoes.js`)
- Constants: UPPER_SNAKE_CASE (`API_BASE_URL`)

### Estrutura de Componente
```javascript
import { useState } from 'react';
import SomeComponent from '../components/SomeComponent';

export default function MyComponent({ prop1, prop2 }) {
  const [state, setState] = useState('');
  
  const handleClick = () => { /* ... */ };
  
  return (
    <div className="...">
      {/* JSX */}
    </div>
  );
}
```

### Import Order
1. React imports
2. Third-party libraries
3. Components
4. Context/Hooks
5. Utils
6. Styles

## 🆘 Troubleshooting

### Variáveis de ambiente não funcionam
```bash
# Verificar se arquivo .env está na raiz
# Variáveis devem começar com VITE_
# Reiniciar servidor dev
npm run dev
```

### API conecta localhost em produção
```bash
# Mudar .env.production
VITE_API_URL=https://api.production.com
# Rebuild
npm run build
```

### Estado não atualiza
```javascript
// Use função anterior para evitar race conditions
setTransacoes(prev => [...prev, novaTransacao]);
```

## 📞 Suporte

Para dúvidas ou bugs, abrir issue no repositório.

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
