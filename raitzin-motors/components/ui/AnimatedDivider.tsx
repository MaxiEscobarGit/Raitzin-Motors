'use client'

import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { cn } from '@/lib/utils'

export function AnimatedDivider({ className }: { className?: string }) {
  const { ref, isVisible } = useScrollAnimation(0.5)
  return (
    <div className={cn('overflow-hidden', className)}>
      <div
        ref={ref}
        style={{ transitionDuration: '1000ms', transitionTimingFunction: 'ease-out' }}
        className={cn('h-px bg-gray-200 transition-all', isVisible ? 'w-full' : 'w-0')}
      />
    </div>
  )
}
