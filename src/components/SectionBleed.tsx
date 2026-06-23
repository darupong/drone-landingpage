import type { CSSProperties } from 'react'
import { cn } from '@/lib/utils'

type BleedColor = 'primary' | 'secondary' | 'muted' | 'amber' | 'violet'

interface SectionBleedProps {
  /** Render the bleed at the top of the parent section. */
  top?: boolean
  /** Render the bleed at the bottom of the parent section. */
  bottom?: boolean
  color?: BleedColor
  className?: string
}

const COLORS: Record<BleedColor, string> = {
  primary: 'hsl(36 45% 50% / 0.10)',
  secondary: 'hsl(348 40% 58% / 0.10)',
  muted: 'hsl(30 14% 40% / 0.14)',
  amber: 'hsl(40 60% 55% / 0.14)',
  violet: 'hsl(348 40% 58% / 0.14)',
}

/**
 * Soft 100px gradient bleed that softens the seam between adjacent sections.
 * Render inside a `relative` section. Set `top` or `bottom`.
 */
export function SectionBleed({ top, bottom: _bottom, color = 'primary', className }: SectionBleedProps) {
  const stop = COLORS[color]
  const style: CSSProperties = top
    ? { background: `linear-gradient(to bottom, ${stop}, transparent)`, top: 0 }
    : { background: `linear-gradient(to top, ${stop}, transparent)`, bottom: 0 }

  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-x-0 h-24 sm:h-28 lg:h-32 z-0',
        className,
      )}
      style={style}
    />
  )
}
