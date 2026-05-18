import { cn } from "@/lib/utils"

function WheelIcon({ className }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="12" cy="12" r="3"/>
      <line x1="12" y1="2" x2="12" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="12" y1="15" x2="12" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="2" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="15" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="4.93" y1="4.93" x2="9.76" y2="9.76" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="14.24" y1="14.24" x2="19.07" y2="19.07" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="19.07" y1="4.93" x2="14.24" y2="9.76" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="9.76" y1="14.24" x2="4.93" y2="19.07" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

export function TagBadge({ tags, className }: { tags: string[]; className?: string }) {
  if (tags.length === 0) return null
  return (
    <div className={cn("flex flex-wrap gap-1", className)}>
      {tags.map(tag => (
        <span
          key={tag}
          className="inline-block px-[10px] py-0.5 rounded-full text-[11px] font-semibold tracking-[0.02em] whitespace-nowrap bg-sky-blue/15 text-navy border border-sky-blue/30"
        >
          {tag}
        </span>
      ))}
    </div>
  )
}

export function EstadoBadge({ estado, label }: { estado: number; label: string }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <WheelIcon
          key={i}
          className={i <= estado ? "text-gray-900" : "text-gray-200"}
        />
      ))}
      <span className="text-[11px] text-muted-foreground ml-1">{label}</span>
    </span>
  )
}

export function Chip({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground bg-section-bg px-2 py-[3px] rounded-md">
      {icon}{children}
    </span>
  )
}
