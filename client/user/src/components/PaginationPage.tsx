import type { PaginationProps } from '../types'

const PaginationPage = ({ page, total, size, onChange }: PaginationProps) => {
  const totalPages = Math.ceil(total / size)
  if (totalPages <= 1) return null

  return (
    <div className="flex justify-end mt-16 gap-4 text-sm text-gray-500">
      {Array.from({ length: totalPages }).map((_, i) => {
        const p = i + 1
        return (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={p === page ? 'font-medium text-black' : ''}
          >
            {p}
          </button>
        )
      })}
      {page<totalPages && (
         <button onClick={() => onChange(page + 1)}>{">"}</button>
      )}
    </div>
  )
}
export default PaginationPage;