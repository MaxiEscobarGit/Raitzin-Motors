import { cn } from "@/lib/utils"
import { WheelIcon } from "@/components/WheelIcon"

export function TagBadge({ tags, className }: { tags: string[]; className?: string }) {
  if (tags.length === 0) return null
  const visibleTag = tags[0]
  const extraCount = tags.length - 1
  return (
    <div className={cn("flex flex-row items-center gap-1 overflow-hidden", className)}>
      <span className="inline-block px-[10px] py-0.5 rounded-full text-[11px] font-semibold tracking-[0.02em] whitespace-nowrap bg-sky-blue/15 text-navy border border-sky-blue/30">
        {visibleTag}
      </span>
      {extraCount > 0 && (
        <span className="inline-block flex-shrink-0 px-2 py-0.5 rounded-full text-[11px] bg-gray-100 text-gray-500">
          +{extraCount}
        </span>
      )}
    </div>
  )
}

export function EstadoBadge({ estado, label }: { estado: number; label: string }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <WheelIcon
          key={i}
          size={18}
          filled={i <= estado}
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
