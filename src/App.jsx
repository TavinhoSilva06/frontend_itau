import { Toaster } from 'react-hot-toast';
import AppRoutes from "./routes/AppRoutes";
import { TransacaoProvider } from "./context/TransacaoContext";
import { EstatisticaProvider } from "./context/EstatisticaContext";

function App() {
  return (
    <TransacaoProvider>
      <EstatisticaProvider>
        <AppRoutes />
        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            duration: 4000,
            style: {
              background: '#fff',
              color: '#000',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            },
            success: {
              style: {
                background: '#d1fae5',
                color: '#065f46',
              },
              iconTheme: {
                primary: '#10b981',
                secondary: '#d1fae5',
              },
            },
            error: {
              style: {
                background: '#fee2e2',
                color: '#7f1d1d',
              },
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fee2e2',
              },
            },
          }}
        />
      </EstatisticaProvider>
    </TransacaoProvider>
  );
}

export default App;