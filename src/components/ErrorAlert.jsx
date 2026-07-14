import { AlertCircle, X } from 'lucide-react';

/**
 * Componente ErrorAlert - Alerta de erro
 * @param {string} message - Mensagem de erro
 * @param {Function} onDismiss - Callback ao fechar
 * @param {boolean} dismissible - Permitir fechar o alerta
 */
export default function ErrorAlert({ message, onDismiss, dismissible = true }) {
  if (!message) return null;

  return (
    <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-red-800 font-medium text-sm">{message}</p>
      </div>
      {dismissible && onDismiss && (
        <button
          onClick={onDismiss}
          className="text-red-500 hover:text-red-700 flex-shrink-0"
          aria-label="Fechar alerta"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
