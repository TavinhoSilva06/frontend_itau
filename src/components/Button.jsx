/**
 * Componente Button - Botão reutilizável
 * @param {string} variant - 'primary' (laranja), 'secondary' (cinza), 'danger' (vermelho)
 * @param {boolean} disabled - Desabilitar botão
 * @param {boolean} loading - Mostrar estado de carregamento
 * @param {React.ReactNode} children - Texto do botão
 * @param {Function} onClick - Callback ao clicar
 * @param {string} className - Classes Tailwind adicionais
 * @param {string} type - Tipo do botão (button, submit, reset)
 */
export default function Button({
  variant = 'primary',
  disabled = false,
  loading = false,
  children,
  onClick,
  className = '',
  type = 'button',
  ...props
}) {
  const variantClasses = {
    primary: 'bg-orange-500 hover:bg-orange-600 text-white',
    secondary: 'bg-gray-300 hover:bg-gray-400 text-gray-800',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
  };

  const baseClasses =
    'px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed';

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {loading && (
        <span className="inline-block animate-spin">
          <svg
            className="w-4 h-4"
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
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </span>
      )}
      {children}
    </button>
  );
}
