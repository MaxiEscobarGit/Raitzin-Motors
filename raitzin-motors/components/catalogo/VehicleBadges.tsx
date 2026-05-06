import { cn } from "@/lib/utils"

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
        <span
          key={i}
          className={cn("w-[7px] h-[7px] rounded-full inline-block", i <= estado ? "bg-burgundy" : "bg-gray-200")}
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
