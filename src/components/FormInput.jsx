/**
 * Componente FormInput - Campo de entrada com validação
 * @param {string} label - Rótulo do campo
 * @param {string} type - Tipo do input (text, number, date, datetime-local, etc)
 * @param {string|number} value - Valor atual
 * @param {Function} onChange - Callback ao mudar valor
 * @param {string} error - Mensagem de erro
 * @param {string} placeholder - Placeholder do campo
 * @param {boolean} required - Campo obrigatório
 * @param {string} className - Classes Tailwind adicionais
 */
export default function FormInput({
  label,
  type = 'text',
  value,
  onChange,
  error,
  placeholder = '',
  required = false,
  className = '',
  ...props
}) {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
          w-full px-4 py-2 border rounded-lg font-base
          transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-orange-500
          ${
            error
              ? 'border-red-500 bg-red-50 focus:ring-red-500'
              : 'border-gray-300 bg-white hover:border-gray-400'
          }
        `}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
