/**
 * Componente SkeletonCard - Loading placeholder para StatCard
 * @param {number} count - Quantidade de skeletons a exibir
 */
export default function SkeletonCard({ count = 5 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md p-6 border border-gray-100 animate-pulse"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            </div>
            <div className="bg-gray-200 rounded-lg w-12 h-12"></div>
          </div>
        </div>
      ))}
    </>
  );
}
