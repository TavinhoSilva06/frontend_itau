/**
 * Componente Card - Wrapper base reutilizável
 * @param {string} title - Título do card
 * @param {React.ReactNode} children - Conteúdo
 * @param {string} className - Classes Tailwind adicionais
 */
export default function Card({ title, children, className = '' }) {
  return (
    <div
      className={`
        bg-white rounded-lg shadow-md p-6 border border-gray-100
        hover:shadow-lg transition-shadow duration-200
        ${className}
      `}
    >
      {title && <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>}
      {children}
    </div>
  );
}
