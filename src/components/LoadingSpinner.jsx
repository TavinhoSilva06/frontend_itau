/**
 * Componente LoadingSpinner - Indicador de carregamento
 * @param {string} size - Tamanho do spinner ('sm', 'md', 'lg')
 * @param {boolean} centered - Centralizar na tela
 * @param {string} text - Texto exibido abaixo do spinner
 */
export default function LoadingSpinner({ size = 'md', centered = true, text = '' }) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  const containerClass = centered
    ? 'flex flex-col items-center justify-center min-h-screen'
    : 'flex flex-col items-center justify-center';

  return (
    <div className={containerClass}>
      <div className={`${sizeClasses[size]} animate-spin`}>
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75 text-orange-500"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
      {text && <p className="mt-4 text-gray-600 text-sm font-medium">{text}</p>}
    </div>
  );
}
