'use client'

import { NAVY } from "@/lib/catalog-helpers"

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
    <button onClick={onClick} disabled={disabled} style={{
      width: 38, height: 38, borderRadius: 8,
      border: `1px solid ${active ? NAVY : "#D1D5DB"}`,
      background: active ? NAVY : "#fff",
      color: active ? "#fff" : disabled ? "#ccc" : NAVY,
      fontWeight: active ? 700 : 400, fontSize: 14,
      cursor: disabled ? "not-allowed" : "pointer",
      fontFamily: "inherit", transition: "all 0.15s",
    }}>{children}</button>
  )
}

export function Pagination({ page, total, pageSize, onChange }: PaginationProps) {
  const totalPages = Math.ceil(total / pageSize)
  if (totalPages <= 1) return null
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: 8, alignItems: "center", marginTop: 40 }}>
      <PageBtn disabled={page === 1} onClick={() => onChange(page - 1)}>←</PageBtn>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
        <PageBtn key={p} active={p === page} onClick={() => onChange(p)}>{p}</PageBtn>
      ))}
      <PageBtn disabled={page === totalPages} onClick={() => onChange(page + 1)}>→</PageBtn>
    </div>
  )
}
