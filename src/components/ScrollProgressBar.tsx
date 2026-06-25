import { m, useScroll, useSpring } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Fixed 2px progress bar at the top of the viewport that tracks page scroll.
 * Disabled (hidden) under `prefers-reduced-motion`.
 */
export function ScrollProgressBar() {
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 22, mass: 0.4 })

  if (reduced) return null

  return (
    <m.div
      aria-hidden="true"
      style={{ scaleX, transformOrigin: '0% 50%' }}
      className="fixed left-0 right-0 top-0 z-50 h-[2px] bg-[var(--color-primary)] pointer-events-none"
    />
  )
}
