'use client'

import { cn } from "@/lib/utils"

type PaginationProps = {
  page: number
  total: number
  pageSize: number
  onChange: (page: number) => void
}

function PageBtn({ children, active, disabled, onClick }: {
  children: React.ReactNode
  active?: boolean
  disabled?: boolean
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-11 h-11 rounded-lg border text-sm transition-all duration-150",
        active
          ? "border-navy bg-navy text-white font-bold"
          : disabled
            ? "border-gray-200 text-gray-300 cursor-not-allowed"
            : "border-gray-300 text-navy cursor-pointer"
      )}
    >
      {children}
    </button>
  )
}

export function Pagination({ page, total, pageSize, onChange }: PaginationProps) {
  const totalPages = Math.ceil(total / pageSize)
  if (totalPages <= 1) return null
  return (
    <div className="flex justify-center gap-2 items-center mt-10">
      <PageBtn disabled={page === 1} onClick={() => onChange(page - 1)}>←</PageBtn>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
        <PageBtn key={p} active={p === page} onClick={() => onChange(p)}>{p}</PageBtn>
      ))}
      <PageBtn disabled={page === totalPages} onClick={() => onChange(page + 1)}>→</PageBtn>
    </div>
  )
}
